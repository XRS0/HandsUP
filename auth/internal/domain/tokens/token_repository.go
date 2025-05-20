package tokens

// TokenRepository определяет интерфейс для работы с токенами
type TokenRepository interface {
	// Save сохраняет токен
	Save(token *Token) error
	// FindByID находит токен по идентификатору
	FindByID(id string) (*Token, error)
	// Delete удаляет токен
	Delete(id string) error
	// DeleteExpired удаляет все истекшие токены
	DeleteExpired() error
}
