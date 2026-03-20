package routes

import (
	"github.com/akdevsaha-dev/create-reactgo-app/backend/controllers"
	"github.com/gin-gonic/gin"
)

func SetupHealthRoute(group *gin.RouterGroup) {
	group.GET("/health", controllers.HealthHandler)
}
