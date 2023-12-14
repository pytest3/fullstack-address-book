"use strict";
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
const config = require(__dirname + "/../../config/database.js")[env];
const db = {};

// imports environment variables from .env file and exposes them via the process.env object

let sequelize;

// create a new Sequelize instance to connect to sequelize
/* 
  new Sequelize constructor accepts the following:
  new Sequelize(
    database: string, 
    username: string, 
    password: string, 
    options: object) 
*/

if (process.env.DATABASE_URL) {
  // not sure why but DATABASE_URL is never used....
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,
    {
      host: process.env.HOST,
      dialect: process.env.DIALECT,
    }
  );
} else if (config.use_env_variable) {
  // check if config object has a use_env_variable property set
  // config object is set to production object as per lines 8 and 9 above
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    // passing params separately to connect to db
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
