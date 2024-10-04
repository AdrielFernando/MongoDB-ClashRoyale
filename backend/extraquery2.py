# imports
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime

# dados para conexão
senha = input("Insira a senha do banco de dados: ")
uri = f"mongodb+srv://ioshuan:{senha}@cluster0.azdlm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# conexão em sí
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['clash_royale']
batalhas_collection = db['batalhas']

start_time = datetime(2021, 1, 1)
end_time = datetime(2021, 12, 31)

# Converta start_time_str_str e end_time_str_str para o formato correto
start_time_str = start_time.strftime("%Y-%m-%d %H:%M:%S%z")
end_time_str = end_time.strftime("%Y-%m-%d %H:%M:%S%z")

def comparar_taxa_vitoria_cartas(carta1_id, carta2_id, start_time_str, end_time_str):
    # Taxa de vitória da Carta 1
    vitorias_carta1 = batalhas_collection.count_documents({
        "battle_time": {"$gte": start_time_str, "$lte": end_time_str},
        "winner.deck": carta1_id
    })
    
    total_batalhas_carta1 = batalhas_collection.count_documents({
        "battle_time": {"$gte": start_time_str, "$lte": end_time_str},
        "$or": [{"winner.deck": carta1_id}, {"loser.deck": carta1_id}]
    })
    
    # Taxa de vitória da Carta 2
    vitorias_carta2 = batalhas_collection.count_documents({
        "battle_time": {"$gte": start_time_str, "$lte": end_time_str},
        "winner.deck": carta2_id
    })
    
    total_batalhas_carta2 = batalhas_collection.count_documents({
        "battle_time": {"$gte": start_time_str, "$lte": end_time_str},
        "$or": [{"winner.deck": carta2_id}, {"loser.deck": carta2_id}]
    })
    
    # Calcular as taxas de vitória
    taxa_vitoria_carta1 = (vitorias_carta1 / total_batalhas_carta1) * 100 if total_batalhas_carta1 > 0 else 0
    taxa_vitoria_carta2 = (vitorias_carta2 / total_batalhas_carta2) * 100 if total_batalhas_carta2 > 0 else 0
    
    return {"carta1": round(taxa_vitoria_carta1), "carta2": round(taxa_vitoria_carta2)}

carta1_id = 26000003  # ID da Carta 1
carta2_id = 26000023  # ID da Carta 2

comparacao = comparar_taxa_vitoria_cartas(carta1_id, carta2_id, start_time_str, end_time_str)

print(f"Taxa de vitória da Carta 1 (ID {carta1_id}): {comparacao['carta1']}%")
print(f"Taxa de vitória da Carta 2 (ID {carta2_id}): {comparacao['carta2']}%")