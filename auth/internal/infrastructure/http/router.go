package http

import (
	"github.com/XRS0/HandsUp/auth/internal/infrastructure/clients/account"
	"github.com/XRS0/HandsUp/auth/internal/infrastructure/http/middleware"
	"github.com/XRS0/HandsUp/auth/internal/infrastructure/security/jwt"
	"github.com/XRS0/HandsUp/auth/internal/interfaces/grpc/dto"
	"github.com/gin-gonic/gin"
)

type Router struct {
	r              *gin.Engine
	account_client *account.GRPC_Client
}

func NewRouter() *Router {
	r := gin.Default()
	account_client, err := account.NewGRPC_Client("127.0.0.1:50051")
	if err != nil {
		panic(err)
	}
	return &Router{
		r:              r,
		account_client: account_client,
	}
}

func (router *Router) InitRoutes(tokenService *jwt.TokenService) {
	apiGroup := router.r.Group("/api") // API group
	{
		// Check if the user is already authorized
		router.r.POST("/register", func(c *gin.Context) {
			check := c.Request.Header.Get("Authorization")
			if check != "" {
				if _, err := tokenService.ValidateToken(check); err != nil {
					c.JSON(401, gin.H{
						"error": "Unauthorized",
					})
					return
				} else {
					c.JSON(200, gin.H{
						"message": "Already authorized",
					})
					return
				}
			}

			user := &dto.User{}
			err := c.ShouldBindJSON(&user)
			if err != nil {
				c.JSON(400, gin.H{
					"error": "Invalid request",
				})
				return
			}

			// Call the account service to register the user
			resp, err := router.account_client.Register(user)
			if err != nil {
				c.JSON(500, gin.H{
					"error": "Failed to register user",
				})
				return
			}

			// Generate JWT token
			refresh_token, err := tokenService.GenerateRefreshToken(resp.GetUserId())
			if err != nil {
				c.JSON(500, gin.H{
					"error": "Failed to generate token",
				})
				return
			}

			c.SetCookie("refresh", refresh_token, 604800, "/", "localhost", false, true)
			c.Set("token", refresh_token)
			c.JSON(200, gin.H{
				"message": "User registered",
			})
		})

		router.r.POST("/login", func(c *gin.Context) {
			// Check if the user is already authorized
			check := c.Request.Header.Get("Authorization")
			if check != "" {
				if _, err := tokenService.ValidateToken(check); err != nil {
					c.JSON(401, gin.H{
						"error": "Unauthorized",
					})
					return
				} else {
					c.JSON(200, gin.H{
						"message": "Already authorized",
					})
					return
				}
			}

			user := &dto.User{}
			err := c.ShouldBindJSON(&user)
			if err != nil {
				c.JSON(400, gin.H{
					"error": "Invalid request",
				})
				return
			}
			// Call the account service to login the user
			resp, err := router.account_client.GetUserByEmail(user.Email)
			if err != nil {
				c.JSON(401, gin.H{
					"error": "Invalid credentials",
				})
				return
			}
			// Generate JWT token
			refresh_token, err := tokenService.GenerateRefreshToken(resp.GetUserId())
			if err != nil {
				c.JSON(500, gin.H{
					"error": "Failed to generate token",
				})
				return
			}

			c.SetCookie("refresh", refresh_token, 604800, "/", "localhost", false, true)
			c.Set("token", refresh_token)
			c.JSON(200, gin.H{
				"token": refresh_token,
			})
		})
	}
	apiGroup.Use(middleware.NewAuthMiddleware(tokenService).Authenticate())
}
