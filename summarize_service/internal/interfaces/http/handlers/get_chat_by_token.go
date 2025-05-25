package handlers

import (
	"errors"
	"net/http"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
	"github.com/XRS0/HandsUp/summarize_service/internal/infrastructure/clients/auth"
	pb "github.com/XRS0/HandsUp/summarize_service/internal/infrastructure/clients/auth/gen"
	"github.com/XRS0/HandsUp/summarize_service/internal/interfaces/http/dto"
	"github.com/gin-gonic/gin"
)

type HTTP_Error struct {
	Code int
	Err  error
}

func (h *ChatHandler) GetChatByTopic(c *gin.Context) {
	//TODO сделать отдельный запрос для выдачи одного чата
	topic := c.Param("topic")
	chats, err := getAllChatsByToken(c, h)
	var currentChat models.Chat
	if err.Err != nil {
		c.JSON(err.Code, gin.H{"error": err.Err})
	}

	for _, chat := range chats {
		if chat.Topic == topic {
			currentChat = chat
			break
		}
	}

	chatToReturn := dto.Chat{
		currentChat.Topic: []dto.Message{},
	}

	for _, message := range currentChat.Messages {
		chatToReturn[currentChat.Topic] = append(chatToReturn[currentChat.Topic], dto.Message{
			Text:   message.Text,
			Prompt: message.Prompt,
		})
	}

	c.JSON(200, chatToReturn)

}

func (h *ChatHandler) GetAllChatsByToken(c *gin.Context) {
	chats, err := getAllChatsByToken(c, h)
	if err.Err != nil {
		c.JSON(err.Code, gin.H{"error": err.Err})
	}

	var chatToReturn []dto.ChatPreview
	for _, chat := range chats {
		chatToReturn = append(chatToReturn, dto.ChatPreview{
			Topic:     chat.Topic,
			CreatedAt: chat.CreatedAt,
		})
	}

	c.JSON(http.StatusOK, gin.H{"chats": chatToReturn})
}

func getAllChatsByToken(c *gin.Context, h *ChatHandler) ([]models.Chat, *HTTP_Error) {
	token := c.Request.Header.Get("Authorization")
	if len(token) < 8 || token[:7] != "Bearer " {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or missing Authorization header"})
		return []models.Chat{}, &HTTP_Error{
			Code: 400,
			Err:  errors.New("invalid or missing Authorization header"),
		}
	}
	token = token[7:]

	userID, err := ValidateToken(token, h.authClient)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return []models.Chat{}, &HTTP_Error{
			Code: 401,
			Err:  errors.New("invalid token"),
		}
	}

	chats, err := h.chatService.GetAllChatsByUserID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve chats"})
		return []models.Chat{}, &HTTP_Error{
			Code: 500,
			Err:  errors.New("failed to retrieve chats"),
		}
	}

	return chats, nil
}

func ValidateToken(token string, ac *auth.AuthClient) (string, error) {
	if token == "" {
		return "", errors.New("token cannot be empty")
	}

	resp, err := ac.ValidateToken(&pb.ValidateTokenRequest{Token: token})
	if err != nil {
		return "", err
	}

	return resp.UserId, nil
}
