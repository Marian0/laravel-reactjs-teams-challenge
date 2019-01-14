# Laravel 5.7 + ReactJS Code Challenge

This repository is an implementation created by me for this code challenge.

## Requeriments

```
Create a REST API using the Laravel PHP framework to model sports teams and their players.

Also create a U/I to show functionality. It would be best if U/I is in VueJS.

Be sure to include the following elements:

- migration for adding the teams table

- migration for adding the players table

- seed script to fill the tables with some data

- API endpoint to add a team

- API endpoint to add a player

- API endpoint to update a player

- API endpoint to get a team and its players

- Bonus: authentication method so only trusted entities may call the APIs

Schema for teams table (you may add additional fields as needed):

- id

- name

- created_at

- updated_at

Schema for players table (you may add additional fields as needed):

- id

- first_name

- last_name

- created_at

- updated_at
```

## Backend Installation 

- clone the project and point to `backend` folder
- run `composer install`
- create a database and configure it on `.env` file. More information at Laravel docs.
- run `php artisan migrate`
- [optional] run database seeders `php artisan db:seed`


## Frontend Installation
- clone project and point to `frontend` folder 
- run `cp .env.default .env`. Edit this file and configure the variable `REACT_APP_API_HOST` with the host of the API (ending with slash)
- run `yarn/npm install`
- To login use `user@sample.com` and `secret` as password

## Author
- Created by Mariano Peyregne
- If you have any doubt, suggestion or comment feel free to contact me at: `marianosantafe@gmail.com`

