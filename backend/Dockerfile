# Utiliser l'image officielle de node LTS Alpine
FROM node:lts-alpine3.18

# Créer le répertoire de l'application
WORKDIR /usr/src/backend

# Installation de pnpm
RUN npm install -g pnpm

# Copier les fichiers de dépendances
COPY package*.json pnpm-lock.yaml ./

# Installer les dépendances (utiliser pnpm)
RUN pnpm install

# Copier le code source de l'application
COPY . .

# Exposer le port de l'application
EXPOSE $APP_PORT

# Commande de démarrage de l'application
CMD [ "pnpm", "start" ]

