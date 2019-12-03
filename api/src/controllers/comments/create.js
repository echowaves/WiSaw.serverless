import moment from 'moment'

import Comment from '../../models/comment'
import Watcher from '../../models/watcher'
import UpdateCommentsCount from './updateCommentsCount'


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
  // const createdAt = moment()
  // const updatedAt = createdAt
  const watchedAt = moment()

  // create and safe record
  let comment
  try {
    comment = await Comment.create({
      photoId: id,
      uuid,
      comment: commentText,
      // createdAt,
      // updatedAt,
    })
    await UpdateCommentsCount.update(id)
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
      console.log(`creating a watcher for photoId:${id} and uuid:${uuid}`)
      await Watcher.create({
        photoId: id,
        uuid,
        // createdAt,
        // updatedAt,
        watchedAt,
      })
    } else {
      console.log(`updating a watcher for photoId:${id} and uuid:${uuid}`)
      watcher.watchedAt = watchedAt
      await watcher.save()
    }
  } catch (err) {
    console.log('unable to watch photo when comment added', err)
  }
  // update all watchers
  try {
    console.log(`updating all watchers for photoId:${id}`)
    const rezult = await Watcher.update( // this should cause updatedAt to be updated
      { photoId: id },
      {
        where: {
          photoId: id,
        },
      },
    )
    console.log('updated all watchers')
    console.log({ rezult })
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
