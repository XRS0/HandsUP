from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class SummarizeRequest(_message.Message):
    __slots__ = ("input",)
    INPUT_FIELD_NUMBER: _ClassVar[int]
    input: str
    def __init__(self, input: _Optional[str] = ...) -> None: ...

class SummarizeResponse(_message.Message):
    __slots__ = ("result",)
    RESULT_FIELD_NUMBER: _ClassVar[int]
    result: str
    def __init__(self, result: _Optional[str] = ...) -> None: ...
