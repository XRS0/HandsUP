// Package handlers предоставляет HTTP обработчики для работы с пользователями
package handlers

import (
	"encoding/json"
	"net/http"

	"auth/internal/service/token"
	"auth/internal/service/user"
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
	Email    string `json:"email"`
	Password string `json:"password"`
}

// RefreshTokenRequest представляет запрос на обновление токенов
type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token"`
}

// TokenResponse представляет ответ с токенами
type TokenResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

// RegisterRequest представляет запрос на регистрацию
type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Login обрабатывает HTTP запрос на аутентификацию
// POST /api/v1/login
func (h *UserHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	user, err := h.userService.Login(req.Email, req.Password)
	if err != nil {
		switch err.Error() {
		case "user not found":
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		case "invalid password":
			http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		default:
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}

	accessToken, refreshToken, err := h.tokenService.GenerateTokens(user.ID().String(), user.Email())
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	response := TokenResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// RefreshTokenHandler обрабатывает HTTP запрос на обновление токенов
// POST /api/auth/refresh
func (h *UserHandler) RefreshTokenHandler(w http.ResponseWriter, r *http.Request) {
	var req RefreshTokenRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	accessToken, refreshToken, err := h.tokenService.RefreshTokens(req.RefreshToken)
	if err != nil {
		switch err.Error() {
		case "invalid token":
			http.Error(w, "Invalid refresh token", http.StatusUnauthorized)
		case "invalid token type":
			http.Error(w, "Invalid token type", http.StatusUnauthorized)
		default:
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}

	response := TokenResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// Register обрабатывает HTTP запрос на регистрацию
// POST /api/v1/register
func (h *UserHandler) Register(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	user, err := h.userService.Register(req.Email, req.Password)
	if err != nil {
		switch err.Error() {
		case "user already exists":
			http.Error(w, err.Error(), http.StatusConflict)
		default:
			http.Error(w, "Internal server error", http.StatusInternalServerError)
		}
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}
