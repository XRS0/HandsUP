package handlers

import (
	"github.com/XRS0/HandsUp/summarize_service/internal/domain/ports/service"
	"github.com/XRS0/HandsUp/summarize_service/internal/infrastructure/clients/auth"
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
