package main

import (
	"log"
	"time"

	"github.com/XRS0/HandsUp/auth/internal/infrastructure/security/jwt"
	"github.com/XRS0/HandsUp/auth/internal/interfaces/grpc/server"
)

const secretKey = "3igcZhRdWq96m3GUmTAiv9" // TODO: Move to config and use a secure key in production

func main() {
	// Initialize services
	jwtService := jwt.NewTokenService(secretKey, time.Hour*24, time.Hour*7)

	// Start gRPC server
	authServer := server.NewAuthServer(jwtService)
	port := ":50051"
	log.Printf("Starting Auth service on port %s", port)
	if err := authServer.Start(port); err != nil {
		log.Fatal(err)
	}
}
