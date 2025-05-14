package container

import (
	"summarize_service/infrastructure/gemma"
	"summarize_service/usecase"
)

type AppContainer struct {
	LLM usecase.LLMService
	// другие зависимости
}

func BuildContainer() (*AppContainer, error) {
	llm, err := gemma.NewGemmaApi()
	if err != nil {
		return nil, err
	}

	return &AppContainer{
		LLM: llm,
	}, nil
}
