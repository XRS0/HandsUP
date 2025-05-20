#!/bin/bash

# Connection string matching the one in main.go
CONNECTION_STRING="postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable"

# Check if psql is installed
if ! command -v psql &> /dev/null; then
    echo "Error: psql is not installed. Please install PostgreSQL client tools:"
    echo "For Ubuntu/Debian: sudo apt-get install postgresql-client"
    echo "For Windows: Install PostgreSQL from https://www.postgresql.org/download/windows/"
    exit 1
fi

# Run the migration
echo "Running database migration..."
psql "$CONNECTION_STRING" -f ../migrations/001_init.sql

if [ $? -eq 0 ]; then
    echo "Migration completed successfully"
else
    echo "Migration failed"
    exit 1
fi 