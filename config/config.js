// will generate connection string for mongodb based on env variables
const generateDBConnectionURL = () => {
  return process.env.DB_CONNECTION + '://' +
    process.env.DB_HOST + ':' +
    process.env.DB_PORT + '/' +
    process.env.DB_DATABASE
}

module.exports = {
  appName: process.env.APP_NAME,
  port: process.env.APP_PORT,
  secret: process.env.SECRET,
  tokenLife: process.env.TOKEN_LIFE,
  dbUrl: generateDBConnectionURL()
}
