**Redis Notes – Part 9: Time-Series, Bitmaps, Bitfields, and Probabilistic Data Structures**

---

## 📘 Redis Notes – Part 9: Time-Series, Bitmaps, Bitfields, Probabilistic Structures

---

## ⏱️ 1. Time-Series (via RedisTimeSeries Module)

🔗 [RedisTimeSeries Docs](https://redis.io/docs/latest/develop/data-types/timeseries/)

### ✅ Use Case:
Store **timestamped data** like alumni logins, event participation over time, or daily active users.

### 🔧 Key Commands:

| Command | Description |
|--------|-------------|
| `TS.CREATE` | Create a time-series key |
| `TS.ADD` | Add a new data point |
| `TS.MADD` | Add multiple points |
| `TS.RANGE` | Get values in time range |
| `TS.INCRBY` | Increment a value at current timestamp |

### 🧪 Example

```bash
TS.CREATE alumni:logins

TS.ADD alumni:logins * 1         # * = current timestamp
TS.INCRBY alumni:logins 1

TS.RANGE alumni:logins - +       # Get all values
```

➡ Use to show alumni activity graph or weekly usage stats.

---

## 🧠 2. Bitmaps

🔗 [Bitmaps Docs](https://redis.io/docs/latest/develop/data-types/bitmaps/)

### ✅ Use Case:
Track presence/absence of alumni in a compressed format (e.g., **who logged in today**).

### 🔧 Key Commands:

| Command | Description |
|--------|-------------|
| `SETBIT` | Set bit at offset |
| `GETBIT` | Get bit at offset |
| `BITCOUNT` | Count bits set to 1 |
| `BITOP` | Perform bitwise operations |

### 🧪 Example

```bash
SETBIT alumni:loggedin:2024-04-18 123 1
GETBIT alumni:loggedin:2024-04-18 123
BITCOUNT alumni:loggedin:2024-04-18
```

➡ Can efficiently check or count alumni logins per day.

---

## 🧮 3. Bitfields

🔗 [Bitfield Docs](https://redis.io/docs/latest/develop/data-types/bitfields/)

### ✅ Use Case:
Pack **multiple small values** in a single key (e.g., alumni preferences, flags, counters).

### 🔧 Key Commands:

| Command | Description |
|--------|-------------|
| `BITFIELD` | Read/write integer values in binary fields |

### 🧪 Example

```bash
BITFIELD alumni:settings SET u8 0 5       # Set 5 at offset 0
BITFIELD alumni:settings GET u8 0         # Read back
```

➡ Use to store alumni notification settings or feature flags compactly.

---

## 🎲 4. Probabilistic Structures

🔗 [HyperLogLog Docs](https://redis.io/docs/latest/develop/data-types/probabilistic/)

### ✅ Use Case:
Estimate **unique alumni count** (e.g., unique logins per month) using minimal memory.

### 🔧 Commands (HyperLogLog)

| Command | Description |
|--------|-------------|
| `PFADD` | Add element |
| `PFCOUNT` | Count unique approx. |
| `PFMERGE` | Merge HLLs |

### 🧪 Example

```bash
PFADD alumni:unique:logins rakesh rajat rahul
PFCOUNT alumni:unique:logins
```

➡ Use this for analytics without storing all usernames.

---

## 🎯 Use in Your Alumni Portal

| Redis Type | Use Case in Portal |
|------------|---------------------|
| Time-Series | Track daily/weekly alumni activity & visualize trends |
| Bitmaps | Check if alumni logged in on a specific day |
| Bitfields | Store notification settings, feature flags efficiently |
| Probabilistic (HLL) | Estimate unique alumni interacting with the site |

---
