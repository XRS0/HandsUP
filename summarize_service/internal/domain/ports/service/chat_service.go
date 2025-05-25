package service

import (
	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
)

type ChatService interface {
	CreateChat(chat *models.Chat) (*models.Chat, error)
	DeleteChat(id string) error
	// GetChatByTopic(topic string) (*models.Chat, error)
	GetAllChatsByUserID(userID string) ([]models.Chat, error)
	AddMessageToChat(chatID string, message *models.Message) (*models.Message, error)
	GetMessagesByChatID(chatID string) ([]models.Message, error)
}
