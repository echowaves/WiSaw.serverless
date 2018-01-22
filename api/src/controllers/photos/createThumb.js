import fs from 'fs'
import AWS from 'aws-sdk'
import axios from 'axios'

import { exec } from 'child_process'

// eslint-disable-next-line import/prefer-default-export
export async function main(event, context, cb) {
  // define all the thumbnails that we want
  const widths = {
    150: '-thumbnail 150x',
  }

  const record = event.Records[0];

  // we only want to deal with originals
  if (record.s3.object.key.includes('-thumb')) {
    console.warn('Not an original, skipping')
    cb('Not an original, skipping')
    return false
  }

  // get the prefix, and get the hash

  const name = record.s3.object.key
  console.log('record.s3.bucket.name:', record.s3.bucket.name)
  console.log('record.s3.object.key:', record.s3.object.key)
  // download the original to disk
  const s3 = new AWS.S3()
  const sourcePath = `/tmp/${name}`
  const targetStream = fs.createWriteStream(sourcePath)
  const fileStream = s3.getObject({
    Bucket: record.s3.bucket.name,
    Key: record.s3.object.key,
  }).createReadStream()
  fileStream.pipe(targetStream)

  // when file is downloaded, start processing
  fileStream.on('end', () => {
    // resize to every configured size
    Object.keys(widths).forEach((size) => {
      const tmpFileName = `/tmp/${name}-thumb-${size}`
      const cmd = `convert ${widths[size]} ${sourcePath} ${tmpFileName}`
      console.log('Running: ', cmd)

      exec(cmd, async (error, stdout, stderr) => { // eslint-disable-line no-unused-vars
        if (error) {
          // the command failed (non-zero), fail
          console.warn(`exec error: ${error}, stdout, stderr`)
          // continue
        } else {
          // resize was succesfull, upload the file
          console.info(`Resize to ${size} OK`)
          const fileBuffer = fs.readFileSync(tmpFileName)
          console.log('thumb size:', fileBuffer.byteLength)

          try {
            await s3.putObject({
              ACL: 'public-read',
              Key: `${name}-thumb`,
              Body: fileBuffer,
              Bucket: record.s3.bucket.name,
              ContentType: 'image/jpg',
            })

            // activate image
            // await axios.put(`${process.env.HOST}/${name}/activate`)
          } catch (err) {
            console.log(`Unable to upload thumb ${name}`, err)
          }
        }
      })
    })
  })

  cb('success')
  return true
}
