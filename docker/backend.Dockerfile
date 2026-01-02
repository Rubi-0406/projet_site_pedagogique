# Utiliser Python 3.12
FROM ghcr.io/astral-sh/uv:0.9.21-python3.13-trixie

WORKDIR /app

# Copier le backend
COPY . .

# Installer dépendances via uv
RUN uv sync --frozen

# Exposer le port Django
EXPOSE 8000

# Lancer le serveur Django
CMD ["uv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
