# Car Management API

# Getting Started

Install semua node modules :

```sh
npm install
```

## Database Management

- `sequelize db:create` used to create a database
- `sequelize db:drop` used to deleting database
- `sequelize db:migrate` used to run latest migration
- `sequelize db:seed:all` used to do all the seeding
- `sequelize db:migrate:undo` used to cancel latest migration

Buat file `.env` dan samakan isinya seperti file [`.env-ex`](.env-ex), namun sesuaikan dengan local,

```sh
DB_USERNAME=postgres
DB_PASSWORD=qwerty12
DB_NAME=db_car_management
DB_HOST=127.0.0.1 
PORT=8081 
SUPERADMIN_PASSWORD=qwerty12
JWT_PRIVATE_KEY=binar
```

Run server dengan menjalankan script `dev` pada file `package.json` dengan : 

```sh
npm run dev
```

# Superadmin Data
Pada [`./db/seeders`](./db/seeders), terdapat file yang berisi data superadmin : 
```json
  {
    "email": "pointbreak766@gmail.com",
    "username": "pointbreak",
    "password": "qwerty12"
  }
```

# Open API Documentation
Endpoint `/api/v1/docs` untuk mengakses halaman dokumentasi Open API.