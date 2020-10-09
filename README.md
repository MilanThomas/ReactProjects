# Projets React
___

## PokerReplayer

Lien vers la démo : [tmilan.fr/replayer](http://tmilan.fr/replayer/)

#### Description

Cette application web permet l'importation et la visualisation d'un historique des mains de poker d'un joueur. Les plateformes telles que PokerStars, Winamax, ... permettent d'exporter au format texte toutes les parties jouées par un utilisateur. Ce type d'outil est souvent utilisé par les joueurs réguliers dans un but d'amélioration de prise de décisions. Un exemple de main exportée est disponible à la fin de cette description.

Projet écrit à l'origine en Python & Django pour la partie back-end et en React & Redux pour la partie front-end. J'ai récemment retravaillé la partie front de ce projet afin de la présenter sur mon site personnel. J'ai commencé par réécrire la partie React en utilisant notamment les Hooks, puis j'ai ajouté de nouveaux éléments comme la gestion des jetons et des animations.

Encore en cours de développement, la version présentée ici est écrite uniquement en React. Bien que fonctionnelle, elle nécessite d'être optimisée pour que les animations soient fluides, y compris sur téléphone. Je travaille également à la mise à jour de la partie Redux afin de simplifier la communication entre les composants et d'améliorer l'organisation générale du projet.

<details>
<summary><b>Exemple de main exportée au format texte</b></summary>

```
Poker - Tournament buyIn: x.xx€ + x.xx€ level: 1 - HandId: #xxxxx - Holdem no limit (50/100) - xxxx/xx/xx xx:xx:xx UTC
Table: 'Table(xxxxx)#0' 3-max (real money) Seat #3 is the button
Seat 1: James (7700)
Seat 2: Teddy (22000)
Seat 3: Mike (18500)
*** ANTE/BLINDS ***
James posts small blind 50
Teddy posts big blind 100
Dealt to Mike [Ac 9c]
*** PRE-FLOP ***
Mike raises 500 to 600
James folds
Teddy calls 500
*** FLOP *** [As 9s 8c]
Teddy checks
Mike bets 1500
Teddy calls 1500
*** TURN *** [As 9s 8c][9h]
Teddy checks
Mike checks
*** RIVER *** [As 9s 8c 9h][3s]
Teddy bets 6000
Mike raises 10400 to 16400 and is all-in
Teddy calls 10400
*** SHOW DOWN ***
Teddy shows [Ad Ah] (Full of Aces and 9)
Mike shows [Ac 9c] (Full of 9 and aces)
Teddy collected 37050 from pot
*** SUMMARY ***
Total pot 37050 | No rake
Board: [As 9s 8c 9h 3s]
Seat 2: Teddy (big blind) showed [Ad Ah] and won 37050 with Full of Aces and 9
Seat 3: Mike (button) showed [Ac 9c] and lost with Full of 9 and aces
```
</details>

___

## SheetMeal

#### Description

Cette application mobile permet de visualiser sur une carte les restaurants à proximité d'une adresse saisie par l'utilisateur ou d'un partage de sa position. L'utilisateur peut alors sélectionner un restaurant et accéder aux informations nutritionnelles des différents plats proposés par le restaurant. Le but étant de proposer à l'utilisateur un repas adapté à son objectif calorique.

Souhaitant apprendre le développement mobile, j'ai suivi une formation en ligne sur React Native. J'ai choisi React Native car c'était une technologie multiplateforme récente et je pouvais mettre à profit mes connaissances en Javascript. Ce projet m'a permis de mettre en pratique la formation et de me familiariser avec les environnements React et Redux.