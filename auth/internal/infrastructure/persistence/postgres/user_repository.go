// Package postgres реализует хранилище пользователей в PostgreSQL
package postgres

import (
	"database/sql"
	"time"

	"github.com/google/uuid"

	"auth/internal/domain/users"
)

// UserRepository реализует интерфейс users.UserRepository для работы с PostgreSQL
type UserRepository struct {
	db *sql.DB
}

// NewUserRepository создает новый экземпляр UserRepository
func NewUserRepository(db *sql.DB) users.UserRepository {
	return &UserRepository{db: db}
}

// Create сохраняет нового пользователя в базу данных
// Возвращает ошибку, если не удалось создать пользователя
func (r *UserRepository) Create(user *users.User) error {
	_, err := r.db.Exec(
		"INSERT INTO users (id, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
		user.ID(),
		user.Email(),
		user.Password(),
		user.CreatedAt(),
		user.UpdatedAt(),
	)
	return err
}

// FindByEmail ищет пользователя по email
// Возвращает nil, если пользователь не найден
// Возвращает ошибку, если произошла ошибка при поиске
func (r *UserRepository) FindByEmail(email string) (*users.User, error) {
	var (
		id        uuid.UUID
		userEmail string
		password  string
		createdAt time.Time
		updatedAt time.Time
	)

	err := r.db.QueryRow(
		"SELECT id, email, password, created_at, updated_at FROM users WHERE email = $1",
		email,
	).Scan(&id, &userEmail, &password, &createdAt, &updatedAt)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	return users.NewUser(userEmail, password)
}

// Update обновляет данные пользователя в базе данных
// Обновляет поле updated_at текущим временем
// Возвращает ошибку, если не удалось обновить пользователя
func (r *UserRepository) Update(user *users.User) error {
	_, err := r.db.Exec(
		"UPDATE users SET email = $1, password = $2, updated_at = $3 WHERE id = $4",
		user.Email(),
		user.Password(),
		time.Now(),
		user.ID(),
	)
	return err
}

// Delete удаляет пользователя из базы данных
// Возвращает ошибку, если не удалось удалить пользователя
func (r *UserRepository) Delete(user *users.User) error {
	_, err := r.db.Exec("DELETE FROM users WHERE id = $1", user.ID())
	return err
}

// FindByID ищет пользователя по ID
// Возвращает nil, если пользователь не найден
// Возвращает ошибку, если произошла ошибка при поиске
func (r *UserRepository) FindByID(id uuid.UUID) (*users.User, error) {
	var (
		userID    uuid.UUID
		email     string
		password  string
		createdAt time.Time
		updatedAt time.Time
	)

	err := r.db.QueryRow(
		"SELECT id, email, password, created_at, updated_at FROM users WHERE id = $1",
		id,
	).Scan(&userID, &email, &password, &createdAt, &updatedAt)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	return users.NewUser(email, password)
}
