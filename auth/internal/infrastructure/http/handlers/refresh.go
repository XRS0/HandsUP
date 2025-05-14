// Package handlers предоставляет HTTP обработчики для работы с пользователями
package handlers

import (
	"encoding/json"
	"net/http"
)

// RefreshTokenRequest представляет запрос на обновление токенов
type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token"`
}

// TokenResponse представляет ответ с токенами
type TokenResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
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
