package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Project struct {
	ID      primitive.ObjectID `json:"id" bson:"_id"` // bson:"_id,omitempty" is used to ignore the field when inserting a new document
	Name    string             `json:"name" bson:"name"`
	Owner   User               `json:"owner" bson:"owner"`
	Members []User             `json:"members" bson:"members"`
	// TodoList   []Todo             `json:"todoList" bson:"todoList"`
	Created_at int `json:"created_at" bson:"created_at"` // bson:"created_at,omitempty" is used to ignore the field when inserting a new document
	Updated_at int `json:"updated_at" bson:"updated_at"` // bson:"updated_at,omitempty" is used to ignore the field when inserting a new document
}
