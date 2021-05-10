import { Request, Response } from "express";

/**
 * Board Controller - Request Handler
 */
export default function boardMiddleware(req: Request, res: Response): any {
    const { word, board }: { word: string, board: string[][]} = req.body

    let result: boolean = false
    const wordArr: string[] = Array.from(word)
    const firstLetterExist: boolean = board.flat().some((v: string) => v === wordArr[0])

    if (!firstLetterExist) {
        res.statusCode = 418
        return res.json({ error: 'No se encontró la primera letra de la palabra en la matriz' });
    }

    if (word.length === 1) {
        res.statusCode = 200
        return res.send(true)
    }

    // All the positions of the first letter
    // in case the first position doesent find the word
    const coordinates = allPositions(board, wordArr[0])
    
    for (const [x,y] of coordinates) {
        if(searchInBoard(board, wordArr, 0, x, y)) result = true
    }

    res.statusCode = 200
    return res.send(result)
}


/**
 * HELPERS
 */

export function searchInBoard(board: string[][], word: string[], wordPosition: number, x: number, y: number): boolean {   
    if (wordPosition == word.length) return true
    
    if (x < 0 || x >= board.length ||
        y < 0 || y >= board[0].length ||
        board[x][y] != word[wordPosition]
    ) return false

    board[x][y] = '@'
    
    return searchInBoard(board, word, wordPosition + 1, x - 1, y) || 
    searchInBoard(board, word, wordPosition + 1, x + 1, y) || 
    searchInBoard(board, word, wordPosition + 1, x, y - 1) || 
    searchInBoard(board, word, wordPosition + 1, x, y + 1)

    
}

export function allPositions(arr: string[][], search: string): number[][] {
    
    let currentRow: number
    const coordinates: number[][] = []
    arr.forEach((row, index)=> {
        currentRow = index
        row.forEach((sub, subInd) => {
            if(sub === search) coordinates.push([currentRow, subInd])
        })
    })

    return coordinates
}
