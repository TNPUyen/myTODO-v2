package apis

import (
	"encoding/json"
	"myTODO-server/pkg/bl"
	"myTODO-server/pkg/core"
	"myTODO-server/pkg/models"
	"net/http"

	"github.com/mitchellh/mapstructure"

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
		// get user from body request by echo
		json_map := make(map[string]interface{})
		err := json.NewDecoder(c.Request().Body).Decode(&json_map)

		if err != nil {
			return err
		}
		user := json_map["user"]
		var mapUser string
		mapstructure.Decode(user, &mapUser)
		if err != nil {
			panic(err)
		}
		todo := json_map["todo"]
		var mapTodo *models.Todo

		mapstructure.Decode(todo, &mapTodo)
		if err != nil {
			panic(err)
		}
		err = business.CreateTodo(mapTodo, mapUser)
		if err != nil {
			return err
		}
		return c.JSON(http.StatusOK, mapTodo)
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
