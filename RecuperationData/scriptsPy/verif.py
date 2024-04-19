import json

with open("listStats.json", 'r') as f1: a = (json.load(f1))["stats"]

with open("listStatsBrut.json", 'r') as f2: data = json.load(f2)

for element in a:
    for year in data:
        if element not in data[year]:
            print(f"non frere il n'y a pas {element} en {year}")
