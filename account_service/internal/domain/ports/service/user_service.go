package service

import (
	"context"

	"github.com/XRS0/HandsUp/account_service/internal/domain/models"
)

type UserService interface {
	GetUserByID(ctx context.Context, id string) (*models.User, error)
	GetUserByEmail(ctx context.Context, email string) (*models.User, error)
	// GetUserByToken(ctx context.Context, token string) (*models.User, error)
	RegisterUser(ctx context.Context, user *models.User) (string, error)
	LoginUser(ctx context.Context, email, password string) (string, error)
}
