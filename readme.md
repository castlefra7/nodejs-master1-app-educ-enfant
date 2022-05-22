# nodejs-starter-code

## Features
- authentification with passportjs
- can register and login users
- user has roles
- connecting to MongoDB on https://cloud.mongodb.com/

## APIS
- POST /api/users/register
    - ```javascript {"name": "etu1","password": "1","email": "etu1@gmail.com"}```
- /api/users/login
    - ```javascript {"name": "etu1","password": "1"}```

## Environment variables to config
- DB_URL = mongodb+srv://root:<password>@cluster0.butom.mongodb.net/database_name?retryWrites=true&w=majority
- PORT = 3000
- JWT_SECRET = something_secret


## TO publish on heroku
- create an app on heroku and name it: `projetandroid`
- heroku git:remote -a projetandroid
- git push heroku main