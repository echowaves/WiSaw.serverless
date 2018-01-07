import assert from 'assert'
import devconfig from '../../../devconfig'
import supertest from 'supertest'
import chai from 'chai'

console.log("devconfig.HOST", devconfig.HOST)

const request = supertest(devconfig.HOST)
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
