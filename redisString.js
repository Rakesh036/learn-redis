const Redis = require("ioredis");

const client = new Redis({
    host: 'host.docker.internal',
    port: 6379
});



async function init() {
    try {

        const dbIndex = await client.call('CLIENT', 'INFO');
        console.log('Connected Redis DB:', dbIndex);
        const pong = await client.ping();
        console.log('Redis PING:', pong);
        const x = await client.set('test:redisinsight', 'visible?');
        console.log('x: ', x);
    } catch (err) {
        console.error('Redis Error:', err);
    }
}

init();
