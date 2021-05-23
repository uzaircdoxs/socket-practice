const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

let users = [];
let messages = {
    general: [],
    random: [],
    jokes: [],
    js: []
};

io.on('connection',socket => {
    socket.on("join server", (username) =>{
        const user = {
            username,
            id: socket.id
        }
        users.push(user);
        io.emit('new user', users)
    });

    socket.on("join room", (roomNo, cb) =>{
        socket.join(roomNo);
        cb(messages[roomNo])
        socket.emit('joined', messages[roomNo]);
    });

    socket.on("send message", ({content, to, sender, chatName, isChannel}) =>{
        if(isChannel){
            let payload = {
                content,
                chatName,
                sender
            }
            socket.to(to).emit("new message", payload);
        }else{
            let payload = {
                content,
                chatName: sender,
                sender
            }
            socket.to(to).emit("new message", payload);
        }
        if(messages[chatName]){
            messages[chatName].push({
                sender,
                content
            })
        }
    });

    socket.on("disconnect", () =>{
        users = users.filter(user => user.id !== socket.id);
        io.emit("new user", users)
    })



})

server.listen(5000, () => {
    console.log('listening on port : 5000' );
})
