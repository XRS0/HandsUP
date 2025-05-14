// Package handlers предоставляет HTTP обработчики для работы с пользователями
package handlers

import (
	"encoding/json"
	"net/http"
)

// LoginRequest представляет запрос на аутентификацию
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginHandler обрабатывает HTTP запрос на аутентификацию
// POST /api/auth/login
func (h *UserHandler) LoginHandler(w http.ResponseWriter, r *http.Request) {
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

	// Генерируем пару токенов
	accessToken, err := h.tokenService.GenerateAccessToken(user.ID().String(), user.Email())
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	refreshToken, err := h.tokenService.GenerateRefreshToken(user.ID().String(), user.Email())
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
