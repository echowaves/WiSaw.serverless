import Photo from '../../models/photo'

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  const { id } = event.pathParameters

  // retrieve photos
  let photo
  try {
    photo = await Photo.findOne({
      where: { id },
    })
    if (!photo) {
      const response = {
        statusCode: 404,
        body: JSON.stringify({ error: 'not found' }),
      }
      callback(null, response)
      return
    }
  } catch (err) {
    console.log('Unable to retrieve a Photo', err)

    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to retrieve a Photo' }),
    }
    callback(null, response)
    return
  }

  // Resond to request indicating the photo was created
  const response = {
    statusCode: 200,
    body: JSON.stringify({ status: 'success', photo }),
  }
  callback(null, response)
}
