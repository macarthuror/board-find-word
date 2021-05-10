import { searchInBoard } from '../src/controllers/boardController'

describe('Validation Middleware', () => {
    let mockWord: string[]
    let mockBoard: string[][]

    beforeEach(() => {
        mockWord = ['a', 'b', 'c', 'c', 'e', 'd']
        mockBoard = [
            ['a','b','c','e'],
            ['s','f','c','s'],
            ['a','d','e','e']
        ]
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    /**
     * Tests Section
     */
    test('Shoud fail - word not exist "ag"', () => {
        const word = ['a', 'g']
        const expected = false
        const result = searchInBoard(mockBoard, word, 0, 0, 0)

        expect(result).toBe(expected)
    })

    test('Shoud fail - word not exist "asg"', () => {
        mockWord = ['a', 's', 'g']
        const expected = false
        const result = searchInBoard(mockBoard, mockWord, 0, 0, 0)

        expect(result).toBe(expected)
    })

    test('Short word "ab"', () => {
        mockWord = ['a', 'b']
        const expected = true
        const result = searchInBoard(mockBoard, mockWord, 0, 0, 0)

        expect(result).toBe(expected)
    })

    test('Short word "abc"', () => {
        mockWord = ['a', 'b', 'c']
        const expected = true
        const result = searchInBoard(mockBoard, mockWord, 0, 0, 0)

        expect(result).toBe(expected)
    })

    test('Two lines word "abcc"', () => {
        mockWord = ['a', 'b', 'c', 'c']
        const expected = true
        const result = searchInBoard(mockBoard, mockWord, 0, 0, 0)

        expect(result).toBe(expected)
    })

    test('Two lines word "abf"', () => {
        mockWord = ['a', 'b', 'f']
        const expected = true
        const result = searchInBoard(mockBoard, mockWord, 0, 0, 0)

        expect(result).toBe(expected)
    })

    test('complete word "abcced"', () => {
        const expected = true
        const result = searchInBoard(mockBoard, mockWord, 0, 0, 0)

        expect(result).toBe(expected)
    })
})