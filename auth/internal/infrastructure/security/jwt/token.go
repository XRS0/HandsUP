// Package jwt предоставляет функциональность для работы с JWT токенами
package jwt

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// TokenType определяет тип токена
type TokenType string

const (
	// AccessToken используется для доступа к защищенным ресурсам
	AccessToken TokenType = "access"
	// RefreshToken используется для обновления access токена
	RefreshToken TokenType = "refresh"
)

// TokenClaims представляет claims для JWT токена
type TokenClaims struct {
	UserID    string    `json:"user_id"`
	Email     string    `json:"email"`
	TokenType TokenType `json:"token_type"`
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
func (s *TokenService) GenerateAccessToken(userID, email string) (string, error) {
	return s.generateToken(userID, email, AccessToken, s.accessDuration)
}

// GenerateRefreshToken создает refresh токен для пользователя
// userID - идентификатор пользователя
// email - email пользователя
// Возвращает токен и ошибку, если не удалось создать токен
func (s *TokenService) GenerateRefreshToken(userID, email string) (string, error) {
	return s.generateToken(userID, email, RefreshToken, s.refreshDuration)
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

	if claims.TokenType != RefreshToken {
		return "", "", errors.New("invalid token type")
	}

	// Создаем новую пару токенов
	accessToken, err := s.GenerateAccessToken(claims.UserID, claims.Email)
	if err != nil {
		return "", "", err
	}

	newRefreshToken, err := s.GenerateRefreshToken(claims.UserID, claims.Email)
	if err != nil {
		return "", "", err
	}

	return accessToken, newRefreshToken, nil
}

// generateToken создает JWT токен с указанными параметрами
func (s *TokenService) generateToken(userID, email string, tokenType TokenType, duration time.Duration) (string, error) {
	now := time.Now()
	claims := &TokenClaims{
		UserID:    userID,
		Email:     email,
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
