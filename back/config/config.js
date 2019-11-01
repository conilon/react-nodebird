const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": process.env.USER_NAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "mysql",
    "timezone": '+09:00',
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.USER_NAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "mysql",
    "timezone": '+09:00',
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.USER_NAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "mysql",
    "timezone": '+09:00',
    "operatorsAliases": false
  }
}
