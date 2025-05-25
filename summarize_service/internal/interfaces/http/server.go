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
	handler := handlers.NewChatHandler(cs, ac)
	return &Server{
		Router:  router,
		handler: handler,
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
