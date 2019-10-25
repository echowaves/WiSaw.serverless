import Photo from '../../models/photo'
import Watcher from '../../models/watcher'

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, cb) {
  const record = event.Records[0];

  // we only want to deal with originals
  if (record.s3.object.key.includes('-thumb')) {
    console.warn('Not an original, skipping')
    cb(null, 'Not an original, skipping')
    return true
  }

  const id = record.s3.object.key
  console.log('record.s3.bucket.name:', record.s3.bucket.name)
  console.log('record.s3.object.key:', record.s3.object.key)
  // delete photos
  let photo
  try {
    photo = await Photo.destroy({
      where: { id },
    })
    if (!photo) {
      cb(`photo ${id} not found`)
      return false
    }
  } catch (err) {
    console.log('Unable to delete a Photo', err)
    cb(`unable to delete photo ${id}`)
    return false
  }

  await Watcher.destroy({ where: { photoId: id } })

  // the photo was deteled
  cb(null, 'success')
  return true
}
