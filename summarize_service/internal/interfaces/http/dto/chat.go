package dto

type Chat map[string][]Message

type ChatPreview struct {
	Topic     string `json:"topic"`
	CreatedAt string `json:"created_at"`
}
