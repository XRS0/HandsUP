package handlers

import (
	"errors"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/ports/service"
	"github.com/XRS0/HandsUp/summarize_service/internal/infrastructure/clients/auth"
	"github.com/gin-gonic/gin"
)

type ChatHandler struct {
	chatService service.ChatService
	authClient  *auth.AuthClient
}

func NewChatHandler(cs service.ChatService, ac *auth.AuthClient) *ChatHandler {
	return &ChatHandler{
		chatService: cs,
		authClient:  ac,
	}
}

func GetTokenFromHeader(c *gin.Context) (string, error) {
	token := c.Request.Header.Get("Authorization")
	if len(token) < 8 || token[:7] != "Bearer " {
		return "", errors.New("invalid or missing Authorization header")
	}
	token = token[7:]
	return token, nil
}
