// Package events предоставляет реализацию публикации событий пользователей
package events

import (
	"context"
	"encoding/json"
	"time"

	"auth/internal/domain/users"
)

// EventType тип события пользователя
type EventType string

const (
	// UserCreated событие создания пользователя
	UserCreated EventType = "user.created"
	// UserUpdated событие обновления пользователя
	UserUpdated EventType = "user.updated"
	// UserDeleted событие удаления пользователя
	UserDeleted EventType = "user.deleted"
)

// UserEvent событие пользователя
type UserEvent struct {
	Type      EventType   `json:"type"`
	UserID    string      `json:"user_id"`
	Email     string      `json:"email"`
	Timestamp int64       `json:"timestamp"`
	Data      interface{} `json:"data,omitempty"`
}

// UserEventPublisher интерфейс для публикации событий пользователей
type UserEventPublisher interface {
	Publish(ctx context.Context, event *UserEvent) error
}

// KafkaUserEventPublisher реализует публикацию событий в Kafka
type KafkaUserEventPublisher struct {
	producer interface{} // Здесь должен быть Kafka producer
}

// NewKafkaUserEventPublisher создает новый экземпляр KafkaUserEventPublisher
func NewKafkaUserEventPublisher(producer interface{}) *KafkaUserEventPublisher {
	return &KafkaUserEventPublisher{
		producer: producer,
	}
}

// Publish публикует событие пользователя
func (p *KafkaUserEventPublisher) Publish(ctx context.Context, event *UserEvent) error {
	data, err := json.Marshal(event)
	if err != nil {
		return err
	}

	_ = data

	// Здесь должна быть реальная отправка в Kafka
	// producer.SendMessage(ctx, event.Type, data)
	return nil
}

// PublishUserCreated публикует событие создания пользователя
func PublishUserCreated(ctx context.Context, publisher UserEventPublisher, user *users.User) error {
	event := &UserEvent{
		Type:      UserCreated,
		UserID:    user.ID().String(),
		Email:     user.Email(),
		Timestamp: time.Now().Unix(),
	}

	return publisher.Publish(ctx, event)
}

// PublishUserUpdated публикует событие обновления пользователя
func PublishUserUpdated(ctx context.Context, publisher UserEventPublisher, user *users.User) error {
	event := &UserEvent{
		Type:      UserUpdated,
		UserID:    user.ID().String(),
		Email:     user.Email(),
		Timestamp: time.Now().Unix(),
	}

	return publisher.Publish(ctx, event)
}

// PublishUserDeleted публикует событие удаления пользователя
func PublishUserDeleted(ctx context.Context, publisher UserEventPublisher, user *users.User) error {
	event := &UserEvent{
		Type:      UserDeleted,
		UserID:    user.ID().String(),
		Email:     user.Email(),
		Timestamp: time.Now().Unix(),
	}

	return publisher.Publish(ctx, event)
}
