# API

une fois fichier data.json bien formaté comme on le voulais, on peut en faire une api.

## Sommaire :

- [Lancer l'api](README.md#lancer-lapi)
- [Fonctionnement de l'api](README.md#fonctionnement-de-lapi)

## Lancer l'api

- une fois avoir clone le projet :

    ```bash
    git clone https://github.com/erxide/Data-6-Nations.git
    ```
- ce rendre a la racine de l'api :
    ```bash
    cd Data-6-Nations/API/api6nation/
    ```

- installer les dépendances :
    ```bash
    pip install -r requirements.txt
    ```

- faire la migration:
    ```bash
    python3 manage.py migrate
    ```
- pour finir lancer :
    ```bash
    python3 manage.py runserver
    ```

- pour changer le port d'écoute :
    ```bash
    python3 manage.py runserver <port>
    ```

## Fonctionnement de l'api

Les équipes disponnibles : France, Italy, England, Wales, Scotland, Ireland. Les statistiques vont de 2000 à 2024.

- recuperer toutes les statistiques d'une équipes sur toutes les années :
    ```
    http://localhost:8000/api/<Nom d'équipe>
    ```
- recuperer toutes les statistiques d'une équipes sur une année :
    ```
    http://localhost:8000/api/<Nom d'équipe>/<année>
    ```
- recuperer une statistiques d'une équipes sur toutes les années :
    ```
    http://localhost:8000/api/<Nom d'équipe>/<statisque>
    ```
- recuperer une statistiques d'une équipes sur une années :
    ```
    http://localhost:8000/api/<Nom d'équipe>/<année>/<statisque>
    ```

- recuperer liste des statisques :
    ```
    http://localhost:8000/api/stats/
    ```
