import {config} from '../../../.env.test'

import assert from 'assert'
import supertest from 'supertest'
import chai from 'chai'

const request = supertest(config().HOST)
const expect = chai.expect  // BDD/TDD assertion library

import uuid from 'uuid'
import fs from 'fs'

describe('/photos', () => {

  it('should not be able to post a photo with no parameters',  async ()  => {
    var response =
    await request
      .post('/photos')
      .set('Content-Type', 'application/json')


    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal('parameters missing')
  })


  it('should be able to post a photo with right parameters',  async ()  => {

    let guid = uuid()
    var point = { type: 'Point', coordinates: [-29.396377, -137.585190]};
    var contents = [...fs.readFileSync('./api/tests/controllers/data/FooBuz.png')]

    // console.log("contents.size: ", contents.length)

    var response =
    await request
      .post('/photos')
      .set('Content-Type', 'application/json')
      .send({uuid: guid})
      .send({location: point})
      .send({imageData: contents})

    expect(response.status).to.equal(201)
    expect(response.body.status).to.equal('success')
    expect(response.body.id).to.be.gt(0)

  })

  it('should not be able to get a photo feed with no parameters',  async ()  => {
    var response =
    await request
      .post('/photos/feed')
      .set('Content-Type', 'application/json')


    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal('parameters missing')
  })


  it('should be able to query feed photos',  async ()  => {
    var location = { type: 'Point', coordinates: [38.80,-77.98]};

    var response =
    await request
      .post('/photos/feed')
      .set('Content-Type', 'application/json')
      .send({location})

    expect(response.body.photos.length).to.not.equal(0)
    expect(response.body.photos[0]).to.have.property('id')
    expect(response.body.photos[0]).to.have.property('uuid')
    expect(response.body.photos[0]).to.have.property('location')
    expect(response.body.photos[0]).to.have.property('thumbNail')
    expect(response.body.photos[0]).to.not.have.property('imageData')
    expect(response.body.photos[0]).to.have.property('createdAt')
    expect(response.body.photos[0]).to.have.property('distance')

    expect(response.status).to.equal(200)
    expect(response.body.status).to.equal('success')

    // console.log("photos: ", response.body.photos.length)
    // logger.debug("photos: ", response.body.photos[0])
  })


  it('should be able to get one photo by id',  async ()  => {
    let guid = uuid()

    var point = { type: 'Point', coordinates: [-29.396377, -137.585190]};
    var contents = [...fs.readFileSync('./api/tests/controllers/data/FooBuz.png')]

    var photo_response =
    await request
      .post('/photos')
      .set('Content-Type', 'application/json')
      .send({uuid: guid})
      .send({location: point})
      .send({imageData: contents})


    var response =
    await request
      .get('/photos/' + photo_response.body.id)
      .set('Content-Type', 'application/json')

    expect(response.body.photo).to.have.property('id')
    expect(response.body.photo).to.have.property('uuid')
    expect(response.body.photo).to.have.property('location')
    expect(response.body.photo).to.have.property('thumbNail')
    expect(response.body.photo).to.have.property('imageData')
    expect(response.body.photo).to.have.property('createdAt')
    expect(response.body.photo).to.not.have.property('distance')

    expect(response.body.photo.id).to.eq(photo_response.body.id)

    expect(response.status).to.equal(200)
    expect(response.body.status).to.equal('success')
  })


  it('should not be able to get non existing photo by id',  async ()  => {
    var response =
    await request
      .get('/photos/' + 0)
      .set('Content-Type', 'application/json')


    expect(response.status).to.equal(404)
    expect(response.body.error).to.equal('not found')

  })



  it('should be able to delete a photo by id',  async ()  => {
    let guid = uuid()

    var point = { type: 'Point', coordinates: [-29.396377, -137.585190]};
    var contents = [...fs.readFileSync('./api/tests/controllers/data/FooBuz.png')]

    var photo_response =
    await request
      .post('/photos')
      .set('Content-Type', 'application/json')
      .send({uuid: guid})
      .send({location: point})
      .send({imageData: contents})


    var response =
    await request
      .delete('/photos/' + photo_response.body.id )
      .set('Content-Type', 'application/json')


    expect(response.status).to.equal(200)
    expect(response.body.status).to.equal('success')

  })

})