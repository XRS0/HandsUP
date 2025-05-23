package auth

import (
	"context"

	pb "github.com/XRS0/HandsUp/account_service/internal/infrastructure/clients/auth/gen"
	"google.golang.org/grpc"
)

// AuthClient is a client for the Auth gRPC service.
type AuthClient struct {
	client pb.AuthServiceClient
}

// NewAuthClient creates a new AuthClient.
func NewAuthClient(conn *grpc.ClientConn) *AuthClient {
	return &AuthClient{
		client: pb.NewAuthServiceClient(conn),
	}
}

func (c *AuthClient) ValidateToken(token string) (*pb.ValidateTokenResponse, error) {
	// Call the ValidateToken method
	resp, err := c.client.ValidateToken(context.Background(), &pb.ValidateTokenRequest{Token: token})
	if err != nil {
		return nil, err
	}

	return resp, nil
}

func (c *AuthClient) RefreshToken(token string) (*pb.RefreshTokenResponse, error) {
	// Call the RefreshToken method
	resp, err := c.client.RefreshToken(context.Background(), &pb.RefreshTokenRequest{RefreshToken: token})
	if err != nil {
		return nil, err
	}

	return resp, nil
}

func (c *AuthClient) GenerateToken(userID string) (*pb.GenerateTokensResponse, error) {
	// Call the GenerateToken method
	resp, err := c.client.GenerateToken(context.Background(), &pb.GenerateTokensRequest{UserId: userID})
	if err != nil {
		return nil, err
	}

	return resp, nil
}
