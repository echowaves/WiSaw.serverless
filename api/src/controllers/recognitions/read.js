import Recognition from '../../models/recognition'

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
  let recognition
  try {
    recognition = await Recognition.findOne({
      where: { photoId: id },
    })
    console.log('retrived recognition')
    if (!recognition) {
      console.log('no recognition found -- setting status to 404')
      const response = {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not Found' }),
      }
      callback(null, response)
      return
    }
  } catch (err) {
    console.log('Unable to retrieve recognition', err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to retrieve recognition' }),
    }
    callback(null, response)
    return
  }

  // Resond to request indicating the photo feed was created
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': false, // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({ status: 'success', recognition }),
  }
  callback(null, response)
}
