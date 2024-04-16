import requests
import json
import asyncio
from tqdm import tqdm

async def recup_data_équipe_une_année(année: int = 2024) :
    rep = requests.get(f'https://stats-api.stadion.io/api/RU/competitions/topStats/seasontotal/301/{année}')
    if rep.status_code == 200 :
        return rep.json()
    else :
        return {"erreur" : "erreur de la requête"}

async def recup_data(prem_année : int = 2000, der_année: int = 2024):
        print(f"Recuperation des données de {prem_année} à {der_année}")
        der_année = der_année + 1
        data = {}
        total_years = der_année - prem_année
        with tqdm(total=total_years, desc="Progression", colour='green') as pbar:
            for année in range(2000, 2025):
                data[année] = await recup_data_équipe_une_année(année)
                pbar.update(1)
        return data

async def main():
    with open("DataBrut.json", "w") as f:
        json.dump({"TeamStats" : await recup_data()}, f)
    print("Recuperation des données effectué")

if __name__ == "__main__":
    asyncio.run(main())
