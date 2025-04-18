const express = require('express');
const axios = require('axios').default;
const client = require('./client');

const app = express();

app.get('/', async (req, res) => {
    try {


        const cacheValue = await client.get('todos');
        if(cacheValue)return res.json(JSON.parse(cacheValue));
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
        await client.set('todos', JSON.stringify(data)); // store data in redis for 60 seconds
        await client.expire('todos', 600); // set expiration time to 60 seconds
        return res.json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});






app.listen(9000, () => {
    console.log('server is running at 9000');
})