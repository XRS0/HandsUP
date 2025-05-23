package config

import (
	"github.com/spf13/viper"
)

type Config struct {
	HTTP_PORT int    `mapstructure:"HTTP_PORT"`
	HTTP_HOST string `mapstructure:"HTTP_HOST"`
	GRPC_PORT int    `mapstructure:"GRPC_PORT"`
	GRPC_HOST string `mapstructure:"GRPC_HOST"`
	// Database
	DB_HOST     string `mapstructure:"DB_HOST"`
	DB_PORT     int    `mapstructure:"DB_PORT"`
	DB_USER     string `mapstructure:"DB_USER"`
	DB_PASSWORD string `mapstructure:"DB_PASSWORD"`
	DB_NAME     string `mapstructure:"DB_NAME"`
}

func NewConfig() *Config {
	return &Config{}
}

func (c *Config) Init() {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./config")
	if err := viper.ReadInConfig(); err != nil {
		panic(err)
	}
	if err := viper.Unmarshal(c); err != nil {
		panic(err)
	}
}
