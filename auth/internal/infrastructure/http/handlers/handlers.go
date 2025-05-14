// Package handlers предоставляет HTTP обработчики для работы с пользователями
package handlers

import (
	"auth/internal/infrastructure/security/jwt"
	"auth/internal/service/user"
)

// UserHandler содержит зависимости для обработки HTTP запросов
type UserHandler struct {
	userService  *user.UserService
	tokenService *jwt.TokenService
}

// NewUserHandler создает новый экземпляр UserHandler
func NewUserHandler(userService *user.UserService, tokenService *jwt.TokenService) *UserHandler {
	return &UserHandler{
		userService:  userService,
		tokenService: tokenService,
	}
}
