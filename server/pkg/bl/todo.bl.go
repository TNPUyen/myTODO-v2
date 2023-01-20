package bl

import (
	"context"
	"myTODO-server/pkg/core"
	"myTODO-server/pkg/models"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TodoBusinessLogic struct {
	server *core.Server
}

// var todos []*models.Todo

func NewTodoBusinessLogic(server *core.Server) *TodoBusinessLogic {
	return &TodoBusinessLogic{server: server}
}

func (bl TodoBusinessLogic) GetTodos() ([]*models.Todo, error) {
	var todos []*models.Todo
	todoList, err := bl.server.Db.Collection("todos").Find(context.Background(), bson.M{})
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	err = todoList.All(context.Background(), &todos)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return todos, nil
}

func (bl TodoBusinessLogic) GetTodo(todoID string) (*models.Todo, error) {
	// id, err := primitive.ObjectIDFromHex(todoID)
	// if err != nil {
	// 	return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	// }
	res := bl.server.Db.Collection("todos").FindOne(context.Background(), bson.M{"todo_id": todoID})
	if res.Err() != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, res.Err().Error())
	}
	todo := models.Todo{}
	res.Decode(&todo)
	return &todo, nil
}

func (bl TodoBusinessLogic) GetTodoByOwner(ownerID string) ([]*models.Todo, error) {
	// id, err := primitive.ObjectIDFromHex(ownerID)
	// if err != nil {
	// 	return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	// }
	var todos []*models.Todo
	res, err := bl.server.Db.Collection("todos").Find(context.Background(), bson.D{primitive.E{Key: "owner_id", Value: ownerID}})
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	err = res.All(context.Background(), &todos)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return todos, nil
}

func (bl TodoBusinessLogic) CreateTodo(todo *models.Todo, ownerID string) error {
	if todo.Content == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Title is required")
	}
	todo.ID = primitive.NewObjectID()
	todo.Created_at = int(time.Now().Unix())
	todo.Updated_at = int(time.Now().Unix())
	todo.Status = false
	todo.OwnerID = ownerID
	// _, err := bl.server.Db.Collection("user").UpdateByID(context.Background(), ownerID, bson.M{"$push": bson.M{"todos": todo.ID}})
	// if err != nil {
	// 	return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	// }
	_, err := bl.server.Db.Collection("todos").InsertOne(context.Background(), todo)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

func (bl TodoBusinessLogic) UpdateTodo(newTodo *models.Todo) error {
	// oldTodo, err := bl.GetTodo(newTodo.ID.Hex())
	// if err != nil {
	// 	return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	// }
	if newTodo.Content == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Title is required")
	}
	_, err := bl.server.Db.Collection("todos").UpdateOne(context.Background(), bson.M{"todo_id": newTodo.Todo_id}, bson.M{"$set": bson.M{"content": newTodo.Content, "updated_at": int(time.Now().Unix())}})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return nil
}

func (bl TodoBusinessLogic) UpdateTodoStatus(newTodo *models.Todo) error {
	// oldTodo, err := bl.GetTodo(newTodo.ID.Hex())
	// if err != nil {
	// 	return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	// }
	_, err := bl.server.Db.Collection("todos").UpdateOne(context.Background(), bson.M{"todo_id": newTodo.Todo_id}, bson.M{"$set": bson.M{"status": newTodo.Status, "updated_at": int(time.Now().Unix())}})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return nil
}

func (bl TodoBusinessLogic) UpdateAllStatus(isCheckAll bool) error {
	todos, err := bl.GetTodos()
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	if isCheckAll {
		for _, todo := range todos {
			_, err = bl.server.Db.Collection("todos").UpdateOne(context.Background(), bson.M{"_id": todo.ID}, bson.M{"$set": bson.M{"status": true, "updated_at": int(time.Now().Unix())}})
			if err != nil {
				return echo.NewHTTPError(http.StatusBadRequest, err.Error())
			}
		}
	} else {
		for _, todo := range todos {
			_, err = bl.server.Db.Collection("todos").UpdateOne(context.Background(), bson.M{"_id": todo.ID}, bson.M{"$set": bson.M{"status": false, "updated_at": int(time.Now().Unix())}})
			if err != nil {
				return echo.NewHTTPError(http.StatusBadRequest, err.Error())
			}
		}
	}

	return nil
}

func (bl TodoBusinessLogic) DeleteOneTodo(todoID string) error {
	todo, err := bl.GetTodo(todoID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	// id, err := primitive.ObjectIDFromHex(todo.ID.Hex())
	// if err != nil {
	// 	return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	// }
	_, err = bl.server.Db.Collection("todos").DeleteOne(context.Background(), bson.M{"todo_id": todo.Todo_id})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

func (bl TodoBusinessLogic) DeleteMultiTodos(todosID []string) error {
	for _, id := range todosID {
		todo, err := bl.GetTodo(id)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		}
		// id, err := primitive.ObjectIDFromHex(todo.ID.Hex())
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		}
		_, err = bl.server.Db.Collection("todos").DeleteOne(context.Background(), bson.M{"todo_id": todo.Todo_id})
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		}
	}
	return nil
}
