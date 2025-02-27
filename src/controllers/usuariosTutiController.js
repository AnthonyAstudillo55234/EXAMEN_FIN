import crearJWT from '../helpers/crearJWT.js'
import UsuariosTuti from '../models/usuariosTuti.js'

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ msg: 'Llenar todos los campos' })
        }
        if (password.length < 6) {
            return res.status(400).json({ msg: 'La contraseña debe tener al menos 6 caracteres' })
        }
        const validacionEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
        if (!validacionEmail.test(email)) {
            return res.status(400).json({ msg: 'Correo no valido' })
        }
        const usuario = await UsuariosTuti.findOne({email}).select('+password')
        if (!usuario) {
            return res.status(400).json({ msg: 'Usuario no encontrado' })
        }
        const passwordValido = password === usuario.password
        if (!passwordValido) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' })
        }
        const token = crearJWT(usuario.id, "usuario")
        return res.status(200).json({token, nombre: usuario.nombre, apellido: usuario.apellido, email: usuario.email})
    }catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al iniciar sesión' })
    }
}

export default Login