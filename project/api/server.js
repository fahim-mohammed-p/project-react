const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const fs = require('fs');

const middlewares = jsonServer.defaults();

// db.json file correct aayi locate cheyyaan
const filePath = path.join(process.cwd(), 'db.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const router = jsonServer.router(data);

server.use(middlewares);

// Rewriting /api calls
server.use(jsonServer.rewrites({
  '/api/*': '/$1'
}));

server.use(router);

module.exports = server;