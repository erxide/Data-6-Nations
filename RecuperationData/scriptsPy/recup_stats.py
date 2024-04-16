import asyncio 
import recupDataBrut as RDB
import json

async def list_stats_année(data):
    res = []
    for stat in data:
        res.append(stat["Name"])
    return res

async def list_stats(data):
    res = {}
    for année in data["TeamStats"] :
        res[année] = await list_stats_année(data["TeamStats"][année]["TopStatsTeam"]["Stat_Team"])
    return res

async def main():
    try :
        with open("DataBrut.json", "r")as f:
            dataBrut = json.load(f)
        list_stats_toutes_années = await list_stats(dataBrut)
        with open("listStatsBrut.json", "w") as f:
            json.dump(list_stats_toutes_années, f)
        print("Récuperation des Stats non trier effectuer")
    except FileNotFoundError:
        await RDB.main()
        await main()

if __name__ == "__main__":
    asyncio.run(main())

#data["TeamStats"]["2000"]["TopStatsTeam"]["Stat_Team"][0]