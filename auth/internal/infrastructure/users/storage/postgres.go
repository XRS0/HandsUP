package storage

import (
	"database/sql"
	"time"

	"auth/internal/domain/users"

	"github.com/google/uuid"
)

// PostgresStorage реализует интерфейс users.UserRepository для PostgreSQL
type PostgresStorage struct {
	db *sql.DB
}

// NewPostgresStorage создает новый экземпляр PostgresStorage
func NewPostgresStorage(db *sql.DB) *PostgresStorage {
	return &PostgresStorage{db: db}
}

// Create сохраняет нового пользователя
func (s *PostgresStorage) Create(user *users.User) error {
	query := `INSERT INTO users (id, email, password, name, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)`
	_, err := s.db.Exec(query, user.ID(), user.Email(), user.Password(), user.Name(), time.Now(), time.Now())
	return err
}

// FindByID находит пользователя по идентификатору
func (s *PostgresStorage) FindByID(id uuid.UUID) (*users.User, error) {
	query := `SELECT id, email, password, name FROM users WHERE id = $1`
	var userID uuid.UUID
	var email, password, name string
	err := s.db.QueryRow(query, id).Scan(&userID, &email, &password, &name)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	user, err := users.NewUserWithID(userID, email, password, name)
	if err != nil {
		return nil, err
	}
	return user, nil
}

// FindByEmail находит пользователя по email
func (s *PostgresStorage) FindByEmail(email string) (*users.User, error) {
	query := `SELECT id, email, password, name FROM users WHERE email = $1`
	var userID uuid.UUID
	var userEmail, password, name string
	err := s.db.QueryRow(query, email).Scan(&userID, &userEmail, &password, &name)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	user, err := users.NewUserWithID(userID, userEmail, password, name)
	if err != nil {
		return nil, err
	}
	return user, nil
}

// Update обновляет данные пользователя
func (s *PostgresStorage) Update(user *users.User) error {
	query := `UPDATE users SET email = $1, password = $2, name = $3, updated_at = $4 WHERE id = $5`
	_, err := s.db.Exec(query, user.Email(), user.Password(), user.Name(), time.Now(), user.ID())
	return err
}

// Delete удаляет пользователя
func (s *PostgresStorage) Delete(user *users.User) error {
	query := `DELETE FROM users WHERE id = $1`
	_, err := s.db.Exec(query, user.ID())
	return err
}
