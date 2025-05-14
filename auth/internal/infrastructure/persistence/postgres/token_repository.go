// Package postgres предоставляет реализацию репозиториев для PostgreSQL
package postgres

import (
	"database/sql"
	"time"

	"auth/internal/domain/tokens"
)

// TokenRepository реализует интерфейс tokens.TokenRepository для PostgreSQL
type TokenRepository struct {
	db *sql.DB
}

// NewTokenRepository создает новый экземпляр TokenRepository
func NewTokenRepository(db *sql.DB) *TokenRepository {
	return &TokenRepository{db: db}
}

// Save сохраняет токен в базу данных
func (r *TokenRepository) Save(token *tokens.Token) error {
	query := `
		INSERT INTO tokens (user_id, email, token_type, expires_at)
		VALUES ($1, $2, $3, $4)
		ON CONFLICT (user_id) DO UPDATE
		SET email = $2, token_type = $3, expires_at = $4
	`

	_, err := r.db.Exec(
		query,
		token.UserID(),
		token.Email(),
		token.Type(),
		token.ExpiresAt(),
	)

	return err
}

// FindByID находит токен по идентификатору пользователя
func (r *TokenRepository) FindByID(userID string) (*tokens.Token, error) {
	query := `
		SELECT user_id, email, token_type, expires_at
		FROM tokens
		WHERE user_id = $1
	`

	var (
		id        string
		email     string
		tokenType tokens.TokenType
		expiresAt time.Time
	)

	err := r.db.QueryRow(query, userID).Scan(&id, &email, &tokenType, &expiresAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	return tokens.NewToken(id, email, tokenType, expiresAt), nil
}

// Delete удаляет токен
func (r *TokenRepository) Delete(userID string) error {
	query := `DELETE FROM tokens WHERE user_id = $1`
	_, err := r.db.Exec(query, userID)
	return err
}

// DeleteExpired удаляет все истекшие токены
func (r *TokenRepository) DeleteExpired() error {
	query := `DELETE FROM tokens WHERE expires_at < NOW()`
	_, err := r.db.Exec(query)
	return err
}
