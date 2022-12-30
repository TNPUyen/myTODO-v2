package utils

import (
	"encoding/json"
	"os"
)

type Config struct {
	Host         string `json:"host"`
	Port         string `json:"port"`
	MongoURL     string `json:"mongo_url"`
	DatabaseName string `json:"database_name"`
	Bucket       string `json:"bucket"`
}

func LoadConfig(path string) (*Config, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var config Config
	if err := json.NewDecoder(file).Decode(&config); err != nil {
		return nil, err
	}
	return &config, nil
}
