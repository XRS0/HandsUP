package ws

import (
	"fmt"
	"log"
	"net/http"

	"github.com/XRS0/HandsUp/summarize_service/internal/domain/models"
	"github.com/XRS0/HandsUp/summarize_service/internal/domain/ports/service"
	"github.com/XRS0/HandsUp/summarize_service/internal/infrastructure/clients/auth"
	"github.com/XRS0/HandsUp/summarize_service/internal/infrastructure/clients/auth/gen"
	"github.com/gorilla/websocket"
)

type GeneratorWSHandler struct {
	Summarizer service.SummarizeService
	ChatSvc    service.ChatService
	AuthClient *auth.AuthClient
}

func NewGeneratorWSHandler(ac *auth.AuthClient, cs service.ChatService, ss service.SummarizeService) *GeneratorWSHandler {
	return &GeneratorWSHandler{
		AuthClient: ac,
		ChatSvc:    cs,
		Summarizer: ss,
	}
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (h *GeneratorWSHandler) Handle(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("WebSocket upgrade failed: %v", err)
		http.Error(w, "WebSocket upgrade failed", http.StatusBadRequest)
		return
	}
	defer conn.Close()

	query := r.URL.Query()

	token := query.Get("token")
	if token == "" {
		conn.WriteMessage(websocket.TextMessage, []byte("Missing token"))
		return
	}

	resp, err := h.AuthClient.ValidateToken(&gen.ValidateTokenRequest{Token: token})
	if err != nil {
		conn.WriteMessage(websocket.TextMessage, []byte("Invalid token"))
		return
	}

	topic := query.Get("topic")
	text := query.Get("text")
	lang := query.Get("lang")
	userPrompt := query.Get("user_prompt")
	fullnessStr := query.Get("fullness")

	if topic == "" || text == "" || lang == "" || fullnessStr == "" {
		conn.WriteMessage(websocket.TextMessage, []byte("Missing required query parameters"))
		return
	}

	var fullness uint8
	_, err = fmt.Sscanf(fullnessStr, "%d", &fullness)
	if err != nil {
		conn.WriteMessage(websocket.TextMessage, []byte("Invalid fullness value"))
		return
	}

	chat, err := h.ChatSvc.GetChatByTopic(topic, resp.UserId)
	if err != nil {
		conn.WriteMessage(websocket.TextMessage, []byte("Failed to get chat: "+err.Error()))
		return
	}

	message := models.Message{
		Text: text,
		From: true,
	}

	_, err = h.ChatSvc.AddMessageToChat(chat.ID, &message)
	if err != nil {
		conn.WriteMessage(websocket.TextMessage, []byte("Failed to save message: "+err.Error()))
		return
	}

	content, err := h.Summarizer.BuildPrompt(fullness, text, userPrompt, lang)
	if err != nil {
		conn.WriteMessage(websocket.TextMessage, []byte("Prompt error: "+err.Error()))
		return
	}

	err = h.Summarizer.StreamGenerate(content, func(chunk string) {
		err := conn.WriteMessage(websocket.TextMessage, []byte(chunk))
		if err != nil {
			log.Printf("WebSocket write error: %v", err)
		}
	})

	if err != nil {
		conn.WriteMessage(websocket.TextMessage, []byte("Generation error: "+err.Error()))
	}
}
