// Package tokens предоставляет доменные модели и интерфейсы для работы с токенами
package tokens

import "errors"

var (
	// ErrTokenExpired возникает, когда срок действия токена истек
	ErrTokenExpired = errors.New("token has expired")
	// ErrInvalidTokenType возникает, когда тип токена не соответствует ожидаемому
	ErrInvalidTokenType = errors.New("invalid token type")
	// ErrTokenNotFound возникает, когда токен не найден
	ErrTokenNotFound = errors.New("token not found")
)
