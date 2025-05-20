package main

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"log"
	"path/filepath"

	_ "github.com/lib/pq"
)

func main() {
	// Connect to the database
	db, err := sql.Open("postgres", "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable")
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Run migrations
	migrations := []string{"001_init.sql", "002_add_name.sql"}
	for _, migration := range migrations {
		migrationPath := filepath.Join("migrations", migration)
		migrationSQL, err := ioutil.ReadFile(migrationPath)
		if err != nil {
			log.Fatalf("Failed to read migration file %s: %v", migration, err)
		}

		fmt.Printf("Running migration %s...\n", migration)
		_, err = db.Exec(string(migrationSQL))
		if err != nil {
			log.Fatalf("Failed to run migration %s: %v", migration, err)
		}
		fmt.Printf("Migration %s completed successfully\n", migration)
	}

	fmt.Println("All migrations completed successfully")
}
