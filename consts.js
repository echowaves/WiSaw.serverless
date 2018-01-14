import Sequelize from 'sequelize'
// eslint-disable-next-line no-unused-vars
import pg from 'pg' // this is needed for initialization purpose, although we never user it directly
// eslint-disable-next-line no-unused-vars
import pgHstore from 'pg-hstore' // the same as above

const { Op } = Sequelize

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  // disable logging; default: console.log
  logging: false,
  operatorsAliases: Op, // use Sequelize.Op
})

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection to database has been established successfully.')
  })
  .catch(function (err) {
    console.error('Unable to connect to the database:', err);
  })

export default sequelize
