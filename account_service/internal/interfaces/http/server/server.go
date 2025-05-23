package server

import (
	"github.com/XRS0/HandsUp/account_service/internal/domain/ports/service"
	"github.com/gin-gonic/gin"
)

type HTTP_Server struct {
	Router *gin.Engine
}

func NewHTTPServer(router *gin.Engine) *HTTP_Server {
	return &HTTP_Server{
		Router: router,
	}
}

func (s *HTTP_Server) RegisterRoutes(userService service.UserService) {
	s.Router.GET("/get_user/:token", func(c *gin.Context) {
		token := c.Param("token")
		user, err := userService.GetUserByToken(c, token)
		if err != nil {
			c.JSON(404, gin.H{"error": "User not found"})
			return
		}
		c.JSON(200, user)
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
