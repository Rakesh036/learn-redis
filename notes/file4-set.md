---

## 📘 Redis Notes – Part 4: Sets

---

### 🔍 What is a Set in Redis?

- **Unordered collection of unique strings.**
- No duplicates allowed.
- Internally implemented as a **hashtable** → fast operations (O(1)).

---

### 🚀 Common Commands

#### ✅ `SADD key value [value ...]`

```bash
SADD skills "Java" "Python" "Redis"
```

➡ Adds one or more members to a set.

---

#### ✅ `SMEMBERS key`

```bash
SMEMBERS skills
# 1) "Java"
# 2) "Python"
# 3) "Redis"
```

➡ Returns **all elements** of the set.

---

#### ✅ `SCARD key`

```bash
SCARD skills
# 3
```

➡ Returns the number of elements in the set.

---

#### ✅ `SISMEMBER key value`

```bash
SISMEMBER skills "Python"
# 1 (true)
```

➡ Checks if a value is part of the set.

---

#### ✅ `SREM key value [value ...]`

```bash
SREM skills "Java"
```

➡ Removes elements from a set.

---

#### ✅ `SUNION key [key ...]`

```bash
SADD devs "Alice" "Bob"
SADD testers "Bob" "Charlie"

SUNION devs testers
# 1) "Alice"
# 2) "Bob"
# 3) "Charlie"
```

➡ Returns union of all sets.

---

#### ✅ `SINTER key [key ...]`

```bash
SINTER devs testers
# 1) "Bob"
```

➡ Returns **intersection** of sets.

---

#### ✅ `SDIFF key [key ...]`

```bash
SDIFF devs testers
# 1) "Alice"
```

➡ Elements in `devs` **but not** in `testers`.

---

#### ✅ `SRANDMEMBER key [count]`

```bash
SRANDMEMBER skills
# "Python" (randomly chosen)
```

➡ Gets a random member(s) of the set.

---

#### ✅ `SPOP key`

```bash
SPOP skills
# Random element removed and returned
```

➡ Removes and returns a random member.

---

### 📏 Limits & Performance

- Can store **millions of members**.
- Redis Sets are fast: **O(1)** time for `SADD`, `SREM`, `SISMEMBER`.
- Avoid huge sets (>10M items) without SCAN-style iteration for safety.

---

### 💡 Real-Life Examples with Output

```bash
SADD alumni:2020 "Rakesh" "Aryan"
SADD alumni:2021 "Aryan" "Meera"
SADD alumni:mentors "Rakesh"

SINTER alumni:2020 alumni:mentors
# 1) "Rakesh"

SUNION alumni:2020 alumni:2021
# "Rakesh", "Aryan", "Meera"

SDIFF alumni:2021 alumni:2020
# "Meera"
```

---

### 🧠 Real-World Use Cases

| Use Case                         | Redis Set Example                                      |
|----------------------------------|---------------------------------------------------------|
| Tagging or skills                | `SADD user:123:skills "React" "Node"`                  |
| Alumni in batch/year             | `SADD alumni:2022 "John"`                              |
| Mutual friends                   | `SINTER friends:user1 friends:user2`                   |
| Event registration tracking      | `SADD event:123:attendees "alice" "bob"`               |
| Detect duplicates                | Sets reject duplicate values automatically             |

---

### 🧑‍💻 Using Sets in Your Alumni Portal

Here’s how you can integrate Redis Sets in your alumni site:

#### 🔸 1. Track Alumni by Batch
```bash
SADD alumni:2020 "rajesh@example.com"
SADD alumni:2021 "Meera@example.com"
```

- Quick filtering by batch/year.
- Useful for batch-specific events or email campaigns.

#### 🔸 2. Store Skills of Users
```bash
SADD user:rakesh:skills "Node" "Redis" "React"
```

- Recommend jobs or projects based on `SINTER` (common skills).

#### 🔸 3. Events and Participation
```bash
SADD event:techfest:attendees "Rakesh" "Aryan"
```

- Later use `SCARD` to count attendees, or `SMEMBERS` to list them.

#### 🔸 4. Find Mutual Connections
```bash
SINTER connections:rakesh connections:Meera
```

- Show “mutual connections” or “common classmates”.

---

### 🔗 Official Docs

> [Redis Set Documentation](https://redis.io/docs/latest/develop/data-types/sets/)

---

### ✅ Summary Table

| Command       | Description                              |
|---------------|------------------------------------------|
| `SADD`        | Add elements to a set                    |
| `SMEMBERS`    | Get all members of a set                 |
| `SISMEMBER`   | Check membership                         |
| `SCARD`       | Get number of elements                   |
| `SREM`        | Remove from set                          |
| `SINTER`      | Get common elements (intersection)       |
| `SUNION`      | Combine sets (union)                     |
| `SDIFF`       | Set difference                           |
| `SPOP`        | Pop random element                       |
| `SRANDMEMBER` | Get random element (non-destructive)     |

---
