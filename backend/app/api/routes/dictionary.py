from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["Dictionary"])

dictionary_data = [
    {"gesture": "1", "meaning": "Halo"},
    {"gesture": "2", "meaning": "Terima Kasih"},
    {"gesture": "3", "meaning": "Tolong"},
    {"gesture": "4", "meaning": "Ya"},
    {"gesture": "5", "meaning": "Tidak"},
    {"gesture": "6", "meaning": "Saya"},
    {"gesture": "7", "meaning": "Makan"},
    {"gesture": "8", "meaning": "Minum"}
]

@router.get("/dictionary")
def get_dictionary():
    return dictionary_data