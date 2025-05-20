package main

import (
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
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

const secretKey = "3igcZhRdWq96m3GUmTAiv9" // TODO: Move to config and use a secure key in production

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

	// Setup Gin router
	router := gin.Default()

	// Configure CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Public routes
	router.POST("/api/register", userHandler.Register)
	router.POST("/api/login", userHandler.Login)

	// Protected routes
	protected := router.Group("/api")
	protected.Use(authMiddleware.Authenticate())
	// TODO: Add protected routes here

	// Start HTTP server
	port := ":8080"
	log.Printf("Starting HTTP server on port %s", port)
	if err := router.Run(port); err != nil {
		log.Fatal(err)
	}
}
