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

type UserBusinessLogic struct {
	server *core.Server
}

// var todos []*models.Todo

func NewUserBusinessLogic(server *core.Server) *UserBusinessLogic {
	return &UserBusinessLogic{server: server}
}

func (bl UserBusinessLogic) GetAllUser() ([]*models.User, error) {
	var users []*models.User
	cursor, err := bl.server.Db.Collection("users").Find(context.Background(), bson.M{})
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	err = cursor.All(context.Background(), &users)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return users, nil
}

func (bl UserBusinessLogic) GetUser(uid string) (*models.User, error) {
	// uid, err := primitive.ObjectIDFromHex(userID)
	// if err != nil {
	// 	return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	// }
	res := bl.server.Db.Collection("users").FindOne(context.Background(), bson.M{"uid": uid})
	if res.Err() != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, res.Err().Error())
	}
	user := models.User{}
	res.Decode(&user)
	return &user, nil
}

func (bl UserBusinessLogic) GetUserByEmail(userEmail string) (*models.User, error) {
	res := bl.server.Db.Collection("users").FindOne(context.Background(), bson.M{"email": userEmail})
	if res.Err() != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, res.Err().Error())
	}
	user := models.User{}
	res.Decode(&user)
	return &user, nil
}

func (bl UserBusinessLogic) CreateUser(user *models.User) error {
	if user.DisplayName == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Username is required")
	}
	alreadyExist := bl.server.Db.Collection("users").FindOne(context.Background(), bson.M{"email": user.Email})
	if alreadyExist.Err() == nil {

		return echo.NewHTTPError(http.StatusBadRequest, "This user already exist")
	}
	user.ID = primitive.NewObjectID()
	user.Created_at = int(time.Now().Unix())
	_, err := bl.server.Db.Collection("users").InsertOne(context.Background(), user)
	return err
}

// func (bl UserBusinessLogic) UpdateUser(user *models.User) error {
// 	if user.UserName == "" {
// 		return echo.NewHTTPError(http.StatusBadRequest, "Username is required")
// 	}
// 	user.Updated_at = int(time.Now().Unix())
// 	_, err := bl.server.Db.Collection("users").UpdateOne(context.Background(), bson.M{"_id": user.ID}, bson.M{"$set": user})
// 	return err
// }
