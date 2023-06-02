# Management_qualite Documentation V1.0.0

## Description du projet
Management_qualite est un projet visant à établir une CI/CD à l'aide de Jenkins, SonarQube, Docker et Github.  
Celui-ci adopte une structure de type "monorepo" :  
    - La partie frontend du projet se situe dans le dossier mq-front ;  
    - La partie backend du projet se situe dans le dossier mq-back.

L'application frontend est réalisée en HTML / CSS / JavaScript.  
L'API de la partie backend est réalisée en JavaScript grâce au runtime NodeJS et à la librairie Fastify.

## Pré-requis
Afin de pouvoir lancer l'ensemble du projet, quelques pré-requis sont nécessaires :  
    - NodeJs doit être installé sur la machine : https://nodejs.org ;  
    - Puis, pnpm doit être installé sur la machine : `npm install -g pnpm` à partir d'un invité de commande.  

## Initialisation du projet
Afin de récupérer le projet sur votre machine, il est nécessaire de le cloner : `git clone https://github.com/CGuilhem/Management_qualite`  
Puis, déplacez-vous dans le dossier *mq-api* : `cd mq-back/mq-api`  
Ensuite, téléchargez les dépendances : `pnpm install`  

## Exécuter le projet
Le projet utilise des variables d'environnement, il sera donc nécessaire de créer un fichier *.env* afin de remplir les variables, en se basant sur le fichier *.env-template*  
Déplacez-vous dans le dossier *mq-api* : `cd mq-back/mq-api`  
Puis, lancez l'API,  : `pnpm run serve`  
Celle-ci s'exécutera par défaut  à l'adresse *http://0.0.0.0:8080*  
La documentation de l'api sera automatiquement disponible à l'adresse *http://0.0.0.0:8080/api/v1/docs*  
Vous pourrez ensuite accéder au site web en ouvrant le fichier index.html, à l'aide d'un navigateur, situé dans mq-front.

## Description de la CI/CD
Quand un commit est effectué sur la branche master, Jenkins vient automatiquement récupérer le contenu du repo afin d'entamer la pipeline de jobs.
Actuellement cette pipeline contient 3 stages :  
    - Tests, qui lance les différents tests du projet ;  
    - SonarQube Analysis, qui lance l'analyse SonarQube ;  
    - Deployment, qui déploie les différentes parties du projet.  

De manière visuelle, l'architecture de la CI/CD peut être décrite de la manière suivante :  
![image](https://github.com/CGuilhem/Management_qualite/assets/51739765/00278bc9-f253-4496-b2d0-08c36624b211)

## Plus de détails  
L'utilisation de SonarQube dans notre processus de développement nous permet de détecter les vulnérabilités potentielles présentes dans notre code, ce qui renforce la sécurité de notre site web. De plus, SonarQube nous aide à repérer les “code smells”, qui sont des signaux indiquant des problèmes de conception ou des pratiques de codage peu recommandées. En les identifiant tôt, nous sommes en mesure de prendre les mesures appropriées pour améliorer la qualité de notre code.
Dans une perspective de management de la qualité, l'utilisation de SonarQube nous permet d'évaluer objectivement la qualité de notre code et de suivre les améliorations au fil du temps. En identifiant les faiblesses du code, les vulnérabilités et les “anti-patrons”, nous pouvons mettre en place des actions correctives ciblées pour améliorer la qualité globale de notre logiciel.
  
## État de la solution actuelle V0.9.0
### Ce qui est fait

- API avec CRUD des utilisateurs fonctionnels ;  
- Backend fonctionnel ;  
- Interface Utilisateur avec listing des clients ;  
- Barre de recherche dynamique ;  
- Conteneur SonarQube établi avec détection de vulnérabilité et de failles ;  
- Conteneur Jenkins qui recoit automatiquement une notification lors d'un push afin de déployer les solutions ;  
- Conteneur PostgresSQL  qui contient notre base de données clients.  

### Ce qu'il reste à faire

- Création des clients au niveau de l'interface n'est pas encore fonctionnel ;  
- Gestion du déploiement par Jenkins ;  
- Add done ready  


