import pedidosTuti from "../models/pedidosTuti.js";
import mongoose from 'mongoose'
import clientesTuti from "../models/clientesTuti.js";
import productosTuti from "../models/productosTuti.js";

const CrearPedido = async (req, res) => {
    try {
        const { codigo, descripcion, id_cliente, id_productos } = req.body
        if (!codigo || !descripcion || !id_cliente || !id_productos) {
            return res.status(400).json({ msg: 'Llenar todos los campos' })
        }
        if (codigo.length < 3) {
            return res.status(400).json({ msg: 'El codigo debe tener al menos 3 caracteres' })
        }
        if (descripcion.length < 3) {
            return res.status(400).json({ msg: 'La descripcion debe tener al menos 3 caracteres' })
        }
        if (id_productos.length < 1) {
            return res.status(400).json({ msg: 'Debe seleccionar al menos un producto' })
        }
        const cliente = await clientesTuti.findById(id_cliente)
        if (!cliente) {
            return res.status(400).json({ msg: 'Cliente no registrado' })
        }
        const productos = await productosTuti.find({_id: {$in: id_productos}})
        if (productos.length !== id_productos.length) {
            return res.status(400).json({ msg: 'Producto no registrado' })
        }
        const pedido = await pedidosTuti.findOne({codigo})
        if (pedido) {
            return res.status(400).json({ msg: 'Pedido ya registrado' })
        }
        const nuevoPedido = new pedidosTuti({
            codigo,
            descripcion,
            id_cliente,
            id_productos
        })
        await nuevoPedido.save()
        return res.status(201).json({ msg: 'Pedido creado' })
    }catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al crear pedido' })
    }
}

const ListarPedidos = async (req, res) => {
    try {
        const pedidos = await pedidosTuti.find().populate('id_cliente',"nombre apellido email").populate('id_productos',"nombre precio categoria codigo")
        return res.status(200).json(pedidos)
    }catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al listar pedidos' })
    }
}

const DetallePedido = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no valido' })
        }
        const pedido = await pedidosTuti.findById(id).populate('id_cliente',"nombre apellido email").populate('id_productos',"nombre precio categoria codigo")
        if (!pedido) {
            return res.status(400).json({ msg: 'Pedido no encontrado' })
        }
        return res.status(200).json(pedido)
    }catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al mostrar pedido' })
    }
}

const ActualizarPedido = async (req, res) => {
    try {
        const { id } = req.params
        const { codigo, descripcion, id_cliente, id_productos } = req.body
        if (!codigo || !descripcion || !id_cliente || !id_productos) {
            return res.status(400).json({ msg: 'Llenar todos los campos' })
        }
        if (codigo.length < 3) {
            return res.status(400).json({ msg: 'El codigo debe tener al menos 3 caracteres' })
        }
        if (descripcion.length < 3) {
            return res.status(400).json({ msg: 'La descripcion debe tener al menos 3 caracteres' })
        }
        if (id_productos.length < 1) {
            return res.status(400).json({ msg: 'Debe seleccionar al menos un producto' })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no valido' })
        }
        const cliente = await clientesTuti.findById(id_cliente)
        if (!cliente) {
            return res.status(400).json({ msg: 'Cliente no registrado' })
        }
        const productos = await productosTuti.find({_id: {$in: id_productos}})
        if (productos.length !== id_productos.length) {
            return res.status(400).json({ msg: 'Producto no registrado' })
        }
        const pedido = await pedidosTuti.findById(id)
        if (!pedido) {
            return res.status(400).json({ msg: 'Pedido no encontrado' })
        }
        await
        pedidosTuti.findByIdAndUpdate(id, {codigo, descripcion, id_cliente, id_productos})
        return res.status(200).json({ msg: 'Pedido actualizado' })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al actualizar pedido' })
    }
}

const EliminarPedido = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'ID no valido' })
        }
        const pedido = await pedidosTuti.findById(id)
        if (!pedido) {
            return res.status(400).json({ msg: 'Pedido no encontrado' })
        }
        await pedidosTuti.findByIdAndDelete(id)
        return res.status(200).json({ msg: 'Pedido eliminado' })
    }catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Error al eliminar pedido' })
    }
}

export { CrearPedido, ListarPedidos, DetallePedido, ActualizarPedido, EliminarPedido }