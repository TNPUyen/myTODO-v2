package models

type ShortProject struct {
	Project_id  string `json:"project_id" bson:"project_id"` // bson:"project_id,omitempty" is used to ignore the field when inserting a new document
	Name        string `json:"name" bson:"name"`
	Description string `json:"description" bson:"description"`
	Owner       string `json:"owner" bson:"owner"`
}
