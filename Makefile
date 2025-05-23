PROTO_SUMM_SRC = proto/summarizer.proto
PROTO_AUTH_SRC = proto/auth.proto
PROTO_AUTH_OUT2 = ./account_service/internal/infrastructure/clients/auth
PROTO_ACC_OUT = ./account_service/internal/interfaces/grpc
PROTO_ACC_OUT2 = ./auth/internal/infrastructure/clients/account
PROTO_ACC_SRC = proto/account.proto
PROTO_SUMM_OUT = ./summarize_service/interfaces/grpc
PROTO_AUTH_OUT = ./auth/internal/interfaces/grpc
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

run_auth:
	./bin/auth

run_as:
	@cd account_service && go run cmd/main.go

build_auth:
	@cd auth && go build -o ../bin/auth cmd/main.go

build_summ:
	@cd summarize_service && go build -o ../bin/summ cmd/main.go

build_stt:
	@cd stt_service && go build -o ../bin/stt cmd/main.go

build_as:
	@cd account_service && go build -o ../bin/account_service cmd/main.go

genprotoauth:
	@PATH="$(shell go env GOPATH)/bin:$$PATH" \
	protoc --go_out=$(PROTO_AUTH_OUT) --go-grpc_out=$(PROTO_AUTH_OUT) $(PROTO_AUTH_SRC) && \
	protoc --go_out=$(PROTO_AUTH_OUT2) --go-grpc_out=$(PROTO_AUTH_OUT2) $(PROTO_AUTH_SRC)

genprotoaccount:
	@PATH="$(shell go env GOPATH)/bin:$$PATH" \
	protoc --go_out=$(PROTO_ACC_OUT) --go-grpc_out=$(PROTO_ACC_OUT) $(PROTO_ACC_SRC) && \
	protoc --go_out=$(PROTO_ACC_OUT2) --go-grpc_out=$(PROTO_ACC_OUT2) $(PROTO_ACC_SRC)

genprotosumm:
	@PATH="$(shell go env GOPATH)/bin:$$PATH" \
	protoc --go_out=$(PROTO_SUMM_OUT) --go-grpc_out=$(PROTO_SUMM_OUT) $(PROTO_SUMM_SRC)

genprotostt:
	@PATH="$(shell go env GOPATH)/bin:$$PATH" \
	python -m grpc_tools.protoc -I./proto --python_out=$(PROTO_STT_OUT) --pyi_out=$(PROTO_STT_OUT) --grpc_python_out=$(PROTO_STT_OUT) $(PROTO_SUMM_SRC)

test_auth:
	@cd auth && go test -v ./...


