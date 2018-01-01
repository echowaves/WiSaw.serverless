import moment from 'moment'
import Sequelize from 'sequelize'
// import {sequelize} from '../../../../consts'


export  async function main(event, context, callback) {

  console.log("cleaning up the photos")
  // cleanup photos
  var results = {"test": "test"}
  var rowids = {}
  var count = {}
  try {
    // await sequelize.query('DELETE FROM \"AbuseReports\" where \"createdAt\" < NOW() - INTERVAL \'7 days\'')
    // rowids = await sequelize.query('select id from (select id from \"Photos\" order by id desc  limit 75) as r order by id limit 1')
    // results = await sequelize.query('DELETE FROM \"Photos\" where \"createdAt\" < NOW() - INTERVAL \'24 hours\' and id < ' + rowids[0][0].id)
    // count = await sequelize.query('select count(*) FROM \"Photos\"')

  } catch(err) {
    console.log("Unable to cleanup Photos", err)
    response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to cleanup Photos', err})
    }
    callback(null, response)
    return
  }

  console.log("results: " , results)

  var response
  try {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        status: 'success',
        results//,
        // rowid: rowids[0][0].id,
        // count
      })

    }
    callback(null, response)

  } catch (error) {
    console.log("error from calling API:", error.response.data)
    response = {
      statusCode: 500,
      body: JSON.stringify(error.response.data)
    }
    callback(null, response)
  }
}
