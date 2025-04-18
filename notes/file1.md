### 📘 Redis Notes - Part 1

---

#### 🔧 Installation

##### ✅ Option 1: Install Redis on macOS (Using Homebrew)

```bash
brew install redis
brew services start redis
redis-cli
```

##### ✅ Option 2: Install Redis Using Docker

```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

**Command Breakdown:**

| Part                         | Meaning |
|-----------------------------|---------|
| `docker run`                | Run a new container |
| `-d`                        | Detached mode (runs in background) |
| `--name redis-stack`        | Names the container `redis-stack` |
| `-p 6379:6379`              | Maps Redis port 6379 |
| `-p 8001:8001`              | Maps RedisInsight GUI port 8001 |
| `redis/redis-stack:latest` | Uses the latest Redis Stack image |

---

#### 🖥️ Access Redis CLI Inside Docker

```bash
docker exec -it <container_id> bash
```

Example:

```bash
docker exec -it 18d53fd41bc7 bash
```

Then open the Redis CLI:

```bash
redis-cli
```

Check if it's running:

```bash
127.0.0.1:6379> ping
PONG
```

---

### 🧠 Redis Basics

#### ✅ 1. SET and GET Commands

```bash
SET name rakesh
GET name
```

**Meaning:**

- `SET name rakesh` — Stores the string "rakesh" under the key `name`.
- `GET name` — Returns `"rakesh"`.

This is the simplest way to store and retrieve data.

---

#### ✅ 2. Namespaced Keys – Like `user:1`, `user:2`

```bash
SET user:1 rajan
SET user:2 rahul
GET user:1
GET user:2
```

**Meaning:**

- `user:1` and `user:2` are keys with a pattern.
- The colon `:` is just for **naming convention** or **namespacing**.
- It helps to logically group related keys (like users, products, etc).

**Use Case:**

Imagine you are storing user data:

| Key       | Value |
|-----------|-------|
| user:1    | rajan |
| user:2    | rahul |

You can later expand to structured data using hashes like `HMSET user:1 name "rajan" age 25`, but `SET` is fine for simple string values.

---

#### ✅ 3. Multiple Get Example

```bash
MGET name user:1 user:2
```

Returns:

```
1) "rakesh"
2) "rajan"
3) "rahul"
```

---

#### ✅ 4. SET with NX and XX

```bash
SET name "rakesh" NX   # Sets only if 'name' does not exist
SET name "john" XX     # Sets only if 'name' already exists
```

---

### 📌 Summary

| Command                         | Use                            |
|---------------------------------|---------------------------------|
| `SET key value`                | Set a string key-value          |
| `GET key`                      | Get the value of a key          |
| `MGET key1 key2 ...`           | Get multiple keys               |
| `SET key value NX`             | Set only if key doesn't exist   |
| `SET key value XX`             | Set only if key already exists  |
| `user:1`, `user:2`             | Namespaced keys for organization |

---
