package postgres

import (
	"context"
	"fmt"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
	"github.com/XRS0/HandsUp/summarize_service/internal/domain/ports/repository"
	"gorm.io/gorm"
)

type ChatRepository struct {
	db *gorm.DB
}

func NewChatRepository(db *gorm.DB) repository.ChatRepository {
	return &ChatRepository{
		db: db,
	}
}

func (r *ChatRepository) CreateChat(ctx context.Context, chat *models.Chat) (*models.Chat, error) {
	if err := r.db.WithContext(ctx).Create(chat).Error; err != nil {
		return nil, fmt.Errorf("failed to create chat: %w", err)
	}
	return chat, nil
}

func (r *ChatRepository) GetChatByID(ctx context.Context, id string) (*models.Chat, error) {
	var chat models.Chat
	if err := r.db.WithContext(ctx).First(&chat, "id = ?", id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, fmt.Errorf("chat not found: %w", err)
		}
		return nil, fmt.Errorf("failed to get chat by ID: %w", err)
	}
	return &chat, nil
}

func (r *ChatRepository) GetAllChatsByUserID(ctx context.Context, userID string) ([]models.Chat, error) {
	var chats []models.Chat
	if err := r.db.WithContext(ctx).Where("user_id = ?", userID).Find(&chats).Error; err != nil {
		return nil, fmt.Errorf("failed to get chats by user ID: %w", err)
	}
	return chats, nil
}

func (r *ChatRepository) UpdateChat(ctx context.Context, chat *models.Chat) (*models.Chat, error) {
	if err := r.db.WithContext(ctx).Save(chat).Error; err != nil {
		return nil, fmt.Errorf("failed to update chat: %w", err)
	}
	return chat, nil
}

func (r *ChatRepository) DeleteChat(ctx context.Context, id string) error {
	if err := r.db.WithContext(ctx).Delete(&models.Chat{}, "id = ?", id).Error; err != nil {
		return fmt.Errorf("failed to delete chat: %w", err)
	}
	return nil
}

func (r *ChatRepository) GetMessagesByChatID(ctx context.Context, chatID string) ([]models.Message, error) {
	var messages []models.Message
	if err := r.db.WithContext(ctx).Where("chat_id = ?", chatID).Find(&messages).Error; err != nil {
		return nil, fmt.Errorf("failed to get messages by chat ID: %w", err)
	}
	return messages, nil
}

func (r *ChatRepository) CreateMessage(ctx context.Context, message *models.Message) (*models.Message, error) {
	if err := r.db.WithContext(ctx).Create(message).Error; err != nil {
		return nil, fmt.Errorf("failed to create message: %w", err)
	}
	return message, nil
}
