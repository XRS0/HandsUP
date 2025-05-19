// Package handlers предоставляет HTTP обработчики для работы с пользователями
package handlers

import (
	"net/http"

	"auth/internal/service/token"
	"auth/internal/service/user"

	"github.com/gin-gonic/gin"
)

// UserHandler содержит зависимости для обработки HTTP запросов
type UserHandler struct {
	userService  *user.UserService
	tokenService *token.TokenService
}

// NewUserHandler создает новый экземпляр UserHandler
func NewUserHandler(userService *user.UserService, tokenService *token.TokenService) *UserHandler {
	return &UserHandler{
		userService:  userService,
		tokenService: tokenService,
	}
}

// LoginRequest представляет запрос на аутентификацию
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

// RefreshTokenRequest представляет запрос на обновление токенов
type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required"`
}

// TokenResponse представляет ответ с токенами
type TokenResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

// RegisterRequest представляет запрос на регистрацию
type RegisterRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

// Login обрабатывает HTTP запрос на аутентификацию
// POST /api/v1/login
func (h *UserHandler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	user, err := h.userService.Login(req.Email, req.Password)
	if err != nil {
		switch err.Error() {
		case "user not found", "invalid password":
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	accessToken, refreshToken, err := h.tokenService.GenerateTokens(user.ID().String(), user.Email())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	c.JSON(http.StatusOK, TokenResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	})
}

// RefreshTokenHandler обрабатывает HTTP запрос на обновление токенов
// POST /api/auth/refresh
func (h *UserHandler) RefreshTokenHandler(c *gin.Context) {
	var req RefreshTokenRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	accessToken, refreshToken, err := h.tokenService.RefreshTokens(req.RefreshToken)
	if err != nil {
		switch err.Error() {
		case "invalid token", "invalid token type":
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid refresh token"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusOK, TokenResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	})
}

// Register обрабатывает HTTP запрос на регистрацию
// POST /api/v1/register
func (h *UserHandler) Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	user, err := h.userService.Register(req.Email, req.Password)
	if err != nil {
		switch err.Error() {
		case "user already exists":
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusCreated, user)
}
