package server

import (
	"github.com/XRS0/HandsUp/account_service/internal/domain/ports/service"
	"github.com/XRS0/HandsUp/account_service/internal/infrastructure/clients/auth"
	"github.com/XRS0/HandsUp/account_service/internal/interfaces/http/handlers"
	"github.com/gin-gonic/gin"
)

type HTTP_Server struct {
	Router     *gin.Engine
	AuthClient *auth.AuthClient
}

func NewHTTPServer(router *gin.Engine, authClient *auth.AuthClient) *HTTP_Server {
	if router == nil {
		router = gin.Default()
	}
	return &HTTP_Server{
		Router:     router,
		AuthClient: authClient,
	}
}

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}
		c.Next()
	}
}

func (s *HTTP_Server) RegisterRoutes(userService service.UserService) {
	s.Router.GET("/get_user/:token", func(ctx *gin.Context) {
		handlers.GetUserHandler(ctx, userService, s.AuthClient)
	})
}

func (s *HTTP_Server) Start(port string) error {
	err := s.Router.Run(port)
	if err != nil {
		return err
	}
	return nil
}

func (s *HTTP_Server) Stop() error {
	return nil
}
