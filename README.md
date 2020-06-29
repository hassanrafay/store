# Store

Test task for NodeJS Developer's role at Disxt.

## Start the App

In order to start the application: first clone the project locally and renamed the file `.env.example` to `.env` then run the following command.


```bash
docker-compose up
```

The above command will spin up two containers using the `docker-compose.yml` file. 

## Credentials 
Make a get request to the URL `http://localhost:3000/users/populate` to create one admin and one client user. As there are two types of users in the system, the login credentials for both types of users are given below
#### For Admin
- username = rafayadmin
- password = password
#### For Client
- username = rafayclient
- password = password

## Logout Endpoint

There is no logout endpoint as JWT is stateless and you can't destroy the JWT token until it expires on its own by reaching its time limit. The only way to logout without maintaining record of tokens on the server-side is to delete the token on the client-side. You can improve the security of the application by setting an adequate expiry time on tokens.

One way to implement logout is to maintain DB records of tokens on logout. On log out, you can blacklist the token and on every request check the token against blacklisted tokens.