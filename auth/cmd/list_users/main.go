package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func main() {
	// Connect to the database
	db, err := sql.Open("postgres", "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable")
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Query all users
	rows, err := db.Query("SELECT id, email, name, created_at FROM users")
	if err != nil {
		log.Fatalf("Failed to query users: %v", err)
	}
	defer rows.Close()

	fmt.Println("\nСписок пользователей:")
	fmt.Println("----------------------------------------")
	fmt.Printf("%-36s | %-30s | %-20s | %-20s\n", "ID", "Email", "Name", "Created At")
	fmt.Println("----------------------------------------")

	for rows.Next() {
		var id, email, name string
		var createdAt sql.NullTime
		if err := rows.Scan(&id, &email, &name, &createdAt); err != nil {
			log.Printf("Error scanning row: %v", err)
			continue
		}
		fmt.Printf("%-36s | %-30s | %-20s | %-20s\n", id, email, name, createdAt.Time.Format("2006-01-02 15:04:05"))
	}
	fmt.Println("----------------------------------------")

	if err = rows.Err(); err != nil {
		log.Printf("Error iterating rows: %v", err)
	}
}
