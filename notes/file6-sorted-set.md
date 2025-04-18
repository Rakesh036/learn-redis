> 🔗 **Official Redis Sorted Set Docs**:  
[https://redis.io/docs/latest/develop/data-types/sorted-sets/](https://redis.io/docs/latest/develop/data-types/sorted-sets/)

---

## 📘 Redis Notes – Part 6: Sorted Sets (ZSET)

---

### 🔍 What is a Sorted Set?

- A **Sorted Set** in Redis is similar to a Set but each element is associated with a **score**.
- Sorted automatically by score.
- Elements must be **unique**, but scores can repeat.
- Great for **leaderboards**, **ranking systems**, **top-N queries**, etc.

---

### 🚀 Common Commands

---

#### ✅ `ZADD key score member [score member ...]`

```bash
ZADD leaderboard 100 "Rakesh" 200 "Ravi" 150 "Rajesh"
```

➡ Adds or updates members with their scores.

---

#### ✅ `ZRANGE key start stop [WITHSCORES]`

```bash
ZRANGE leaderboard 0 -1 WITHSCORES
# 1) "Rakesh"
# 2) "100"
# 3) "Rajesh"
# 4) "150"
# 5) "Ravi"
# 6) "200"
```

➡ Returns members in score order (ascending).

---

#### ✅ `ZREVRANGE key start stop [WITHSCORES]`

```bash
ZREVRANGE leaderboard 0 -1 WITHSCORES
```

➡ Descending order (highest to lowest scores).

---

#### ✅ `ZSCORE key member`

```bash
ZSCORE leaderboard "Ravi"
# "200"
```

---

#### ✅ `ZINCRBY key increment member`

```bash
ZINCRBY leaderboard 10 "Rakesh"
```

➡ Increases score of a member.

---

#### ✅ `ZRANK key member`

```bash
ZRANK leaderboard "Rajesh"
# 1 (0-based index in ascending order)
```

---

#### ✅ `ZREMRANGEBYRANK key start stop`

```bash
ZREMRANGEBYRANK leaderboard 0 0
```

➡ Removes the member with the **lowest score**.

---

#### ✅ `ZREM key member [member ...]`

```bash
ZREM leaderboard "Rakesh"
```

---

#### ✅ `ZCARD key`

```bash
ZCARD leaderboard
# Total members
```

---

#### ✅ `ZCOUNT key min max`

```bash
ZCOUNT leaderboard 100 200
```

➡ Count of members with scores between given range.

---

### 💡 Code Examples with Output

```bash
ZADD alumni_scoreboard 85 "rakesh" 90 "rajesh" 92 "ravi"
ZRANGE alumni_scoreboard 0 -1 WITHSCORES
# "rakesh", "85", "rajesh", "90", "ravi", "92"

ZREVRANGE alumni_scoreboard 0 -1
# "ravi", "rajesh", "rakesh"

ZINCRBY alumni_scoreboard 5 "rakesh"
ZSCORE alumni_scoreboard "rakesh"
# "90"
```

---

### 📏 Limits & Performance

- Each sorted set can have over **4 billion elements**.
- Sorted sets are backed by a **skip list** internally.
- Score-based queries are **very fast**.

---

### 🧠 Real-World Use Cases

| Use Case                | Redis Sorted Set Usage                                  |
|-------------------------|----------------------------------------------------------|
| Game leaderboards       | Store user scores, rank using `ZREVRANGE`               |
| Top students/alumni     | Rank by GPA or achievements                             |
| Most active users       | Track logins using `ZINCRBY`                            |
| Trending content        | Track content interactions                              |
| Event registration time | Store time as score for ordering                        |

---

### 🧑‍💻 Using Sorted Sets in Your Alumni Portal

#### 🔸 1. Leaderboard of Most Active Alumni

```bash
ZINCRBY alumni:activity 1 "rakesh"
ZINCRBY alumni:activity 3 "rajesh"
ZREVRANGE alumni:activity 0 2 WITHSCORES
```

➡ Shows the **top 3 active alumni**.

---

#### 🔸 2. Event Score Tracking (e.g., quiz)

```bash
ZADD quiz:event1 10 "rakesh" 15 "ravi" 12 "rahul"
```

- Use `ZREVRANGE` to display top scorers on your portal.

---

#### 🔸 3. Alumni Donations Ranking

```bash
ZINCRBY donations 500 "rakesh"
ZINCRBY donations 1000 "rajesh"
ZREVRANGE donations 0 2 WITHSCORES
```

➡ Show top donors on the homepage or event pages.

---

### ✅ Summary Table

| Command           | Description                                    |
|-------------------|------------------------------------------------|
| `ZADD`            | Add/update members with scores                 |
| `ZRANGE`          | List by lowest to highest score                |
| `ZREVRANGE`       | List by highest to lowest score                |
| `ZSCORE`          | Get score of a member                          |
| `ZINCRBY`         | Increase score of a member                     |
| `ZRANK`           | Get rank (index) of a member                   |
| `ZREM`            | Remove member(s)                               |
| `ZREMRANGEBYRANK` | Remove by rank range                           |
| `ZCOUNT`          | Count members by score range                   |
| `ZCARD`           | Count total members in set                     |

---

### 🔗 Redis Sorted Set Docs  
👉 [https://redis.io/docs/latest/develop/data-types/sorted-sets/](https://redis.io/docs/latest/develop/data-types/sorted-sets/)

---
