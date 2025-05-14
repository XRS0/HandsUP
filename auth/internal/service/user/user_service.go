// Package user предоставляет бизнес-логику для работы с пользователями
package user

import (
	"errors"

	"github.com/google/uuid"

	"auth/internal/domain/users"
	"auth/internal/infrastructure/security/jwt"
	"auth/internal/infrastructure/security/password"
)

// UserService предоставляет методы для работы с пользователями
// Реализует бизнес-логику регистрации, аутентификации и управления пользователями
type UserService struct {
	userRepo     users.UserRepository
	hasher       *password.Hasher
	tokenService *jwt.TokenService
}

// NewUserService создает новый экземпляр UserService
// userRepo - репозиторий для работы с пользователями
// hasher - сервис для хеширования паролей
// tokenService - сервис для работы с JWT токенами
func NewUserService(userRepo users.UserRepository, hasher *password.Hasher, tokenService *jwt.TokenService) *UserService {
	return &UserService{
		userRepo:     userRepo,
		hasher:       hasher,
		tokenService: tokenService,
	}
}

// Register регистрирует нового пользователя
// email - email пользователя
// password - пароль пользователя
// Возвращает созданного пользователя и ошибку, если:
// - пользователь с таким email уже существует
// - не удалось создать пользователя
// - не удалось сохранить пользователя
func (s *UserService) Register(email, password string) (*users.User, error) {
	// Проверяем, существует ли пользователь
	existingUser, err := s.userRepo.FindByEmail(email)
	if err != nil {
		return nil, err
	}
	if existingUser != nil {
		return nil, errors.New("user already exists")
	}

	// Создаем нового пользователя
	user, err := users.NewUser(email, password)
	if err != nil {
		return nil, err
	}

	// Сохраняем пользователя
	if err := s.userRepo.Create(user); err != nil {
		return nil, err
	}

	return user, nil
}

// Login аутентифицирует пользователя
// email - email пользователя
// password - пароль пользователя
// Возвращает пользователя и ошибку, если:
// - пользователь не найден
// - неверный пароль
func (s *UserService) Login(email, password string) (*users.User, error) {
	user, err := s.userRepo.FindByEmail(email)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}

	// Проверяем пароль
	if err := s.hasher.Compare(user.Password(), password); err != nil {
		return nil, errors.New("invalid password")
	}

	return user, nil
}

// GenerateToken создает JWT токен для пользователя
// userID - идентификатор пользователя
// email - email пользователя
// Возвращает токен и ошибку, если не удалось создать токен
func (s *UserService) GenerateToken(userID uuid.UUID, email string) (string, error) {
	return s.tokenService.GenerateToken(userID, email)
}

// UpdateUser обновляет данные пользователя
// userID - идентификатор пользователя
// email - новый email (если пустой, не обновляется)
// password - новый пароль (если пустой, не обновляется)
// Возвращает ошибку, если:
// - пользователь не найден
// - не удалось обновить данные
func (s *UserService) UpdateUser(userID uuid.UUID, email, password string) error {
	user, err := s.userRepo.FindByID(userID)
	if err != nil {
		return err
	}
	if user == nil {
		return errors.New("user not found")
	}

	// Обновляем данные пользователя
	if email != "" {
		user.SetEmail(email)
	}
	if password != "" {
		hashedPassword, err := s.hasher.Hash(password)
		if err != nil {
			return err
		}
		user.SetPassword(hashedPassword)
	}

	return s.userRepo.Update(user)
}

// DeleteUser удаляет пользователя
// userID - идентификатор пользователя
// Возвращает ошибку, если:
// - пользователь не найден
// - не удалось удалить пользователя
func (s *UserService) DeleteUser(userID uuid.UUID) error {
	user, err := s.userRepo.FindByID(userID)
	if err != nil {
		return err
	}
	if user == nil {
		return errors.New("user not found")
	}

	return s.userRepo.Delete(user)
}
