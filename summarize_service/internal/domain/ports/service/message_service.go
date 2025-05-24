package service

import (
	"context"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
)

type MessageService interface {
	CreateMessage(ctx context.Context, message *models.Message) (*models.Message, error)
	DeleteMessage(ctx context.Context, id string) error
	GetMessageByID(ctx context.Context, id string) (*models.Message, error)
	GetMessagesByChatID(ctx context.Context, chatID string) ([]models.Message, error)
	UpdateMessage(ctx context.Context, message *models.Message) (*models.Message, error)
}
