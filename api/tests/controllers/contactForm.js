import uuid from 'uuid'
import supertest from 'supertest'
import chai from 'chai'

import { config } from '../../../.env.test'


const request = supertest(config().HOST)
const { expect } = chai // BDD/TDD assertion library

describe('/contactform', () => {
  it('should not be able to post an contactForm with no parameters', async () => {
    const response =
    await request
        .post('/contactform')
        .set('Content-Type', 'application/json')

    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal('parameters missing')
  })

  it('should be able to post an contactForm with right parameters', async () => {
    const guid = uuid()
    const description = 'test contact form'
    const response =
    await request
        .post('/contactform')
        .set('Content-Type', 'application/json')
        .send({ uuid: guid })
        .send({ description })

    expect(response.status).to.equal(201)
    expect(response.body.status).to.equal('success')
  })
})
