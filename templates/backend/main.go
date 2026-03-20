package main

import (
	"log"
	"net/http"

	"github.com/akdevsaha-dev/create-reactgo-app/backend/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "Hello from Go + Gin backend",
		})
	})
	v1 := router.Group("/api/v1")
	{
		routes.SetupHealthRoute(v1)
	}

	router.Run(":8000")
	if err := router.Run(":8000"); err != nil {
		log.Fatal("Failed to start server: ", err)
	}
}
