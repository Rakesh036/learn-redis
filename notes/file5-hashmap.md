
> 🔗 **Official Redis Hash Docs**:  
[https://redis.io/docs/latest/develop/data-types/hashes/](https://redis.io/docs/latest/develop/data-types/hashes/)

---

## 📘 Redis Notes – Part 5: Hashes (HashMap Equivalent)

---

### 🔍 What is a Hash in Redis?

- Redis **hash** is a **map of field–value pairs**, like a row in a table or a JSON object.
- Ideal for storing **objects or user profiles**.
- Efficient storage: if hash has few fields (under 100), Redis stores it as compact ziplist.

---

### 🚀 Common Commands

---

#### ✅ `HSET key field value [field value ...]`

```bash
HSET user:1001 name "Rakesh" email "rakesh@example.com" year "2020"
```

➡ Set one or multiple fields in the hash stored at `user:1001`.

---

#### ✅ `HGET key field`

```bash
HGET user:1001 name
# "Rakesh"
```

---

#### ✅ `HGETALL key`

```bash
HGETALL user:1001
# 1) "name"
# 2) "Rakesh"
# 3) "email"
# 4) "rakesh@example.com"
# 5) "year"
# 6) "2020"
```

➡ Returns all fields and values.

---

#### ✅ `HMGET key field [field ...]`

```bash
HMGET user:1001 name email
# 1) "Rakesh"
# 2) "rakesh@example.com"
```

---

#### ✅ `HDEL key field [field ...]`

```bash
HDEL user:1001 year
```

➡ Deletes one or more fields from the hash.

---

#### ✅ `HEXISTS key field`

```bash
HEXISTS user:1001 email
# 1 (true)
```

---

#### ✅ `HLEN key`

```bash
HLEN user:1001
# 2 (number of fields left)
```

---

#### ✅ `HKEYS key` / `HVALS key`

```bash
HKEYS user:1001
# 1) "name"
# 2) "email"

HVALS user:1001
# 1) "Rakesh"
# 2) "rakesh@example.com"
```

---

#### ✅ `HINCRBY key field increment`

```bash
HSET user:1001 login_count 0
HINCRBY user:1001 login_count 1
```

➡ Field becomes `1`. You can use this for counters or analytics per user.

---

### 📏 Limits & Performance

- Each hash can store **over 4 billion fields**.
- Optimized for small key–value pairs.
- Accessing a field is **O(1)** time complexity.

---

### 💡 Code Examples with Output

```bash
HSET alumni:rajesh name "Rajesh" year "2019" branch "IT"
HGET alumni:rajesh name
# "Rajesh"

HGETALL alumni:rajesh
# "name", "Rajesh", "year", "2019", "branch", "IT"

HDEL alumni:rajesh year
HGETALL alumni:rajesh
# "name", "Rajesh", "branch", "IT"
```

---

### 🧠 Real-World Use Cases

| Use Case                | Redis Hash Example                                         |
|-------------------------|------------------------------------------------------------|
| User profiles           | `HSET user:123 name "Alice" age "23"`                     |
| Event registration info | `HSET event:456 status "confirmed" seats "120"`           |
| Analytics counters      | `HINCRBY user:login:123 count 1`                          |
| Job application details | `HSET job:app:789 status "applied" resume_link "..."`     |
| Per-post stats          | `HSET post:99 views 100 likes 25 comments 5`              |

---

### 🧑‍💻 Using Hashes in Your Alumni Portal

Here’s how Redis hashes can enhance your website:

#### 🔸 1. Store User/Alumni Profile

```bash
HSET alumni:rakesh name "Rakesh" batch "2020" email "rakesh@example.com"
```

- Can quickly retrieve fields using `HGET` or `HMGET`.
- Use `HGETALL` to show profile page.

---

#### 🔸 2. Track Login or Activity

```bash
HINCRBY alumni:rakesh login_count 1
```

- Efficient way to log access without querying full object.

---

#### 🔸 3. Event Metadata

```bash
HSET event:techfest title "Alumni Meet 2025" date "2025-01-10" attendees "120"
```

- Can update attendee count using `HINCRBY`.

---

#### 🔸 4. User Preferences / Settings

```bash
HSET user:settings:rajesh theme "dark" notifications "on"
```

---

### ✅ Summary Table

| Command       | Description                          |
|---------------|--------------------------------------|
| `HSET`        | Set field(s) in a hash               |
| `HGET`        | Get value of a field                 |
| `HGETALL`     | Get all fields & values              |
| `HMGET`       | Get multiple fields                  |
| `HDEL`        | Delete one/more fields               |
| `HEXISTS`     | Check if field exists                |
| `HKEYS`       | List all field names                 |
| `HVALS`       | List all values                      |
| `HINCRBY`     | Increment numeric field              |
| `HLEN`        | Count number of fields               |

---

### 🔗 Official Redis Docs for Hashes  
👉 [https://redis.io/docs/latest/develop/data-types/hashes/](https://redis.io/docs/latest/develop/data-types/hashes/)

---