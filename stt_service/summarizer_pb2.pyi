from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class CreateMessageRequest(_message.Message):
    __slots__ = ("token", "text", "topic")
    TOKEN_FIELD_NUMBER: _ClassVar[int]
    TEXT_FIELD_NUMBER: _ClassVar[int]
    TOPIC_FIELD_NUMBER: _ClassVar[int]
    token: str
    text: str
    topic: str
    def __init__(self, token: _Optional[str] = ..., text: _Optional[str] = ..., topic: _Optional[str] = ...) -> None: ...

class CreateMessageResponse(_message.Message):
    __slots__ = ("error",)
    ERROR_FIELD_NUMBER: _ClassVar[int]
    error: str
    def __init__(self, error: _Optional[str] = ...) -> None: ...
