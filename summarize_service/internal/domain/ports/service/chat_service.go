package service

import (
	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
)

type ChatService interface {
	CreateChat(chat *models.Chat) (*models.Chat, error)
	GetChatByID(id string) (*models.Chat, error)
	GetAllChatsByUserID(userID string) ([]models.Chat, error)
	UpdateChat(chat *models.Chat) (*models.Chat, error)
	DeleteChat(id string) error
	GetMessagesByChatID(chatID string) ([]models.Message, error)
}
