package service

import "github.com/tmc/langchaingo/llms"

type SummarizeService interface {
	BuildPrompt(fullness uint8, text, prompt, lang string) ([]llms.MessageContent, error)
	StreamGenerate(content []llms.MessageContent, onChunk func(chunk string)) error
}
