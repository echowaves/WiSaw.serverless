import uuid from 'uuid'
import fs from 'fs'

import supertest from 'supertest'
import chai from 'chai'
import axios from 'axios'

import { config } from '../../../.env.test'

const request = supertest(config().HOST)
const { expect } = chai // BDD/TDD assertion library

describe('photos', () => {
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
      const point = { type: 'Point', coordinates: [-29.396377, -137.585190] }

      const response =
      await request
          .post('/photos')
          .set('Content-Type', 'application/json')
          .send({ uuid: guid })
          .send({ location: point })

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
          'Content-Type': 'image/jpg',
        },
      }

      await axios.put(response.body.uploadURL, contents, options)
    })
  })


  describe('feed', () => {
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

      const response =
      await request
          .post('/photos/feed')
          .set('Content-Type', 'application/json')
          .send({ location })

      expect(response.body.photos.length).to.not.equal(0)
      expect(response.body.photos[0]).to.have.property('id')
      expect(response.body.photos[0]).to.have.property('uuid')
      expect(response.body.photos[0]).to.have.property('location')
      expect(response.body.photos[0]).to.have.property('createdAt')
      expect(response.body.photos[0]).to.have.property('distance')
      expect(response.body.photos[0]).to.have.property('getImgUrl')
      expect(response.body.photos[0]).to.have.property('getThumbUrl')

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')

      // console.log("photos: ", response.body.photos.length)
      // logger.debug("photos: ", response.body.photos[0])
    })
  })


  describe('get', () => {
    it('should be able to get one photo by id', async () => {
      const guid = uuid()

      const point = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      // const contents = [...fs.readFileSync('./api/tests/controllers/data/large.jpg')]

      const photoResponse =
      await request
          .post('/photos')
          .set('Content-Type', 'application/json')
          .send({ uuid: guid })
          .send({ location: point })

      const response =
      await request
          .get(`/photos/${photoResponse.body.photo.id}`)
          .set('Content-Type', 'application/json')

      expect(response.body.photo).to.have.property('id')
      expect(response.body.photo).to.have.property('uuid')
      expect(response.body.photo).to.have.property('location')
      expect(response.body.photo).to.have.property('getImgUrl')
      expect(response.body.photo).to.have.property('getThumbUrl')
      expect(response.body.photo).to.have.property('createdAt')
      expect(response.body.photo).to.not.have.property('distance')

      expect(response.body.photo.id).to.eq(photoResponse.body.photo.id)

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

      const point = { type: 'Point', coordinates: [-29.396377, -137.585190] }

      const photoResponse =
      await request
          .post('/photos')
          .set('Content-Type', 'application/json')
          .send({ uuid: guid })
          .send({ location: point })

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

      const point = { type: 'Point', coordinates: [-29.396377, -137.585190] }

      const photoResponse =
      await request
          .post('/photos')
          .set('Content-Type', 'application/json')
          .send({ uuid: guid })
          .send({ location: point })

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
})
