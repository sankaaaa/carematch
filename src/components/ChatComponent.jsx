// import React, { useState, useEffect } from 'react';
//
// const ChatComponent = () => {
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState('');
//     const [ws, setWs] = useState(null);
//
//     useEffect(() => {
//         const socket = new WebSocket('ws://localhost:5000');
//         setWs(socket);
//
//         socket.onmessage = async (event) => {
//             if (event.data instanceof Blob) {
//                 const textData = await event.data.text();
//                 setMessages(prevMessages => [...prevMessages, textData]);
//             } else {
//                 setMessages(prevMessages => [...prevMessages, event.data]);
//             }
//         };
//
//         socket.onopen = () => console.log('Connected to WebSocket server');
//         socket.onclose = () => console.log('Disconnected from WebSocket server');
//
//         return () => socket.close();
//     }, []);
//
//
//     const sendMessage = () => {
//         if (ws && message.trim()) {
//             ws.send(message);
//             setMessage('');
//         }
//     };
//
//     return (
//         <div>
//             <h1>WebSocket Chat</h1>
//             <div style={{ border: '1px solid black', padding: '10px', height: '300px', overflowY: 'scroll' }}>
//                 {messages.map((msg, index) => (
//                     <p key={index}>{msg}</p>
//                 ))}
//             </div>
//             <input
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type a message..."
//             />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// };
//
// export default ChatComponent;
