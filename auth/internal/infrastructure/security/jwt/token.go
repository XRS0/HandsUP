// Package jwt предоставляет функциональность для работы с JWT токенами
package jwt

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

// TokenService предоставляет методы для работы с JWT токенами
type TokenService struct {
	secretKey []byte
	expiresIn time.Duration
}

// Claims представляет данные, хранящиеся в JWT токене
type Claims struct {
	UserID uuid.UUID `json:"user_id"`
	Email  string    `json:"email"`
	jwt.RegisteredClaims
}

// NewTokenService создает новый экземпляр TokenService
// secretKey - секретный ключ для подписи токенов
// expiresIn - время жизни токена
func NewTokenService(secretKey string, expiresIn time.Duration) *TokenService {
	return &TokenService{
		secretKey: []byte(secretKey),
		expiresIn: expiresIn,
	}
}

// GenerateToken создает новый JWT токен для пользователя
// userID - идентификатор пользователя
// email - email пользователя
// Возвращает токен в виде строки и ошибку, если не удалось создать токен
func (s *TokenService) GenerateToken(userID uuid.UUID, email string) (string, error) {
	claims := &Claims{
		UserID: userID,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(s.expiresIn)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(s.secretKey)
}

// ValidateToken проверяет JWT токен и извлекает из него данные
// tokenString - токен в виде строки
// Возвращает данные из токена и ошибку, если токен недействителен
func (s *TokenService) ValidateToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return s.secretKey, nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}

	return nil, errors.New("invalid token")
}
