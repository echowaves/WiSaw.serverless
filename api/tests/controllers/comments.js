import uuid from 'uuid'
import fs from 'fs'
import moment from 'moment'

import supertest from 'supertest'
import chai from 'chai'
import axios from 'axios'
import { config } from '../../../.env.test'

import Photo from '../../src/models/photo'
import Comment from '../../src/models/comment'

const request = supertest(config().HOST)
const { expect } = chai // BDD/TDD assertion library

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
})
