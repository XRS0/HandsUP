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

	// Query all tokens
	rows, err := db.Query("SELECT user_id, email, token_type, expires_at FROM tokens")
	if err != nil {
		log.Fatalf("Failed to query tokens: %v", err)
	}
	defer rows.Close()

	fmt.Println("\nСписок токенов:")
	fmt.Println("----------------------------------------")
	fmt.Printf("%-36s | %-30s | %-15s | %-20s\n", "User ID", "Email", "Token Type", "Expires At")
	fmt.Println("----------------------------------------")

	for rows.Next() {
		var userID, email, tokenType string
		var expiresAt sql.NullTime
		if err := rows.Scan(&userID, &email, &tokenType, &expiresAt); err != nil {
			log.Printf("Error scanning row: %v", err)
			continue
		}
		fmt.Printf("%-36s | %-30s | %-15s | %-20s\n",
			userID,
			email,
			tokenType,
			expiresAt.Time.Format("2006-01-02 15:04:05"))
	}
	fmt.Println("----------------------------------------")

	if err = rows.Err(); err != nil {
		log.Printf("Error iterating rows: %v", err)
	}
}
