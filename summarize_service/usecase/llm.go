package usecase

type LLMService interface {
	GenerateShortResponse(req string) error
	GenerateNormalResponse(req string) error
	GenerateFullResponse(req string) error
}
