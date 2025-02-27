import {Router} from 'express'
import Login from '../controllers/usuariosTutiController.js'

const router = Router()

router.post('/login', Login)

export default router