import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import rutaUsuariosTuti from './routers/usuarioTutiRoutes.js'
import rutaClientesTuti from './routers/clientesTutiRoutes.js'
import rutaProductosTuti from './routers/productosTutiRoutes.js'
import rutaPedidosTuti from './routers/pedidosTutiRoutes.js'

const app = express()
dotenv.config()
app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(express.json())

app.use('/api/', rutaUsuariosTuti)
app.use('/api/', rutaClientesTuti)
app.use('/api/', rutaProductosTuti)
app.use('/api/', rutaPedidosTuti)

app.use((req, res) => {
    res.status(404).json({ msg: 'Ruta no encontrada' })
})

export default app