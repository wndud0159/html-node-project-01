const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    "development": {
        "username": "jyp",
        "password": process.env.DB_PASSWORD_LOCAL,
        "database": "jypdb",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "jyp",
        "password": process.env.DB_PASSWORD_LOCAL,
        "database": "jypdb",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": process.env.DB_PASSWORD_REMOTE,
        "database": "jypdb",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
