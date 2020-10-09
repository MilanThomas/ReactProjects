# PokerReplayer

#### Structure du projet

- `src/Amount/` : montant de l'action effectuée par un joueur
- `src/Board/` : cartes communes au centre de la table
- `src/Card/` : affichage d'une carte en fonction sa couleur et de sa valeur 
- `src/Chips/` : jetons des joueurs, du montant ou du pot commun
- `src/Player/` : informations du joueur
- `src/Pot/` : pot commun 
- `src/Replayer/` : composant principal de l'application
- `src/Seat/` : emplacement autour de la table comprenant le joueur, ses jetons, le bouton, ...

#### Notes

- Utilisation de CSS Grid pour l'affichage de la table, des joueurs et des cartes
- Dimensions définies en `vw` pour simplifier le positionnement des éléments sur ordinateur ou smartphone
- Pas d'image ou de position absolute