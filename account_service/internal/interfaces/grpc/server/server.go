package server

import (
	"context"
	"net"

	"github.com/XRS0/HandsUp/account_service/internal/domain/models"
	"github.com/XRS0/HandsUp/account_service/internal/domain/ports/service"
	"github.com/XRS0/HandsUp/account_service/internal/interfaces/grpc/gen"

	"google.golang.org/grpc"
)

type GRPC_AccountServer struct {
	gen.UnimplementedAccountServiceServer
	service service.UserService
}

func NewAccountServer() *GRPC_AccountServer {
	return &GRPC_AccountServer{}
}

func (s *GRPC_AccountServer) Start(port string) error {
	// Initialize the gRPC server
	grpcServer := grpc.NewServer()

	// Register the server with the gRPC server
	gen.RegisterAccountServiceServer(grpcServer, s)

	// Create a TCP listener on a specified address
	lis, err := net.Listen("tcp", port)
	if err != nil {
		return err
	}

	// Start the gRPC server
	if err := grpcServer.Serve(lis); err != nil {
		return err
	}

	return nil
}

func (s *GRPC_AccountServer) GetUser(ctx context.Context, req *gen.GetUserByIdRequest) (*gen.GetUserResponse, error) {
	// Call the service layer to get the user by ID
	user, err := s.service.GetUserByID(ctx, req.UserId)
	if err != nil {
		return nil, err
	}

	// Placeholder implementation
	return &gen.GetUserResponse{
		UserId: req.UserId,
		Name:   user.Name,
	}, nil
}

func (s *GRPC_AccountServer) GetUserByEmail(ctx context.Context, req *gen.GetUserByEmailRequest) (*gen.GetUserResponse, error) {
	// Call the service layer to get the user by email
	user, err := s.service.GetUserByEmail(ctx, req.Email)
	if err != nil {
		return nil, err
	}

	// Placeholder implementation
	return &gen.GetUserResponse{
		UserId: user.ID,
		Name:   user.Name,
	}, nil
}

func (s *GRPC_AccountServer) RegisterUser(ctx context.Context, req *gen.RegisterUserRequest) (*gen.RegisterUserResponse, error) {
	// Call the service layer to register the user
	user := &models.User{
		Name:     req.Username,
		Password: req.Password,
		Email:    req.Email,
	}

	id, err := s.service.RegisterUser(ctx, user)
	if err != nil {
		return nil, err
	}

	// Placeholder implementation
	return &gen.RegisterUserResponse{
		UserId: id,
	}, nil
}
