import {config} from '../../../.env.test'

import assert from 'assert'
import supertest from 'supertest'
import chai from 'chai'

const request = supertest(config().HOST)
const expect = chai.expect  // BDD/TDD assertion library

describe('/hello', () => {
  it.only('should be able respond to a health check',  async ()  => {
    var response =
    await request
      .get('/hello')
      .set('Content-Type', 'application/json')


    expect(response.status).to.equal(200)
    expect(response.body).to.equal('Hello WiSaw world!')
  })

})
