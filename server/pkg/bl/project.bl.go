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

type ProjectBusinessLogic struct {
	server *core.Server
}

func NewProjectBusinessLogic(server *core.Server) *ProjectBusinessLogic {
	return &ProjectBusinessLogic{server: server}
}

func (bl ProjectBusinessLogic) GetProjects() ([]*models.Project, error) {
	var projects []*models.Project
	projectList, err := bl.server.Db.Collection("projects").Find(context.Background(), bson.M{})
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	err = projectList.All(context.Background(), &projects)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return projects, nil
}

func (bl ProjectBusinessLogic) GetProject(projectID string) (*models.Project, error) {
	// id, err := primitive.ObjectIDFromHex(projectID)
	// if err != nil {
	// 	return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	// }
	res := bl.server.Db.Collection("projects").FindOne(context.Background(), bson.M{"project_id": projectID})
	if res.Err() != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, res.Err().Error())
	}
	project := models.Project{}
	res.Decode(&project)
	return &project, nil
}

func (bl ProjectBusinessLogic) GetProjectByOwner(ownerID string) ([]*models.Project, error) {
	var projects []*models.Project
	res, err := bl.server.Db.Collection("projects").Find(context.Background(), bson.D{primitive.E{Key: "owner", Value: ownerID}, primitive.E{Key: "disabled", Value: false}})
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	err = res.All(context.Background(), &projects)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return projects, nil
}

func (bl ProjectBusinessLogic) GetProjectJoinedIn(uid string) ([]*models.Project, error) {
	var projects []*models.Project
	// filter := bson.D{{Key: "member", Value: bson.D{{Key: "uid", Value: uid}}}}
	filter := bson.M{"members": bson.M{"$elemMatch": bson.M{"uid": uid}}, "disabled": false}
	res, err := bl.server.Db.Collection("projects").Find(context.Background(), filter)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	err = res.All(context.Background(), &projects)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return projects, nil
}

func (bl ProjectBusinessLogic) CreateProject(project *models.Project) error {
	if project.Name == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Project name is required")
	}
	alreadyExist := bl.server.Db.Collection("projects").FindOne(context.Background(), bson.M{"name": project.Name})
	if alreadyExist.Err() == nil {
		return echo.NewHTTPError(http.StatusBadRequest, "This project Name is already exist")
	}
	project.ID = primitive.NewObjectID()
	_, err := bl.server.Db.Collection("projects").InsertOne(context.Background(), project)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return err
}

func (bl ProjectBusinessLogic) UpdateProject(project *models.Project) (*models.Project, error) {
	project.Updated_at = int(time.Now().Unix())
	// if project.Disabled {
	// 	return nil, echo.NewHTTPError(http.StatusBadRequest, "Project no longer exists")
	// }
	_, err := bl.server.Db.Collection("projects").UpdateOne(context.Background(), bson.M{"_id": project.ID}, bson.M{"$set": project})
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return project, nil
}

func (bl ProjectBusinessLogic) DeleteProject(projectID string) error {
	_, err := bl.server.Db.Collection("projects").DeleteOne(context.Background(), bson.M{"project_id": projectID})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}
