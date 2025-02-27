import {Schema, model, mongo} from 'mongoose'

const pedidosTutiSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        trim:true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true,
        trim:true
    },
    id_cliente: {
        type: Schema.Types.ObjectId,
        ref: 'clientesTuti',
        required: true
    },
    id_productos: [{
        type: Schema.Types.ObjectId,
        ref: 'productosTuti',
        required: true
    }] 
})

export default model('pedidosTuti', pedidosTutiSchema)