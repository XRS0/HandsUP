package server

import (
	"github.com/XRS0/HandsUp/summarize_service/internal/domain/ports/service"
	"github.com/XRS0/HandsUp/summarize_service/internal/infrastructure/clients/auth"
	handlers "github.com/XRS0/HandsUp/summarize_service/internal/interfaces/http/handlers"
	"github.com/XRS0/HandsUp/summarize_service/internal/interfaces/ws"
	"github.com/gin-gonic/gin"
)

type Server struct {
	Router  *gin.Engine
	handler *handlers.ChatHandler
}

func NewServer(cs service.ChatService, ac *auth.AuthClient, ss service.SummarizeService) *Server {
	router := gin.Default()
	router.Use(CORS())

	handler := handlers.NewChatHandler(cs, ac)
	wsHandler := ws.NewGeneratorWSHandler(ac, cs, ss)

	server := &Server{
		Router:  router,
		handler: handler,
	}

	server.registerRoutes(wsHandler)

	return server
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

func (s *Server) registerRoutes(wsHandler *ws.GeneratorWSHandler) {
	s.Router.GET("/chats", s.handler.GetAllChatsByToken)
	s.Router.GET("/chats/:topic", s.handler.GetChatByTopic)
	s.Router.POST("/chats/:topic", func(ctx *gin.Context) {
		s.handler.CreateChat(ctx, ctx.Param("topic"))
	})

	// WebSocket endpoint
	s.Router.GET("/ws/generate", func(c *gin.Context) {
		wsHandler.Handle(c.Writer, c.Request)
	})
}
