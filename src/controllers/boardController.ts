import { Request, Response } from "express";

/**
 * Board Controller - Request Handler
 */
export default function boardMiddleware(req: Request, res: Response): any {
    const { word, board }: { word: String, board: String[][]} = req.body

    const wordArr: String[] = Array.from(word)
    const firstLetterExist: Boolean = board.flat().some((v: String) => v === wordArr[0])

    if (!firstLetterExist) {
        res.statusCode = 418
        return res.json({ error: 'No se encontró la primera letra de la palabra en la matriz' });
    }

    // All the positions of the first letter
    // in case the first position doesent find the word
    const coordinates = allPositions(board, wordArr[0])
    // TODO: Llamar a searchInBoard para poder buscar las demas letras
}


/**
 * HELPERS
 */
 interface usedPosition {
    x: Number,
    y: Number
}

export function searchInBoard(board: String[][], word: String[], wordPosition: Number, used: usedPosition[]): Boolean {
    return true
}

export function allPositions(arr: String[][], search: String): Number[][] {
    let currentRow: Number
    const coordinates: Number[][] = []
    arr.forEach((row, index)=> {
        currentRow = index
        row.forEach((sub, subInd) => {
            if(sub === search) coordinates.push([currentRow, subInd])
        })
    })

    return coordinates
}