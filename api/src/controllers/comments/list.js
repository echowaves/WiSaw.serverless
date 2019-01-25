import Comment from '../../models/comment'

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  const { id } = event.pathParameters

  if (!id) {
    console.log('setting status to 404')
    const response = {
      statusCode: 404,
      body: JSON.stringify({ error: 'Not Found' }),
    }
    callback(null, response)
    return
  }

  // retrieve comments
  let comments
  try {
    comments = await Comment.findAll({
      where: { active: true, photoId: id },
      order: [
        ['id', 'DESC'],
      ],
    })
    console.log('retrived comments:', comments.length)
  } catch (err) {
    console.log('Unable to retrieve Comments', err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to retrieve Comments' }),
    }
    callback(null, response)
    return
  }

  // Resond to request indicating the photo feed was created
  const response = {
    statusCode: 200,
    body: JSON.stringify({ status: 'success', comments }),
  }
  callback(null, response)
}
