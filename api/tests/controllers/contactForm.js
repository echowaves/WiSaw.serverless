import {config} from '../../../.env.test'

import assert from 'assert'
import supertest from 'supertest'
import chai from 'chai'

const request = supertest(config().HOST)
const expect = chai.expect  // BDD/TDD assertion library

import uuid from 'uuid'

describe('/contactform', () => {

  it('should not be able to post an contactForm with no parameters',  async ()  => {
    var response =
    await request
      .post('/contactform')
      .set('Content-Type', 'application/json')


    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal('parameters missing')
  })

  it('should be able to post an contactForm with right parameters',  async ()  => {
    let guid = uuid()
    let description = "test contact form"
    var response =
    await request
      .post('/contactform')
      .set('Content-Type', 'application/json')
      .send({uuid: guid})
      .send({description})

    expect(response.status).to.equal(201)
    expect(response.body.status).to.equal('success')
  })
})
