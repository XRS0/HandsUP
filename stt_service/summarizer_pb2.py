# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: summarizer.proto
# Protobuf Python Version: 5.29.0
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC,
    5,
    29,
    0,
    '',
    'summarizer.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x10summarizer.proto\x12\x03gen\"!\n\x10SummarizeRequest\x12\r\n\x05input\x18\x01 \x01(\t\"#\n\x11SummarizeResponse\x12\x0e\n\x06result\x18\x01 \x01(\t2R\n\x11SummarizerService\x12=\n\x0cGenerateFull\x12\x15.gen.SummarizeRequest\x1a\x16.gen.SummarizeResponseB\x07Z\x05./genb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'summarizer_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  _globals['DESCRIPTOR']._loaded_options = None
  _globals['DESCRIPTOR']._serialized_options = b'Z\005./gen'
  _globals['_SUMMARIZEREQUEST']._serialized_start=25
  _globals['_SUMMARIZEREQUEST']._serialized_end=58
  _globals['_SUMMARIZERESPONSE']._serialized_start=60
  _globals['_SUMMARIZERESPONSE']._serialized_end=95
  _globals['_SUMMARIZERSERVICE']._serialized_start=97
  _globals['_SUMMARIZERSERVICE']._serialized_end=179
# @@protoc_insertion_point(module_scope)
