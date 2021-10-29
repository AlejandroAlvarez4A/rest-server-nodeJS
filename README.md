# Web Server + RestServer
Application rest server in Node.js

# Getting Started

## Installation
1. Clone this proyect locally
```sh
git clone https://github.com/Murphy96/rest-server-nodeJS.git
```
2. Install NPM packages
```sh
npm install
```
3. Run npm start in your bash / command line
```sh
node app
```

## Dev Dependencies
1. bcryptjs: ^2.4.3
2. cors: ^2.8.5
3. dotenv: "10.0.0
4. express: ^4.17.1
5. express-validator: ^6.12.2
6. jsonwebtoken: ^8.5.1
7. mongoose: ^6.0.1
## Features
This proyect includes:
* Rest server
* JWT

## .ENV
PORT=8082
MONGO_CNN=
SECRETPRIVATEKEY=
## Data Base
Configurate user and database in https://cloud.mongodb.com/ this web provides you and configure that environment MONGO_CNN 

### Documentation postman
https://documenter.getpostman.com/view/11793626/UV5f7E1M

### `GET /`
> http://localhost:8082/api/users
Returns users only 5 users in this format:
```json
{
    "total": 9,
    "users": [
        {
            "name": "test 3",
            "email": "test3@gmail.com",
            "role": "USER_ROLE",
            "state": true,
            "google": false,
            "uid": "xyz"
        },
        {
            "name": "test 4",
            "email": "test4@gmail.com",
            "role": "USER_ROLE",
            "state": true,
            "google": false,
            "uid": "xyz"
        },
        ...
    ]
}
```
### `GET /`
> http://localhost:8082/api/users?limit={number}&from={number}
Returns an object of users with limit={number} and from={number}
```json
{
    "total": 9,
    "users": [
        {
            "name": "test 11",
            "email": "test11@gmail.com",
            "role": "ADMIN_ROLE",
            "state": true,
            "google": false,
            "uid": "xyz"
        }
    ]
}

```
### `POST /`
> http://localhost:8082/api/users
Create new user and the body has the follow format
```json
{
    "name": "test 12",
    "email": "test12@gmail.com",
    "password": "123456",
    "role": "ADMIN_ROLE",
    "state": true,
    "google": false
}
```
### `POST /`
>http://localhost:8082/api/auth/login
The body has the following format
the user and password should exist
```json
{
    "email": "test10@gmail.com",
    "password": "123456"
}
```
return user and token if data will send is correct in the follow format
```json
{
    "user": {
        "name": "test 10",
        "email": "test10@gmail.com",
        "role": "ADMIN_ROLE",
        "state": true,
        "google": false,
        "uid": "xyz"
    },
    "token": "xyz"
}
```

### `PUT /`
> http://localhost:8082/api/users/{id}
Updated user with id and the body has the follow format:
```json
{
    "name": "test1",
    "email": "test1@gmail.com",
    "password": "1223456",
    "role": "USER_ROLE",
    "state": false,
    "google": false
}
```
### `DELETE /`
> http://localhost:8082/api/users/{id}
Delete user with id and the headers has the follow format
* Remember: token only available for 4 hours since it generated
* key = x-token value = "token" 
returns the user that you want to delete 
```json
{
    "name": "test 2",
    "email": "test2@gmail.com",
    "role": "USER_ROLE",
    "state": true,
    "google": false,
    "uid": "617ac72e7a069056cc1174f2"
}

```

## Credits
This project is thanks to the course of https://github.com/Klerith