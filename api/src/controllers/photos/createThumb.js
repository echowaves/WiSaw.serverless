import moment from 'moment'

import Photo from '../../models/photo'
import AbuseReport from '../../models/abuseReport'

const Jimp = require('jimp')
const AWS = require('aws-sdk')

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  const data = JSON.parse(event.body)
  // console.log({data})

  const uuid = data ? data.uuid : null
  const location = data ? data.location : null
  const imageData = data ? data.imageData : null

  if (!data || !uuid || !location || !imageData) {
    console.log('setting status to 400')
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'parameters missing' }),
    }
    callback(null, response)
    return
  }

  const c = await AbuseReport.count({ where: { uuid } })
  console.log(`count of abuse: ${c}`)
  if (c > 3) {
    const response = {
      statusCode: 401,
      body: JSON.stringify({ error: 'Anauthorized.' }),
    }
    callback(null, response)
    return
  }

  console.log('imageData.length:', imageData.length)

  let thumbNail
  try {
    const image = await Jimp.read(Buffer.from(imageData))
    const { bitmap } = image
      .resize(150, Jimp.AUTO)
      .exifRotate()
    thumbNail = bitmap.data
  } catch (err) {
    console.log({ err })
  }

  console.log('uuid:', uuid)
  console.log('location:', location)
  console.log('imageData.length:', imageData.length)
  console.log('thumbNail.length:', thumbNail.length)

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
      updatedAt,
    })
  } catch (err) {
    console.log('unable to create Photo', err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to create a new Photo' }),
    }
    callback(null, response)
    return
  }

  // Resond to request indicating the photo was created
  const response = {
    statusCode: 201,
    body: JSON.stringify({ status: 'success', id: photo.id }),
  }
  callback(null, response)
}
