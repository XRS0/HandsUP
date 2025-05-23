package postgres

import (
	"time"

	"github.com/XRS0/HandsUp/auth/internal/domain/tokens"

	"gorm.io/gorm"
)

// Token представляет модель токена в базе данных
type Token struct {
	ID        string    `gorm:"primaryKey"`
	Type      string    `gorm:"type:varchar(10)"`
	ExpiresAt time.Time `gorm:"not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

// TableName указывает имя таблицы для модели Token
func (Token) TableName() string {
	return "tokens"
}

type TokenRepository struct {
	db *gorm.DB
}

func NewTokenRepository(db *gorm.DB) *TokenRepository {
	return &TokenRepository{db: db}
}

func (r *TokenRepository) Save(token *tokens.Token) error {
	dbToken := Token{
		ID:        token.ID,
		Type:      string(token.Type),
		ExpiresAt: token.ExpiresAt,
	}
	return r.db.Save(&dbToken).Error
}

func (r *TokenRepository) GetByID(id string) (*tokens.Token, error) {
	var dbToken Token
	err := r.db.First(&dbToken, id).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, err
	}
	return &tokens.Token{
		ID:        dbToken.ID,
		Type:      tokens.TokenType(dbToken.Type),
		ExpiresAt: dbToken.ExpiresAt,
	}, nil
}

func (r *TokenRepository) Delete(id string) error {
	return r.db.Delete(&Token{}, id).Error
}

func (r *TokenRepository) DeleteExpired() error {
	return r.db.Where("expires_at < ?", time.Now()).Delete(&Token{}).Error
}

func (r *TokenRepository) GetByTypeAndExpiresAt(tokenType tokens.TokenType, expiresAt time.Time) ([]*tokens.Token, error) {
	var dbTokens []Token
	err := r.db.Where("type = ? AND expires_at < ?", string(tokenType), expiresAt).Find(&dbTokens).Error
	if err != nil {
		return nil, err
	}

	tokenList := make([]*tokens.Token, len(dbTokens))
	for i, dbToken := range dbTokens {
		tokenList[i] = &tokens.Token{
			ID:        dbToken.ID,
			Type:      tokens.TokenType(dbToken.Type),
			ExpiresAt: dbToken.ExpiresAt,
		}
	}
	return tokenList, nil
}
