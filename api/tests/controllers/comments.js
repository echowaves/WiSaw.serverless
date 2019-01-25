import uuid from 'uuid'
import moment from 'moment'

import supertest from 'supertest'
import chai from 'chai'
import { config } from '../../../.env.test'

import Photo from '../../src/models/photo'
import Comment from '../../src/models/comment'

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

describe('comments', () => {
  beforeEach(async () => {
    await Photo.destroy({
      where: {},
    })
    await Comment.destroy({
      where: {},
    })
  })
  describe('create', () => {
    it('should not be able to post a comment with no parameters', async () => {
      const response =
      await request
        .post('/photos/0/comments')
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(400)
      expect(response.body.error).to.equal('parameters missing')
    })

    it('should be able to post a comment with right parameters', async () => {
      const guid = uuid()
      const comment = 'comment1'
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      const photo = await createTestPhoto(location, 0)

      const response =
      await request
        .post(`/photos/${photo.id}/comments`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ comment })

      expect(response.status).to.equal(201)
      expect(response.body.status).to.equal('success')
      expect(response.body).to.have.property('comment')
    })
  })

  describe('delete', () => {
    it('should be able to delete a comment by id', async () => {
      const guid = uuid()
      const comment = 'comment1'
      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      const photo = await createTestPhoto(location, 0)

      const commentResponse =
      await request
        .post(`/photos/${photo.id}/comments`)
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ comment })

      const response =
      await request
        .delete(`/comments/${commentResponse.body.comment.id}`)
        .set('Content-Type', 'application/json')
        .send({ deactivatedBy: guid })

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')
      // expect(response.body.comment.uuid).to.equal(response.body.comment.deactivatedBy)
      // expect(response.body.comment.active).to.equal(false)
    })

    it('should not be able to delete non existing comment by id', async () => {
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

  describe('list', () => {
    it('should list comments in reverse order', async () => {
      const guid = uuid()
      const comments = ['comment1', 'comment2', 'comment3']

      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      const photo = await createTestPhoto(location, 0)

      // create 3 comments
      comments.forEach(async (comment) => {
        await request
          .post(`/photos/${photo.id}/comments`)
          .set('Content-Type', 'application/json')
          .send({ uuid: guid })
          .send({ comment })
      })

      await new Promise(resolve => setTimeout(resolve, 100)) // sleep

      const response =
      await request
        .get(`/photos/${photo.id}/comments`)
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')
      expect(response.body.comments.length).to.eq(comments.length)
      expect(response.body.comments[0].id).to.be.greaterThan(response.body.comments[1].id)
      expect(response.body.comments[1].id).to.be.greaterThan(response.body.comments[2].id)
    })

    it('should list only active comments', async () => {
      const guid = uuid()
      const comments = ['comment1', 'comment2', 'comment3']

      const location = { type: 'Point', coordinates: [-29.396377, -137.585190] }
      const photo = await createTestPhoto(location, 0)

      // create 3 comments
      comments.forEach(async (comment) => {
        await request
          .post(`/photos/${photo.id}/comments`)
          .set('Content-Type', 'application/json')
          .send({ uuid: guid })
          .send({ comment })
      })

      await new Promise(resolve => setTimeout(resolve, 100)) // sleep

      // need to do this so that we know the id's of the newly created comments
      const commentResponse =
      await request
        .get(`/photos/${photo.id}/comments`)
        .set('Content-Type', 'application/json')

      // deactivate here
      await request
        .delete(`/comments/${commentResponse.body.comments[0].id}`)
        .set('Content-Type', 'application/json')
        .send({ deactivatedBy: guid })

      await new Promise(resolve => setTimeout(resolve, 100)) // sleep

      const response =
      await request
        .get(`/photos/${photo.id}/comments`)
        .set('Content-Type', 'application/json')

      expect(response.status).to.equal(200)
      expect(response.body.status).to.equal('success')
      expect(response.body.comments.length).to.eq(comments.length - 1)
    })
  })
})
