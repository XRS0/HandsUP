package handlers

import "github.com/gin-gonic/gin"

func (h *ChatHandler) GetMessagesFromChat(c *gin.Context) {
	chatID := c.Param("id")

	messages, err := h.chatService.GetMessagesByChatID(chatID)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve messages from chat"})
		return
	}

	c.JSON(200, gin.H{"messages": messages})
}
