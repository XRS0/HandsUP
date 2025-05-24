package repository

import (
	"context"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
)

type ChatRepository interface {
	CreateChat(ctx context.Context, chat *models.Chat) (*models.Chat, error)
	GetChatByID(ctx context.Context, id uint) (*models.Chat, error)
	GetAllChatsByUserID(ctx context.Context, userID string) ([]models.Chat, error)
	UpdateChat(ctx context.Context, chat *models.Chat) (*models.Chat, error)
	DeleteChat(ctx context.Context, id uint) error
	GetMessagesByChatID(ctx context.Context, chatID uint) ([]models.Message, error)
}
