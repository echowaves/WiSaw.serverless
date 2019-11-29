import Recognition from '../../models/recognition'
import Photo from '../../models/photo'

import ImageAnalyser from './imageAnalyser'
import { sequelize } from '../../../../config/consts'


// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, cb) {
  const photos = await sequelize
    .query('SELECT  * FROM "Photos" p WHERE active = true and p.id NOT IN (SELECT  "photoId" FROM    "Recognitions" r)  order by ID desc limit 40', {
      model: Photo,
      mapToModel: true, // pass true here if you have any mapped fields
    })
  console.log(`got ${photos.length} photos`)
  console.log(photos.map(photo => photo.id))

  // define all the thumbnails that we want
  try {
    const promisses =
      photos.map(async (photo) => {
        const metaData = await ImageAnalyser.recognizeImage({
          bucket: process.env.IMAGE_BUCKET,
          imageName: photo.id.toString(),
        })
        return metaData
      })
    console.log('promisses')
    console.log(promisses)
    const results = await Promise.all(promisses)

    console.log(`results.length: ${results.length}`)

    photos.map(async (photo, index) => {
      if (results[index]) {
        await Recognition.destroy({ where: { photoId: photo.id } })
        await Recognition.create({ photoId: photo.id, metaData: results[index] })
      }
    })
  } catch (err) {
    console.log('Error parsing image')
    console.log(err)
    return null
  }


  cb(null, 'done imageRecognition')
  return true
}
