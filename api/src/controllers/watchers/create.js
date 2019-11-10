import moment from 'moment'

import Watcher from '../../models/watcher'

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  const { id } = event.pathParameters

  const data = JSON.parse(event.body)

  const uuid = data ? data.uuid : null
  const watchedAt = moment()

  if (!data || !uuid || !id) {
    console.log('setting status to 400')
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'parameters missing' }),
    }
    callback(null, response)
    return
  }

  // const watchedAt = moment()

  // create and safe record
  let watcher
  try {
    watcher = await Watcher.findOne({
      where: {
        uuid,
        photoId: id,
      },
    })
    console.log({ watcher })
    if (watcher === null) {
      await Watcher.create({
        uuid,
        photoId: id,
        watchedAt,
      })
    } else {
      await Watcher.update(
        { watchedAt },
        {
          where:
          {
            uuid,
            photoId: id,
          },
        },
      )
    }
  } catch (err) {
    console.log('unable to watch photo', err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'unable to watch photo', err }),
    }
    callback(null, response)
    return
  }

  console.log({ watcher })
  // Resond to request indicating the create contactForm was created
  const response = {
    statusCode: 201,
    body: JSON.stringify({ status: 'success', watcher }),
  }
  callback(null, response)
}
