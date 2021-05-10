import { app } from './app'
import consola from 'consola'

const PORT = process.env.PORT || 9009

app.listen(PORT, () => {
  consola.ready(`Servidor corriendo es http://localhost:${PORT}`)
})
