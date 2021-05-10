import request from 'supertest'
import { app } from '../src/app'

describe('Request - response', () => {

  it('POST - valid word', async () => {
    const result = await request(app).post('/board').send({
        word: 'abcced',
        board: [
            ['a','b','c','e'],
            ['s','f','c','s'],
            ['a','d','e','e']
        ]
    })
    const expectedBody = true
    const expectedStatus = 200

    expect(result.body).toBe(expectedBody)
    expect(result.status).toBe(expectedStatus)
  });

  it('POST- Shoud Fail- not found word', async () => {
    const result = await request(app).post('/board').send({
        word: 'abcb',
        board: [
            ['a','b','c','e'],
            ['s','f','c','s'],
            ['a','d','e','e']
        ]
    })
    const expectedBody = false
    const expectedStatus = 200

    expect(result.body).toBe(expectedBody)
    expect(result.status).toBe(expectedStatus)
  });

  it('GET - label text', async () => {
    const result = await request(app).get('/board').send()
    const expected = 'Debe ser esta ruta pero por POST'
    const expectedStatus = 200
    
    expect(result.status).toBe(expectedStatus)
    expect(result.text).toBe(expected)
  })

  it('GET - root page', async () => {
    const result = await request(app).get('/').send()
    const expected = 'El path correcto es POST:/board'
    const expectedStatus = 200
    
    expect(result.status).toBe(expectedStatus)
    expect(result.text).toBe(expected)
  })

})
