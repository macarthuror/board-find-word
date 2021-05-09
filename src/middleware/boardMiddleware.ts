import { Request, Response, NextFunction } from 'express'

/**
 * Board request validator, verify and cast the data for the controller
 */
export default async function validationMiddleware(req: Request, res: Response, next: NextFunction): Promise<void | Object> {
    const word =  req.body?.word
    const board =  req.body?.board

    if (!word || !board) {
        res.statusCode = 403
        return res.json({ error: 'No se mandaron los parametros requeridos' });
    }

    if (!isString(word)) {
        res.statusCode = 403
        return res.json({ error: 'word - debe de ser una palabra y no debe contener caracteres especiales' });
    }

    if (!isArray(board) || !board.every(isArray)) {
        res.statusCode = 403
        return res.json({ error: 'board - debe de ser una matriz' });
    }

    if (!isStringArray(board)) {
        res.statusCode = 403
        return res.json({ error: 'board - debe de ser una matriz de letras' });
    }

    if (!isStringArray(board, true)) {
        res.statusCode = 403
        return res.json({ error: 'board - la matriz debe tener solo una letra por slot' });
    }

    req.body = {
        word: word.toLowerCase(),
        board: arrToLowerCase(board)
    }

    next()
}

/**
 * HELPERS
 */
 function isString(value: any): Boolean {
    const regex = /^[a-zA-Z]+$/gis
    return typeof value === 'string' && regex.test(value)
}

function isArray(value: any): Boolean {
    return Array.isArray(value)
}

function isStringArray(arr: String[][], length: Boolean = false): Boolean {
    const fn = length ? (el: any) => el.length === 1 : isString
    return arr.every(sub => {
        return sub.every(fn)
    })
}

function arrToLowerCase(arr: String[][]): String[][] {
    return arr.map((sub: String[]) => {
        return sub.map((val: String) => val.toLowerCase())
    })
}
