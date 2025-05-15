package container

import (
	"summarize_service/infrastructure/open_chat"
	"summarize_service/usecase"
)

type AppContainer struct {
	LLM usecase.LLMService
}

func BuildContainer() (*AppContainer, error) {
	llm, err := open_chat.NewOpenChatApi()
	if err != nil {
		return nil, err
	}

	return &AppContainer{
		LLM: llm,
	}, nil
}
