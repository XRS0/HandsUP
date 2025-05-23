package models

type User struct {
	ID       string `json:"id"`
	Name     string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}
