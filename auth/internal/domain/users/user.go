package users

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	id        uuid.UUID
	email     string
	password  string
	createdAt time.Time
	updatedAt time.Time
}

func NewUser(email, password string) (*User, error) {
	user := &User{
		id:        uuid.New(),
		email:     email,
		password:  password,
		createdAt: time.Now(),
		updatedAt: time.Now(),
	}

	return user, nil
}

func (u *User) ID() uuid.UUID {
	return u.id
}

func (u *User) Email() string {
	return u.email
}

func (u *User) SetEmail(email string) {
	u.email = email
	u.updatedAt = time.Now()
}

func (u *User) Password() string {
	return u.password
}

func (u *User) SetPassword(password string) {
	u.password = password
	u.updatedAt = time.Now()
}

func (u *User) CreatedAt() time.Time {
	return u.createdAt
}

func (u *User) UpdatedAt() time.Time {
	return u.updatedAt
}
