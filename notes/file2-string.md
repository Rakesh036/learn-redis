---

## 📘 Redis Notes - Part 2

---

### 🔢 Multiple Key-Value Set

#### `MSET`

```bash
MSET user:1 rajan user:2 ravi user:3 rohit
```

- Sets multiple keys at once.
- Equivalent to:
  ```bash
  SET user:1 rajan
  SET user:2 ravi
  SET user:3 rohit
  ```

---

### 🔁 Counters & Increment

#### `SET count 0`

```bash
SET count 0
INCR count          # count becomes 1
INCRBY count 10     # count becomes 11
```

- `INCR key`: Increments key's value by 1.
- `INCRBY key value`: Increments by specified value.
- Value must be an **integer**, or Redis throws an error.

---

### 🧠 Redis String Max Size

- A **single string** in Redis can be **up to 512 MB** in size.

---

### ⚙️ Bitwise Operations (Advanced Use)

```bash
SETBIT key offset value
GETBIT key offset
```

- Useful for **bitmap-based data**, tracking flags, etc.
- `SETBIT` sets a bit at a position.
- `GETBIT` gets the value at a bit position.

---

### 🧩 String Ranges

#### `GETRANGE` & `SETRANGE`

```bash
SET message "hello world"
GETRANGE message 0 4        # "hello"
SETRANGE message 6 "Redis"  # message becomes "hello Redis"
```

- `GETRANGE key start end`: Get a substring.
- `SETRANGE key offset value`: Modify part of a string.

---

## 📦 Redis with Node.js – Using `ioredis`

First install:

```bash
npm install ioredis
```

### Example Code:

```js
const Redis = require("ioredis");

const client = new Redis({
    host: '127.0.0.2',
    port: 6379,
    db: 0
});

async function init() {
    try {
        const dbIndex = await client.call('CLIENT', 'INFO');
        console.log('Connected Redis DB:', dbIndex);

        const pong = await client.ping();
        console.log('Redis PING:', pong);

        const x = await client.set('test:redisinsight', 'visible?');
        console.log('x:', x);
    } catch (err) {
        console.error('Redis Error:', err);
    }
}

init();
```

### Explanation:

- `host: '127.0.0.2'` — Connects to a Redis server at that IP.  
- `db: 0` — Connects to database 0 (default Redis DB).
- `client.call('CLIENT', 'INFO')` — Gets connection metadata.
- `client.ping()` — Sends a ping to check if Redis is alive.
- `client.set(...)` — Sets a key-value in Redis.

---

### 🐳 Redis via Docker – Important Networking Notes

```bash
docker ps
```

Example output:

```
CONTAINER ID   IMAGE                      PORTS
18d53fd41bc7   redis/redis-stack:latest   6379->6379, 8001->8001
```

```bash
docker exec -it 18d53fd41bc7 bash
redis-cli
```

Redis CLI works inside Docker:

```bash
127.0.0.1:6379> set user:1 rajan
127.0.0.1:6379> get user:1
```

---

### ⚠️ Problem: IP Mismatch Between VS Code & Redis in Docker

- Inside Docker, Redis is **localhost to the container**, not your host.
- So if you run:

```js
const client = new Redis();  // connects to 127.0.0.1 by default
```

…it might connect to a different **local Redis instance**, not the **Docker one**.

---

### ✅ Solution

1. Use the container’s IP or bind host IP:
   ```js
   const client = new Redis({
       host: '127.0.0.1',   // Use your Docker-exposed host IP
       port: 6379
   });
   ```

2. Or use `host.docker.internal` (on macOS):

   ```js
   const client = new Redis({
       host: 'host.docker.internal',
       port: 6379
   });
   ```

3. Confirm Redis is listening at `localhost:6379`:
   ```bash
   redis-cli -h 127.0.0.1 -p 6379
   ```

If `test:redisinsight` is not visible on the RedisInsight UI, it likely means:
- You're writing to a different Redis instance.
- UI is connected to a different port or host.
- You're in the wrong Redis database (e.g., db 0 vs db 1).

---

## ✅ Summary

| Command                | Description                           |
|------------------------|---------------------------------------|
| `MSET`                 | Set multiple key-value pairs          |
| `INCR`, `INCRBY`       | Auto-increment integers               |
| `SETBIT`, `GETBIT`     | Bit operations                        |
| `GETRANGE`, `SETRANGE` | Work with substrings                  |
| `512 MB`               | Max string size in Redis              |
| `ioredis`              | Node.js Redis client library          |
| `host.docker.internal` | Host address inside Docker on macOS   |

---
