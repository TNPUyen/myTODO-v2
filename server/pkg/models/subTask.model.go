package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type SubTask struct {
	ID         primitive.ObjectID `json:"id" bson:"_id"` // bson:"_id,omitempty" is used to ignore the field when inserting a new document
	SubTask_id string             `json:"subTask_id" bson:"subTask_id"`
	Content    string             `json:"content" bson:"content"`
	Task_id    string             `json:"task_id" bson:"task_id"` // bson:"task_id,omitempty" is used to ignore the field when inserting a new document
	OwnerID    string             `json:"owner_id" bson:"owner_id"`
	Assignor   User               `json:"assignor" bson:"assignor"` // bson:"assignor,omitempty" is used to ignore the field when inserting a new document
	Asignee    []User             `json:"asignee" bson:"asignee"`
	Status     int                `json:"status" bson:"status"`
	Priority   int                `json:"priority" bson:"priority"`
	Label      string             `json:"label" bson:"label"`
	Disabled   bool               `json:"disabled" bson:"disabled"`
	Created_at int                `json:"created_at" bson:"created_at"`
	Updated_at int                `json:"updated_at" bson:"updated_at"`
	Deadline   int                `json:"deadline" bson:"deadline"`
}
