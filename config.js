const dotenv = require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3000,
  DB_NAME: process.env.DB_NAME,
  DB_PASS: process.env.DB_PASS,
  DB_URL: process.env.DB_URL,
  JWT_KEY: process.env.JWT_KEY,
};
