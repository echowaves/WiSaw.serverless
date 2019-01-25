import moment from 'moment'

import Comment from '../../models/comment'

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  const { photoId } = event.pathParameters

  const data = JSON.parse(event.body)

  const uuid = data ? data.uuid : null


  const comment = data ? data.comment : null

  if (!data || !uuid || !comment || !photoId) {
    console.log('setting status to 400')
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'parameters missing' }),
    }
    callback(null, response)
    return
  }
  const createdAt = moment()

  // create and safe record
  try {
    await Comment.create({
      photoId,
      uuid,
      comment,
      createdAt,
    })
  } catch (err) {
    console.log('unable to create comment', err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'unable to create comment' }),
    }
    callback(null, response)
    return
  }

  // Resond to request indicating the create contactForm was created
  const response = {
    statusCode: 201,
    body: JSON.stringify({ status: 'success' }),
  }
  callback(null, response)
}
