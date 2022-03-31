import express from 'express';
import {Server} from 'socket.io'; //importo servidor de socket.io
import __dirname from './utils.js';

const app = express();
const PORT = process.env.PORT || 8080 // estamos hablando de una variable de enterno, quiero que el puerto lo decida una variable de entorno de puerto cuando este en la nube el servidor se va a encargar de buscarle el puerto y sino agarra el 8080
app.use(express.static(__dirname+'/public'))//para poder mostrar como estatica mi carpeta de public. --------------- ES IMPORTANTE-----------------
const server =app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`)
});
const io = new Server(server);//El server de soket.io tiene mi server

const log=[];
const hora=[];
io.on('connection', socket=>{
   socket.on('message',data=>{
        
        log.push(data);
        io.emit('log',log)//io para que sea global para todos incluyendome
})


})// los on son los listerner , estoy diciendo que escuhce por el evento de conexion

