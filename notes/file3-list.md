## 📘 Redis Notes - Part 3 – Working with Lists

---

### 📚 What is a Redis List?

A **Redis list** is an ordered collection of strings. Think of it like a queue or a stack.

---

### 🧪 Basic Commands

#### ✅ `LPUSH` – Left Push

```bash
LPUSH tasks "task1"
LPUSH tasks "task2" "task3"
```

➡ Adds items **to the beginning (left)** of the list.

| List (left → right) |
|---------------------|
| task3, task2, task1 |

---

#### ✅ `RPUSH` – Right Push

```bash
RPUSH tasks "task4"
```

➡ Adds an item **to the end (right)** of the list.

| List (left → right) |
|---------------------|
| task3, task2, task1, task4 |

---

#### ✅ `LPOP` / `RPOP`

```bash
LPOP tasks    # Removes task3
RPOP tasks    # Removes task4
```

➡ Removes and returns element from left or right.

---

#### ✅ `LLEN` – List Length

```bash
LLEN tasks
```

➡ Returns number of items in list.

---

#### ✅ `LRANGE`

```bash
LRANGE tasks 0 -1   # Returns all elements
LRANGE tasks 0 1    # First two items
```

- `0 -1` means **entire list**.
- Useful for pagination or inspection.

---

#### ✅ `LTRIM`

```bash
LTRIM tasks 0 1   # Keeps only the first 2 elements
```

➡ Trims the list to specified range.

---

#### ✅ `LMOVE`

```bash
LMOVE source destination LEFT RIGHT
```

➡ Atomically pops from `source` (left) and pushes to `destination` (right).

Use case: Move task from "queue" to "processing".

---

#### ✅ `BLPOP` – Blocking Left Pop

```bash
BLPOP tasks 5
```

➡ Waits for up to 5 seconds to pop from list.
- Useful for **consumer queues**.

---

#### ✅ `DEL` – Delete the List

```bash
DEL tasks
```

---

### 🔥 Code Examples with Output

```bash
LPUSH fruits apple banana mango
RPUSH fruits guava

LRANGE fruits 0 -1
# 1) "mango"
# 2) "banana"
# 3) "apple"
# 4) "guava"

LPOP fruits
# "mango"

RPOP fruits
# "guava"

LLEN fruits
# 2

LTRIM fruits 0 0
LRANGE fruits 0 -1
# 1) "banana"

DEL fruits
```

---

### 🧠 Real-Life Use Cases

| Feature      | Use Case                                                  |
|--------------|-----------------------------------------------------------|
| `LPUSH/BRPOP`| Task queues for background jobs (email, image processing) |
| `LTRIM`      | Keep only N recent logs (like last 100 entries)           |
| `LMOVE`      | Task transition from `todo` → `in_progress`               |
| `LLEN`       | Track size of queue or number of pending jobs             |
| `LRANGE`     | Paginated feed (e.g., notifications)                      |

---

### 🔎 Bonus: Use of Regex with Redis?

- Redis **doesn’t directly support regex** in commands like `GET` or `KEYS`.
- But `KEYS` supports glob-style pattern matching:
  
```bash
KEYS user:*      # Matches all keys starting with 'user:'
KEYS *:task      # Matches all keys ending with ':task'
```

> ⚠️ Avoid `KEYS` in production (it's slow). Use `SCAN` for large datasets.

---

## ✅ Summary Table

| Command     | Description                                  |
|-------------|----------------------------------------------|
| `LPUSH`     | Push to start of list                        |
| `RPUSH`     | Push to end of list                          |
| `LPOP`/`RPOP`| Remove from start or end                    |
| `LLEN`      | Get list size                                |
| `LRANGE`    | Get elements in range                        |
| `LTRIM`     | Trim list to a specific range                |
| `LMOVE`     | Atomically move item between two lists       |
| `BLPOP`     | Blocking pop (wait if empty)                 |
| `DEL`       | Delete entire list                           |
| `KEYS`/`SCAN`| List keys using patterns                    |

---
