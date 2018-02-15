import { sequelize } from '../../../../config/consts'

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  let results = { photos: 'not found' }
  let rowids = {}
  let count = {}

  console.log('cleaning up old photos')
  // cleanup photos
  try {
    await sequelize.query('DELETE FROM "AbuseReports" where "createdAt" < NOW() - INTERVAL \'7 days\'')
    rowids = await sequelize.query('select id from (select id from "Photos" where "active" = true order by id desc  limit 75) as r order by id limit 1')
    if (rowids[0].length > 0) {
      results = await sequelize.query(`update "Photos" set "active" = false where "createdAt" < NOW() - INTERVAL '24 hours' and id < ${rowids[0][0].id} and "active" = true`)
    }
    count = await sequelize.query('select count(*) FROM "Photos"')
  } catch (err) {
    console.log('Unable to cleanup Photos', err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to cleanup Photos', err }),
    }
    callback(null, response)
    return
  }

  console.log('results: ', results)


  const rowid = rowids[0].length > 0 ? rowids[0][0].id : 0


  try {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        status: 'success',
        results,
        rowid,
        count,
      }),
    }
    callback(null, response)
  } catch (error) {
    console.log('error from calling API:', error.response.data)
    const response = {
      statusCode: 500,
      body: JSON.stringify(error.response.data),
    }
    callback(null, response)
  }
}
