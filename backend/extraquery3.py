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
end_time = datetime(2021, 6, 30) 

# Converta start_time_str_str e end_time_str_str para o formato correto
start_time_str = start_time.strftime("%Y-%m-%d %H:%M:%S%z")
end_time_str = end_time.strftime("%Y-%m-%d %H:%M:%S%z")

def listar_vencedores_com_coroas_derrubadas(start_time_str, end_time_str, limite):
    pipeline = [
        # Filtrar as batalhas dentro do intervalo de tempo
        {"$match": {"battle_time": {"$gte": start_time_str, "$lte": end_time_str}}},
        
        # Agrupar por vencedor e somar o total de coroas derrubadas
        {"$group": {
            "_id": "$winner.deck",
            "total_coroas": {"$sum": "$winner.crowns"}  # Somar as coroas do vencedor
        }},
        
        # Ordenar por total de coroas derrubadas em ordem decrescente
        {"$sort": {"total_coroas": -1}},
        
        # Limitar o número de resultados
        {"$limit": limite}
    ]

    try:
        result = list(batalhas_collection.aggregate(pipeline))
        return result
    except Exception as e:
        print(f"Erro durante a execução da consulta: {e}")
        return []

# Exemplo de parâmetros
limite = 5  # Exibir os 5 vencedores com mais coroas derrubadas
vencedores_coroas = listar_vencedores_com_coroas_derrubadas(start_time_str, end_time_str, limite)

print("Vencedores com mais coroas derrubadas:")
for vencedor in vencedores_coroas:
    print(f"Jogador ID: {vencedor['_id']}, Total de Coroas Derrubadas: {vencedor['total_coroas']}")

