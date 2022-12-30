package core

import (
	"myTODO-server/pkg/utils"

	"go.mongodb.org/mongo-driver/mongo"

	firebase "firebase.google.com/go"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Server struct {
	Config   *utils.Config
	Echo     *echo.Echo
	Db       *mongo.Database
	Firebase *firebase.App
}

func NewServer(config *utils.Config, db *utils.Database, firebase *firebase.App) *Server {
	s := &Server{
		Config:   config,
		Echo:     echo.New(),
		Db:       db.Client.Database(config.DatabaseName),
		Firebase: firebase,
	}
	s.Echo.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))
	s.Echo.Use(middleware.Logger())
	s.Echo.Use(middleware.Recover())
	s.Echo.Static("/", "public")
	return s
}

func (s *Server) Start() {
	s.Echo.Logger.Fatal(s.Echo.Start(":3000"))
}
