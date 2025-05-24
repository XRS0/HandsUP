package main

import (
	"log"
	"time"

	"sync"

	"github.com/XRS0/HandsUp/auth/internal/infrastructure/http"
	"github.com/XRS0/HandsUp/auth/internal/infrastructure/security/jwt"
	"github.com/XRS0/HandsUp/auth/internal/interfaces/grpc/server"
)

const secretKey = "3igcZhRdWq96m3GUmTAiv9" // TODO: Move to config and use a secure key in production

func main() {
	// Initialize services
	jwtService := jwt.NewTokenService(secretKey, time.Hour*24*7, time.Hour*24)

	// Start gRPC server
	authServer := server.NewAuthServer(jwtService)
	grpc_port := ":50051"
	http_port := ":8081"
	wg := &sync.WaitGroup{}
	wg.Add(2)
	defer wg.Wait()
	go func() {
		r := http.NewRouter()
		r.InitRoutes(jwtService)
		if err := r.Start(http_port); err != nil {
			log.Fatal(err)
		}
		wg.Done()
		log.Printf("HTTP server stopped")
	}()

	go func() {
		log.Printf("Starting GRPC server on port %s", grpc_port)
		if err := authServer.Start(grpc_port); err != nil {
			log.Fatal(err)
		}
		wg.Done()
		log.Printf("GRPC server stopped")
	}()
}
