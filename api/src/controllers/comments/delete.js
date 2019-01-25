import Comment from '../../models/comment'

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  const { id } = event.pathParameters

  console.log({ id })

  const data = JSON.parse(event.body)

  const deactivatedBy = data ? data.deactivatedBy : null

  if (!data || !deactivatedBy) {
    console.log('setting status to 400')
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'parameters missing' }),
    }
    callback(null, response)
    return
  }

  let comment
  try {
    comment = await Comment.update(
      {
        active: false,
        deactivatedBy,
      },
      { where: { id } },
    )

    if (comment[0] === 0) {
      const response = {
        statusCode: 404,
        body: JSON.stringify({ error: 'not found' }),
      }
      callback(null, response)
      return
    }
  } catch (err) {
    console.log('Unable to delete a Comment', err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to delete a Comment' }),
    }
    callback(null, response)
    return
  }

  // the comment was deteled
  const response = {
    statusCode: 200,
    body: JSON.stringify({ status: 'success' }),
  }
  callback(null, response)
}
