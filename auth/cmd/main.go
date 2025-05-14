package main

import (
	"auth/internal/infrastructure/users/storage"
	"auth/internal/service/user"
	"database/sql"
	"log"
)

func main() {
	db, err := sql.Open("postgres", "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	storage := storage.NewPostgresStorage(db)
	userService := user.NewUserService(storage)

	user, err := userService.Create("test@test.com", "password")
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("User created: %v", user)
}
