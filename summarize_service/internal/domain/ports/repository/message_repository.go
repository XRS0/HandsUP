package repository

import (
	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
)

type MessageRepository interface {
	CreateMessage(message *models.Message) (*models.Message, error)
	DeleteMessage(id string) error
	GetMessageByID(id string) (*models.Message, error)
	GetMessagesByChatID(chatID string) ([]models.Message, error)
	UpdateMessage(message *models.Message) (*models.Message, error)
}
