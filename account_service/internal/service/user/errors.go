package user

import "errors"

var (
	// ErrUserNotFound is returned when a user is not found
	ErrUserNotFound = errors.New("user not found")
	// ErrUserAlreadyExists is returned when a user already exists
	ErrUserAlreadyExists = errors.New("user already exists")
	// ErrInvalidCredentials is returned when the credentials are invalid
	ErrInvalidCredentials = errors.New("invalid credentials")
	// ErrInternalServer is returned when there is an internal server error
	ErrInternalServer = errors.New("internal server error")
	// ErrInvalidToken is returned when the token is invalid
	ErrInvalidToken = errors.New("invalid token")
	// ErrUserNotAuthorized is returned when the user is not authorized
	ErrUserNotAuthorized = errors.New("user not authorized")
)
