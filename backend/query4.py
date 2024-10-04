from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime

# Dados para conexão
senha = input("Insira a senha do banco de dados: ")
uri = f"mongodb+srv://ioshuan:{senha}@cluster0.azdlm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Conexão com o banco de dados
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['clash_royale']
batalhas_collection = db['batalhas']

def calcular_vitorias_carta_com_condicoes(carta_id, trofeus_percentual, start_time, end_time):
    pipeline = [
        # Filtro de tempo da batalha
        {"$match": {"battle_time": {"$gte": start_time, "$lte": end_time}}},
        
        # Filtro para vitórias com a carta especificada no deck do vencedor
        {"$match": {"winner.deck": carta_id}},
        
        # Comparação de troféus, duração da partida e torres derrubadas
        {"$match": {
            "$expr": {
                "$and": [
                    # Verificar se o vencedor tem 'z%' menos troféus que o perdedor
                    {"$lt": [
                        "$winner.starting_trophies", 
                        {"$multiply": ["$loser.starting_trophies", (1 - trofeus_percentual / 100)]}
                    ]},
                    # Verificar se a duração da batalha foi menor que 2 minutos
                    {"$lt": [{"$subtract": ["$end_time", "$battle_time"]}, 120000]},  # Em milissegundos (2 minutos = 120000ms)
                    # Verificar se o perdedor derrubou pelo menos 2 torres (2 crowns)
                    {"$gte": ["$loser.crowns", 2]}
                ]
            }
        }}
    ]
    
    # Executar a consulta
    try:
        result = list(batalhas_collection.aggregate(pipeline))  # Usando aggregate corretamente
        return len(result)  # Contar as vitórias que atendem aos critérios
    except Exception as e:
        print(f"Erro durante a execução da consulta: {e}")
        return None

# Exemplo de parâmetros
carta_id = 28000008 # ID da carta
trofeus_percentual = 0.5
start_time = datetime(2021, 1, 1)
end_time = datetime(2021, 12, 31)

# Executar a consulta e exibir o resultado
vitorias = calcular_vitorias_carta_com_condicoes(carta_id, trofeus_percentual, start_time, end_time)
print(f"Vitórias com a carta {carta_id} em condições especiais: {vitorias}")
