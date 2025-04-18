**Redis Notes – Part 10: Pub/Sub**

- 📡 Basics of Redis Publish/Subscribe model  
- 🛠️ Core commands with examples & outputs  
- 🧠 Real-world & **Alumni Portal** use cases  
- 🔗 Official Redis docs  
- 💻 Bonus: `Node.js` ioredis Pub/Sub example

---

## 📘 Redis Notes – Part 10: Pub/Sub (Publish/Subscribe)

---

### 🔗 Official Docs:  
[https://redis.io/docs/latest/develop/data-types/pubsub/](https://redis.io/docs/latest/develop/data-types/pubsub/)

---

### 📡 What is Redis Pub/Sub?

**Pub/Sub** is a **messaging paradigm** where:

- **Publisher** sends messages to a channel.
- **Subscriber(s)** listening on the channel receive those messages instantly.

➡ Great for **real-time** notifications, chat systems, updates, etc.

---

### 🧠 Real-World Use Cases

| Use Case | Description |
|----------|-------------|
| 🔔 Notifications | Push real-time alerts (job post, alumni reply) |
| 💬 Live chat | Alumni-to-alumni or group chats |
| 🧪 Live updates | Push new quiz/question updates |
| 📦 Queue triggers | Trigger background processes |
| 🧭 Activity feeds | Send timeline/activity data to dashboards |

---

### 🛠️ Basic Commands

| Command | Role | Description |
|---------|------|-------------|
| `PUBLISH channel message` | Publisher | Sends message to a channel |
| `SUBSCRIBE channel` | Subscriber | Listens to a channel |
| `UNSUBSCRIBE` | Subscriber | Unsubscribes from channels |

---

### 🧪 Example

#### Subscriber Terminal

```bash
127.0.0.1:6379> SUBSCRIBE alumni:notifications
Reading messages... (press Ctrl-C to quit)
1) "message"
2) "alumni:notifications"
3) "New job posted in Mumbai!"
```

#### Publisher Terminal

```bash
127.0.0.1:6379> PUBLISH alumni:notifications "New job posted in Mumbai!"
(integer) 1
```

➡ All subscribers listening to `alumni:notifications` will receive this.

---

### 💻 Node.js Example with `ioredis`

#### Install:

```bash
npm install ioredis
```

#### `pubsub.js`

```js
const Redis = require("ioredis");

const pub = new Redis();
const sub = new Redis();

sub.subscribe("alumni:notifications", () => {
    console.log("Subscribed to alumni:notifications");
});

sub.on("message", (channel, message) => {
    console.log(`New message on ${channel}: ${message}`);
});

// Simulate publishing
setTimeout(() => {
    pub.publish("alumni:notifications", "🎓 New alumni joined from Kolkata!");
}, 3000);
```

#### Output:

```bash
Subscribed to alumni:notifications
New message on alumni:notifications: 🎓 New alumni joined from Kolkata!
```

---

### 🧑‍💻 In **Your Alumni Portal**

| Feature | Use of Pub/Sub |
|--------|----------------|
| 📢 Alumni Notifications | Instantly notify users of new posts, events, messages |
| 🧑‍🏫 Mentor Session Alerts | Alert mentees when mentors go live |
| 💬 Chat / DM | Power live chat between alumni |
| 🧪 Quiz or Leaderboard Updates | Broadcast updates when quiz finishes |

---

### ⚠️ Notes

- Messages are **not stored** → No message persistence.
- Use **Redis Streams** or external broker (e.g., Kafka, RabbitMQ) for durability.
- One message = one-time push → good for live use cases.

---

### ✅ Summary Table

| Command | Description |
|---------|-------------|
| `SUBSCRIBE <channel>` | Listen to a channel |
| `PUBLISH <channel> <msg>` | Send message |
| `UNSUBSCRIBE` | Stop listening |

---
