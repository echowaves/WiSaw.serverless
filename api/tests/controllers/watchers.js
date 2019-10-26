import uuid from 'uuid'
import moment from 'moment'

import supertest from 'supertest'
import chai from 'chai'
import { config } from '../../../.env.test'

import Photo from '../../src/models/photo'
import Watcher from '../../src/models/watcher'

const request = supertest(config().HOST)
const { expect } = chai // BDD/TDD assertion library

async function createTestPhoto(location, daysAgo) {
  const guid = uuid()
  const createdAt = moment().subtract(daysAgo, 'days').add(3, 'minutes')
  const updatedAt = createdAt
  const active = true
  const likes = 3
  // create and safe record
  let photo
  try {
    photo = await Photo.create({
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

describe('watchers', () => {
  beforeEach(async () => {
    await Photo.destroy({
      where: {},
    })
    await Watcher.destroy({
      where: {},
    })
  })

  describe('create', () => {
    it('should not be able to create a watcher with no parameters', async () => {
      const response =
      await request
        .post('/photos/0/watchers')
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('parameters missing')
    })

    it('should be able to watch a photo with right parameters', async () => {
      const guid = uuid()
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      const photo = await createTestPhoto(location, 0)

      const response =
      await request
        .post(`/photos/${photo.id}/watchers`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })

      expect(response.status).to.equal(201)
      expect(response.body.status).to.equal('success')
      expect(response.body).to.have.property('watcher')
    })
  })

  describe('delete', () => {
    it('should not be able to delete a watcher with no parameters', async () => {
      const response =
      await request
        .delete('/photos/0/watchers')
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('parameters missing')
    })

    it('should be able to unwatch', async () => {
      const guid = uuid()
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      const photo = await createTestPhoto(location, 0)

      await request
        .post(`/photos/${photo.id}/watchers`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })

      const response =
      await request
        .delete(`/photos/${photo.id}/watchers`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')
      expect(response.body.numberOfWatchers).to.equal(1)
    })

    it('should not be able to delete non existing watcher', async () => {
      const guid = uuid()
      const response =
      await request
        .delete('/comments/0')
        .set('Content-Type', 'application/json')
        .send({ deactivatedBy: guid })

      expect(response.status).to.equal(404)
      expect(response.body.error).to.equal('not found')
    })
  })

  describe('read', () => {
    it('should not be able to read a watcher with no parameters', async () => {
      const response =
      await request
        .post('/photos/0/watchers')
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('parameters missing')
    })

    it('should be able to get a user\'s watcher for a photo ', async () => {
      const guid = uuid()
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      const photo = await createTestPhoto(location, 0)

      await request
        .post(`/photos/${photo.id}/watchers`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })

      const responseWatcher =
      await request
        .get(`/photos/${photo.id}/watchers/${guid}`)
        .set('Content-Type', 'application/json')

      expect(responseWatcher.status).to.equal(200)
      expect(responseWatcher.body.status).to.equal('success')
      expect(responseWatcher.body).to.have.property('watcher')
      expect(responseWatcher.body.watcher.uuid).to.equal(guid)
      expect(responseWatcher.body.watcher.photoId).to.equal(photo.id)
    })
  })
})
