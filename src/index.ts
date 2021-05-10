import express, { Application, Request, Response } from "express"
import boardController from './controllers/boardController'
import boardMiddleware from './middleware/boardMiddleware'
import consola from 'consola'

const PORT = process.env.PORT || 9009

const app: Application = express()

app.use(express.json())

app.get("/", (req: Request, res: Response): any => {
  res.send("El path correcto es POST:/board")
})

app.get("/board", (req: Request, res: Response): any => {
  res.send("Debe ser esta ruta pero por POST")
})

app.post("/board", boardMiddleware, boardController)

app.listen(PORT, () => {
  consola.ready(`Servidor corriendo es http://localhost:${PORT}`)
})
