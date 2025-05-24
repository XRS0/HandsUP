package main

import (
	"log"

	"github.com/XRS0/HandsUp/account_service/internal/domain/models"
	userRepo "github.com/XRS0/HandsUp/account_service/internal/infrastructure/persistence/postgres"
	grpc_server "github.com/XRS0/HandsUp/account_service/internal/interfaces/grpc/server"
	http_server "github.com/XRS0/HandsUp/account_service/internal/interfaces/http/server"
	userService "github.com/XRS0/HandsUp/account_service/internal/service/user"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Initialize GORM
	db, err := gorm.Open(postgres.Open("postgres://hs:password@localhost:5432/handsup?sslmode=disable"), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	// Migrate the schema
	if err := db.AutoMigrate(&models.User{}); err != nil {
		log.Fatal(err)
	}

	// Initialize repositories
	userRepo := userRepo.NewUserRepository(db)

	// Initialize services
	userService := userService.NewUserService(userRepo)

	go func() {
		// Initialize and start the gRPC server
		accountServer := grpc_server.NewAccountServer(userService)
		port := ":50052"
		log.Printf("Starting Account service on port %s", port)
		if err := accountServer.Start(port); err != nil {
			log.Fatal(err)
		}
	}()

	go func() {
		httpServer := http_server.NewHTTPServer(nil)
		httpServer.RegisterRoutes(userService)
		port := ":8080"
		log.Printf("Starting HTTP server on port %s", port)
		if err := httpServer.Start(port); err != nil {
			log.Fatal(err)
		}
	}()
}
