package main

import (
	"log"
	"net"

	"summarize_service/infrastructure/config"
	summarizerGrpc "summarize_service/interface/grpc"
	pb "summarize_service/interface/grpc/gen"
	"summarize_service/internal/container"

	"google.golang.org/grpc"
)

func main() {
	cfg := config.Init()

	app, err := container.BuildContainer()
	if err != nil {
		log.Fatalf("failed to build container: %v", err)
	}

	// создаем настоящий gRPC сервер
	server := grpc.NewServer()

	// создаем свою реализацию
	grpcHandler := summarizerGrpc.NewServer(app.LLM)

	// регистрируем реализацию в сервере
	pb.RegisterSummarizerServiceServer(server, grpcHandler)

	lis, err := net.Listen("tcp", cfg.GRPCPort)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	log.Printf("gRPC server listening on %s\n", cfg.GRPCPort)

	if err := server.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
