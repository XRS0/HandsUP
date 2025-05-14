// Package middleware предоставляет HTTP middleware для аутентификации
package middleware

import (
	"context"
	"net/http"
	"strings"

	"auth/internal/infrastructure/security/jwt"
)

// AuthMiddleware предоставляет middleware для аутентификации запросов
type AuthMiddleware struct {
	tokenService *jwt.TokenService
}

// NewAuthMiddleware создает новый экземпляр AuthMiddleware
// tokenService - сервис для работы с JWT токенами
func NewAuthMiddleware(tokenService *jwt.TokenService) *AuthMiddleware {
	return &AuthMiddleware{
		tokenService: tokenService,
	}
}

// Authenticate проверяет JWT токен в заголовке Authorization
// Если токен валиден, добавляет данные пользователя в контекст запроса
// Возвращает 401 Unauthorized, если токен отсутствует или недействителен
func (m *AuthMiddleware) Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Authorization header is required", http.StatusUnauthorized)
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			http.Error(w, "Invalid authorization header format", http.StatusUnauthorized)
			return
		}

		claims, err := m.tokenService.ValidateToken(parts[1])
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		// Добавляем информацию о пользователе в контекст запроса
		ctx := r.Context()
		ctx = context.WithValue(ctx, "user_id", claims.UserID)
		ctx = context.WithValue(ctx, "email", claims.Email)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
