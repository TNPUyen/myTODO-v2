package apis

import (
	"myTODO-server/pkg/bl"
	"myTODO-server/pkg/core"
	"myTODO-server/pkg/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func NewCommentApis(server *core.Server) *echo.Group {
	api := server.Echo.Group("/api/v1/tasks")
	business := bl.NewCommentBusinessLogic(server)

	api.GET("", func(c echo.Context) error {
		task_id := c.QueryParam("task_id")
		result, err := business.GetCommentByTask(task_id)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	})

	api.POST("", func(c echo.Context) error {
		comment := models.Comment{}
		err := c.Bind(&comment)
		if err != nil {
			return err
		}
		_, err = business.CreateComment(&comment)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, "Created comment")
	})

	api.PUT("/:id", func(c echo.Context) error {
		comment := models.Comment{}
		err := c.Bind(&comment)
		if err != nil {
			return err
		}
		_, err = business.UpdateComment(&comment)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, comment)
	})

	// delete comment
	api.DELETE("/:id", func(c echo.Context) error {
		id := c.Param("id")
		err := business.DeleteComment(id)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		}
		return c.JSON(http.StatusOK, "Deleted comment")
	})

	return api
}
