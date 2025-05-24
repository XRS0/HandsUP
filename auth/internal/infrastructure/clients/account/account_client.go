package account

import (
	"context"
	"log"

	"github.com/XRS0/HandsUp/auth/internal/infrastructure/clients/account/gen"
	"github.com/XRS0/HandsUp/auth/internal/interfaces/grpc/dto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type GRPC_Client struct {
	client gen.AccountServiceClient
}

func NewGRPC_Client(address string) (*GRPC_Client, error) {
	conn, err := grpc.NewClient(address, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}

	client := gen.NewAccountServiceClient(conn)
	if client == nil {
		log.Fatalf("failed to create client: %v", err)
	}

	return &GRPC_Client{
		client: client,
	}, nil
}

func (c *GRPC_Client) GetUserByID(id string) (*gen.GetUserResponse, error) {
	resp, err := c.client.GetUserById(context.Background(), &gen.GetUserByIdRequest{UserId: id})
	if err != nil {
		return nil, err
	}
	return resp, nil
}

func (c *GRPC_Client) GetUserByEmail(email string) (*gen.GetUserResponse, error) {
	resp, err := c.client.GetUserByEmail(context.Background(), &gen.GetUserByEmailRequest{Email: email})
	if err != nil {
		return nil, err
	}
	return resp, nil
}

func (c *GRPC_Client) Register(user *dto.User) (*gen.RegisterUserResponse, error) {
	resp, err := c.client.RegisterUser(context.Background(), &gen.RegisterUserRequest{
		Username: user.UserName,
		Password: user.Password,
		Email:    user.Email,
	})
	if err != nil {
		log.Printf("RegisterUser gRPC error: %v", err)
		return nil, err
	}
	return resp, nil
}
