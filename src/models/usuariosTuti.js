import {Schema, model} from 'mongoose'

const usuariosTutiSchema = new Schema({
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
    email: {
        type: String,
        required: true,
        trim:true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim:true
    },
})

export default model('usuarioTuti', usuariosTutiSchema)