import json

class Gestion_data:
    def __init__(self):
        self.d= self.open_data("data")
        self.s = self.open_data("listStats")

    def open_data(self, a) -> json:
        try:
            with open(f"{a}.json", "r") as f:
                return json.load(f)
        except FileNotFoundError:
            print("no data")
            exit(1)

    def list_stats(self):
        return self.s
    
    def get_info_team(self, teamname, year: int = None, id : str = None):
        if not year and not id :
            return self.d[teamname]
        elif not year and id :
            res = {}
            for y in range(2000, 2025):
                res[str(y)] = self.d[teamname][str(y)][id]
            return res
        elif  year and not id :
            return self.d[teamname][str(year)]
        elif year and id :
            return { id : self.d[teamname][str(year)][id] }



data = Gestion_data()