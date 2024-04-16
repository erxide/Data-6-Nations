import asyncio
import json
import triage_stats as ts

équipes = ["France", "Italy", "England", "Wales", "Scotland", "Ireland"]


async def main():
    try:    
        with open("listStats.json", "r") as f1:
            liste_stats = json.load(f1)
        with open("DataBrut.json", "r") as f2:
            dataBrut = json.load(f2)
        data = {}
        for équipe in équipes:
            data[équipe] = {}
            for année in liste_stats:
                data[équipe][année] = {}
                for stat in liste_stats[année]:
                    for index in dataBrut["TeamStats"][année]["TopStatsTeam"]["Stat_Team"]:
                        if index["Name"] == stat:
                            for place in index["Team"]:
                                if place["Name"] == équipe:
                                    data[équipe][année][stat] = place["Value"]
        with open("data.json", "w") as f3:
            json.dump(data, f3)
        print("data.json creer avec succés !")
    except FileNotFoundError:
        await ts.main()
        await main()

if __name__ == "__main__":
    asyncio.run(main())