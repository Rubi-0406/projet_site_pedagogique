# Node 20 LTS (Next.js >=20 requiert Node 20)
FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install 

COPY . . 
# EXPOSE 3000

# Lancer Next.js en mode dev (ou prod)
CMD ["npm", "run", "dev"]
# CMD ["bash"]

