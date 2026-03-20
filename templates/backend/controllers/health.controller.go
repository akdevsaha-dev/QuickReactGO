package controllers

import (
	"net/http"

	"github.com/akdevsaha-dev/create-reactgo-app/backend/services"
	"github.com/gin-gonic/gin"
)

func HealthHandler(ctx *gin.Context) {
	status := services.GetHealthStatus()
	ctx.JSON(http.StatusOK, gin.H{
		"status": status,
	})
}
