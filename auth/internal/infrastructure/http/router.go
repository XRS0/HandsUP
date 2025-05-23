// Package http предоставляет HTTP сервер и маршрутизацию
package http

import (
	"net/http"

	"github.com/gorilla/mux"

	"auth/internal/infrastructure/http/handlers"
	"auth/internal/infrastructure/http/middleware"
)

// Router предоставляет маршрутизацию HTTP запросов
type Router struct {
	router         *mux.Router
	userHandler    *handlers.UserHandler
	authMiddleware *middleware.AuthMiddleware
}

// NewRouter создает новый экземпляр Router
// userHandler - обработчик запросов пользователей
// authMiddleware - middleware для аутентификации
func NewRouter(userHandler *handlers.UserHandler, authMiddleware *middleware.AuthMiddleware) *Router {
	router := mux.NewRouter()
	return &Router{
		router:         router,
		userHandler:    userHandler,
		authMiddleware: authMiddleware,
	}
}

// SetupRoutes настраивает маршруты приложения
// Регистрирует публичные и защищенные маршруты
func (r *Router) SetupRoutes() {
	// Публичные маршруты
	r.router.HandleFunc("/api/register", r.userHandler.Register).Methods(http.MethodPost)
	r.router.HandleFunc("/api/login", r.userHandler.Login).Methods(http.MethodPost)

	// Защищенные маршруты
	protected := r.router.PathPrefix("/api").Subrouter()
	protected.Use(r.authMiddleware.Authenticate)

	// TODO: Добавить защищенные маршруты
}

// GetRouter возвращает настроенный маршрутизатор
func (r *Router) GetRouter() *mux.Router {
	return r.router
}
