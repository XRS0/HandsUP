package models

import "gorm.io/gorm"

type Chat struct {
	gorm.Model
	Topic    string    `gorm:"index"`
	Messages []Message `gorm:"foreignKey:ChatID" json:"messages"`
}
