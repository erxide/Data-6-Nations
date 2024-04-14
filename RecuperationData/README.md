# Recuperation Data

le but du projet est de trouver un plage de donnée et la traité, nous avons pensé alors aux données liés a une competition sportive, comme le [Tournoi des 6 Nations](https://fr.wikipedia.org/wiki/Tournoi_des_Six_Nations). Il existe plusieurs sites web qui partages les statisques du tournoi, alors nous nous sommes dirigé vers le [site officiel](https://www.sixnationsrugby.com/en/m6n/stats/2024?tab=teams) de cette compétition. Pour ne pas nous perdre dans toutes les statisques, nous nous sommes concentrer sur celles des équipes et non des joueurs.

## Sommaire

- [Scrapping](README.md#scrapping)


## Scrapping 

En premier lieu nous avons voulu faire un get vers la page de statistiques, sauf qu'ils se sont proteger contre le scrapping et n' envois aucune informations. En inspectant la page au niveau de l'onglet Réseau, nous nous sommes aperçues que le site faisait une requette vers leur [api](https://stats-api.stadion.io/api/RU/competitions/topStats/seasontotal/301/2024) pour recuperer les informations, alors nous avons fais la meme chose. Avec ce [script](./scriptsPy/recupDataBrut.py) python j'extrais les informations de chaque statistques pour chaque année de 2000 à 2024 (car il n'xiste que ces années).
