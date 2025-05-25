package models

import (
	"gorm.io/gorm"
)

type Message struct {
	ID        string         `gorm:"primaryKey" json:"id"`
	ChatID    string         `gorm:"index" json:"chat_id"`
	Payload   string         `json:"payload"`
	CreatedAt gorm.DeletedAt `gorm:"index" json:"created_at"`
}
