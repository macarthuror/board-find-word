import { searchInBoard } from '../src/controllers/boardController'

describe('Validation Middleware', () => {
    let mockWord: String[]
    let mockBoard: String[][]

    afterEach(() => {
        mockWord = ['a', 'b', 'c', 'c', 'e', 'd']
        mockBoard = [
            ['a','b','c','e'],
            ['s','f','c','s'],
            ['a','d','e','e']
        ]
        jest.clearAllMocks()
    })

    /**
     * Tests Section
     */
     test('test', () => {
        expect(true).toBe(true)
    })
    // test('Cast all to lowercase', () => {

    //     const expected = true
    //     const result = searchInBoard(mockBoard, mockWord, 0, [])
    // })
})