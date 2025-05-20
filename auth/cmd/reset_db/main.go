package main

import (
	"database/sql"
	"log"
	"os"
	"path/filepath"

	_ "github.com/lib/pq"
)

func main() {
	db, err := sql.Open("postgres", "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Drop existing tables
	_, err = db.Exec(`
		DROP TABLE IF EXISTS tokens;
		DROP TABLE IF EXISTS users;
	`)
	if err != nil {
		log.Fatal(err)
	}

	// Read and execute migration files
	migrations := []string{"001_init.sql", "002_add_name.sql"}
	for _, migration := range migrations {
		path := filepath.Join("migrations", migration)
		sqlBytes, err := os.ReadFile(path)
		if err != nil {
			log.Fatalf("Error reading migration file %s: %v", migration, err)
		}

		_, err = db.Exec(string(sqlBytes))
		if err != nil {
			log.Fatalf("Error executing migration %s: %v", migration, err)
		}
		log.Printf("Successfully executed migration: %s", migration)
	}

	log.Println("Database reset completed successfully")
}
