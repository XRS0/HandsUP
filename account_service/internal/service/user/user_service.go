package user

import (
	"context"

	"github.com/XRS0/HandsUp/account_service/internal/domain/models"
	"github.com/XRS0/HandsUp/account_service/internal/domain/ports/repository"
	"github.com/XRS0/HandsUp/account_service/internal/domain/ports/service"
	"github.com/google/uuid"
)

type UserService struct {
	userRepo repository.UserRepository
}

func NewUserService(userRepo repository.UserRepository) service.UserService {
	return &UserService{
		userRepo: userRepo,
	}
}

func (s *UserService) GetUserByID(ctx context.Context, id string) (*models.User, error) {
	user, err := s.userRepo.GetUserByID(id)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (s *UserService) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	user, err := s.userRepo.GetUserByEmail(email)
	if err != nil {
		return nil, ErrUserNotFound
	}
	return user, nil
}

func (s *UserService) LoginUser(ctx context.Context, email, password string) (string, error) {
	// Placeholder implementation
	// In a real-world scenario, you would verify the username and password
	user, err := s.userRepo.GetUserByEmail(email)
	if err != nil {
		return "", err
	}
	if user.Password != password {
		return "", ErrInvalidCredentials // Invalid credentials
	}
	return user.ID, nil
}

func (s *UserService) RegisterUser(ctx context.Context, user *models.User) (string, error) {
	// TODO: Hash the password before storing it
	// Check if the user already exists
	existingUser, err := s.userRepo.GetUserByEmail(user.Email)
	if err == nil && existingUser.ID != "" {
		return "", ErrUserAlreadyExists // User already exists
	}
	// Create the user
	user.ID = uuid.NewString()
	err = s.userRepo.CreateUser(*user)
	if err != nil {
		return "", err
	}
	// Return the user ID
	return user.ID, nil
}
