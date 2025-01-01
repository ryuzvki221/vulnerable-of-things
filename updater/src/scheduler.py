import json
import requests
import logging
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta



# Charger les variables d'environnement à partir du fichier .env
load_dotenv()

api = os.getenv('API_URL')


# Configuration des logs
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Variable pour stocker la date du dernier lancement initialisée à la date actuelle
last_execution_date = datetime.now()

def send_post_request():
    global last_execution_date
    # Obtenir la date et l'heure actuelles au format ISO 8601
    current_time_iso = datetime.now().isoformat()
    # Construction de l'URL avec la date en paramètre
    url = f'{api}/update/{current_time_iso}'
    # Envoyer la requête POST
    response = requests.put(url)
    if response.status_code == 200:
        logging.info(f'Mise à jour à {current_time_iso}')
        # Mettre à jour la date du dernier lancement
        last_execution_date = datetime.now()
    else:
        # message 
        error_message = json.loads(response.text)
        logging.error(f"status {response.status_code} - {error_message.get('message')}")

def check_and_send():
    global last_execution_date
    # Vérifier si 2h se sont écoulées depuis le dernier lancement
    if datetime.now() - last_execution_date >= timedelta(hours=2):
        logging.info(f"Vérification en cours... Dernière exécution : {last_execution_date}")
        send_post_request()
    else:
        logging.info(f"Pas encore écoulé 2h. Dernière mise à jour à {last_execution_date}")


