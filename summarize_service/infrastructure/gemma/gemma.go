package gemma

import (
	"context"
	"fmt"
	"log"

	"summarize_service/usecase"

	"github.com/tmc/langchaingo/llms"
	"github.com/tmc/langchaingo/llms/ollama"
)

type GemmaApi struct {
	llm *ollama.LLM
	ctx context.Context
}

func NewGemmaApi() (usecase.LLMService, error) {
	llm, err := ollama.New(ollama.WithModel("gemma3"))
	if err != nil {
		return nil, err
	}
	return &GemmaApi{
		llm: llm,
		ctx: context.Background(),
	}, nil
}

func (ga *GemmaApi) GenerateShortResponse(req string) error {
	return ga.generate("You must summarize input text shortly", req)
}

func (ga *GemmaApi) GenerateNormalResponse(req string) error {
	return ga.generate("You must summarize the input text", req)
}

func (ga *GemmaApi) GenerateFullResponse(req string) error {
	return ga.generate("You must write full summary", req)
}

func (ga *GemmaApi) generate(prompt string, req string) error {
	content := []llms.MessageContent{
		llms.TextParts(llms.ChatMessageTypeSystem, prompt),
		llms.TextParts(llms.ChatMessageTypeHuman, req),
	}
	completion, err := ga.llm.GenerateContent(ga.ctx, content, llms.WithStreamingFunc(func(ctx context.Context, chunk []byte) error {
		fmt.Print(string(chunk))
		return nil
	}))
	if err != nil {
		log.Printf("generation error: %v", err)
		return err
	}
	_ = completion
	return nil
}
