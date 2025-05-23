// Package middleware предоставляет HTTP middleware для аутентификации
package middleware

import (
	"net/http"
	"strings"

	"github.com/XRS0/HandsUp/auth/internal/infrastructure/security/jwt"

	"github.com/gin-gonic/gin"
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
func (m *AuthMiddleware) Authenticate() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			c.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization header format"})
			c.Abort()
			return
		}

		claims, err := m.tokenService.ValidateToken(parts[1])
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// Добавляем информацию о пользователе в контекст запроса
		c.Set("user_id", claims.UserID)

		c.Next()
	}
}
