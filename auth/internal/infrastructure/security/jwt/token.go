// Package jwt предоставляет функциональность для работы с JWT токенами
package jwt

import (
	"errors"
	"time"

	"github.com/XRS0/HandsUp/auth/internal/domain/tokens"

	"github.com/golang-jwt/jwt/v5"
)

// TokenClaims представляет claims для JWT токена
type TokenClaims struct {
	UserID    string           `json:"user_id"`
	TokenType tokens.TokenType `json:"token_type"`
	jwt.RegisteredClaims
}

// TokenService предоставляет методы для работы с JWT токенами
type TokenService struct {
	secretKey       string
	accessDuration  time.Duration
	refreshDuration time.Duration
}

// NewTokenService создает новый экземпляр TokenService
// secretKey - секретный ключ для подписи токенов
// accessDuration - время жизни access токена
// refreshDuration - время жизни refresh токена
func NewTokenService(secretKey string, accessDuration, refreshDuration time.Duration) *TokenService {
	return &TokenService{
		secretKey:       secretKey,
		accessDuration:  accessDuration,
		refreshDuration: refreshDuration,
	}
}

// GenerateAccessToken создает access токен для пользователя
// userID - идентификатор пользователя
// email - email пользователя
// Возвращает токен и ошибку, если не удалось создать токен
func (s *TokenService) GenerateAccessToken(userID string) (string, error) {
	return s.generateToken(userID, tokens.AccessToken, s.accessDuration)
}

// GenerateRefreshToken создает refresh токен для пользователя
// userID - идентификатор пользователя
// email - email пользователя
// Возвращает токен и ошибку, если не удалось создать токен
func (s *TokenService) GenerateRefreshToken(userID string) (string, error) {
	return s.generateToken(userID, tokens.RefreshToken, s.refreshDuration)
}

// ValidateToken проверяет валидность токена
// token - токен для проверки
// Возвращает claims токена и ошибку, если токен невалиден
func (s *TokenService) ValidateToken(token string) (*TokenClaims, error) {
	claims := &TokenClaims{}
	parsedToken, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(s.secretKey), nil
	})

	if err != nil {
		return nil, err
	}

	if !parsedToken.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}

// RefreshTokens обновляет пару токенов
// refreshToken - текущий refresh токен
// Возвращает новую пару токенов (access и refresh) и ошибку, если:
// - refresh токен невалиден
// - refresh токен истек
// - не удалось создать новые токены
func (s *TokenService) RefreshTokens(refreshToken string) (string, string, error) {
	claims, err := s.ValidateToken(refreshToken)
	if err != nil {
		return "", "", err
	}

	if claims.TokenType != tokens.RefreshToken {
		return "", "", errors.New("invalid token type")
	}

	// Создаем новую пару токенов
	accessToken, err := s.GenerateAccessToken(claims.UserID)
	if err != nil {
		return "", "", err
	}

	newRefreshToken, err := s.GenerateRefreshToken(claims.UserID)
	if err != nil {
		return "", "", err
	}

	return accessToken, newRefreshToken, nil
}

// generateToken создает JWT токен с указанными параметрами
func (s *TokenService) generateToken(userID string, tokenType tokens.TokenType, duration time.Duration) (string, error) {
	now := time.Now()
	claims := &TokenClaims{
		UserID:    userID,
		TokenType: tokenType,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(now.Add(duration)),
			IssuedAt:  jwt.NewNumericDate(now),
			NotBefore: jwt.NewNumericDate(now),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.secretKey))
}
