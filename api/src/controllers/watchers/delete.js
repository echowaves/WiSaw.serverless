import Watcher from '../../models/watcher'

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  const { id } = event.pathParameters

  const data = JSON.parse(event.body)

  const uuid = data ? data.uuid : null

  if (!data || !uuid || !id) {
    console.log('setting status to 400')
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'parameters missing' }),
    }
    callback(null, response)
    return
  }

  let numberOfWatchers
  try {
    numberOfWatchers = await Watcher.destroy({ where: { photoId: id, uuid } })
  } catch (err) {
    console.log('Unable to unwatch photo', err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to unwatch photo' }),
    }
    callback(null, response)
    return
  }
  if (numberOfWatchers === 0) {
    const response = {
      statusCode: 404,
      body: JSON.stringify({ error: 'not found' }),
    }
    callback(null, response)
    return
  }
  // the comment was deteled
  const response = {
    statusCode: 200,
    body: JSON.stringify({ status: 'success', numberOfWatchers }),
  }
  callback(null, response)
}
