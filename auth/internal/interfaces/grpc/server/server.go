package server

import (
	"context"
	"fmt"
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

	return grpcServer.Serve(lis)
}

func (s *AuthServer) ValidateToken(ctx context.Context, req *gen.ValidateTokenRequest) (*gen.ValidateTokenResponse, error) {
	claims, err := s.jwtService.ValidateToken(req.Token)
	resp := &gen.ValidateTokenResponse{}
	if err != nil {
		return &gen.ValidateTokenResponse{}, fmt.Errorf("invalid token: %v", err)
	}

	resp.UserId = claims.UserID
	return resp, nil
}

func (s *AuthServer) RefreshTokens(ctx context.Context, req *gen.RefreshTokenRequest) (*gen.RefreshTokenResponse, error) {
	access_token, refresh_token, err := s.jwtService.RefreshTokens(req.RefreshToken)
	if err != nil {
		return &gen.RefreshTokenResponse{}, fmt.Errorf("failed to generate token: %v", err)
	}
	resp := &gen.RefreshTokenResponse{
		TokenPair: &gen.TokenPair{
			AccessToken:  access_token,
			RefreshToken: refresh_token,
		},
	}
	return resp, nil
}
