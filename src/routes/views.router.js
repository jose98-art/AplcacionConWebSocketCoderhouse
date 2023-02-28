import {Router} from 'express'
import { socketServer } from '../server.js'

const router = Router()

router.get('/',(req,res)=>{

    // socketServer.on('connection',socket=>{
    //     console.log('Usuario conectado', socket.id)
    // })

    res.render('socket')
})


export default router