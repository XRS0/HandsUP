package server

import (
	"github.com/gin-gonic/gin"
)

type Server struct {
	Router *gin.Engine
}

func NewServer() *Server {
	router := gin.Default()
	return &Server{
		Router: router,
	}
}

func (s *Server) Start(port string) error {
	return s.Router.Run(port)
}
