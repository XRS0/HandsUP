package users

import (
	"auth/internal/domain/users"
	"auth/internal/service/user"
	"context"
)

type CreateUserCommand struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type CreateUserCommandHandler struct {
	userService *user.UserService
}

func (h *CreateUserCommandHandler) Handle(ctx context.Context, cmd *CreateUserCommand) (*users.User, error) {
	user, err := h.userService.Register(cmd.Email, cmd.Password)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func NewCreateUserCommandHandler(userService *user.UserService) *CreateUserCommandHandler {
	return &CreateUserCommandHandler{
		userService: userService,
	}
}
