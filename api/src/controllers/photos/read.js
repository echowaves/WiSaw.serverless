import Photo from '../../models/photo'
import AbuseReport from '../../models/abuseReport'

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
      photo = await Photo.findOne({
        where: { id }
      })
  } catch(err) {
    console.log("Unable to retrieve a Photo", err)

    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to retrieve a Photo'})
    }
    callback(null, response)
    return
  }

  if(!photo) {
    const response = {
      statusCode: 404,
      body: JSON.stringify({ error: 'not found' })
    }
    callback(null, response)
    return
  }



  // Resond to request indicating the photo was created
  const response = {
    statusCode: 200,
    body: JSON.stringify({ status: 'success', photo })
  }
  callback(null, response)
  }
