import { Request, Response } from 'express'
import boardController, { allPositions } from '../src/controllers/boardController'

describe('Validation Middleware', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>

    beforeEach(() => {
        mockRequest = {
            body: {
                word: 'abcced',
                board: [
                    ['a','b','c','e'],
                    ['s','f','c','s'],
                    ['a','d','e','e']
                ]
            }
        }
        mockResponse = {
            json: jest.fn()
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    /**
     * Tests Section
     */
    test('First letter not found', () => {
        mockRequest.body.word = 'gbcced'

        const expected = {
            error: 'No se encontró la primera letra de la palabra en la matriz'
        }
        const expectedStatus = 418

        boardController(mockRequest as Request, mockResponse as Response)

        expect(mockResponse.json).toBeCalledWith(expected)
        expect(mockResponse.statusCode).toBe(expectedStatus)
    })

    test('allPositions FUNCTION - return coordinates', () => {
        const mockBoard = [
            ['a','b','c','e'],
            ['e','f','c','s'],
            ['a','d','e','e']
        ]
        const searchLetter = 'e'

        const result = allPositions(mockBoard , searchLetter)
        const expected =[[0,3],[1,0],[2,2],[2,3]]

        expect(result).toStrictEqual(expected)
    })
})