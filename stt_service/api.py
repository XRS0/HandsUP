import grpc
import summarizer_pb2 as pb2
import summarizer_pb2_grpc as pb2_grpc

def send_to_summarizer(text: str, topic: str = "default", token: str = ""):
    try:
        request = pb2.CreateMessageRequest(
            token=token,
            text=text,
            topic=topic
        )
        response = summarizer_stub.CreateMessage(request)
        if response.error:
            print(f"⚠️ Ошибка от summarizer сервиса: {response.error}")
        else:
            print(f"✅ Текст успешно отправлен в summarizer.")
    except grpc.RpcError as e:
        print(f"❌ gRPC ошибка при отправке текста: {e}")
