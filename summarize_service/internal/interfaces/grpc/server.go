package server

import (
	"context"
	"fmt"
	"log"
	"net"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
	"github.com/XRS0/HandsUp/summarize_service/internal/domain/ports/service"
	"github.com/XRS0/HandsUp/summarize_service/internal/infrastructure/clients/auth"
	authGen "github.com/XRS0/HandsUp/summarize_service/internal/infrastructure/clients/auth/gen"
	"github.com/XRS0/HandsUp/summarize_service/internal/interfaces/grpc/gen"
	"google.golang.org/grpc"
)

type SummarizerServer struct {
	gen.UnimplementedSummarizerServiceServer
	AuthClient  *auth.AuthClient
	ChatService service.ChatService
}

func NewSummarizeServer(ac *auth.AuthClient, cs service.ChatService) *SummarizerServer {
	return &SummarizerServer{
		AuthClient:  ac,
		ChatService: cs,
	}
}

func (s *SummarizerServer) Start(port string) error {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		return fmt.Errorf("failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	gen.RegisterSummarizerServiceServer(grpcServer, s)

	log.Println("grpc started")

	return grpcServer.Serve(lis)
}

func (s *SummarizerServer) CreateMessage(ctx context.Context, req *gen.CreateMessageRequest) (*gen.CreateMessageResponse, error) {
	authResponse, err := s.AuthClient.ValidateToken(
		&authGen.ValidateTokenRequest{
			Token: req.Token,
		},
	)

	log.Println(req.Text, req.Token, req.Topic)

	if err != nil {
		return &gen.CreateMessageResponse{Error: err.Error()}, err
	}

	userID := authResponse.UserId

	chat, err := s.ChatService.CreateChat(&models.Chat{
		UserID: userID,
		Topic:  req.Topic,
	})

	if err != nil {
		return &gen.CreateMessageResponse{Error: err.Error()}, err
	}

	s.ChatService.AddMessageToChat(chat.ID, &models.Message{
		From:   false,
		Text:   req.Text,
		Prompt: req.Text,
	})

	return &gen.CreateMessageResponse{
		Error: "",
	}, nil

}
