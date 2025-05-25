package models

import (
	"gorm.io/gorm"
)

type Message struct {
	ID        string         `gorm:"primaryKey" json:"id"`
	ChatID    string         `gorm:"index" json:"chat_id"`
	From      bool           `json:"from"`
	Text      string         `json:"text"`
	Prompt    string         `json:"prompt"`
	CreatedAt gorm.DeletedAt `gorm:"index" json:"created_at"`
}
