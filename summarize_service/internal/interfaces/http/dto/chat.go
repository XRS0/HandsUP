package dto

type Chat map[string][]ChatMessage

type ChatPreview struct {
	Topic     string `json:"topic"`
	CreatedAt string `json:"created_at"`
}
