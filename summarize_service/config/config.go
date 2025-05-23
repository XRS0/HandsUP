package config

import (
	"log"

	"github.com/spf13/viper"
)

type Config struct {
	GRPCPort string `yaml:"grpcPort"`
}

func Init() *Config {
	var cfg Config
	viper.AddConfigPath("summarize_service/infrastructure/config/")
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	if err := viper.ReadInConfig(); err != nil {
		log.Fatal(err)
	}
	viper.Unmarshal(&cfg)
	return &cfg
}
