import request from 'supertest'

describe('🚧 Ping API 🚧', () => {
  beforeEach(async () => { })
  afterEach(async  () => { })

  beforeAll(async () => { })
  afterAll(async  () => { })

  describe('🚥 [GET] /ping 🚥', () => {
    describe('✅ 정상적인 경우 ✅', () => {
      test('👉 올바른 endpoint를 호출 했을 때, pong 메세지를 확인 할 수 있다.', async () => {
        const response = await request(testClient.app)
          .get('/ping')
          .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({message: 'pong'})
      })
    })

    describe('⛔️ 예외적인 경우 ⛔️', () => {
      test('👉 올바르지 않은 endpoint를 호출 했을 떄, 404 status code를 확인할 수 있다.', async () => {
        const response = await request(testClient.app)
          .post('/ping')
          .send({ data: "something" })

        expect(response.statusCode).toEqual(404)
        expect(response.body).toEqual({message: "Can’t fine /ping on this server!"})
      })      
    })
  })
})