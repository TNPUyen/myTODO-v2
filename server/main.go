package main

import (
	"myTODO-server/pkg/apis"
	"myTODO-server/pkg/core"
	"myTODO-server/pkg/utils"

	"context"

	firebase "firebase.google.com/go"
)

func main() {
	config, err := utils.LoadConfig("config.json")
	if err != nil {
		panic(err)
	}
	conf := &firebase.Config{
		StorageBucket: config.Bucket,
	}

	app, err := firebase.NewApp(context.Background(), conf)
	if err != nil {
		panic(err)
	}

	db := utils.NewDatabase(config)

	server := core.NewServer(config, db, app)
	_ = apis.NewTodoApis(server)
	_ = apis.NewTaskApis(server)
	_ = apis.NewUserApis(server)
	_ = apis.NewProjectApis(server)
	_ = apis.NewInvitationAPI(server)
	_ = apis.NewNotificationAPI(server)
	defer db.Client.Disconnect(context.TODO())
	server.Start()
}
