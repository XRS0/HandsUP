package tokens

import "time"

// TokenRepository определяет интерфейс для работы с хранилищем токенов
type TokenRepository interface {
	// Save сохраняет токен в хранилище
	Save(token *Token) error

	// GetByID получает токен по его ID
	GetByID(id string) (*Token, error)

	// Delete удаляет токен по его ID
	Delete(id string) error

	// DeleteExpired удаляет все истекшие токены
	DeleteExpired() error

	// GetByTypeAndExpiresAt получает токены определенного типа, которые истекают до указанного времени
	GetByTypeAndExpiresAt(tokenType TokenType, expiresAt time.Time) ([]*Token, error)
}
