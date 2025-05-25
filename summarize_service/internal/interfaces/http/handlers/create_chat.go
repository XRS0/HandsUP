package handlers

import (
	"net/http"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
	"github.com/gin-gonic/gin"
)

func (h *ChatHandler) CreateChat(c *gin.Context, topic string) {
	token, err := GetTokenFromHeader(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
	userID, err := ValidateToken(token, h.authClient)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	chat := &models.Chat{
		UserID: userID,
		Topic:  topic,
	}

	_, err = h.chatService.CreateChat(chat)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to create chat"})
		return
	}

	c.JSON(200, gin.H{"message": "Chat create successfully"})
}
