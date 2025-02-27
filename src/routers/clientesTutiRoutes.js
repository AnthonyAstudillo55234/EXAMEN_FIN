import {Router} from 'express'
import {ActualizarCliente, CrearCliente, DetalleCliente, EliminarCliente, ListarClientes} from '../controllers/clientesTutiController.js'
import validarJWT from '../middlewares/validacion.js'

const router = Router()

router.post('/crearCliente', validarJWT,CrearCliente)
router.get('/listarClientes', validarJWT,ListarClientes)
router.get('/detalleCliente/:id', validarJWT,DetalleCliente)
router.put('/actualizarCliente/:id', validarJWT, ActualizarCliente)
router.delete('/eliminarCliente/:id', validarJWT, EliminarCliente)

export default router