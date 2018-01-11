import Photo from '../../models/photo'
import AbuseReport from '../../models/abuseReport'


import moment from 'moment'

var Jimp = require('jimp');

import Sequelize from 'sequelize'

export  async function main(event, context, callback) {
  //Instruct the lambda to exit immediately
  //and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false
  const data = JSON.parse(event.body)
  // console.log({data})

  const uuid =  data ? data.uuid : null
  const location =  data ? data.location : null
  const imageData =  data ? data.imageData : null

  if(!data || !uuid || !location || !imageData ) {
    console.log("setting status to 400")
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'parameters missing'})
    }
    callback(null, response)
    return
  }

  var c = await AbuseReport.count({ where: {uuid} })
  console.log("count of abuse: " + c)
  if(c > 3){
    const response = {
      statusCode: 401,
      body: JSON.stringify({ error: 'Anauthorized.'})
    }
    callback(null, response)
    return
  }

  console.log("imageData.length: ", imageData.length)

  var thumbNail
  try {
    var image  = await Jimp.read(new Buffer(imageData))
    var bitmap = image
    .resize(150, Jimp.AUTO)       // resize
    .exifRotate()                // rotate
    .bitmap
    thumbNail = bitmap.data

  } catch(err) {
    console.log({err})
  }

  console.log("uuid:", uuid)
  console.log("location:", location)
  console.log("imageData.length:", imageData.length)
  console.log("thumbNail.length:", thumbNail.length)

  const createdAt = moment()
  const updatedAt = createdAt

  // create and safe record
  let photo
  try {
    photo = await Photo.create({
      uuid,
      location,
      imageData,
      thumbNail,
      createdAt,
      updatedAt
    })
  } catch(err) {
    console.log("unable to create Photo", err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to create a new Photo'})
    }
    callback(null, response)
    return
  }

  // Resond to request indicating the photo was created
  const response = {
    statusCode: 201,
    body: JSON.stringify({ status: 'success', id: photo.id })
  }
  callback(null, response)
}
