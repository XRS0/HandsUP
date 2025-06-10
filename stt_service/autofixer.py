from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from huggingface_hub import login

login(token="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")

print("🧠 Загрузка модели автофикса...")
tokenizer = AutoTokenizer.from_pretrained("cointegrated/rut5-base-multitask")
model = AutoModelForSeq2SeqLM.from_pretrained("cointegrated/rut5-base-multitask")
print("✅ Модель загружена")

def model_autofix(text: str, max_length=128) -> str:
    """
    Исправление и переформулировка текста с помощью модели T5.
    """
    input_text = "summarize: " + text.strip()
    input_ids = tokenizer.encode(input_text, return_tensors="pt")

    output_ids = model.generate(input_ids, max_length=max_length, do_sample=False)
    decoded = tokenizer.decode(output_ids[0], skip_special_tokens=True)

    return decoded
