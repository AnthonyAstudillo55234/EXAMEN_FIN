import mongoose from "mongoose"

mongoose.set('strictQuery', true)

const connect = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`database connected to: ${connection.host}-${connection.port}`)
    } catch (error) {
        console.log(error)
    }
}

export default connect