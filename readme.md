# Projet Resa_Velo

## 1. Contexte de l'évaluation 

Module de formation JavaScript prefectionnement.  
  
L'objectif est de faire une application mono-page permettant de reserver un vélo.  
Nous avons à disposition l'API de JCDecaux.  
https://developer.jcdecaux.com/#/home  
  
Ce projet à été géré à deux avec Vanessa VERRIERE.


#### 1.1 Fonctionnalitées désirées :

- Faire un carousel avec un timer sur les slides (Vanessa)
- Gérer le carousel et les images avec un JSON (Vanessa)  
- Architecture HTML et gestion du CSS (Vanessa)
- Récupérer dynamiquement la liste des stations Vélo'V de la ville de Lyon grace à l'API JCD (Flo)
- Afficher les stations (ouvertes) sur la carte à l'aide de markers (Flo)
- Les markers des stations doivent permettrent d'obtenir les informations (vélos dispos, places dispos etc) (Flo)
- L'utilisateur peux reserver un vélo (si disponible) grace à un formulaire (Flo)
- les informations du formulaire sont enregistées en Session Storage (Flo)
- La réservation est valable 20 min, mise en place et affichage du timer (Flo)
- Inpossibilité de reserver si une réservation est en cours, possibilité d'annuler sa réservation (Flo)

#### 1.2 Contrainte technique : 

- Toute la page doit être gérée en Front
- Pas de langage back

## 2. Environnement technique

- HTML 5 / CSS 3
- JS Vanilla et JQuery
- LEAFLET / MAPBOX
- API JC Decaux
- Pas de Design Patern pour ce petit projet
- Initiation POO sur la partie Carte et Timer


## 3. Procédure de mise en place en local

- Cloner le fichier sur votre ordinateur avec  
  `git clone https://github.com/AnxionnazFlo/Projet_Resa_Velo`

- Créer une fichier .env à la racine du Projet

- Générer un token sur MapBox pour faire fonctionner la carte  
    https://docs.mapbox.com/help/getting-started/access-tokens/

- Ecrire votre token (dans le fichier .env) pour l'API MapBox sous la forme :  
 `const accessTokenMapBox = 'votre_token_ici'`

- Générer une clé API sur JCDecaux pour se connecter  
    https://developer.jcdecaux.com/#/signup  

- Ecrire votre clé (dans le fichier .env) pour l'API JCDecaux sous la forme :  
 `const apiKeyJCD = "votre_clé_ici"`  

- Ecrire le chemin vers carousel.json (dans le fichier .env) sous la forme :  
 `const listurl = "http://localhost/votre_chemin_ici/carousel.json";`  

- Démarrer un serveur local pour servir la page carousel.json 

- Tout devrais fonctionner à présent

#### Have fun



 



