// import uuid from 'uuid'
// import fs from 'fs'

import supertest from 'supertest'
import chai from 'chai'
import axios from 'axios'

const { expect } = chai // BDD/TDD assertion library


describe('photos', () => {
  it.only('should migrate data', async () => {
    // get photos feed from source
    const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }


    const sourceHost = 'https://www.wisaw.com'
    const destHost = 'https://testapi.wisaw.com'

    const sourceRequest = supertest(sourceHost)
    const destRequest = supertest(destHost)

    const feedResponse =
    await sourceRequest
        .post('/api/photos/feed')
        .set('Content-Type', 'application/json')
        .send({ location })


    expect(feedResponse.status).to.equal(200)
    const sourcePhotos = feedResponse.body.photos
    console.log('sourcePhotos.length', sourcePhotos.length)

    sourcePhotos
      // .slice(0, 1)
      .map(async (photo) => {
      // const guid = uuid()
      // const point = { type: 'Point', coordinates: [-29.396377, -137.585190] }

        const response =
        await destRequest
            .post('/photos')
            .set('Content-Type', 'application/json')
            .send({ uuid: photo.uuid })
            .send({ location: photo.location })

        expect(response.status).to.equal(201)
        // var contents = [...fs.readFileSync('./api/tests/controllers/data/FooBuz.png')]
        // const contents = fs.readFileSync('./api/tests/controllers/data/large.jpg')
        console.log(`${sourceHost}/api/photos/${photo.id}/full`)
        const contents =
        await axios({
            method: 'get',
            url: `${sourceHost}/api/photos/${photo.id}/full`,
            responseType: 'arraybuffer',
          })

        console.log('contents', contents.data.length)
        console.log(typeof contents.data)
        // console.log('contents.size:', contents.length)
        // console.log('uploadURL', response.body.uploadURL)

        const options = {
          headers: {
            'Content-Type': 'image/jpeg',
            // responseType: 'stream',
          },
        }

        // console.log('contents', contents.data)
        // console.log('response.body.uploadURL', response.body.uploadURL)

        // const uploadResponse =
        await axios.put(response.body.uploadURL, Buffer.from(contents.data, 'utf8'), options)
        // console.log('uploadResponse', uploadResponse)
        //
        //
      })


    // iterate over the images and create them at destination and upload appropriate files
  })
})
