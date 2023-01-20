package apis

import (
	"myTODO-server/pkg/bl"
	"myTODO-server/pkg/core"
	"myTODO-server/pkg/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func NewTaskApis(server *core.Server) *echo.Group {
	api := server.Echo.Group("/api/v1/tasks")
	business := bl.NewTaskBusinessLogic(server)

	api.GET("/all", func(c echo.Context) error {
		result, _ := business.GetTasks()
		return c.JSON(http.StatusOK, result)
	})

	api.GET("/byProject/:id", func(c echo.Context) error {
		projectId := c.Param("id")
		result, _ := business.GetTaskByProject(projectId)
		return c.JSON(http.StatusOK, result)
	})

	api.GET("/:id", func(c echo.Context) error {
		taskId := c.Param("id")
		result, _ := business.GetTask(taskId)
		return c.JSON(http.StatusOK, result)
	})
	api.POST("", func(c echo.Context) error {
		task := models.Task{}
		err := c.Bind(&task)
		if err != nil {
			return err
		}
		err = business.CreateTask(&task)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, "Created successfully")
	})

	api.PUT("/:id", func(c echo.Context) error {
		taskId := c.Param("id")
		task := models.Task{}
		err := c.Bind(&task)
		if err != nil {
			return err
		}
		err = business.UpdateTask(&task, taskId)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, "Updated successfully")
	})

	api.PUT("/status/:id", func(c echo.Context) error {
		task := models.Task{}
		err := c.Bind(&task)
		if err != nil {
			return err
		}
		err = business.UpdateTaskstatus(&task)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, task)
	})

	api.DELETE("/:id", func(c echo.Context) error {
		taskId := c.Param("id")
		err := business.DeleteOneTask(taskId)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, "Deleted successfully")
	})

	api.DELETE("/byProject/:id", func(c echo.Context) error {
		projectId := c.Param("id")
		err := business.DeleteTaskByProject(projectId)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, "Deleted successfully")
	})

	return api
}
