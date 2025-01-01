FROM python:3.10-slim as base

ENV PYTHONFAULTHANDLER=1 \
    PYTHONHASHSEED=random \
    PYTHONUNBUFFERED=1

WORKDIR /usr/src/app



# Installation de poetry
RUN curl -sSL https://install.python-poetry.org | python -

ENV PATH="${PATH}:/root/.poetry/bin"



# Copie du fichier pyproject.toml et de poetry.lock
COPY pyproject.toml poetry.lock ./

# Configure Poetry to create virtual environments within the project directory
RUN poetry config virtualenvs.create false

# Install project dependencies (excluding development dependencies)
RUN poetry install --no-dev

# Copie du reste des fichiers de l'application
COPY . .

# Commande pour exécuter l'application
CMD [ "poetry", "run", "python", "./setup.py" ]
