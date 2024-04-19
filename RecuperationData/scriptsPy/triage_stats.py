import json
import asyncio
import recup_stats as rs


def elever_stat_pas_en_commun(arr1, arr2):
    set1 = set(arr1)
    set2 = set(arr2)
    res = []
    common_elements = set1.intersection(set2)
    for a in common_elements:
        res.append(a)
    return res


async def main():
    try :
        with open("listStatsBrut.json", "r") as f:
            data = json.load(f)
        
        res = data["2000"]

        for année in data:
            res = elever_stat_pas_en_commun(res, data[année])
    
        with open('listStats.json', 'w') as f:
            json.dump({"stats":res}, f)
        
    except FileNotFoundError:
        await rs.main()
        await main()


if __name__ == "__main__":
    asyncio.run(main())