import supertest from 'supertest'
import chai from 'chai'

import { config } from '../../../.env.test'

const request = supertest(config().HOST)
const { expect } = chai // BDD/TDD assertion library

describe('/hello', () => {
  it('should be able respond to a health check', async () => {
    const response =
    await request
        .get('/hello')
        .set('Content-Type', 'application/json')

    expect(response.status).to.equal(200)
    expect(response.body).to.equal('Hello WiSaw world!')
  })
})
