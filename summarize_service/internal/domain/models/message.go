package entity

import (
	"gorm.io/gorm"
)

type Message struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	ChatID    uint           `gorm:"index" json:"chat_id"`
	Payload   string         `json:"payload"`
	CreatedAt gorm.DeletedAt `gorm:"index" json:"created_at"`
}
