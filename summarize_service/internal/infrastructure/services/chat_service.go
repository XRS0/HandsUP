package services

import (
	"context"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
	"github.com/XRS0/HandsUp/summarize_service/internal/domain/ports/repository"
	"github.com/XRS0/HandsUp/summarize_service/internal/domain/ports/service"
	"github.com/google/uuid"
)

type ChatService struct {
	chatRepo repository.ChatRepository
}

func NewChatService(chatRepo repository.ChatRepository) service.ChatService {
	return &ChatService{
		chatRepo: chatRepo,
	}
}

func (s *ChatService) CreateChat(chat *models.Chat) (*models.Chat, error) {
	chat.ID = uuid.NewString()
	createdChat, err := s.chatRepo.CreateChat(context.Background(), chat)
	if err != nil {
		return nil, err
	}
	return createdChat, nil
}

func (s *ChatService) GetChatByID(id string) (*models.Chat, error) {
	chat, err := s.chatRepo.GetChatByID(context.Background(), id)
	if err != nil {
		return nil, err
	}
	return chat, nil
}

func (s *ChatService) GetAllChatsByUserID(userID string) ([]models.Chat, error) {
	chats, err := s.chatRepo.GetAllChatsByUserID(context.Background(), userID)
	if err != nil {
		return nil, err
	}
	return chats, nil
}

func (s *ChatService) DeleteChat(id string) error {
	err := s.chatRepo.DeleteChat(context.Background(), id)
	if err != nil {
		return err
	}
	return nil
}

func (s *ChatService) GetMessagesByChatID(chatID string) ([]models.Message, error) {
	messages, err := s.chatRepo.GetMessagesByChatID(context.Background(), chatID)
	if err != nil {
		return nil, err
	}
	return messages, nil
}

func (s *ChatService) AddMessageToChat(chatID string, message *models.Message) (*models.Message, error) {
	message.ID = uuid.NewString()
	message.ChatID = chatID
	createdMessage, err := s.chatRepo.AddMessageToChat(context.Background(), chatID, message)
	if err != nil {
		return nil, err
	}
	return createdMessage, nil
}

func (s *ChatService) GetChatByTopic(topic, userId string) (*models.Chat, error) {
	chat, err := s.chatRepo.GetChatByTopic(context.Background(), topic, userId)
	if err != nil {
		return nil, err
	}
	return chat, nil
}
