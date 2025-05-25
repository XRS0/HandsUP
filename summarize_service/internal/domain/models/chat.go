package models

import "time"

type Chat struct {
	ID        string    `gorm:"primaryKey" json:"id"`
	UserID    string    `gorm:"index" json:"user_id"`
	Topic     string    `gorm:"index"`
	Messages  []Message `gorm:"foreignKey:ChatID" json:"messages"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
}
