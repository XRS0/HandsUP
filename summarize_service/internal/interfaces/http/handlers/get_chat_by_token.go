package handlers

import (
	"errors"
	"log"
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
	check := c.Request.Header.Get("Authorization")
	topic := c.Param("topic")
	if check != "Bearer" {
		// Validate the token
		check = check[len("Bearer "):] // Remove "Bearer " prefix
		claims, err := h.authClient.ValidateToken(&pb.ValidateTokenRequest{Token: check})
		if err != nil {
			c.JSON(401, gin.H{
				"error": "Unauthorized",
			})
			return
		}

		chat, err := h.chatService.GetChatByTopic(topic, claims.UserId)
		if err != nil {
			c.JSON(404, gin.H{
				"error": "Chat not found",
			})
			return
		}

		log.Println(chat.Messages)

		msgsDTO := []dto.ChatMessage{}

		for _, msg := range chat.Messages {
			msgsDTO = append(msgsDTO, dto.ChatMessage{
				Text: msg.Text,
				From: msg.From,
			})
		}

		chatToReturn := dto.Chat{
			chat.Topic: msgsDTO,
		}

		c.JSON(200, chatToReturn)
	}
	// chats, httpErr := getAllChatsByToken(c, h)
	// var currentChat models.Chat
	// if httpErr != nil {
	// 	c.JSON(httpErr.Code, gin.H{"error": httpErr.Err})
	// 	return
	// }

	// for _, chat := range chats {
	// 	if chat.Topic == topic {
	// 		currentChat = chat
	// 		break
	// 	}
	// }

	// chatToReturn := dto.Chat{
	// 	currentChat.Topic: []dto.ChatMessage{},
	// }

	// for _, message := range currentChat.Messages {
	// 	if message.Prompt != "" {
	// 		chatToReturn[currentChat.Topic] = append(chatToReturn[currentChat.Topic], dto.ChatMessage{
	// 			Text: message.Text,
	// 			From: true,
	// 		})
	// 	} else {
	// 		chatToReturn[currentChat.Topic] = append(chatToReturn[currentChat.Topic], dto.ChatMessage{
	// 			Text: message.Text,
	// 			From: false,
	// 		})
	// 	}
	// }

}

func (h *ChatHandler) GetAllChatsByToken(c *gin.Context) {
	chats, httpErr := getAllChatsByToken(c, h)
	if httpErr != nil {
		c.JSON(httpErr.Code, gin.H{"error": httpErr.Err.Error()})
		return
	}

	var chatToReturn []dto.ChatPreview
	for _, chat := range chats {
		chatToReturn = append(chatToReturn, dto.ChatPreview{
			Topic:     chat.Topic,
			CreatedAt: chat.CreatedAt.Format("2006-01-02 15:04:05"),
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
