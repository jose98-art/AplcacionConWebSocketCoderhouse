import express from 'express'
import { __dirname } from './util.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import viewsRouter from './routes/views.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// Ruta de archivos estaticos
app.use(express.static(__dirname+'/public'))

// Motores de plantilla
app.engine('handlebars',handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

// Ruta Raiz
app.get('/',viewsRouter)



const httpServer = app.listen(8080,()=>{
    console.log('Escuchando al puerto 8080')
})

//wesbsocket
export const socketServer = new Server(httpServer)

const infoMensajes = []

socketServer.on('connection',socket=>{
    console.log(`Usuario conectado: ${socket.id}`)

    socket.on('disconnect',()=>{
        console.log('Usuairo desconectado')
    })

    socket.on('nuevoUsuario',usuario=>{
        socket.broadcast.emit('broadcast', usuario)
    })

    socket.on('mensaje',info=>{
        infoMensajes.push(info)
        socketServer.emit('chat',infoMensajes)
    })
})
