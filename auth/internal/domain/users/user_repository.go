package users

import (
	"github.com/google/uuid"
)

type UserRepository interface {
	Create(user *User) error
	FindByEmail(email string) (*User, error)
	Update(user *User) error
	Delete(user *User) error
	FindByID(id uuid.UUID) (*User, error)
}
