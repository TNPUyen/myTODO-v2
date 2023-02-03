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

type InvitationBusinessLogic struct {
	server *core.Server
}

func NewInvitationBusinessLogic(server *core.Server) *InvitationBusinessLogic {
	return &InvitationBusinessLogic{server: server}
}

func (bl *InvitationBusinessLogic) GetInvitationByUser(uid string) ([]*models.Invitation, error) {
	var invitations []*models.Invitation
	res, err := bl.server.Db.Collection("invitations").Find(context.Background(), bson.M{"receiver_id": uid})
	if err != nil {
		return nil, err
	}
	err = res.All(context.Background(), &invitations)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return invitations, nil
}

func (bl *InvitationBusinessLogic) GetInvitationByProject(pid string) ([]*models.Invitation, error) {
	var invitations []*models.Invitation
	res, err := bl.server.Db.Collection("invitations").Find(context.Background(), bson.M{"project_id": pid})
	if err != nil {
		return nil, err
	}
	err = res.All(context.Background(), &invitations)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return invitations, nil
}

func (bl *InvitationBusinessLogic) GetInvitation(invitationID string) (*models.Invitation, error) {
	var invitation *models.Invitation
	id, err := primitive.ObjectIDFromHex(invitationID)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	err = bl.server.Db.Collection("invitations").FindOne(context.Background(), bson.M{"_id": id}).Decode(&invitation)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return invitation, nil
}

func (bl *InvitationBusinessLogic) CreateInvitation(invitation *models.Invitation) error {
	alrInv, _ := bl.server.Db.Collection("invitations").Find(context.Background(), bson.D{primitive.E{Key: "receiver_id", Value: invitation.Receiver_id}, primitive.E{Key: "project_id", Value: invitation.Project_id}})
	if alrInv.Err() == nil {
		return echo.NewHTTPError(http.StatusBadRequest, "This user has already been invited to this project")
	}

	invitation.ID = primitive.NewObjectID()
	_, err := bl.server.Db.Collection("invitations").InsertOne(context.Background(), invitation)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

func (bl *InvitationBusinessLogic) UpdateInvitation(invitation *models.Invitation) error {
	_, err := bl.server.Db.Collection("invitations").UpdateOne(context.Background(), bson.M{"_id": invitation.ID}, bson.M{"$set": bson.M{
		"status": invitation.Status,
	},
	})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

func (bl *InvitationBusinessLogic) DeleteInvitation(invitationID string) error {
	Invitation, err := bl.GetInvitation(invitationID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	id, err := primitive.ObjectIDFromHex(Invitation.ID.Hex())
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	_, err = bl.server.Db.Collection("invitations").DeleteOne(context.Background(), bson.M{"_id": id})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}
