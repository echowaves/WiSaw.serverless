import Watcher from '../../models/watcher'

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  const { id, uuid } = event.pathParameters

  if (!uuid || !id) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'parameters missing' }),
    }
    callback(null, response)
    return
  }

  let watcher
  try {
    watcher = await Watcher.findOne({ where: { photoId: id, uuid } })
  } catch (err) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error finding watcher' }),
    }
    callback(null, response)
    return
  }

  if (!watcher) {
    const response = {
      statusCode: 404,
      body: JSON.stringify({ error: 'Unable to find watcher' }),
    }
    callback(null, response)
    return
  }

  // the comment was deteled
  const response = {
    statusCode: 200,
    body: JSON.stringify({ status: 'success', watcher }),
  }
  callback(null, response)
}
