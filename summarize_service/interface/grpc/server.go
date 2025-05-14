package grpc

import (
	"context"
	pb "summarize_service/interface/grpc/gen"
	"summarize_service/usecase"
)

type GRPCServer struct {
	pb.UnimplementedSummarizerServiceServer
	llm usecase.LLMService
}

func NewServer(llm usecase.LLMService) *GRPCServer {
	return &GRPCServer{llm: llm}
}

func (s *GRPCServer) GenerateFullSummary(ctx context.Context, req *pb.SummarizeRequest) (*pb.SummarizeResponse, error) {
	err := s.llm.GenerateFullResponse(req.GetInput())
	if err != nil {
		return nil, err
	}
	return &pb.SummarizeResponse{Result: "Summary streamed to stdout"}, nil
}

func (s *GRPCServer) GenerateNormalSummary(ctx context.Context, req *pb.SummarizeRequest) (*pb.SummarizeResponse, error) {
	err := s.llm.GenerateNormalResponse(req.GetInput())
	if err != nil {
		return nil, err
	}
	return &pb.SummarizeResponse{Result: "Summary streamed to stdout"}, nil
}

func (s *GRPCServer) GenerateShortSummary(ctx context.Context, req *pb.SummarizeRequest) (*pb.SummarizeResponse, error) {
	err := s.llm.GenerateShortResponse(req.GetInput())
	if err != nil {
		return nil, err
	}
	return &pb.SummarizeResponse{Result: "Summary streamed to stdout"}, nil
}
