package handlers

import (
	"net/http"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
	"github.com/XRS0/HandsUp/summarize_service/internal/interfaces/http/dto"
	"github.com/gin-gonic/gin"
)

func (h *ChatHandler) ToGenerateMessage(c *gin.Context) {
	topic := c.Param("topic")

	token, err := GetTokenFromHeader(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId, err := ValidateToken(token, h.authClient)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	var messageDTO dto.Message
	if err := c.ShouldBindJSON(&messageDTO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	chat, err := h.chatService.GetChatByTopic(topic, userId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var message models.Message
	_, err = h.chatService.AddMessageToChat(chat.ID, &message)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ура"})
}
