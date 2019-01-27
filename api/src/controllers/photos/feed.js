import Sequelize from 'sequelize'
import moment from 'moment'

import Photo from '../../models/photo'

const { Op } = Sequelize

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  const data = JSON.parse(event.body)
  // console.log({data})

  const location = data ? data.location : null
  if (!data || !location) {
    console.log('setting status to 400')
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'parameters missing' }),
    }
    callback(null, response)
    return false
  }

  console.log('location:', location)

  let limit = data ? data.limit : null
  limit = 1000

  let offset = data ? data.offset : null
  if (!limit) {
    limit = 100
  }
  if (!offset) {
    offset = 0
  }

  const lat = location.coordinates[0]
  const lng = location.coordinates[1]

  const point = Sequelize.fn('ST_MakePoint', lat, lng)


  // retrieve photos
  let photos
  try {
    photos = await Photo.findAll({
      where: { active: true },
      attributes: {
        include: [
          [Sequelize.fn('ST_Distance', point, Sequelize.col('location')), 'distance'],
          [Sequelize.literal('(SELECT COUNT("Comments") FROM "Comments" WHERE "Comments"."photoId" = "Photo"."id" and "active" = true)'), 'commentsCount'],
        ],
      },
      // order: Sequelize.col('distance'),
      order: [
        ['id', 'DESC'],
      ],
      limit,
      offset,
    })
    console.log('retrived photos:', photos.length)
    // add img_url and thumb_url properties
    // photos = dbPhotos.map((dbPhoto) => {
    //   const photo = dbPhoto
    //   photo.dataValues.img_url = `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${photo.id}`
    //   photo.dataValues.thumb_url = `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${photo.id}-thumb`
    //   // console.log({ photo })
    //   return photo
    // })
    // console.log({ photos })
  } catch (err) {
    console.log('Unable to retrieve Photos feed', err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to retrieve Photos feed' }),
    }
    callback(null, response)
    return false
  }

  // Resond to request indicating the photo feed was created
  const response = {
    statusCode: 200,
    body: JSON.stringify({ status: 'success', photos }),
  }
  callback(null, response)
  return true
}


// eslint-disable-next-line import/prefer-default-export
export async function byDate(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  const data = JSON.parse(event.body)
  console.log({ data })

  const location = data ? data.location : null
  const daysAgo = data ? (data.daysAgo || 0) : 0
  const timeZoneShiftHours = data ? (data.timeZoneShiftHours || 0) : 0 // defaults to UTC

  console.log('location:', location)
  console.log('daysAgo:', daysAgo)
  console.log('timeZoneShiftHours:', timeZoneShiftHours)

  if (!data || !location) {
    console.log('setting status to 400')
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'parameters missing' }),
    }
    callback(null, response)
    return false
  }


  let limit = data ? data.limit : null
  let offset = data ? data.offset : null
  if (!limit) {
    limit = 100
  }
  if (!offset) {
    offset = 0
  }

  const lat = location.coordinates[0]
  const lng = location.coordinates[1]

  const point = Sequelize.fn('ST_MakePoint', lat, lng)

  // retrieve photos
  let photos

  try {
    const utcDate = moment().startOf('day');
    const currentDate = moment().startOf('day').add(timeZoneShiftHours, 'hours');

    // if (utcDate.date() === currentDate.date()) {
    //   daysAgo += 1
    // }
    console.log('utcDate: ', utcDate)
    console.log('currentDate: ', currentDate)
    console.log('daysAgo: ', daysAgo)

    photos = await Photo.findAll({
      where: {
        createdAt: {
          [Op.gte]: currentDate.clone()
            .subtract(daysAgo, 'days'),
          [Op.lte]: currentDate.clone().add(1, 'days')
            .subtract(daysAgo, 'days'),
        },
        active: true,
      },
      attributes: {
        include: [
          [Sequelize.fn('ST_Distance', point, Sequelize.col('location')), 'distance'],
          // [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'creationDate'],
          [Sequelize.literal('(SELECT COUNT("Comments") FROM "Comments" WHERE "Comments"."photoId" = "Photo"."id" and "active" = true)'), 'commentsCount'],
        ],
      },
      order: Sequelize.col('distance'),
      limit,
      offset,
    })
    console.log('retrived photos:', photos.length)
    // add img_url and thumb_url properties
    // photos = dbPhotos.map((dbPhoto) => {
    //   const photo = dbPhoto
    //   photo.dataValues.img_url = `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${photo.id}`
    //   photo.dataValues.thumb_url = `https://s3.amazonaws.com/${process.env.IMAGE_BUCKET}/${photo.id}-thumb`
    //   // console.log({ photo })
    //   return photo
    // })
    // console.log({ photos })
  } catch (err) {
    console.log('Unable to retrieve Photos feed', err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to retrieve Photos feed' }),
    }
    callback(null, response)
    return false
  }


  // Resond to request indicating the photo feed was created
  const response = {
    statusCode: 200,
    body: JSON.stringify({ status: 'success', photos }),
  }
  callback(null, response)
  return true
}
