package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Task struct {
	ID          primitive.ObjectID `json:"id" bson:"_id"` // bson:"_id,omitempty" is used to ignore the field when inserting a new document
	Project_id  string             `json:"project_id" bson:"project_id"`
	Name        string             `json:"name" bson:"name"`
	Description string             `json:"description" bson:"description"`
	Task_id     string             `json:"task_id" bson:"task_id"`
	// Status: 0 - Not started, 1 - In progress, 2 -Completed
	Status     int    `json:"status" bson:"status"`
	Asignee    []User `json:"asignee" bson:"asignee"`
	Priority   int    `json:"priority" bson:"priority"`
	Label      string `json:"label" bson:"label"`
	Disabled   bool   `json:"disabled" bson:"disabled"`
	Created_at int    `json:"created_at" bson:"created_at"` // bson:"created_at,omitempty" is used to ignore the field when inserting a new document
	Updated_at int    `json:"updated_at" bson:"updated_at"` // bson:"updated_at,omitempty" is used to ignore the field when inserting a new document
	// Deadline 	int 				`json:"deadline" bson:"deadline"`
}
