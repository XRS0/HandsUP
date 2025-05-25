package repository

import (
	"context"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
)

type ChatRepository interface {
	CreateChat(ctx context.Context, chat *models.Chat) (*models.Chat, error)
	GetChatByID(ctx context.Context, id string) (*models.Chat, error)
	GetAllChatsByUserID(ctx context.Context, userID string) ([]models.Chat, error)
	UpdateChat(ctx context.Context, chat *models.Chat) (*models.Chat, error)
	DeleteChat(ctx context.Context, id string) error
	GetMessagesByChatID(ctx context.Context, chatID string) ([]models.Message, error)
	CreateMessage(ctx context.Context, message *models.Message) (*models.Message, error)
}
