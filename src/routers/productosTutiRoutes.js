import {Router} from 'express'
import { ActualizarProducto, CrearProducto, DetalleProducto, EliminarProducto, ListarProductos } from '../controllers/productosTutiController.js'
import validarJWT from '../middlewares/validacion.js'

const router = Router()

router.post('/crearProductos', validarJWT,CrearProducto)
router.get('/listarProductos', validarJWT,ListarProductos)
router.get('/detalleProducto/:id', validarJWT,DetalleProducto)
router.put('/actualizarProducto/:id', validarJWT, ActualizarProducto)
router.delete('/eliminarProducto/:id', validarJWT, EliminarProducto)

export default router