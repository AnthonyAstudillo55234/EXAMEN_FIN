import ClientesTuti from '../models/clientesTuti.js'
import mongoose from 'mongoose'

const CrearCliente = async (req, res) => {
    try {
        const { cedula, nombre, apellido, email, telefono, direccion, ciudad, fechaNacimiento} = req.body
        if (!cedula || !nombre || !apellido || !email || !telefono || !direccion || !ciudad || !fechaNacimiento) {
            return res.status(400).json({ msg: 'Llenar todos los campos' })
        }
        if (cedula.length < 10) {
            return res.status(400).json({ msg: 'La cedula debe tener al menos 10 caracteres' })
        }
        if (nombre.length < 3) {
            return res.status(400).json({ msg: 'El nombre debe tener al menos 3 caracteres' })
        }
        if (apellido.length < 3) {
            return res.status(400).json({ msg: 'El apellido debe tener al menos 3 caracteres' })
        }
        if (telefono.length < 10) {
            return res.status(400).json({ msg: 'El telefono debe tener al menos 10 caracteres' })
        }
        if (direccion.length < 3) {
            return res.status(400).json({ msg: 'La direccion debe tener al menos 3 caracteres' })
        }
        if (ciudad.length < 3) {
            return res.status(400).json({ msg: 'La ciudad debe tener al menos 3 caracteres' })
        }
        const validacionFecha = /^\d{4}-\d{2}-\d{2}$/;
        if (!validacionFecha.test(fechaNacimiento)) {
            return res.status(400).json({ msg: 'Fecha no valida ingrese el formato YYYY-MM-DD'})
        }
        const validacionEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
        if (!validacionEmail.test(email)) {
            return res.status(400).json({ msg: 'Correo no valido' })
        }
        const cliente = await ClientesTuti.findOne({email})
        if (cliente) {
            return res.status(400).json({ msg: 'Cliente ya registrado' })
        }
        const nuevoCliente = new ClientesTuti({
            cedula,
            nombre,
            apellido,
            email,
            telefono,
            direccion,
            ciudad,
            fechaNacimiento
        })
        await nuevoCliente.save()
        return res.status(201).json({ msg: 'Cliente creado' })
    }catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al crear cliente' })
    }
}

const ListarClientes = async (req, res) => {
    try {
        const clientes = await ClientesTuti.find()
        return res.status(200).json(clientes)
    }catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al listar clientes' })
    }
}

const DetalleCliente = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no valido' })
        }
        const cliente = await ClientesTuti.findById(id)
        if (!cliente) {
            return res.status(400).json({ msg: 'Cliente no encontrado' })
        }
        return res.status(200).json(cliente)
    }catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al mostrar cliente' })
    }
}

const ActualizarCliente = async (req, res) => {
    try {
        const { id } = req.params
        const { cedula, nombre, apellido, email, telefono, direccion, ciudad, fechaNacimiento} = req.body
        if (!cedula ||!nombre || !apellido || !email || !telefono || !direccion || !ciudad || !fechaNacimiento) {
            return res.status(400).json({ msg: 'Llenar todos los campos' })
        }
        if (cedula.length < 10) {
            return res.status(400).json({ msg: 'La cedula debe tener al menos 10 caracteres' })
        }
        if (nombre.length < 3) {
            return res.status(400).json({ msg: 'El nombre debe tener al menos 3 caracteres' })
        }
        if (apellido.length < 3) {
            return res.status(400).json({ msg: 'El apellido debe tener al menos 3 caracteres' })
        }
        if (telefono.length < 10) {
            return res.status(400).json({ msg: 'El telefono debe tener al menos 10 caracteres' })
        }
        if (direccion.length < 3) {
            return res.status(400).json({ msg: 'La direccion debe tener al menos 3 caracteres' })
        }
        if (ciudad.length < 3) {
            return res.status(400).json({ msg: 'La ciudad debe tener al menos 3 caracteres' })
        }
        const validacionFecha = /^\d{4}-\d{2}-\d{2}$/;
        if (!validacionFecha.test(fechaNacimiento)) {
            return res.status(400).json({ msg: 'Fecha no valida ingrese el formato YYYY/MM/DD'})
        }
        const validacionEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
        if (!validacionEmail.test(email)) {
            return res.status(400).json({ msg: 'Correo no valido' })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no valido' })
        }
        const cliente = await ClientesTuti.findById(id)
        if (!cliente) {
            return res.status(400).json({ msg: 'Cliente no encontrado' })
        }
        await ClientesTuti.findByIdAndUpdate(id, { cedula, nombre, apellido, email, telefono, direccion, ciudad, fechaNacimiento })
        return res.status(200).json({ msg: 'Cliente actualizado' })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al actualizar cliente' })
    }
}

const EliminarCliente = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no valido' })
        }
        const cliente = await ClientesTuti.findById(id)
        if (!cliente) {
            return res.status(400).json({ msg: 'Cliente no encontrado' })
        }
        await ClientesTuti.findByIdAndDelete(id)
        return res.status(200).json({ msg: 'Cliente eliminado' })
    }catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al eliminar cliente' })
    }
}

export { CrearCliente, ListarClientes, DetalleCliente, ActualizarCliente, EliminarCliente }
