# Recuperation Data

Le but du projet est de trouver une plage de donnée et la traiter, nous avons pensé alors aux données liées à une compétition sportive, comme le [Tournoi des 6 Nations](https://fr.wikipedia.org/wiki/Tournoi_des_Six_Nations). Il existe plusieurs sites web qui partage les statistiques du tournoi, alors nous nous sommes dirigés vers le [site officiel](https://www.sixnationsrugby.com/en/m6n/stats/2024?tab=teams) de cette compétition. Pour ne pas nous perdre dans toutes les statistiques, nous nous sommes concentrés sur celles des équipes et non des joueurs.

## Sommaire

- [Scrapping](README.md#scrapping)
- [Formatage des données](README.md#formatage-des-données)


## Scrapping 

En premier lieu, nous avons voulu faire un get vers la page de statistiques, sauf qu'ils se sont protegés contre le scrapping et n'envois aucune information. En inspectant la page au niveau de l'onglet Réseau, nous nous sommes aperçus que le site faisait une requête vers leur [api](https://stats-api.stadion.io/api/RU/competitions/topStats/seasontotal/301/2023) pour récupérer les informations, alors nous avons fait la même chose. Avec ce [script](./scriptsPy/recupDataBrut.py) python, j'extrais les informations de chaque statistque pour chaque année de 2000 à 2023.

## Formatage des données

Avec toute ces données, je vérifie que chaque statistique existe bien pour chaque année, donc je récupère chaque nom de statistique pour chaque année ([script](./scriptsPy/recup_stats.py)). Ensuite, je regarde la longueur de chaque tableau de statistique de chaque année pour supprimer les statistiques des autres tableaux qui n'ont pas dans le plus petit des tableaux. Et je refais cette méthode jusqu'à avoir toutes les statistiques bien présentes chaque année ([script](./scriptsPy/triage_stats.py)). 

Une fois qu'on est sûr que chaque statistique existe bien pour chaque année, on peut récupérer chaque valeur de chaque statistique pour chacune des équipes pour chaque année et créer le fichier data.json pour notre [api](../API/README.md) ([script](./scriptsPy/creation_data.py)).