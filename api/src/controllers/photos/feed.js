import Sequelize from 'sequelize'
import moment from 'moment'

import { sequelize } from '../../../../config/consts'

import Photo from '../../models/photo'
import Watcher from '../../models/watcher'

// const stringifyObject = require('stringify-object')

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
          // [Sequelize.literal('(SELECT COUNT("Comments") FROM "Comments"
          // WHERE "Comments"."photoId" = "Photo"."id" and "active" = true)'), 'commentsCount'],
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
  // console.log({ data })

  const location = data ? data.location : null
  const daysAgo = data ? (data.daysAgo || 0) : 0
  const batch = data ? (data.batch || 0) : 0

  console.log('location:', location)
  console.log('daysAgo:', daysAgo)

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
    // const utcDate = moment().startOf('day');
    const currentDate = moment()

    // if (utcDate.date() === currentDate.date()) {
    //   daysAgo += 1
    // }
    // console.log('utcDate: ', utcDate)
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
          // [Sequelize.literal('(SELECT COUNT("Comments") FROM "Comments"
          // WHERE "Comments"."photoId" = "Photo"."id" and "active" = true)'), 'commentsCount'],
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
    body: JSON.stringify({ status: 'success', batch, photos: photos.sort((a, b) => b.id - a.id) }),
  }
  callback(null, response)
  return true
}

// eslint-disable-next-line import/prefer-default-export
export async function forWatcher(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  const data = JSON.parse(event.body)

  const pageNumber = data ? (data.pageNumber || 0) : 0
  const limit = data ? (data.pageLimit || 100) : 100

  const uuid = data ? data.uuid : null
  const batch = data ? (data.batch || 0) : 0

  // console.log({ data })

  if (!data || !uuid) {
    console.log('setting status to 400')
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'parameters missing' }),
    }
    callback(null, response)
    return false
  }

  const offset = limit * pageNumber

  // retrieve photos
  let photos
  try {
    photos = await Photo.findAll({
      where: {
        // uuid,
        active: true,
      },
      include: [
        {
          model: Watcher,
          required: true,
          where: { uuid },
          order: [[Watcher, 'watchedAt', 'DESC']],
        },
      ],
      order: [[Watcher, 'watchedAt', 'DESC']],
      limit,
      offset,
      subQuery: false,
    })
    console.log('retrived photos:', photos.length)
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
    body: JSON.stringify({ status: 'success', batch, photos }),
  }
  callback(null, response)
  return true
}

// eslint-disable-next-line import/prefer-default-export
export async function forTextSearch(event, context, callback) {
  // Instruct the lambda to exit immediately
  // and not wait for node event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false // eslint-disable-line no-param-reassign

  const data = JSON.parse(event.body)

  const pageNumber = data ? (data.pageNumber || 0) : 0
  const limit = data ? (data.pageLimit || 25) : 25

  const uuid = data ? data.uuid : null
  const batch = data ? (data.batch || 0) : 0
  const searchTerm = data ? data.searchTerm : null

  // console.log(JSON.stringify(data))

  if (!data || !uuid || !searchTerm || searchTerm.length < 2) {
    console.log('setting status to 400')
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'parameters missing' }),
    }
    callback(null, response)
    return false
  }

  const offset = limit * pageNumber

  // retrieve photos
  let photos

  try {
    /* eslint-disable no-multi-str */
    photos = await sequelize
      .query(
        `SELECT p.* \
          FROM "Photos" p where active = true and "id" in ( \
          SELECT "photoId" \
          FROM "Recognitions" \
          WHERE \
          to_tsvector('English', "metaData"::text) @@ plainto_tsquery('English', '${searchTerm}') \
        UNION \
          SELECT "photoId" \
          FROM "Comments" \
          WHERE \
          active = true and to_tsvector('English', "comment"::text) @@ plainto_tsquery('English', '${searchTerm}') \
        ) \
        order by id desc \
        limit ${limit} offset ${offset}`,
        // { replacements: { searchTerm, limit, offset }, type: sequelize.QueryTypes.SELECT },
        {
          model: Photo,
          mapToModel: true, // pass true here if you have any mapped fields
        },
      )

    console.log('retrived photos:', photos.length)
    // console.log(stringifyObject(photos, {
    //   indent: '  ',
    //   singleQuotes: false,
    // }))
  } catch (err) {
    console.log('Unable to retrieve Photos feed')
    console.log(JSON.stringify(err))
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to retrieve Photos feed' }),
    }
    callback(null, response)
    return false
  }

  // Respond to request indicating the photo feed was created
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': false, // Required for cookies, authorization headers with HTTPS
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: JSON.stringify({ status: 'success', batch, photos }),
  }
  callback(null, response)
  return true
}
