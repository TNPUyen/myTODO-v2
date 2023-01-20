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

type NotificationBusinessLogic struct {
	server *core.Server
}

func NewNotificationBusinessLogic(server *core.Server) *NotificationBusinessLogic {
	return &NotificationBusinessLogic{server: server}
}

func (bl *NotificationBusinessLogic) GetNotificationByUser(uid string) ([]*models.Notification, error) {
	var notifications []*models.Notification
	res, err := bl.server.Db.Collection("notifications").Find(context.Background(), bson.M{"receiver_id": uid})
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	err = res.All(context.Background(), &notifications)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return notifications, nil
}

func (bl *NotificationBusinessLogic) CreateNotification(notification *models.Notification) error {
	notification.ID = primitive.NewObjectID()
	_, err := bl.server.Db.Collection("notifications").InsertOne(context.Background(), notification)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

func (bl *NotificationBusinessLogic) UpdateNotification(notification *models.Notification) error {
	_, err := bl.server.Db.Collection("notifications").UpdateOne(context.Background(), bson.M{"_id": notification.ID}, bson.M{"$set": bson.M{
		"status": notification.Status,
	},
	})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

func (bl *NotificationBusinessLogic) DeleteNotification(id string) error {
	_, err := bl.server.Db.Collection("notifications").DeleteOne(context.Background(), bson.M{"_id": id})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}
