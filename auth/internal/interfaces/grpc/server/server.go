package server

import (
	"context"
	"fmt"
	"log"
	"net"

	"github.com/XRS0/HandsUp/auth/internal/infrastructure/security/jwt"
	"github.com/XRS0/HandsUp/auth/internal/interfaces/grpc/gen"
	"google.golang.org/grpc"
)

type AuthServer struct {
	gen.UnimplementedAuthServiceServer
	jwtService *jwt.TokenService
}

func NewAuthServer(jwtService *jwt.TokenService) *AuthServer {
	return &AuthServer{
		jwtService: jwtService,
	}
}

func (s *AuthServer) Start(port string) error {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		return fmt.Errorf("failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	gen.RegisterAuthServiceServer(grpcServer, s)

	log.Printf("Starting gRPC server on %s", port)
	return grpcServer.Serve(lis)
}

func (s *AuthServer) Validate(ctx context.Context, req *gen.ValidateRequest) (*gen.ValidateResponse, error) {
	// Validate the token
	claims, err := s.jwtService.ValidateToken(req.AccessToken)
	if err != nil {
		return nil, fmt.Errorf("invalid token: %v", err)
	}

	// Create and return the response
	resp := &gen.ValidateResponse{
		UserId: claims.ID,
	}

	return resp, nil
}
