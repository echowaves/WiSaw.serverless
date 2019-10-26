import moment from 'moment'

import Comment from '../../models/comment'
import Watcher from '../../models/watcher'

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  const { id } = event.pathParameters

  const data = JSON.parse(event.body)

  const uuid = data ? data.uuid : null

  const commentText = data ? data.comment : null

  if (!data || !uuid || !commentText || !id) {
    console.log('setting status to 400')
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'parameters missing' }),
    }
    callback(null, response)
    return
  }
  const createdAt = moment()
  const updatedAt = createdAt
  const watchedAt = createdAt

  // create and safe record
  let comment
  try {
    comment = await Comment.create({
      photoId: id,
      uuid,
      comment: commentText,
      createdAt,
      updatedAt,
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
  // start watching this photo if it's not watched yet
  try {
    const watcher = await Watcher.findOne({ where: { photoId: id, uuid } })
    if (!watcher) {
      await Watcher.create({
        photoId: id,
        uuid,
        createdAt,
        updatedAt,
        watchedAt,
      })
    } else {
      Watcher.update({ watchedAt }, { where: { photoId: id, uuid } })
    }
  } catch (err) {
    console.log('unable to watch photo when comment added', err)
  }
  // update all watchers
  try {
    await Watcher.update({ updatedAt }, { where: { photoId: id } })
  } catch (err) {
    console.log('unable to watch photo when comment added', err)
  }

  // Resond to request indicating the create contactForm was created
  const response = {
    statusCode: 201,
    body: JSON.stringify({ status: 'success', comment }),
  }
  callback(null, response)
}
