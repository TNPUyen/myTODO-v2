package apis

import (
	"myTODO-server/pkg/bl"
	"myTODO-server/pkg/core"
	"myTODO-server/pkg/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func NewSubtaskAPI(server *core.Server) *echo.Group {
	api := server.Echo.Group("/api/v1/subtasks")
	business := bl.NewSubTaskBusinessLogic(server)

	api.GET("/byTask/:tid", func(c echo.Context) error {
		tid := c.Param("tid")
		result, err := business.GetSubTaskByTask(tid)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	})

	// api search subtask by name
	api.GET("/byName/:name", func(c echo.Context) error {
		name := c.Param("name")
		result, err := business.SearchSubTaskByName(name)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	})

	api.POST("", func(c echo.Context) error {
		subtask := models.SubTask{}
		err := c.Bind(&subtask)
		if err != nil {
			return err
		}
		_, err = business.CreateSubTask(&subtask)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, "Created subtask")
	})

	api.PUT("/:id", func(c echo.Context) error {
		subtask := models.SubTask{}
		err := c.Bind(&subtask)
		if err != nil {
			return err
		}
		_, err = business.UpdateSubTask(&subtask)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, subtask)
	})

	api.DELETE("/:id", func(c echo.Context) error {
		id := c.Param("id")
		err := business.DeleteSubTask(id)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, "Deleted subtask")
	})

	return api
}
