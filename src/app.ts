import express, { Application, Request, Response } from "express"
import boardController from './controllers/boardController'
import boardMiddleware from './middleware/boardMiddleware'

export const app: Application = express()

app.use(express.json())

app.get("/", (req: Request, res: Response): any => {
  res.send("El path correcto es POST:/board")
})

app.get("/board", (req: Request, res: Response): any => {
  res.send("Debe ser esta ruta pero por POST")
})

app.post("/board", boardMiddleware, boardController)
