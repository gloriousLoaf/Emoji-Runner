module.exports = {
  development: {
    username: "root",
    password: "@Pilote123@",
    database: "emoji_dev",
    host: "localhost",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "@Pilote123@",
    database: "emoji",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};