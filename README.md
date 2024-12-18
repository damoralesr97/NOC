# Proyecto NOC

## dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
```
MAILER_SERVICE=gmail
MAILER_EMAIL=
MAILER_SECRET_KEY=
MONGO_URL=mongodb://dmorales:123456@localhost:27017
MONGO_DB_NAME=NOC
MONGO_USER=dmorales
MONGO_PASS=123456
```

### Obtener Gmail key
[Google AppPassword](https://myaccount.google.com/u/0/apppaswords)

3. Ejecutar el comando ```npm install```

4. Ejecutar ```npm run dev```