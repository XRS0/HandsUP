package handlers

import (
	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
	"github.com/gin-gonic/gin"
)

func (h *ChatHandler) CreateChat(c *gin.Context, topic string) {
	chat := &models.Chat{
		Topic: topic,
	}

	_, err := h.chatService.CreateChat(chat)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to delete chat"})
		return
	}

	c.JSON(200, gin.H{"message": "Chat deleted successfully"})
}
