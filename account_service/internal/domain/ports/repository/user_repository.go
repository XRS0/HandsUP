package repository

import (
	"github.com/XRS0/HandsUp/account_service/internal/domain/models"
)

type UserRepository interface {
	// CreateUser creates a new user in the database
	CreateUser(models.User) error
	// GetUserByID retrieves a user by their ID
	GetUserByID(id string) (*models.User, error)
	// SaveUser saves a user to the database
	SaveUser(user models.User) error
	// DeleteUser deletes a user by their ID
	DeleteUser(id int) error
	// GetUserByEmail retrieves a user by their email
	GetUserByEmail(email string) (*models.User, error)
}
