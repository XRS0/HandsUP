package router

import (
	"github.com/XRS0/HandsUp/account_service/internal/interfaces/http/server"
	"github.com/gin-gonic/gin"
)

type Router struct {
	Router *server.HTTP_Server
}

func NewRouter() *Router {
	router := gin.New()
	return &Router{
		Router: server.NewHTTPServer(router),
	}
}
func (r *Router) Start(port string) error {
	err := r.Router.Start(port)
	if err != nil {
		return err
	}
	return nil
}
