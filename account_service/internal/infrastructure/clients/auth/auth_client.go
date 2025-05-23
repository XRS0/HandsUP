package auth

import (
	"context"
	"log"

	pb "github.com/XRS0/HandsUp/account_service/internal/infrastructure/clients/auth/gen"
	"google.golang.org/grpc"
)

// AuthClient is a client for the Auth gRPC service.
type AuthClient struct {
	client pb.AuthServiceClient
}

// NewAuthClient creates a new AuthClient.
func NewAuthClient() *AuthClient {
	// Create a connection to the gRPC server
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	// Create a new AuthServiceClient
	client := pb.NewAuthServiceClient(conn)
	if client == nil {
		log.Fatalf("failed to create client: %v", err)
	}
	return &AuthClient{
		client: client,
	}
}

func (c *AuthClient) ValidateToken(req *pb.ValidateTokenRequest) (*pb.ValidateTokenResponse, error) {
	// Call the ValidateToken method
	resp, err := c.client.ValidateToken(context.Background(), &pb.ValidateTokenRequest{Token: req.Token})
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
