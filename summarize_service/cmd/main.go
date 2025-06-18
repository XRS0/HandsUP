package main

import (
	// "log"
	// "net"

	"log"
	"sync"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
	"github.com/XRS0/HandsUp/summarize_service/internal/infrastructure/clients/auth"
	"github.com/XRS0/HandsUp/summarize_service/internal/infrastructure/persistence/postgres"
	"github.com/XRS0/HandsUp/summarize_service/internal/infrastructure/services"
	server "github.com/XRS0/HandsUp/summarize_service/internal/interfaces/grpc"
	summarizerHTTP "github.com/XRS0/HandsUp/summarize_service/internal/interfaces/http"
	gorm_postgres "gorm.io/driver/postgres"
	"gorm.io/gorm"
	// "github.com/XRS0/HandsUp/summarize_service/internal/container"
	// "google.golang.org/grpc"
)

func main() {
	db, err := gorm.Open(gorm_postgres.Open("postgres://hs:password@localhost:5432/handsup?sslmode=disable"), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	// Migrate the schema
	if err := db.AutoMigrate(&models.Chat{}, &models.Message{}); err != nil {
		log.Fatal(err)
	}

	chatRepo := postgres.NewChatRepository(db)
	chatService := services.NewChatService(chatRepo)
	summarizeService, err := services.NewOpenChatApi()
	if err != nil {
		log.Fatal(err)
	}

	authClient := auth.NewAuthClient()

	http_server := summarizerHTTP.NewServer(chatService, authClient, summarizeService)
	grcp_server := server.NewSummarizeServer(authClient, chatService)
	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		defer wg.Done()
		err := grcp_server.Start(":5002")
		if err != nil {
			log.Fatal(err)
		}
	}()
	go func() {
		defer wg.Done()
		http_server.Start(":8083")
	}()

	wg.Wait()

	// cfg := config.Init()

	// app, err := container.BuildContainer()
	// if err != nil {
	// 	log.Fatalf("failed to build container: %v", err)
	// }

	// // создаем настоящий gRPC сервер
	// server := grpc.NewServer()

	// // создаем свою реализацию
	// grpcHandler := summarizerGrpc.NewServer(app.LLM)

	// // регистрируем реализацию в сервере
	// pb.RegisterSummarizerServiceServer(server, grpcHandler)

	// lis, err := net.Listen("tcp", cfg.GRPCPort)
	// if err != nil {
	// 	log.Fatalf("failed to listen: %v", err)
	// }
	// log.Printf("gRPC server listening on %s\n", cfg.GRPCPort)

	// if err := server.Serve(lis); err != nil {
	// 	log.Fatalf("failed to serve: %v", err)
	// }
}
