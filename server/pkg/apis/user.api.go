package apis

import (
	"myTODO-server/pkg/bl"
	"myTODO-server/pkg/core"
	"myTODO-server/pkg/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func NewUserApis(server *core.Server) *echo.Group {
	api := server.Echo.Group("/api/v1/users")
	business := bl.NewUserBusinessLogic(server)
	api.GET("/all", func(c echo.Context) error {
		result, _ := business.GetAllUser()
		return c.JSON(http.StatusOK, result)
	})
	api.GET("/:id", func(c echo.Context) error {
		userID := c.Param("id")
		result, err := business.GetUser(userID)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	})
	api.GET("/byEmail", func(c echo.Context) error {
		userEmail := c.QueryParam("email")
		result, err := business.GetUserByEmail(userEmail)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	})
	api.POST("/login", func(c echo.Context) error {
		user := models.User{}
		err := c.Bind(&user)
		if err != nil {
			return err
		}
		err = business.CreateUser(&user)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, user)
	})

	return api
}
