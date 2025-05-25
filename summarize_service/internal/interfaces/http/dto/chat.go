package dto

type Chat map[string]Message

type ChatPreview struct {
	Name string `json:"name"`
	Time string `json:"time"`
}
