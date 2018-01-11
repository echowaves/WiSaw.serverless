import Sequelize from 'sequelize'
import pg from 'pg' //this is needed for initialization purpose, although we never user it directly
import pg_hstore from 'pg-hstore' // the same as above


export var sequelize = new Sequelize(process.env.DATABASE_URL, {

  // disable logging; default: console.log
  logging: false
})

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection to database has been established successfully.')
  })
  .catch(function (err) {
    console.error('Unable to connect to the database:', err);
  })
