const Redis = require("ioredis");

// const client = new Redis({
//     host: '127.0.0.1',
//     port: 6379,
//     db: 0 // explicitly using default DB
// });

const client = new Redis();

module.exports = client;
