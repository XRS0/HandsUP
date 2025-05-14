// Package password предоставляет функциональность для хеширования и проверки паролей
package password

import (
	"golang.org/x/crypto/bcrypt"
)

// Hasher предоставляет методы для хеширования и проверки паролей
type Hasher struct{}

// NewHasher создает новый экземпляр Hasher
func NewHasher() *Hasher {
	return &Hasher{}
}

// Hash создает хеш пароля с использованием bcrypt
// password - пароль для хеширования
// Возвращает хеш пароля и ошибку, если не удалось создать хеш
func (h *Hasher) Hash(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

// Compare сравнивает хеш пароля с паролем
// hashedPassword - хеш пароля
// password - пароль для сравнения
// Возвращает ошибку, если пароли не совпадают
func (h *Hasher) Compare(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
