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

type CommentBusinessLogic struct {
	server *core.Server
}

func NewCommentBusinessLogic(server *core.Server) *CommentBusinessLogic {
	return &CommentBusinessLogic{server: server}
}

func (bl *CommentBusinessLogic) GetCommentByTask(taskID string) ([]*models.Comment, error) {
	var comments []*models.Comment
	res, err := bl.server.Db.Collection("comments").Find(context.Background(), bson.M{"task_id": taskID})
	if err != nil {
		return nil, err
	}
	err = res.All(context.Background(), &comments)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return comments, nil
}

func (bl *CommentBusinessLogic) CreateComment(comment *models.Comment) (*models.Comment, error) {
	comment.ID = primitive.NewObjectID()
	_, err := bl.server.Db.Collection("comments").InsertOne(context.Background(), comment)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return comment, nil
}

// update comment
func (bl *CommentBusinessLogic) UpdateComment(comment *models.Comment) (*models.Comment, error) {
	// id, err := primitive.ObjectIDFromHex(comment.ID.Hex())
	// if err != nil {
	// 	return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	// }
	_, err := bl.server.Db.Collection("comments").UpdateOne(context.Background(), bson.M{"comment_id": comment.Comment_id}, bson.M{"$set": comment})
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return comment, nil
}

func (bl *CommentBusinessLogic) DeleteComment(commentID string) error {
	id, err := primitive.ObjectIDFromHex(commentID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	_, err = bl.server.Db.Collection("comments").DeleteOne(context.Background(), bson.M{"comment_id": id})
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}
