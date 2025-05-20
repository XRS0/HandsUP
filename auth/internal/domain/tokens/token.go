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
	userID    string
	email     string
	tokenType TokenType
	expiresAt time.Time
}

// NewToken создает новый экземпляр Token
func NewToken(userID, email string, tokenType TokenType, expiresAt time.Time) *Token {
	return &Token{
		userID:    userID,
		email:     email,
		tokenType: tokenType,
		expiresAt: expiresAt,
	}
}

// UserID возвращает идентификатор пользователя
func (t *Token) UserID() string {
	return t.userID
}

// Email возвращает email пользователя
func (t *Token) Email() string {
	return t.email
}

// Type возвращает тип токена
func (t *Token) Type() TokenType {
	return t.tokenType
}

// ExpiresAt возвращает время истечения токена
func (t *Token) ExpiresAt() time.Time {
	return t.expiresAt
}

// IsExpired проверяет, истек ли срок действия токена
func (t *Token) IsExpired() bool {
	return time.Now().After(t.expiresAt)
}
