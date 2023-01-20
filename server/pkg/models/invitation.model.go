package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Invitation struct {
	ID          primitive.ObjectID `json:"id" bson:"_id"` // bson:"_id,omitempty" is used to ignore the field when inserting a new document
	Owner_id    string             `json:"owner_id" bson:"owner_id"`
	Receiver_id string             `json:"receiver_id" bson:"receiver_id"`
	Status      int                `json:"status" bson:"status"` // bson:"status,omitempty" is used to ignore the field when inserting a new document
	Project     *ShortProject      `json:"project" bson:"project"`
}
