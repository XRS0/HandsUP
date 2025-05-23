package dto

type User struct {
	UserName string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
}
