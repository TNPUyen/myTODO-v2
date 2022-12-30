package apis

import (
	"myTODO-server/pkg/bl"
	"myTODO-server/pkg/core"
	"myTODO-server/pkg/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func NewTodoApis(server *core.Server) *echo.Group {
	api := server.Echo.Group("/api/v1/todos")
	business := bl.NewTodoBusinessLogic(server)
	api.GET("/all", func(c echo.Context) error {
		result, _ := business.GetTodos()
		return c.JSON(http.StatusOK, result)
	})
	api.GET("/:id", func(c echo.Context) error {
		todoId := c.Param("id")
		result, err := business.GetTodo(todoId)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, result)
	})
	api.POST("/", func(c echo.Context) error {
		todo := models.Todo{}
		err := c.Bind(&todo)
		if err != nil {
			return err
		}
		err = business.CreateTodo(&todo)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, todo)
	})
	api.PUT("/:id", func(c echo.Context) error {
		todo := models.Todo{}
		err := c.Bind(&todo)
		if err != nil {
			return err
		}
		err = business.UpdateTodo(&todo)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, todo)
	})
	api.PUT("/status/:id", func(c echo.Context) error {
		todo := models.Todo{}
		err := c.Bind(&todo)
		if err != nil {
			return err
		}
		err = business.UpdateTodoStatus(&todo)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, todo)
	})
	api.PUT("/statusAll/:checkAll", func(c echo.Context) error {
		checkAll := c.Param("checkAll")
		err := business.UpdateAllStatus(bool(checkAll == "true"))
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, "Updated")
	})
	api.DELETE("/:id", func(c echo.Context) error {
		todoId := c.Param("id")
		err := business.DeleteOneTodo(todoId)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, "Deleted")
	})
	// api.DELETE("/multi", func(c echo.Context) error {
	// 	todoId :=  json.NewDecoder(c.Request().Body).Decode(&todoId)
	// 	err := business.DeleteOneTodo(todoId)
	// 	if err != nil {
	// 		return err
	// 	}
	// 	return c.JSON(http.StatusOK, "Deleted")
	// })

	return api
}
