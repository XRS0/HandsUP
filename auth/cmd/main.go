package main

import (
	"auth/internal/infrastructure/security/jwt"
	"auth/internal/infrastructure/security/password"
	"auth/internal/infrastructure/tokens/postgres"
	"auth/internal/infrastructure/users/storage"
	"auth/internal/service/token"
	"auth/internal/service/user"
	"database/sql"
	"log"
	"time"
)

const secretKey = "your-secret-key-here" // TODO: Move to config

func main() {
	db, err := sql.Open("postgres", "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	storage := storage.NewPostgresStorage(db)
	userService := user.NewUserService(storage, password.NewHasher(), token.NewTokenService(postgres.NewTokenRepository(db), jwt.NewTokenService(secretKey, time.Hour*24, time.Hour*7), time.Hour*24, time.Hour*7))

	user, err := userService.Register("test@test.com", "password")
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("User created: %v", user)
}
