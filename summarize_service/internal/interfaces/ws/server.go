package ws

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/ports/service"
	"github.com/gorilla/websocket"
)

type Request struct {
	Text       string `json:"text"`
	Lang       string `json:"lang"`
	UserPrompt string `json:"userPrompt"`
	Fullness   uint8  `json:"fullness"`
}

type GeneratorWSHandler struct {
	Summarizer service.SummarizeService
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // ❗️В проде лучше ограничивать Origin
	},
}

func (h *GeneratorWSHandler) Handle(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Failed to upgrade to WebSocket: %v", err)
		http.Error(w, "WebSocket upgrade failed", http.StatusBadRequest)
		return
	}
	defer conn.Close()

	_, message, err := conn.ReadMessage()
	if err != nil {
		log.Printf("Failed to read message: %v", err)
		return
	}

	var req Request
	if err := json.Unmarshal(message, &req); err != nil {
		conn.WriteMessage(websocket.TextMessage, []byte("Invalid request format"))
		return
	}

	content, err := h.Summarizer.BuildPrompt(req.Fullness, req.Text, req.UserPrompt, req.Lang)
	if err != nil {
		conn.WriteMessage(websocket.TextMessage, []byte("Prompt error: "+err.Error()))
		return
	}

	// Потоковая генерация и отправка клиенту
	err = h.Summarizer.StreamGenerate(content, func(chunk string) {
		if err := conn.WriteMessage(websocket.TextMessage, []byte(chunk)); err != nil {
			log.Printf("WriteMessage error: %v", err)
		}
	})

	if err != nil {
		conn.WriteMessage(websocket.TextMessage, []byte("Generation error: "+err.Error()))
	}
}
