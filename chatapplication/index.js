const express = require("express")

const path = require('path')
const app=express();

const server = app.listen(4040,()=>
console.log("server is running on port 4040"))



const io = require("socket.io")(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on("connection",onConnected)

let socketsConected = new Set()

function onConnected(socket){
    console.log(socket.id);

    socketsConected.add(socket.id)

io.emit("clients-total",socketsConected.size)

    socket.on("disconnet",()=> {
        console.log("socket is  disconnected",socket.id);
        socketsConected.delete(socket.id)
        io.emit("clients-total",socketsConected.size)
    })

    socket.on('message', (data) => {
        // console.log(data)
        socket.broadcast.emit('chat-message', data)
      })
    
      socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data)
      })
}







