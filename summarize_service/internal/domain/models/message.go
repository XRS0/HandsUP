package models

import "time"

type Message struct {
	ID        string    `gorm:"primaryKey" json:"id"`
	ChatID    string    `gorm:"index" json:"chat_id"`
	From      bool      `json:"from"`
	Text      string    `json:"text"`
	Prompt    string    `json:"prompt"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
}
