package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Notification struct {
	ID            primitive.ObjectID `json:"id" bson:"_id"` // bson:"_id,omitempty" is used to ignore the field when inserting a new document
	Owner_Id      string             `json:"owner_id" bson:"owner_id"`
	Receiver_Id   string             `json:"receiver_id" bson:"receiver_id"`
	Invitation_Id string             `json:"invitation_id" bson:"invitation_id"` // bson:"status,omitempty" is used to ignore the field when inserting a new document
	Noti_Id       string             `json:"noti_id" bson:"noti_id"`             // bson:"status,omitempty" is used to ignore the field when inserting a new document
	Status        int                `json:"status" bson:"status"`
	Project_Id    string             `json:"project_id" bson:"project_id"`
	Unread        bool               `json:"unread" bson:"unread"` // Unread is used to check if the project has unread messages
}
