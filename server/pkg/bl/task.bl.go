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

type TaskBusinessLogic struct {
	server *core.Server
}

func NewTaskBusinessLogic(server *core.Server) *TaskBusinessLogic {
	return &TaskBusinessLogic{server: server}
}

func (bl TaskBusinessLogic) GetTasks() ([]*models.Task, error) {
	var Tasks []*models.Task
	TaskList, err := bl.server.Db.Collection("tasks").Find(context.Background(), bson.M{})
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	err = TaskList.All(context.Background(), &Tasks)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return Tasks, nil
}

func (bl TaskBusinessLogic) GetTask(TaskID string) (*models.Task, error) {
	// id, err := primitive.ObjectIDFromHex(TaskID)
	// if err != nil {
	// 	return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	// }
	res := bl.server.Db.Collection("tasks").FindOne(context.Background(), bson.M{"task_id": TaskID})
	if res.Err() != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, res.Err().Error())
	}
	Task := models.Task{}
	res.Decode(&Task)
	return &Task, nil
}

func (bl TaskBusinessLogic) GetTaskByProject(projectID string) ([]*models.Task, error) {
	var Tasks []*models.Task
	res, err := bl.server.Db.Collection("tasks").Find(context.Background(), bson.D{primitive.E{Key: "project_id", Value: projectID}})
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	err = res.All(context.Background(), &Tasks)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return Tasks, nil
}

// get task by 1 assignee in assignee array
func (bl TaskBusinessLogic) GetTaskByAssigneeInArray(assigneeID string) ([]*models.Task, error) {
	var Tasks []*models.Task
	res, err := bl.server.Db.Collection("tasks").Find(context.Background(), bson.D{primitive.E{Key: "asignee", Value: bson.D{primitive.E{Key: "$in", Value: []string{assigneeID}}}}})
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	err = res.All(context.Background(), &Tasks)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return Tasks, nil
}

// search task has word in name
func (bl TaskBusinessLogic) SearchTaskByName(name string) ([]*models.Task, error) {
	var Tasks []*models.Task
	res, err := bl.server.Db.Collection("tasks").Find(context.Background(), bson.D{primitive.E{Key: "name", Value: bson.D{primitive.E{Key: "$regex", Value: name}}}})
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	err = res.All(context.Background(), &Tasks)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return Tasks, nil
}

func (bl TaskBusinessLogic) CreateTask(Task *models.Task) error {
	if Task.Name == "" || Task.Description == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Title and Description is required")
	}
	Task.ID = primitive.NewObjectID()
	_, err := bl.server.Db.Collection("tasks").InsertOne(context.Background(), Task)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

func (bl TaskBusinessLogic) UpdateTask(updateTask *models.Task, taskID string) error {

	// oldTask, err := bl.GetTask(taskID)
	// if err != nil {
	// 	return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	// }
	// if updateTask.Name == "" || updateTask.Description == "" {
	// 	return echo.NewHTTPError(http.StatusBadRequest, "Title is required")
	// }
	// _, err = bl.server.Db.Collection("tasks").UpdateOne(context.Background(), bson.M{"task_id": oldTask.ID}, bson.M{"$set": bson.M{"name": updateTask.Name, "description": updateTask.Description, "asignee": updateTask.Asignee, "status": updateTask.Status, "updated_at": int(time.Now().Unix())}})
	// if err != nil {
	// 	return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	// }
	// return nil

	oldTask, err := bl.GetTask(taskID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	if updateTask.Name == "" || updateTask.Description == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Fill all the fields")
	}
	_, err = bl.server.Db.Collection("tasks").UpdateOne(context.Background(), bson.M{"_id": oldTask.ID}, bson.M{"$set": bson.M{"name": updateTask.Name, "description": updateTask.Description, "asignee": updateTask.Asignee, "status": updateTask.Status, "updated_at": int(time.Now().Unix())}})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return nil
}

func (bl TaskBusinessLogic) UpdateTaskstatus(newTask *models.Task) error {
	oldTask, err := bl.GetTask(newTask.Task_id)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	_, err = bl.server.Db.Collection("tasks").UpdateOne(context.Background(), bson.M{"task_id": oldTask.ID}, bson.M{"$set": bson.M{"status": newTask.Status, "updated_at": int(time.Now().Unix())}})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return nil
}

func (bl TaskBusinessLogic) DeleteOneTask(TaskID string) error {
	Task, err := bl.GetTask(TaskID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	id, err := primitive.ObjectIDFromHex(Task.ID.Hex())
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	_, err = bl.server.Db.Collection("tasks").DeleteOne(context.Background(), bson.M{"_id": id})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

func (bl TaskBusinessLogic) DeleteTaskByProject(projectID string) error {
	_, err := bl.server.Db.Collection("tasks").DeleteMany(context.Background(), bson.M{"project_id": projectID})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}
