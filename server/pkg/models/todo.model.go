package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// "net/http"
// "github.com/labstack/echo/v4"
// "strconv"

type Todo struct {
	ID         primitive.ObjectID `json:"id" bson:"_id"` // bson:"_id,omitempty" is used to ignore the field when inserting a new document
	Content    string             `json:"content" bson:"content"`
	Status     bool               `json:"status" bson:"status"`         // bson:"status,omitempty" is used to ignore the field when inserting a new document
	Created_at int                `json:"created_at" bson:"created_at"` // bson:"created_at,omitempty" is used to ignore the field when inserting a new document
	Updated_at int                `json:"updated_at" bson:"updated_at"` // bson:"updated_at,omitempty" is used to ignore the field when inserting a new document
}
