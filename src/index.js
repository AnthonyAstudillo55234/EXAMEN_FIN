import app from './server.js'
import connect from './database.js'

connect()

app.listen(app.get('port'), () => {
    console.log(`Server on port http://localhost:${app.get('port')}`)
})