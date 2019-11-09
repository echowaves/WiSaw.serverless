import uuid from 'uuid'
import moment from 'moment'

import supertest from 'supertest'
import chai from 'chai'
import { config } from '../../../.env.test'

import Photo from '../../src/models/photo'
import Watcher from '../../src/models/watcher'
import Comment from '../../src/models/comment'

const request = supertest(config().HOST)
const { expect } = chai // BDD/TDD assertion library

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createTestPhoto(location, guid = uuid()) {
  const active = true
  const likes = 3
  // create and safe record
  let photo
  try {
    photo = await Photo.create({
      uuid: guid,
      location,
      active,
      likes,
    })
  } catch (err) {
    console.log('unable to create Photo', err)
  }
  return photo
}

async function createWatchedPhoto(location, guid = uuid()) {
  const watchedAt = moment()
  const photo = await createTestPhoto(location, guid)

  try {
    await Watcher.create({
      photoId: photo.id,
      uuid: guid,
      watchedAt,
    })
  } catch (err) {
    console.log('unable to create Watcher', err)
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
    await Comment.destroy({
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
      const photo = await createWatchedPhoto(location, guid)

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
      const photo = await createWatchedPhoto(location, guid)

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
      expect(response.body.numberOfWatchers).to.equal(2)// 2 watchers deleted
    })

    it('should not be able to delete non existing watcher', async () => {
      const guid = uuid()
      const response =
      await request
        .delete('/photos/0/watchers')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })

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
      const photo = await createWatchedPhoto(location, guid)

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

    it('should not be able to get a user\'s watcher for a photo after unwatched', async () => {
      const guid = uuid()
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      const photo = await createWatchedPhoto(location, guid)

      await request
        .post(`/photos/${photo.id}/watchers`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })

      await request
        .delete(`/photos/${photo.id}/watchers`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })

      const responseWatcher =
      await request
        .get(`/photos/${photo.id}/watchers/${guid}`)
        .set('Content-Type', 'application/json')


      expect(responseWatcher.status).to.equal(404)
      expect(responseWatcher.body.error).to.equal('Unable to find watcher')
    })
  })

  describe('updating watchers', () => {
    it('should automatically start watching a newly uploaded photo', async () => {
      const guid = uuid()

      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }

      const photoResponse =
      await request
        .post('/photos')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ location })

      const watchers = await Watcher.findAll()

      expect(watchers.length).to.equal(1)
      expect(watchers[0].uuid).to.equal(guid)
      expect(watchers[0].photoId).to.equal(photoResponse.body.photo.id)
    })


    it('should delete all watchers records for deleted photo', async () => {
      const guid = uuid()
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }

      const photoResponse1 =
      await request
        .post('/photos')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ location })

      const photoResponse2 =
        await request
          .post('/photos')
          .set('Content-Type', 'application/json')
          .send({ uuid: guid })
          .send({ location })


      let watchers = await Watcher.findAll()

      expect(watchers.length).to.equal(2)
      expect(watchers[0].uuid).to.equal(guid)
      expect(watchers[1].uuid).to.equal(guid)
      expect(watchers[0].photoId).to.equal(photoResponse1.body.photo.id)
      expect(watchers[1].photoId).to.equal(photoResponse2.body.photo.id)

      await request
        .delete(`/photos/${photoResponse1.body.photo.id}`)
        .set('Content-Type', 'application/json')

      watchers = await Watcher.findAll()
      expect(watchers.length).to.equal(1)
      expect(watchers[0].uuid).to.equal(guid)
      expect(watchers[0].photoId).to.equal(photoResponse2.body.photo.id)
    })

    it('should update all watchers when new comment is posted', async () => {
      // create a photo with two watchers
      const guid1 = uuid()
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }

      const photoResponse1 =
      await request
        .post('/photos')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid1 })
        .send({ location })

      const guid2 = uuid()
      const watcherResponse = await request
        .post(`/photos/${photoResponse1.body.photo.id}/watchers`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid2 })

      expect(watcherResponse.status).to.equal(201)
      expect(watcherResponse.body.status).to.equal('success')
      expect(watcherResponse.body).to.have.property('watcher')

      // check updatedAt for both.
      const watchers = await Watcher.findAll()
      expect(watchers.length).to.equal(2)
      expect(watchers[0].updatedAt).to.not.equal(watchers[1].updatedAt)
      // add comment to photo
      const guid3 = uuid()
      const comment = 'comment1'

      await request
        .post(`/photos/${photoResponse1.body.photo.id}/comments`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid3 })
        .send({ comment })
      // check updatedAt has changed for both watchers and is the same
      const watchersUpdated = await Watcher.findAll()
      expect(watchersUpdated.length).to.equal(3)
      expect(watchersUpdated[0].updatedAt.toString())
        .to.equal(watchersUpdated[1].updatedAt.toString())
      expect(watchersUpdated[1].updatedAt.toString())
        .to.equal(watchersUpdated[2].updatedAt.toString())
    })
  })

  describe('feed.forWatchers', () => {
    it('should not be able to get a watchers feed with no parameters', async () => {
      const response =
      await request
        .post('/photos/feedForWatcher')
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('parameters missing')
    })


    it('should be able to query feed photos by specific watcher', async () => {
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      const guid = uuid()

      await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)

      const response =
      await request
        .post('/photos/feedForWatcher')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ pageNumber: 0 })

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')
      expect(response.body.photos.length).to.equal(6)
      expect(response.body.photos[0]).to.have.property('commentsCount')
      expect(response.body.photos[0].commentsCount).to.eq('0')
      expect(response.body.photos[0]).to.have.property('id')
      expect(response.body.photos[0]).to.have.property('uuid')
      expect(response.body.photos[0]).to.have.property('location')
      expect(response.body.photos[0]).to.have.property('createdAt')
      // expect(response.body.photos[0]).to.have.property('distance')
      expect(response.body.photos[0]).to.have.property('getImgUrl')
      expect(response.body.photos[0]).to.have.property('getThumbUrl')
      expect(response.body.photos[0].active).to.eq(true)
      expect(response.body.photos[0].likes).to.eq(3)
      expect(response.body.batch).to.equal(0)
    })

    it('should return the passed in batch number', async () => {
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      const guid = uuid()

      await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)

      const batch = 123321

      const response =
      await request
        .post('/photos/feedForWatcher')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ pageNumber: 0 })
        .send({ batch })

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')

      expect(response.body.batch).to.equal(batch)
    })


    it('should show the right number of comments in the feed.forWatchers photos', async () => {
      const guid = uuid()

      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }

      const photo = await createWatchedPhoto(location, guid)

      // add some comments here
      const comments = ['comment1', 'comment2', 'comment3']
      comments.forEach(async (comment) => {
        await request
          .post(`/photos/${photo.id}/comments`)
          .set('Content-Type', 'application/json')
          .send({ uuid: guid })
          .send({ comment })
      })
      await sleep(500)

      const response =
      await request
        .post('/photos/feedForWatcher')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ pageNumber: 0 })

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')

      expect(response.body.photos.length).to.equal(1)
      expect(response.body.photos[0]).to.have.property('commentsCount')
      expect(response.body.photos[0].commentsCount).to.eq('3')
      expect(response.body.photos[0]).to.have.property('id')
      expect(response.body.photos[0]).to.have.property('uuid')
      expect(response.body.photos[0]).to.have.property('location')
      expect(response.body.photos[0]).to.have.property('createdAt')
      expect(response.body.photos[0]).to.have.property('getImgUrl')
      expect(response.body.photos[0]).to.have.property('getThumbUrl')
      expect(response.body.photos[0].active).to.eq(true)
      expect(response.body.photos[0].likes).to.eq(3)
    })

    it('should show watch photos that are commented on', async () => {
      const guid = uuid()

      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }

      const photo = await createWatchedPhoto(location)

      // add some comments here
      const comments = ['comment1', 'comment2', 'comment3']
      comments.forEach(async (comment) => {
        await request
          .post(`/photos/${photo.id}/comments`)
          .set('Content-Type', 'application/json')
          .send({ uuid: guid })
          .send({ comment })
      })
      await sleep(500)

      const response =
      await request
        .post('/photos/feedForWatcher')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ pageNumber: 0 })

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')

      expect(response.body.photos.length).to.equal(1)
      expect(response.body.photos[0].uuid).to.not.eq(guid)
    })


    it('should not include unwatched photo in the feed feed.forWatchers photos', async () => {
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      const guid = uuid()

      const photo1 = await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)
      const photo2 = await createWatchedPhoto(location, guid)

      // these photos will be watched by different watchers,
      // since UUID is not the one we are interested in
      const photo3 = await createWatchedPhoto(location)
      await createWatchedPhoto(location)
      await createWatchedPhoto(location)
      await createWatchedPhoto(location)
      const photo4 = await createWatchedPhoto(location)
      await createWatchedPhoto(location)

      const response =
      await request
        .post('/photos/feedForWatcher')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ pageNumber: 0 })

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')

      expect(response.body.photos.length).to.equal(6)

      // lets unwatch few photos
      await request
        .delete(`/photos/${photo1.id}/watchers`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
      await request
        .delete(`/photos/${photo2.id}/watchers`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        // these photos are not watched by this uuid so should really make no difference,
        // but still will do it to make sure
      await request
        .delete(`/photos/${photo3.id}/watchers`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
      await request
        .delete(`/photos/${photo4.id}/watchers`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })

      const response2 =
        await request
          .post('/photos/feedForWatcher')
          .set('Content-Type', 'application/json')
          .send({ uuid: guid })
          .send({ pageNumber: 0 })

      expect(response2.status).to.equal(200)
      expect(response2.body.status).to.equal('success')

      expect(response2.body.photos.length).to.equal(4)
    })


    it('should maintain the correct order in feed.forWatchers photos', async () => {
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      const guid = uuid()

      await createWatchedPhoto(location, guid)
      const photo2 = await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)
      const photo4 = await createWatchedPhoto(location, guid)
      await createWatchedPhoto(location, guid)
      const photo6 = await createWatchedPhoto(location, guid)

      // these photos will be watched by different watchers,
      // since UUID is not the one we are interested in
      await createWatchedPhoto(location)
      await createWatchedPhoto(location)
      await createWatchedPhoto(location)
      await createWatchedPhoto(location)
      await createWatchedPhoto(location)
      await createWatchedPhoto(location)

      let response =
      await request
        .post('/photos/feedForWatcher')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ pageNumber: 0 })

      expect(response.body.photos[0].id).to.equal(photo6.id)

      // lets update photo4
      await request
        .post(`/photos/${photo4.id}/comments`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ comment: 'test comment' })
      response =
      await request
        .post('/photos/feedForWatcher')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ pageNumber: 0 })

      expect(response.body.photos[0].id).to.equal(photo4.id)
      expect(response.body.photos[1].id).to.equal(photo6.id)

      // lets update photo2
      await request
        .post(`/photos/${photo2.id}/comments`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ comment: 'test comment' })
      response =
      await request
        .post('/photos/feedForWatcher')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ pageNumber: 0 })

      expect(response.body.photos[0].id).to.equal(photo2.id)
      expect(response.body.photos[1].id).to.equal(photo4.id)
      expect(response.body.photos[2].id).to.equal(photo6.id)
    })


    it('should paginate through  feed.forWatchers photos', async () => {
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      const guid = uuid()

      for (let i = 0; i < 20; i++) { // eslint-disable-line no-plusplus
        await createWatchedPhoto(location, guid) // eslint-disable-line no-await-in-loop
      }


      let response =
      await request
        .post('/photos/feedForWatcher')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ pageNumber: 0 })
        .send({ pageLimit: 15 })

      expect(response.body.photos.length).to.equal(15)

      response =
      await request
        .post('/photos/feedForWatcher')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ pageNumber: 1 })
        .send({ pageLimit: 15 })

      expect(response.body.photos.length).to.equal(5)
    })
  })
})
