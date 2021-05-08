import { Request, Response, NextFunction } from 'express'
import validationMiddleware from '../src/middleware/boardMiddleware'

describe('Validation Middleware', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let nextFunction: NextFunction = jest.fn()

    beforeEach(() => {
        mockRequest = {
            body: null
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
    test('Shoud Fail Validation- empty request', () => {
        const expected = {
            error: 'No se mandaron los parametros requeridos'
        }
        const expectedStatus = 403

        validationMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)

        expect(mockResponse.json).toBeCalledWith(expected)
        expect(mockResponse.statusCode).toBe(expectedStatus)
    })

    test('Shoud Fail Validation- word is not string', () => {
        mockRequest = {
            body: {
                word: 10,
                board: [['A','B','C'],['A','B','C']]
            }
        }
        const expected = {
            error: 'word - debe de ser una palabra y no debe contener caracteres especiales'
        }
        const expectedStatus = 403

        validationMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)

        expect(mockResponse.json).toBeCalledWith(expected)
        expect(mockResponse.statusCode).toBe(expectedStatus)
    })

    test('Shoud Fail Validation- word contains special characters', () => {
        mockRequest = {
            body: {
                word: 'pala3b.ra',
                board: 'null'
            }
        }
        const expected = {
            error: 'word - debe de ser una palabra y no debe contener caracteres especiales'
        }
        const expectedStatus = 403

        validationMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)

        expect(mockResponse.json).toBeCalledWith(expected)
        expect(mockResponse.statusCode).toBe(expectedStatus)
    })

    test('Shoud Fail Validation- board is not an array', () => {
        mockRequest = {
            body: {
                word: 'palabra',
                board: 'null'
            }
        }
        const expected = {
            error: 'board - debe de ser una matriz'
        }
        const expectedStatus = 403

        validationMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)

        expect(mockResponse.json).toBeCalledWith(expected)
        expect(mockResponse.statusCode).toBe(expectedStatus)
    })

    test('Shoud Fail Validation- board is not a matrix', () => {
        mockRequest = {
            body: {
                word: 'palabra',
                board: [[1,2,3], 4]
            }
        }
        const expected = {
            error: 'board - debe de ser una matriz'
        }
        const expectedStatus = 403

        validationMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)

        expect(mockResponse.json).toBeCalledWith(expected)
        expect(mockResponse.statusCode).toBe(expectedStatus)
    })

    test('Shoud Fail Validation- board is not a string matrix', () => {
        mockRequest = {
            body: {
                word: 'palabra',
                board: [[1,2,3], [4,5,6]]
            }
        }
        const expected = {
            error: 'board - debe de ser una matriz de letras'
        }
        const expectedStatus = 403

        validationMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)

        expect(mockResponse.json).toBeCalledWith(expected)
        expect(mockResponse.statusCode).toBe(expectedStatus)
    })

    test('Shoud Fail Validation- Board needs to be only one letter por slot', () => {
        mockRequest = {
            body: {
                word: 'palabra',
                board: [['AA','BB','C'], ['D','E','F']]
            }
        }
        const expected = {
            error: 'board - la matriz debe tener solo una letra por slot'
        }
        const expectedStatus = 403

        validationMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)

        expect(mockResponse.json).toBeCalledWith(expected)
        expect(mockResponse.statusCode).toBe(expectedStatus)
    })

    test('All data is correctly verified', () => {
        mockRequest = {
            body: {
                word: 'palabra',
                board: [['A','B','C'], ['D','E','F']]
            }
        }

        validationMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)

        expect(nextFunction).toBeCalledTimes(1)
    })

    test('Cast all to lowercase', () => {
        mockRequest = {
            body: {
                word: 'PALABRA',
                board: [['A','B','C'], ['D','E','F']]
            }
        }
        const expectedWord = 'palabra'
        const expectedBoard = [['a','b','c'],['d','e','f']]

        validationMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)

        expect(mockRequest.body.word).toBe(expectedWord)
        expect(mockRequest.body.board).toStrictEqual(expectedBoard)
        expect(nextFunction).toBeCalledTimes(1)
    })
})