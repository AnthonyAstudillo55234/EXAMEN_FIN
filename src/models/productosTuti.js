import {Schema, model} from 'mongoose'

const productosTutiSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim:true
    },
    codigo: {
        type: String,
        required: true,
        trim:true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true,
        trim:true,
    },
    categoria: {
        type: String,
        required: true,
        trim:true
    },
    precio: {
        type: Number,
        required: true,
        trim:true
    },
    stock: {
        type: Number,
        required: true,
        trim:true
    },
    fecha_ingreso: {
        type: Date,
        required: true,
        trim:true
    },
    proveedor: {
        type: String,
        required: true,
        trim:true
    },
})

export default model('productosTuti', productosTutiSchema)