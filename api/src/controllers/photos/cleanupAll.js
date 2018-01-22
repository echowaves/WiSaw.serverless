import { sequelize } from '../../../../config/consts'

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  if (process.env.STAGE !== 'test') {
    const response = {
      statusCode: 403,
      body: JSON.stringify({
        status: 'Forbidden',
      }),
    }
    callback(null, response)
    return false
  }

  console.log('cleaning up old photos')
  // cleanup photos
  try {
    await sequelize.query('DELETE FROM "Photos"')
    await sequelize.query('DELETE FROM "ContactForms"')
    await sequelize.query('DELETE FROM "AbuseReports"')
  } catch (err) {
    console.log('Unable to cleanup Photos', err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to cleanup Photos', err }),
    }
    callback(null, response)
    return false
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify({ status: 'Database reset to blank slate' }),
  }
  callback(null, response)
  return true
}
