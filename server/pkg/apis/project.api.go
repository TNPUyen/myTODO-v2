package apis

import (
	"myTODO-server/pkg/bl"
	"myTODO-server/pkg/core"
	"myTODO-server/pkg/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func NewProjectApis(server *core.Server) *echo.Group {
	api := server.Echo.Group("/api/v1/projects")
	business := bl.NewProjectBusinessLogic(server)
	api.GET("/all", func(c echo.Context) error {
		result, err := business.GetProjects()
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	})
	api.GET("/:id", func(c echo.Context) error {
		projectId := c.Param("id")
		result, err := business.GetProject(projectId)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	})

	api.GET("/owner/:id", func(c echo.Context) error {
		ownerId := c.Param("id")
		result, err := business.GetProjectByOwner(ownerId)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	})

	api.GET("/joined/:id", func(c echo.Context) error {
		memberId := c.Param("id")
		result, err := business.GetProjectJoinedIn(memberId)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	})

	api.POST("", func(c echo.Context) error {
		project := models.Project{}
		err := c.Bind(&project)
		if err != nil {
			return err
		}
		err = business.CreateProject(&project)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, "Created successfully")
	})
	api.PUT("/:id", func(c echo.Context) error {
		project := models.Project{}
		err := c.Bind(&project)
		if err != nil {
			return err
		}
		_, err = business.UpdateProject(&project)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, "Updated successfully")
	})
	api.DELETE("/:id", func(c echo.Context) error {
		projectId := c.Param("id")
		err := business.DeleteProject(projectId)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, "Deleted successfully")
	})
	return api

}
