package handlers

import "github.com/gin-gonic/gin"

func (h *ChatHandler) DeleteChat(c *gin.Context) {
	chatID := c.Param("id")

	err := h.chatService.DeleteChat(chatID)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to delete chat"})
		return
	}

	c.JSON(200, gin.H{"message": "Chat deleted successfully"})
}
