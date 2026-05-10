from app.ai.model import load_data

data_map = load_data()

def predict(text):
    return data_map.get(text, "Tidak dikenali")