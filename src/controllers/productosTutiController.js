import mongoose from "mongoose";
import ProductosTuti from "../models/productosTuti.js";

const CrearProducto = async (req, res) => {
    try {
        const { codigo, nombre, precio, descripcion, categoria, stock, proveedor, fecha_ingreso } = req.body;
        if (!codigo || !nombre || !precio || !descripcion || !categoria || !stock || !proveedor || !fecha_ingreso) {
        return res.status(400).json({ msg: "Llenar todos los campos" });
        }
        if (codigo.length < 3) {
        return res.status(400).json({ msg: "El codigo debe tener al menos 3 caracteres" });
        }
        if (nombre.length < 3) {
        return res.status(400).json({ msg: "El nombre debe tener al menos 3 caracteres" });
        }
        if (descripcion.length < 3) {
        return res.status(400).json({ msg: "La descripcion debe tener al menos 3 caracteres" });
        }
        if (categoria.length < 3) {
        return res.status(400).json({ msg: "La categoria debe tener al menos 3 caracteres" });
        }
        if (stock < 1) {
        return res.status(400).json({ msg: "El stock debe ser mayor a 0" });
        }
        const producto = await ProductosTuti.findOne({ nombre });
        if (producto) {
        return res.status(400).json({ msg: "Producto ya registrado" });
        }
        const validacionFecha = /^\d{4}-\d{2}-\d{2}$/;
        if (!validacionFecha.test(fecha_ingreso)) {
        return res.status(400).json({ msg: "Fecha de ingreso no válida usar este formato YYYY-MM-DD" });
        }
        const nuevoProducto = new ProductosTuti({
        codigo,
        nombre,
        precio,
        descripcion,
        categoria,
        stock,
        proveedor,
        fecha_ingreso,
        });
        await nuevoProducto.save();
        return res.status(201).json({ msg: "Producto creado" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al crear producto" });
    }
}

const ListarProductos = async (req, res) => {
    try {
        const productos = await ProductosTuti.find();
        return res.status(200).json(productos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al listar productos" });
    }
}

const DetalleProducto = async (req, res) => {   
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: "ID de producto no válido" });
        }
        const producto = await ProductosTuti.findById(req.params.id);
        if (!producto) {
        return res.status(400).json({ msg: "Producto no encontrado" });
        }
        return res.status(200).json(producto);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al obtener producto" });
    }
}

const ActualizarProducto = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: "ID de producto no válido" });
        }
        const { codigo, nombre, precio, descripcion, categoria, stock, proveedor, fecha_ingreso } = req.body;
        if (!codigo || !nombre || !precio || !descripcion || !categoria || !stock || !proveedor || !fecha_ingreso) {
        return res.status(400).json({ msg: "Llenar todos los campos" });
        }
        if (codigo.length < 3) {
        return res.status(400).json({ msg: "El codigo debe tener al menos 3 caracteres" });
        }
        if (nombre.length < 3) {
        return res.status(400).json({ msg: "El nombre debe tener al menos 3 caracteres" });
        }
        if (descripcion.length < 3) {
        return res.status(400).json({ msg: "La descripcion debe tener al menos 3 caracteres" });
        }
        if (categoria.length < 3) {
        return res.status(400).json({ msg: "La categoria debe tener al menos 3 caracteres" });
        }
        if (stock < 1) {
        return res.status(400).json({ msg: "El stock debe ser mayor a 0" });
        }
        const producto = await ProductosTuti.findById(req.params.id);
        if (!producto) {
        return res.status(400).json({ msg: "Producto no encontrado" });
        }
        const validacionFecha = /^\d{4}-\d{2}-\d{2}$/;
        if (!validacionFecha.test(fecha_ingreso)) {
        return res.status(400).json({ msg: "Fecha de ingreso no válida usar este formato YYYY-MM-DD" });
        }
        await ProductosTuti.findByIdAndUpdate(req.params.id, { codigo, nombre, precio, descripcion, categoria, stock, proveedor, fecha_ingreso });
        return res.status(200).json({ msg: "Producto actualizado" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al actualizar producto" });
    }
}

const EliminarProducto = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: "ID de producto no válido" });
        }
        const producto = await ProductosTuti.findById(req.params.id);
        if (!producto) {
        return res.status(400).json({ msg: "Producto no encontrado" });
        }
        await ProductosTuti.findByIdAndDelete(req.params.id);
        return res.status(200).json({ msg: "Producto eliminado" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al eliminar producto" });
    }
}

export { CrearProducto, ListarProductos, DetalleProducto, ActualizarProducto, EliminarProducto };