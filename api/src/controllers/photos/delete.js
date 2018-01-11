import Photo from '../../models/photo'

import moment from 'moment'
import Sequelize from 'sequelize'

export  async function main(event, context, callback) {
  //Instruct the lambda to exit immediately
  //and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false
  const id = event.pathParameters.id

  // retrieve photos
  let photo
  try {
    photo = await Photo.destroy({
      where: { id }
    })
    if(!photo) {
      const response = {
        statusCode: 404,
        body: JSON.stringify({ error: 'not found' })
      }
      callback(null, response)
      return
    }

  } catch(err) {
    console.log("Unable to delete a Photo", err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to delete a Photo'})
    }
    callback(null, response)
    return
  }


  // the photo was deteled
  const response = {
    statusCode: 200,
    body: JSON.stringify({ status: 'success' })
  }
  callback(null, response)
}
