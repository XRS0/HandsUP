package postgres

import (
	"github.com/XRS0/HandsUp/account_service/internal/domain/models"
	"github.com/XRS0/HandsUp/account_service/internal/domain/ports/repository"
	"gorm.io/gorm"
)

// UserRepository is a struct that implements the UserRepository interface
// and provides methods to interact with the user data in the PostgreSQL database.
type UserRepository struct {
	db *gorm.DB
}

// NewUserRepository creates a new instance of UserRepository with the provided database connection.
func NewUserRepository(db *gorm.DB) repository.UserRepository {
	return &UserRepository{db: db}
}

// CreateUser creates a new user in the database.
func (r *UserRepository) CreateUser(user models.User) error {
	if err := r.db.Create(&user).Error; err != nil {
		return err
	}
	return nil
}

// GetUserByID retrieves a user by their ID.
func (r *UserRepository) GetUserByID(id string) (*models.User, error) {
	var user models.User
	if err := r.db.First(&user, id).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// GetUserByEmail retrieves a user by their email.
func (r *UserRepository) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	if err := r.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// SaveUser saves a user to the database.
func (r *UserRepository) SaveUser(user models.User) error {
	if err := r.db.Save(&user).Error; err != nil {
		return err
	}
	return nil
}

// DeleteUser deletes a user by their ID.
func (r *UserRepository) DeleteUser(id int) error {
	var user models.User
	if err := r.db.First(&user, id).Error; err != nil {
		return err
	}
	if err := r.db.Delete(&user).Error; err != nil {
		return err
	}
	return nil
}
