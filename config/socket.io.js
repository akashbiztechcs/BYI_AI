// write socket connection configuration
const socketIO = require('socket.io');
const myEmitter = require('../helper/socket.helper');


const socketInit = (http) => {
    const io = socketIO(http, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log(`⚡: ${socket.id} user just connected!`);
        
        // Function to handle the emission of events to this particular socket
        const handleEvent = (eventName, data) => {
            socket.emit(eventName, data);
        };

        // Register to handle events for this socket
        myEmitter.on('event', (eventName, data) => handleEvent(eventName, data));
        socket.on('disconnect', () => {
            console.log('🔥: A user disconnected');
            myEmitter.removeListener('event', (eventName, data) => handleEvent(eventName, data));
        });
    });
}


module.exports = socketInit