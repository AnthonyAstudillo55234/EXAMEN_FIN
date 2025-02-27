import {Schema, model} from 'mongoose'

const clientesTutiSchema = new Schema({
    cedula: {
        type: String,
        required: true,
        trim:true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        trim:true
    },
    apellido: {
        type: String,
        required: true,
        trim:true
    },
    ciudad: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true,
        unique: true
    },
    direccion: {
        type: String,
        required: true,
        trim:true
    },
    telefono: {
        type: String,
        required: true,
        trim:true
    },
    fechaNacimiento: {
        type: String,
        required: true,
        trim:true
    },
})

export default model('clientesTuti', clientesTutiSchema)