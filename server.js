// const hello = require('./hello.js');

// // hello.sayHello();

// hello();

// const http = require('http');
// http.createServer((req, res) => {
// res.writeHead(200, {
// 'Content-Type': 'text/plain'
// });
// res.end('Hello World');
// }).listen(3000);
// console.log('Server running at http://localhost:3000/');

// Connect
// http is used with connect
const connect = require('connect');
const app = connect();
app.listen(3000);



console.log('Server running at http://localhost:3000/');