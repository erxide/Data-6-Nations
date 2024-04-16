import json
import asyncio
import recup_stats as rs


async def longueur_tab(data):
    res = []
    for année in data:
        res.append(len(data[année]))
    return res

async def plus_petite_année(data : list) -> str:
    return (data.index(min(data)) + 2000)

async def check(tab):
    return all(element == tab[0] for element in tab)

async def triage(data, année_plus_petite):
    res = {}
    for année in data:
        res[année] = []
        for stat in data[année]:
            if stat in data[année_plus_petite]:
                res[année].append(stat)
    return res



async def main():
    try :
        with open("listStatsBrut.json", "r") as f:
            data = json.load(f)
        while True :
            année_plus_petite = str(await plus_petite_année(await longueur_tab(data)))
            if await check(await longueur_tab(data)):
                print("Triage des stats effectuer !")
                with open('listStats.json', 'w') as f:
                    json.dump(data, f)
                break
            else:
                data = await triage(data, année_plus_petite)
                 
        
    except FileNotFoundError:
        await rs.main()
        await main()


if __name__ == "__main__":
    asyncio.run(main())