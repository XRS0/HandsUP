package handlers

import (
	"log"

	"github.com/XRS0/HandsUp/account_service/internal/domain/ports/service"
	"github.com/XRS0/HandsUp/account_service/internal/infrastructure/clients/auth"
	pb "github.com/XRS0/HandsUp/account_service/internal/infrastructure/clients/auth/gen"
	"github.com/XRS0/HandsUp/account_service/internal/interfaces/http/dto"
	"github.com/gin-gonic/gin"
)

// GetUserHandler handles the GET request to retrieve a user by ID
func GetUserHandler(c *gin.Context, s service.UserService, authClient *auth.AuthClient) {
	// Extract the token from the URL parameters
	token := c.Param("token")
	if token == "" {
		c.JSON(400, gin.H{"error": "Token is required"})
		return
	}

	log.Println("Validating token:", token)
	resp, err := authClient.ValidateToken(&pb.ValidateTokenRequest{Token: token})
	if err != nil {
		log.Println("Failed to validate token:", err)
		c.JSON(500, gin.H{"error": "Failed to validate token"})
		return
	}

	user, err := s.GetUserByID(c, resp.UserId)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve user"})
		return
	}

	// Return the user as a JSON response
	c.JSON(200, dto.User{
		UserName: user.Name,
		Email:    user.Email,
	})
}
