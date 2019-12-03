// import fs from 'fs'
import sm from 'sitemap'
import AWS from 'aws-sdk'

import Sequelize from 'sequelize'

import Photo from '../../models/photo'
// import Comment from '../../models/comment'


// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, cb) {
  if (process.env.STAGE !== 'prod') { // run only in prod
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'wrong environment' }),
    }
    cb(null, response)
    return false
  }
  // retrieve photos
  let photos
  try {
    photos = await Photo.findAll({
      where: { active: true },
      // attributes: {
      //   include: [
      //     [Sequelize.literal('(SELECT COUNT("Comments") FROM "Comments"
      // WHERE "Comments"."photoId" = "Photo"."id" and "active" = true)'), 'commentsCount'],
      //   ],
      // },
      order: [
        ['id', 'DESC'],
      ],
    })
    console.log('retrived photos:', photos.length)
  } catch (err) {
    console.log('Unable to retrieve Photos feed', err)
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to retrieve Photos sitemap' }),
    }
    cb(null, response)
    return false
  }

  const sitemap = sm.createSitemap({
    hostname: 'https://www.wisaw.com',
    cacheTime: 600000,
  })

  sitemap.add({ url: '/' })

  photos.forEach((photo) => {
    const jsonObj = JSON.parse(JSON.stringify(photo))
    // console.log(jsonObj.commentsCount)
    if (jsonObj.commentsCount !== '0') {
      sitemap.add({ url: `/photos/${photo.id}` })
    }
  })

  // download the original to disk
  const s3 = new AWS.S3()


  try {
    console.log('uploading sitemap.xml')

    s3.putObject({
      ACL: 'public-read',
      Key: 'sitemap.xml',
      Body: sitemap.toString(),
      Bucket: 'wisaw-client',
    }, (err, res) => {
      if (err) {
        console.log({ err })
      }
      console.log({ res })
      console.log('done')
    })
    console.log('finished uploading')
  } catch (err) {
    console.log('Unable to upload sitemap.xml', err)
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify({ status: 'success' }),
  }
  console.log('done')

  cb(null, response)
  return true
}
