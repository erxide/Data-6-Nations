# Recuperation Data

le but du projet est de trouver un plage de donnée et la traité, nous avons pensé alors aux données liés a une competition sportive, comme le [Tournoi des 6 Nations](https://fr.wikipedia.org/wiki/Tournoi_des_Six_Nations). Il existe plusieurs sites web qui partages les statistique du tournoi, alors nous nous sommes dirigé vers le [site officiel](https://www.sixnationsrugby.com/en/m6n/stats/2024?tab=teams) de cette compétition. Pour ne pas nous perdre dans toutes les statistique, nous nous sommes concentrer sur celles des équipes et non des joueurs.

## Sommaire

- [Scrapping](README.md#scrapping)
- [Formatage des données](README.md#formatage-des-données)


## Scrapping 

En premier lieu nous avons voulu faire un get vers la page de statistiques, sauf qu'ils se sont proteger contre le scrapping et n' envois aucune informations. En inspectant la page au niveau de l'onglet Réseau, nous nous sommes aperçues que le site faisait une requette vers leur [api](https://stats-api.stadion.io/api/RU/competitions/topStats/seasontotal/301/2024) pour recuperer les informations, alors nous avons fais la meme chose. Avec ce [script](./scriptsPy/recupDataBrut.py) python j'extrais les informations de chaque statistques pour chaque année de 2000 à 2024 (car il n'xiste que ces années).

## Formatage des données

Avec toute ces données, je verifie que statisque existe bien pour chaque année, donc je recuperes chaques nom de statistique pour chaque années ([script](./scriptsPy/recup_stats.py)). Ensuite je regarde la longueur de chaque tableaux de statisque de chaque années pour supprimer les statistique des autres tableaux qui n'as pas dans le plus petit des tableaux. Et je refais cette méthodes jusqu'à avoir toutes les statistique bien présentes chaque année ([script](./scriptsPy/triage_stats.py)). 

Une fois qu'on est sur que chaque statistiques existent bien pour chaque années, on peut recuperer chaques valeurs de chaques statisques pour chacunes des équipes pour chaques années et creer le fichier data.json pour notre [api](../API/README.md) ([script](./scriptsPy/creation_data.py)).