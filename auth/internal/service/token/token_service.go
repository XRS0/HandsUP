// Package token предоставляет бизнес-логику для работы с токенами
package token

import (
	"time"

	"auth/internal/domain/tokens"
	"auth/internal/infrastructure/security/jwt"
)

// TokenService предоставляет методы для работы с токенами
type TokenService struct {
	tokenRepo       tokens.TokenRepository
	jwtService      *jwt.TokenService
	accessDuration  time.Duration
	refreshDuration time.Duration
}

// NewTokenService создает новый экземпляр TokenService
func NewTokenService(
	tokenRepo tokens.TokenRepository,
	jwtService *jwt.TokenService,
	accessDuration,
	refreshDuration time.Duration,
) *TokenService {
	return &TokenService{
		tokenRepo:       tokenRepo,
		jwtService:      jwtService,
		accessDuration:  accessDuration,
		refreshDuration: refreshDuration,
	}
}

// GenerateTokens создает новую пару токенов для пользователя
func (s *TokenService) GenerateTokens(userID, email string) (string, string, error) {
	// Удаляем старые токены пользователя
	if err := s.tokenRepo.Delete(userID); err != nil {
		return "", "", err
	}

	// Создаем доменные объекты токенов
	accessToken := tokens.NewToken(
		userID,
		email,
		tokens.AccessToken,
		time.Now().Add(s.accessDuration),
	)

	refreshToken := tokens.NewToken(
		userID,
		email,
		tokens.RefreshToken,
		time.Now().Add(s.refreshDuration),
	)

	// Сохраняем токены в репозитории
	if err := s.tokenRepo.Save(accessToken); err != nil {
		return "", "", err
	}
	if err := s.tokenRepo.Save(refreshToken); err != nil {
		return "", "", err
	}

	// Генерируем JWT токены
	accessJWT, err := s.jwtService.GenerateAccessToken(userID, email)
	if err != nil {
		return "", "", err
	}

	refreshJWT, err := s.jwtService.GenerateRefreshToken(userID, email)
	if err != nil {
		return "", "", err
	}

	return accessJWT, refreshJWT, nil
}

// ValidateToken проверяет валидность токена
func (s *TokenService) ValidateToken(token string) (*tokens.Token, error) {
	// Проверяем JWT токен
	claims, err := s.jwtService.ValidateToken(token)
	if err != nil {
		return nil, err
	}

	// Получаем токен из репозитория
	domainToken, err := s.tokenRepo.FindByID(claims.UserID)
	if err != nil {
		return nil, err
	}

	// Проверяем, не истек ли срок действия
	if domainToken.IsExpired() {
		return nil, tokens.ErrTokenExpired
	}

	return domainToken, nil
}

// RefreshTokens обновляет пару токенов
func (s *TokenService) RefreshTokens(refreshToken string) (string, string, error) {
	// Проверяем refresh токен
	token, err := s.ValidateToken(refreshToken)
	if err != nil {
		return "", "", err
	}

	// Проверяем тип токена
	if token.Type() != tokens.RefreshToken {
		return "", "", tokens.ErrInvalidTokenType
	}

	// Генерируем новую пару токенов
	return s.GenerateTokens(token.UserID(), token.Email())
}

// RevokeToken отзывает токен
func (s *TokenService) RevokeToken(token string) error {
	claims, err := s.jwtService.ValidateToken(token)
	if err != nil {
		return err
	}

	return s.tokenRepo.Delete(claims.UserID)
}

// GetClaims получает claims из JWT токена
func (s *TokenService) GetClaims(token string) (*jwt.TokenClaims, error) {
	return s.jwtService.ValidateToken(token)
}
