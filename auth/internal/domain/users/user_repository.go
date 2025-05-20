package users

import (
	"github.com/google/uuid"
)

// UserRepository определяет интерфейс для работы с пользователями
type UserRepository interface {
	// Create создает нового пользователя
	Create(user *User) error
	// FindByEmail находит пользователя по email
	FindByEmail(email string) (*User, error)
	// FindByID находит пользователя по ID
	FindByID(id uuid.UUID) (*User, error)
	// Update обновляет данные пользователя
	Update(user *User) error
	// Delete удаляет пользователя
	Delete(user *User) error
}
