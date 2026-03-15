const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');

const middlewares = jsonServer.defaults();

// Vercel-il direct aayi path kodukkunnathaanu safe
const router = jsonServer.router(path.join(__dirname, '../db.json'));

server.use(middlewares);

// Rewriting /api calls
server.use(jsonServer.rewrites({
  '/api/*': '/$1'
}));

server.use(router);

module.exports = server;