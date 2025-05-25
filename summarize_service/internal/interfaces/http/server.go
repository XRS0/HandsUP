package server

import (
	"github.com/XRS0/HandsUp/summarize_service/internal/domain/ports/service"
	"github.com/XRS0/HandsUp/summarize_service/internal/infrastructure/clients/auth"
	handlers "github.com/XRS0/HandsUp/summarize_service/internal/interfaces/http/handlers"
	"github.com/gin-gonic/gin"
)

type Server struct {
	Router  *gin.Engine
	handler *handlers.ChatHandler
}

func NewServer(cs service.ChatService, ac *auth.AuthClient) *Server {
	router := gin.Default()
	router.Use(CORS())
	handler := handlers.NewChatHandler(cs, ac)
	return &Server{
		Router:  router,
		handler: handler,
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

func (s *Server) Start(port string) error {
	return s.Router.Run(port)
}

func (s *Server) RegisterRoutes() {
	s.Router.POST("/message/:topic", s.handler.AddMessageToChat)
	s.Router.GET("/chats", s.handler.GetAllChatsByToken)
	s.Router.GET("/chats/:topic", s.handler.GetChatByTopic)
	s.Router.POST("/chats/:topic", func(ctx *gin.Context) {
		s.handler.CreateChat(ctx, ctx.Param("topic"))
	})
}
