🎥 Plateforme de Streaming Vidéo

Ce projet est une plateforme de streaming vidéo permettant aux utilisateurs de visionner des vidéos, de laisser des commentaires, de réagir avec des émojis, de partager des vidéos, et bien plus. Le projet intègre des fonctionnalités interactives et personnalisées pour améliorer l'expérience utilisateur.


🛠️ Technologies Utilisées

    Frontend : HTML, CSS, JavaScript
    Backend : Node.js avec Express.js
    Base de données : JSON (pour stockage temporaire des données)
    Socket.IO : Synchronisation en temps réel des interactions (likes, commentaires, réactions)

🚀 Fonctionnalités

    Système de likes : Les utilisateurs peuvent aimer des vidéos.
    Commentaires : Les utilisateurs peuvent laisser des commentaires sous les vidéos.
    Pseudos : Chaque commentaire est associé à un pseudo d'utilisateur.
    Réactions avec émojis : Les utilisateurs peuvent répondre aux commentaires avec des émojis (👍, ❤️, 😂).
    Compteur de vues : Chaque vidéo affiche le nombre total de vues.
    Téléchargements : Les utilisateurs peuvent télécharger des vidéos avec un compteur de téléchargements.
    Partage : Partage de vidéos en copiant un lien. Un compteur suit le nombre de partages.
    Mode sombre : Un mode sombre est disponible pour améliorer le confort visuel, notamment en conditions de faible luminosité.
    Défilement facile : Un bouton permet de remonter rapidement en haut ou de descendre en bas de la page.
    Signaler des vidéos ou commentaires : Les utilisateurs peuvent signaler du contenu inapproprié.


🖼️ Aperçu du Projet

    Interface utilisateur : Un design intuitif avec des boutons de réaction, des compteurs et une section de commentaires interactive.
    Mode sombre : Confort visuel amélioré avec un bouton d'activation du mode sombre.
    Défilement : Boutons pour monter et descendre rapidement dans la page.


🔧 Fonctionnalités Futures

    Ajout de comptes utilisateurs avec authentification.
    Amélioration des performances pour le téléchargement et la gestion des vidéos.
    Intégration d'une base de données pour une gestion plus efficace des vidéos et des utilisateurs.


⚙️ Installation
1. Installer Node.js et npm

Avant de commencer, vous devez installer Node.js et npm (Node Package Manager), qui sont essentiels pour exécuter l'application.
a. Installation de Node.js et npm sur Ubuntu

Ouvrez un terminal et exécutez les commandes suivantes pour installer Node.js :

bash

    sudo apt update
    sudo apt install nodejs npm

Vérifiez que Node.js et npm sont correctement installés :

bash

    node -v
    npm -v

Cela affichera les versions installées de Node.js et npm.

2. Installer les dépendances

Dans le dossier du projet, installez les dépendances nécessaires à l'aide de npm :
    npm install

3. Lancer le serveur
Une fois les dépendances installées, vous pouvez lancer le serveur en utilisant la commande suivante :
    node server.js

4. Accéder à l'application

Ouvrez un navigateur web et entrez l'URL suivante pour accéder à l'application :
    http://localhost:5000/
