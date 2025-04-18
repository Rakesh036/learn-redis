 **Redis Notes – Part 7: Streams**

- 🔍 Basic explanation  
- 🧪 Commands with examples  
- 🌍 Real-world use cases  
- 🧑‍💻 *How to apply it in your Alumni Portal project*  
- 🔗 Redis Docs reference  

---

## 📘 Redis Notes – Part 7: Streams

---

### 🔗 Official Redis Streams Docs  
[https://redis.io/docs/latest/develop/data-types/streams/](https://redis.io/docs/latest/develop/data-types/streams/)

---

### 🔍 What is a Redis Stream?

- **Append-only log structure** like Kafka or a messaging queue.
- Stores events/messages in the order they are added.
- Every stream entry has a **unique ID** (auto or manual).
- Ideal for: logs, chats, event systems, notification queues.

---

### ✅ Basic Syntax

```bash
XADD mystream * key1 value1 key2 value2
```

- `*` auto-generates the message ID.
- Example:

```bash
XADD alumni:notifications * title "Event Launched" desc "Alumni Meet on 5th May"
```

---

### 🚀 Common Commands

| Command | Purpose |
|--------|---------|
| `XADD` | Add message to a stream |
| `XRANGE` | Read from a stream (oldest to newest) |
| `XREVRANGE` | Read from a stream (newest to oldest) |
| `XREAD` | Read latest messages (like `tail -f`) |
| `XDEL` | Delete specific messages |
| `XLEN` | Get total number of entries |
| `XTRIM` | Trim old entries to limit memory |
| `XGROUP`, `XREADGROUP` | Use consumer groups (like pub/sub with durability) |

---

### 🔹 Example Usage

#### 1. Add Messages

```bash
XADD alumni:events * eventName "Hackathon" location "Online"
XADD alumni:events * eventName "Webinar" location "Zoom"
```

#### 2. View All Events

```bash
XRANGE alumni:events - +
```

#### 3. View Latest N Entries

```bash
XREVRANGE alumni:events + - COUNT 2
```

#### 4. Read New Entries

```bash
XREAD STREAMS alumni:events $
```

➡ `$` means: “Read only new entries after now.”

#### 5. Trim Stream (Keep last 100 messages)

```bash
XTRIM alumni:events MAXLEN 100
```

---

### 🧠 Real-World Use Cases

| Use Case | How Streams Help |
|----------|------------------|
| Logging | Store backend activity logs |
| Notifications | Queue alumni announcements |
| Chat system | Store messages per group |
| Background jobs | Use as a task/event queue |
| Real-time dashboards | Feed updates into UI |

---

### 🧑‍💻 Use Cases in **Your Alumni Portal**

---

#### 📢 1. **Announcement System**

Use a stream to log all new announcements or event notifications:

```bash
XADD alumni:notifications * title "New Internship" link "/post/231" type "internship"
```

✅ Use `XRANGE` in backend to show recent notifications  
✅ Or `XREAD` to fetch new messages in real-time via WebSockets

---

#### 💬 2. **Group Chat / Discussion**

```bash
XADD chat:group:mentorship * user "rakesh" msg "When is the next session?"
```

✅ Store chats per group  
✅ Use `XREAD` for real-time feed into chat UI  
✅ Archive old chats via `XTRIM`

---

#### 🧪 3. **Activity Log / Audit Trail**

Track user actions like profile updates, job applications:

```bash
XADD alumni:logs * userID "123" action "profile_update" timestamp "2025-04-18T12:00"
```

✅ Helps for admin audits  
✅ Power dashboard analytics later

---

#### 🕹 4. **Internal Event Queue**

Use streams as a simple queue system (instead of RabbitMQ):

```bash
XADD task:referrals * userID "231" action "request_referral" status "pending"
```

✅ Then backend reads and processes them asynchronously using `XREAD` or `XREADGROUP`.

---

### 🧪 Bonus: Consumer Groups (for async processing)

```bash
XGROUP CREATE task:referrals team1 $ MKSTREAM
XREADGROUP GROUP team1 member1 STREAMS task:referrals >
```

- `>` = only new messages for this consumer
- Great for **load-balancing** and **parallel processing**

---

### 📏 Limits & Performance

- Handles **millions of entries** efficiently
- Ideal for real-time systems with **append-only** nature
- Can be trimmed or time-limited

---

### ✅ Summary Table

| Command | Use |
|--------|-----|
| `XADD` | Add message |
| `XRANGE` / `XREVRANGE` | View messages (old ↔ new) |
| `XREAD` | Listen for new |
| `XTRIM` | Auto-clear old |
| `XGROUP` | Create consumer group |
| `XREADGROUP` | Group-based read |
| `XLEN` | Entry count |
| `XDEL` | Delete messages |

---

### 🔗 Official Redis Streams Docs  
👉 [https://redis.io/docs/latest/develop/data-types/streams/](https://redis.io/docs/latest/develop/data-types/streams/)

---
