package main

import (
	authhttp "auth/internal/infrastructure/http"
	"auth/internal/infrastructure/http/handlers"
	"auth/internal/infrastructure/http/middleware"
	"auth/internal/infrastructure/security/jwt"
	"auth/internal/infrastructure/security/password"
	"auth/internal/infrastructure/tokens/postgres"
	"auth/internal/infrastructure/users/storage"
	"auth/internal/service/token"
	"auth/internal/service/user"
	"database/sql"
	"log"
	"net/http"
	"time"

	_ "github.com/lib/pq"
)

const secretKey = "secret" // TODO: Move to config

func main() {
	db, err := sql.Open("postgres", "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Initialize services
	storage := storage.NewPostgresStorage(db)
	jwtService := jwt.NewTokenService(secretKey, time.Hour*24, time.Hour*7)
	tokenService := token.NewTokenService(
		postgres.NewTokenRepository(db),
		jwtService,
		time.Hour*24,
		time.Hour*7,
	)
	userService := user.NewUserService(storage, password.NewHasher(), tokenService)

	// Initialize HTTP handlers and middleware
	userHandler := handlers.NewUserHandler(userService, tokenService)
	authMiddleware := middleware.NewAuthMiddleware(jwtService)

	// Setup router
	router := authhttp.NewRouter(userHandler, authMiddleware)
	router.SetupRoutes()

	// Start HTTP server
	port := ":8080"
	log.Printf("Starting HTTP server on port %s", port)
	if err := http.ListenAndServe(port, router.GetRouter()); err != nil {
		log.Fatal(err)
	}
}
