import {Router} from 'express'
import {ActualizarPedido, CrearPedido, DetallePedido, EliminarPedido, ListarPedidos} from '../controllers/pedidosTutiController.js'
import validarJWT from '../middlewares/validacion.js'

const router = Router()

router.post('/crearPedido', validarJWT, CrearPedido)
router.get('/listarPedidos', validarJWT, ListarPedidos)
router.get('/detallePedido/:id', validarJWT, DetallePedido)
router.put('/actualizarPedido/:id', validarJWT, ActualizarPedido)
router.delete('/eliminarPedido/:id', validarJWT, EliminarPedido)

export default router