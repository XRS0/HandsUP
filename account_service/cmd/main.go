package main

import (
	"log"

	userRepo "github.com/XRS0/HandsUp/account_service/internal/infrastructure/persistence/postgres"
	"github.com/XRS0/HandsUp/account_service/internal/interfaces/grpc/server"
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

	// Initialize repositories
	userRepo := userRepo.NewUserRepository(db)

	// Initialize services
	userService := userService.NewUserService(userRepo)

	// Initialize and start the gRPC server
	accountServer := server.NewAccountServer(userService)
	port := ":50052" // Different port from auth service
	log.Printf("Starting Account service on port %s", port)
	if err := accountServer.Start(port); err != nil {
		log.Fatal(err)
	}
}
