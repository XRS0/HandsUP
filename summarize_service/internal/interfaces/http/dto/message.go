package dto

type Message struct {
	Text       string `json:"text"`
	UserPrompt string `json:"user_prompt"`
	FullNess   uint8  `json:"fullness"`
	Language   string `json:"lang"`
}

type ChatMessage struct {
	Text string `json:"text"`
	From bool   `json:"from"`
}
