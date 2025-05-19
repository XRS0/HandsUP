package postgres

import (
	"database/sql"
	"time"

	"auth/internal/domain/tokens"
)

type TokenRepository struct {
	db *sql.DB
}

func NewTokenRepository(db *sql.DB) *TokenRepository {
	return &TokenRepository{db: db}
}

func (r *TokenRepository) Save(token *tokens.Token) error {
	query := `INSERT INTO tokens (user_id, email, token_type, expires_at) VALUES ($1, $2, $3, $4)`
	_, err := r.db.Exec(query, token.UserID(), token.Email(), token.Type(), token.ExpiresAt())
	return err
}

func (r *TokenRepository) FindByID(id string) (*tokens.Token, error) {
	query := `SELECT user_id, email, token_type, expires_at FROM tokens WHERE user_id = $1`
	var userID, email string
	var tokenType tokens.TokenType
	var expiresAt time.Time
	err := r.db.QueryRow(query, id).Scan(&userID, &email, &tokenType, &expiresAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return tokens.NewToken(userID, email, tokenType, expiresAt), nil
}

func (r *TokenRepository) Delete(id string) error {
	query := `DELETE FROM tokens WHERE user_id = $1`
	_, err := r.db.Exec(query, id)
	return err
}

func (r *TokenRepository) DeleteExpired() error {
	query := `DELETE FROM tokens WHERE expires_at < $1`
	_, err := r.db.Exec(query, time.Now())
	return err
}
