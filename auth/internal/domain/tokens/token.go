// Package tokens предоставляет доменные модели и интерфейсы для работы с токенами
package tokens

import (
	"time"
)

// TokenType определяет тип токена
type TokenType string

const (
	// AccessToken используется для доступа к защищенным ресурсам
	AccessToken TokenType = "access"
	// RefreshToken используется для обновления access токена
	RefreshToken TokenType = "refresh"
)

// Token представляет токен аутентификации
type Token struct {
	ID        string    `gorm:"primaryKey"`
	Type      TokenType `gorm:"type:varchar(10)"`
	ExpiresAt time.Time
	CreatedAt time.Time
	UpdatedAt time.Time
}

// NewToken создает новый экземпляр Token
func NewToken(tokenType TokenType, expiresAt time.Time) *Token {
	return &Token{
		Type:      tokenType,
		ExpiresAt: expiresAt,
	}
}

// IsExpired проверяет, истек ли срок действия токена
func (t *Token) IsExpired() bool {
	return time.Now().After(t.ExpiresAt)
}
