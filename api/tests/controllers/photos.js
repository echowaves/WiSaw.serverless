import uuid from 'uuid'
import fs from 'fs'
import moment from 'moment'

import supertest from 'supertest'
import chai from 'chai'
import axios from 'axios'
import { config } from '../../../.env.test'

import Photo from '../../src/models/photo'

const request = supertest(config().HOST)
const { expect } = chai // BDD/TDD assertion library

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createTestPhoto(location, daysAgo) {
  const guid = uuid()
  const createdAt = moment().subtract(daysAgo, 'days').add(3, 'minutes')
  const updatedAt = createdAt
  const active = true
  const likes = 3
  // create and safe record
  let photo
  try {
    photo = Photo.create({
      uuid: guid,
      location,
      createdAt,
      updatedAt,
      active,
      likes,
    })
  } catch (err) {
    console.log('unable to create Photo', err)
    return photo
  }
  return photo
}

describe('photos', () => {
  beforeEach(async () => {
    try {
      await axios.get(`${config().HOST}/cleanup`)
    } catch (err) {
      console.log('Unable to cleanup')
    }
  })
  describe('create', () => {
    it('should not be able to post a photo with no parameters', async () => {
      const response =
      await request
        .post('/photos')
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('parameters missing')
    })

    it('should be able to post a photo with right parameters', async () => {
      const guid = uuid()
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }

      const response =
      await request
        .post('/photos')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ location })

      expect(response.status).to.equal(201)
      expect(response.body.status).to.equal('success')
      expect(response.body).to.have.property('uploadURL')
      expect(response.body).to.have.property('photo')

      // var contents = [...fs.readFileSync('./api/tests/controllers/data/FooBuz.png')]
      const contents = fs.readFileSync('./api/tests/controllers/data/large.jpg')

      // console.log('contents.size:', contents.length)
      // console.log('uploadURL', response.body.uploadURL)

      const options = {
        headers: {
          'Content-Type': 'image/jpeg',
        },
      }

      await axios.put(response.body.uploadURL, contents, options)
    })
  })


  describe('feed.main', () => {
    it('should not be able to get a photo feed with no parameters', async () => {
      const response =
      await request
        .post('/photos/feed')
        .set('Content-Type', 'application/json')


      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('parameters missing')
    })


    it('should be able to query feed photos', async () => {
      const location = { type: 'Point', coordinates: [38.80, -77.98] }
      const guid = uuid()
      const contents = fs.readFileSync('./api/tests/controllers/data/large.jpg')

      const responseCreate =
      await request
        .post('/photos')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ location })

      const options = {
        headers: {
          'Content-Type': 'image/jpeg',
        },
      }
      // upload the image
      await axios.put(responseCreate.body.uploadURL, contents, options)

      // should activated by thumnail creating after uploading is complete,
      // but let's wait for it to happen
      await sleep(3000) // takes about 3 seconds for the image to activate after it's uploaded

      const response =
      await request
        .post('/photos/feed')
        .set('Content-Type', 'application/json')
        .send({ location })

      expect(response.body.photos.length).to.equal(1)
      expect(response.body.photos[0]).to.have.property('id')
      expect(response.body.photos[0]).to.have.property('uuid')
      expect(response.body.photos[0]).to.have.property('location')
      expect(response.body.photos[0]).to.have.property('createdAt')
      expect(response.body.photos[0]).to.have.property('distance')
      expect(response.body.photos[0]).to.have.property('getImgUrl')
      expect(response.body.photos[0]).to.have.property('getThumbUrl')
      expect(response.body.photos[0].active).to.eq(true)
      expect(response.body.photos[0].likes).to.eq(0)

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')
    })
  })


  describe('feed.byDate', () => {
    it('should not be able to get a photo feed by date with no parameters', async () => {
      const response =
      await request
        .post('/photos/feedByDate')
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('parameters missing')
    })


    it.only('should be able to query feed photos by specific date', async () => {
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }

      createTestPhoto(location, 0)
      createTestPhoto(location, 1)
      createTestPhoto(location, 2)

      const response =
      await request
        .post('/photos/feedByDate')
        .set('Content-Type', 'application/json')
        .send({ location })
        .send({ daysAgo: 1 })

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')

      expect(response.body.photos.length).to.equal(1)
      expect(response.body.photos[0]).to.have.property('id')
      expect(response.body.photos[0]).to.have.property('uuid')
      expect(response.body.photos[0]).to.have.property('location')
      expect(response.body.photos[0]).to.have.property('createdAt')
      expect(response.body.photos[0]).to.have.property('distance')
      expect(response.body.photos[0]).to.have.property('getImgUrl')
      expect(response.body.photos[0]).to.have.property('getThumbUrl')
      expect(response.body.photos[0].active).to.eq(true)
      expect(response.body.photos[0].likes).to.eq(3)
    })
  })


  describe('get', () => {
    it('should be able to get one photo by id', async () => {
      const guid = uuid()

      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      const contents = fs.readFileSync('./api/tests/controllers/data/large.jpg')

      const responseCreate =
      await request
        .post('/photos')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ location })

      let response =
      await request
        .get(`/photos/${responseCreate.body.photo.id}`)
        .set('Content-Type', 'application/json')
      expect(response.status).to.equal(404)

      const options = {
        headers: {
          'Content-Type': 'image/jpeg',
        },
      }
      // upload the image
      await axios.put(responseCreate.body.uploadURL, contents, options)

      // should activated by thumnail creating after uploading is complete,
      // but let's wait for it to happen
      await sleep(3000) // takes about 3 seconds for the image to activate after it's uploaded

      response =
      await request
        .get(`/photos/${responseCreate.body.photo.id}`)
        .set('Content-Type', 'application/json')

      expect(response.body.photo).to.have.property('id')
      expect(response.body.photo).to.have.property('uuid')
      expect(response.body.photo).to.have.property('location')
      expect(response.body.photo).to.have.property('getImgUrl')
      expect(response.body.photo).to.have.property('getThumbUrl')
      expect(response.body.photo).to.have.property('createdAt')
      expect(response.body.photo).to.not.have.property('distance')
      expect(response.body.photo.active).to.eq(true)

      expect(response.body.photo.id).to.eq(responseCreate.body.photo.id)

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')
    })


    it('should not be able to get non existing photo by id', async () => {
      const response =
      await request
        .get('/photos/0')
        .set('Content-Type', 'application/json')


      expect(response.status).to.equal(404)
      expect(response.body.error).to.equal('not found')
    })
  })


  describe('delete', () => {
    it('should be able to delete a photo by id', async () => {
      const guid = uuid()

      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }

      const photoResponse =
      await request
        .post('/photos')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ location })

      const response =
      await request
        .delete(`/photos/${photoResponse.body.photo.id}`)
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')
    })


    it('should not be able to delete non existing photo by id', async () => {
      const response =
      await request
        .delete('/photos/0')
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(404)
      expect(response.body.error).to.equal('not found')
    })
  })


  describe('activate', () => {
    it('should be able to activate a photo by id', async () => {
      const guid = uuid()

      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }

      const photoResponse =
      await request
        .post('/photos')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ location })

      expect(photoResponse.body.photo.active).to.equal(false)

      const response =
      await request
        .put(`/photos/${photoResponse.body.photo.id}/activate`)
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')
    })


    it('should not be able to activate non existing photo by id', async () => {
      const response =
      await request
        .put('/photos/0/activate')
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(404)
      expect(response.body.error).to.equal('not found')
    })
  })


  describe('deactivate', () => {
    it('should be able to deactivate a photo by id', async () => {
      const guid = uuid()

      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }

      const photoResponse =
      await request
        .post('/photos')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ location })

      expect(photoResponse.body.photo.active).to.equal(false)

      let response =
      await request
        .put(`/photos/${photoResponse.body.photo.id}/activate`)
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')

      response =
      await request
        .put(`/photos/${photoResponse.body.photo.id}/deactivate`)
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')
    })


    it('should not be able to deactivate non existing photo by id', async () => {
      const response =
      await request
        .put('/photos/0/deactivate')
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(404)
      expect(response.body.error).to.equal('not found')
    })
  })


  describe('like', () => {
    it('should be able to like a photo by id', async () => {
      const guid = uuid()

      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }

      const photoResponse =
      await request
        .post('/photos')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ location })
      expect(photoResponse.body.photo.likes).to.equal(0)

      // have to activate photo before liking it
      await request
        .put(`/photos/${photoResponse.body.photo.id}/activate`)
        .set('Content-Type', 'application/json')

      const response =
      await request
        .put(`/photos/${photoResponse.body.photo.id}/like`)
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')

      const feedResponse =
      await request
        .post('/photos/feed')
        .set('Content-Type', 'application/json')
        .send({ location })

      expect(feedResponse.body.photos.length).to.equal(1)
      expect(feedResponse.body.photos[0]).to.have.property('id')
      expect(feedResponse.body.photos[0]).to.have.property('uuid')
      expect(feedResponse.body.photos[0]).to.have.property('location')
      expect(feedResponse.body.photos[0]).to.have.property('createdAt')
      expect(feedResponse.body.photos[0]).to.have.property('distance')
      expect(feedResponse.body.photos[0]).to.have.property('getImgUrl')
      expect(feedResponse.body.photos[0]).to.have.property('getThumbUrl')
      expect(feedResponse.body.photos[0].active).to.eq(true)
      expect(feedResponse.body.photos[0].likes).to.eq(1)

      expect(feedResponse.status).to.equal(200)
      expect(feedResponse.body.status).to.equal('success')
    })


    it('should not be able to like non existing photo by id', async () => {
      const response =
      await request
        .put('/photos/0/like')
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(404)
      expect(response.body.error).to.equal('not found')
    })
  })
})
