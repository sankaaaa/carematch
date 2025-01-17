// const WebSocket = require('ws');
// const server = new WebSocket.Server({ port: 5000 });
//
// server.on('connection', (ws) => {
//     console.log('New client connected');
//
//     ws.on('message', (message) => {
//         console.log('Received:', message);
//         server.clients.forEach(client => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(message);
//             }
//         });
//     });
//
//     ws.on('close', () => {
//         console.log('Client disconnected');
//     });
// });
//
// console.log('WebSocket server started on ws://localhost:5000');
