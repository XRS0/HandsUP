package services

import (
	"context"
	"fmt"

	"github.com/tmc/langchaingo/llms"
	"github.com/tmc/langchaingo/llms/ollama"
)

type OpenChatSummService struct {
	llm *ollama.LLM
	ctx context.Context
}

func NewOpenChatApi() (*OpenChatSummService, error) {
	llm, err := ollama.New(ollama.WithModel("openchat"))
	if err != nil {
		return nil, err
	}
	return &OpenChatSummService{
		llm: llm,
		ctx: context.Background(),
	}, nil
}

func (oc *OpenChatSummService) BuildPrompt(fullness uint8, text, userPrompt, lang string) ([]llms.MessageContent, error) {
	var fullnessPrompt string

	switch lang {
	case "ru":
		switch fullness {
		case 0:
			fullnessPrompt = "Сделай краткий конспект текста."
		case 1:
			fullnessPrompt = "Сделай нормальный по длине конспект текста."
		case 2:
			fullnessPrompt = "Сделай полный подробный конспект текста."
		default:
			fullnessPrompt = "Сделай конспект текста."
		}
	case "en":
		switch fullness {
		case 0:
			fullnessPrompt = "Create a short summary of the text."
		case 1:
			fullnessPrompt = "Create a standard-length summary of the text."
		case 2:
			fullnessPrompt = "Create a full, detailed summary of the text."
		default:
			fullnessPrompt = "Summarize the text."
		}
	default:
		return nil, fmt.Errorf("unsupported language: %s", lang)
	}

	finalPrompt := fullnessPrompt
	if userPrompt != "" {
		if lang == "ru" {
			finalPrompt += " Следуй указаниям: " + userPrompt
		} else {
			finalPrompt += " Follow these instructions: " + userPrompt
		}
	}

	return []llms.MessageContent{
		llms.TextParts(llms.ChatMessageTypeSystem, finalPrompt),
		llms.TextParts(llms.ChatMessageTypeHuman, text),
	}, nil
}

func (oc *OpenChatSummService) StreamGenerate(content []llms.MessageContent, onChunk func(chunk string)) error {
	_, err := oc.llm.GenerateContent(oc.ctx, content, llms.WithStreamingFunc(func(ctx context.Context, chunk []byte) error {
		onChunk(string(chunk))
		return nil
	}))
	return err
}
