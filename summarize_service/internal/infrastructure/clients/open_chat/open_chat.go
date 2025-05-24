package open_chat

import (
	"context"
	"fmt"
	"log"

	"github.com/tmc/langchaingo/llms"
	"github.com/tmc/langchaingo/llms/ollama"
)

type OpenChatApi struct {
	llm *ollama.LLM
	ctx context.Context
}

func NewOpenChatApi() (*OpenChatApi, error) {
	llm, err := ollama.New(ollama.WithModel("openchat"))
	if err != nil {
		return nil, err
	}
	return &OpenChatApi{
		llm: llm,
		ctx: context.Background(),
	}, nil
}

func (oc *OpenChatApi) GenerateShortResponse(req string) error {
	return oc.generate("You must summarize input text shortly", req)
}

func (oc *OpenChatApi) GenerateNormalResponse(req string) error {
	return oc.generate("You must summarize the input text", req)
}

func (oc *OpenChatApi) GenerateFullResponse(req string) error {
	return oc.generate("You must write full summary", req)
}

func (oc *OpenChatApi) GenerateFullResponseWithOpts(req string, opts ...string) error {
	return oc.generate(fmt.Sprintf("You must write full summary with this parameters(%s)", opts), req)
}

func (oc *OpenChatApi) generate(prompt string, req string) error {
	content := []llms.MessageContent{
		llms.TextParts(llms.ChatMessageTypeSystem, prompt),
		llms.TextParts(llms.ChatMessageTypeHuman, req),
	}
	completion, err := oc.llm.GenerateContent(oc.ctx, content, llms.WithStreamingFunc(func(ctx context.Context, chunk []byte) error {
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
