package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID          primitive.ObjectID `json:"id" bson:"_id"` // bson:"_id,omitempty" is used to ignore the field when inserting a new document
	Uid         string             `json:"uid" bson:"uid"`
	DisplayName string             `json:"displayName" bson:"displayName"`
	Email       string             `json:"email" bson:"email"`
	PhotoURL    string             `json:"photoURL" bson:"photoURL"`     // bson:"status,omitempty" is used to ignore the field when inserting a new document
	Created_at  int                `json:"created_at" bson:"created_at"` // bson:"created_at,omitempty" is used to ignore the field when inserting a new document
}
