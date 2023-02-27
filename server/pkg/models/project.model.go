package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Project struct {
	ID          primitive.ObjectID `json:"id" bson:"_id"`                // bson:"_id,omitempty" is used to ignore the field when inserting a new document
	Project_id  string             `json:"project_id" bson:"project_id"` // bson:"project_id,omitempty" is used to ignore the field when inserting a new document
	Name        string             `json:"name" bson:"name"`
	Description string             `json:"description" bson:"description"`
	Owner       string             `json:"owner" bson:"owner"`
	Members     []User             `json:"members" bson:"members"`
	Type        string             `json:"type" bson:"type"`             // public or private
	Disabled    bool               `json:"disabled" bson:"disabled"`     // Unread is used to check if the project has unread messages
	Created_at  int                `json:"created_at" bson:"created_at"` // bson:"created_at,omitempty" is used to ignore the field when inserting a new document
	Updated_at  int                `json:"updated_at" bson:"updated_at"` // bson:"updated_at,omitempty" is used to ignore the field when inserting a new document
	// TaskList   []Task             `json:"task_list" bson:"task_list"`
}
