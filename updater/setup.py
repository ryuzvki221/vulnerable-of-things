import asyncio
import schedule
from src.scheduler import check_and_send


# poetry run python setup.py
async def main():

    print("Démarrage du planificateur...")

    # Planifier l'exécution de la vérification toutes les heures
    schedule.every().hours.do(check_and_send)
    # schedule.every(6).seconds.do(print, "Hello")


    # Boucle pour exécuter les tâches planifiées
    while True:
        schedule.run_pending()
        await asyncio.sleep(6)  # Attendez 6 seconde avant de vérifier à nouveau la planification

if __name__ == "__main__":
    asyncio.run(main())