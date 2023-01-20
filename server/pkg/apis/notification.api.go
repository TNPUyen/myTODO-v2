package apis

import (
	"myTODO-server/pkg/bl"
	"myTODO-server/pkg/core"
	"myTODO-server/pkg/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func NewNotificationAPI(server *core.Server) *echo.Group {
	api := server.Echo.Group("/api/v1/notifications")
	business := bl.NewNotificationBusinessLogic(server)

	api.GET("/byUser/:uid", func(c echo.Context) error {
		uid := c.Param("uid")
		result, err := business.GetNotificationByUser(uid)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	})

	api.POST("", func(c echo.Context) error {
		notification := models.Notification{}
		err := c.Bind(&notification)
		if err != nil {
			return err
		}

		err = business.CreateNotification(&notification)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, notification)
	})

	api.PUT("/:id", func(c echo.Context) error {
		notification := models.Notification{}
		err := c.Bind(&notification)
		if err != nil {
			return err
		}
		err = business.UpdateNotification(&notification)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, notification)
	})

	api.DELETE("/:id", func(c echo.Context) error {
		id := c.Param("id")
		err := business.DeleteNotification(id)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, id)
	})

	return api
}
