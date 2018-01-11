import Photo from '../../models/photo'

import moment from 'moment'

import Sequelize from 'sequelize'

export  async function main(event, context, callback) {
  //Instruct the lambda to exit immediately
  //and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false
  const data = JSON.parse(event.body)
  // console.log({data})

  const location =  data ? data.location : null
  if(!data || !location) {
    console.log("setting status to 400")
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'parameters missing'})
    }
    callback(null, response)
    return
  }

  console.log("location:",  location)

  var limit = data ? data.limit : null
  var offset = data ? data.offset : null
  if(!limit) {
    limit = 100
  }
  if(!offset) {
    offset = 0
  }

  const lat       = location.coordinates[0]
  const lng       = location.coordinates[1]

  const point = Sequelize.fn('ST_MakePoint', lat, lng);


  // retrieve photos
  let photos
  try {

    photos = await Photo.findAll({
      attributes: {
        include: [[Sequelize.fn('ST_Distance', point, Sequelize.col('location')), 'distance']],
        exclude: ['imageData']
      },
      order: Sequelize.col('distance'),
      limit,
      offset
    })

    console.log("retrived photos: " + photos.length)

  } catch(err) {
    console.log("Unable to retrieve Photos feed", err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to retrieve Photos feed'})
    }
    callback(null, response)
    return
  }


  // Resond to request indicating the photo feed was created
  const response = {
    statusCode: 200,
    body: JSON.stringify({ status: 'success', photos })
  }
  callback(null, response)
}
