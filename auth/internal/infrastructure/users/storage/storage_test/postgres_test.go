package storage_test

import (
	"database/sql"
	"testing"

	"auth/internal/domain/users"
	"auth/internal/infrastructure/users/storage"
)

func TestPostgresStorage_Create(t *testing.T) {
	db, err := sql.Open("postgres", "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable")
	if err != nil {
		t.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	storage := storage.NewPostgresStorage(db)

	user, err := users.NewUser("test@test.com", "password")
	if err != nil {
		t.Fatalf("Failed to create user: %v", err)
	}

	err = storage.Create(user)
	if err != nil {
		t.Fatalf("Failed to create user: %v", err)
	}
}
