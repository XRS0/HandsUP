PROTO_SRC = proto/summarizer.proto
PROTO_SUMM_OUT = ./summarize_service/interface/grpc
PROTO_STT_OUT = ./stt_service

buildsumm: genprotosumm build_summ

buildstt: genprotostt build_stt

buildauth: build_auth

runsumm: buildsumm run_summ

runstt: buildstt run_stt

runauth: buildauth run_auth

testauth: buildauth test_auth

run_summ:
	@./bin/summ

run_stt:
	@./bin/stt

build_auth:
	@cd auth && go build -o ../bin/auth cmd/main.go

build_summ:
	@cd summarize_service && go build -o ../bin/summ cmd/main.go

build_stt:
	@cd stt_service && go build -o ../bin/stt cmd/main.go

genprotosumm:
	@PATH="$(shell go env GOPATH)/bin:$$PATH" \
	protoc --go_out=$(PROTO_SUMM_OUT) --go-grpc_out=$(PROTO_SUMM_OUT) $(PROTO_SRC)

genprotostt:
	@PATH="$(shell go env GOPATH)/bin:$$PATH" \
	python -m grpc_tools.protoc -I./proto --python_out=$(PROTO_STT_OUT) --pyi_out=$(PROTO_STT_OUT) --grpc_python_out=$(PROTO_STT_OUT) $(PROTO_SRC)

test_auth:
	@cd auth && go test -v ./...


