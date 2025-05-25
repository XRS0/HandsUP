package handlers

import (
	"net/http"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
	"github.com/gin-gonic/gin"
)

func (h *ChatHandler) AddMessageToChat(c *gin.Context) {
	topic := c.Param("topic")
	var message models.Message

	if err := c.ShouldBindJSON(&message); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	addedMessage, err := h.chatService.AddMessageToChat(topic, &message)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add message to chat"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Message added successfully", "data": addedMessage})
}
