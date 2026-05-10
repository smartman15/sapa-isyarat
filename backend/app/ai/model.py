import pandas as pd

def load_data():
    df = pd.read_csv("app/ai/data.csv")
    return dict(zip(df["gesture"], df["text"]))