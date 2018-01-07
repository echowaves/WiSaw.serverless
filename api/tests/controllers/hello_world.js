import assert from 'assert'
import test_config from '../../../test_config'
import supertest from 'supertest'
import chai from 'chai'

console.log("test_config.HOST", test_config.HOST)

const request = supertest(test_config.HOST)
const expect = chai.expect  // BDD/TDD assertion library

describe('/hello', () => {
  it('should be able respond to a health check',  async ()  => {
    var response =
    await request
      .get('/hello')
      .set('Content-Type', 'application/json')


    expect(response.status).to.equal(200)
    expect(response.body).to.equal('Hello WiSaw world!')
  })

})
