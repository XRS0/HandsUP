package repository

import (
	"context"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
)

type ChatRepository interface {
	CreateChat(ctx context.Context, chat *models.Chat) (*models.Chat, error)
	GetAllChatsByUserID(ctx context.Context, userID string) ([]models.Chat, error)
	DeleteChat(ctx context.Context, id string) error
	GetChatByID(ctx context.Context, id string) (*models.Chat, error)
	GetChatByTopic(ctx context.Context, topic, userId string) (*models.Chat, error)
	GetMessagesByChatID(ctx context.Context, chatID string) ([]models.Message, error)
	AddMessageToChat(ctx context.Context, chatID string, message *models.Message) (*models.Message, error)
}
