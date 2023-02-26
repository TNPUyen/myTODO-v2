package bl

import (
	"context"
	"myTODO-server/pkg/core"
	"myTODO-server/pkg/models"
	"net/http"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SubTaskBusinessLogic struct {
	server *core.Server
}

func NewSubTaskBusinessLogic(server *core.Server) *SubTaskBusinessLogic {
	return &SubTaskBusinessLogic{server: server}
}

func (bl SubTaskBusinessLogic) GetSubTasks() ([]*models.SubTask, error) {
	var subTasks []*models.SubTask
	subTaskList, err := bl.server.Db.Collection("subtasks").Find(context.Background(), bson.M{})
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	err = subTaskList.All(context.Background(), &subTasks)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return subTasks, nil
}

// get subtask by task id
func (bl SubTaskBusinessLogic) GetSubTaskByTask(taskID string) ([]*models.SubTask, error) {
	var subTasks []*models.SubTask
	res, err := bl.server.Db.Collection("subtasks").Find(context.Background(), bson.M{"task_id": taskID})
	if err != nil {
		return nil, err
	}
	err = res.All(context.Background(), &subTasks)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return subTasks, nil
}

// search subtask has word in name
func (bl SubTaskBusinessLogic) SearchSubTaskByName(name string) ([]*models.SubTask, error) {
	var subTasks []*models.SubTask
	res, err := bl.server.Db.Collection("subtasks").Find(context.Background(), bson.M{"name": primitive.Regex{Pattern: name, Options: "i"}})
	if err != nil {
		return nil, err
	}
	err = res.All(context.Background(), &subTasks)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return subTasks, nil
}

func (bl SubTaskBusinessLogic) CreateSubTask(subTask *models.SubTask) (*models.SubTask, error) {
	subTask.ID = primitive.NewObjectID()
	_, err := bl.server.Db.Collection("subtasks").InsertOne(context.Background(), subTask)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return subTask, nil
}

// update subtask
func (bl SubTaskBusinessLogic) UpdateSubTask(subTask *models.SubTask) (*models.SubTask, error) {
	_, err := bl.server.Db.Collection("subtasks").UpdateOne(context.Background(), bson.M{"subtask_id": subTask.SubTask_id}, bson.M{"$set": subTask})
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return subTask, nil
}

func (bl SubTaskBusinessLogic) DeleteSubTask(subTaskID string) error {
	// id, err := primitive.ObjectIDFromHex(subTaskID)
	// if err != nil {
	// 	return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	// }
	_, err := bl.server.Db.Collection("subtasks").DeleteOne(context.Background(), bson.M{"subtask_id": subTaskID})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}
