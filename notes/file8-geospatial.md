**Redis Notes – Part 8: Geospatial Data**

- 📍 Basics of geospatial support in Redis  
- 🛠️ Commands with examples  
- 🌍 Real-world & **Alumni Portal** use cases  
- 🔗 Redis Docs link  
- 💡 Output samples for clarity  

---

## 📘 Redis Notes – Part 8: Geospatial

---

### 🔗 Official Docs:  
[https://redis.io/docs/latest/develop/data-types/geospatial/](https://redis.io/docs/latest/develop/data-types/geospatial/)

---

### 📍 What is Redis Geospatial?

Redis allows you to **store, retrieve, and query locations** (latitude & longitude) using a **sorted set under the hood**. Useful for location-aware features like:

- Finding nearby users, events, or places  
- Distance calculation  
- Location-based filtering  

---

### 🗺️ Core Commands

| Command | Description |
|---------|-------------|
| `GEOADD` | Add geolocation (lon, lat, name) |
| `GEODIST` | Distance between two members |
| `GEOPOS` | Get position (lon/lat) of members |
| `GEORADIUS` *(deprecated)* | Radius search |
| `GEOSEARCH` | Find members within radius or box |
| `GEOSEARCHSTORE` | Store results of search |

---

### 🧪 Example Commands

#### 1. Add Alumni Cities

```bash
GEOADD alumni:locations 77.5946 12.9716 "Bangalore"
GEOADD alumni:locations 72.8777 19.0760 "Mumbai"
GEOADD alumni:locations 88.3639 22.5726 "Kolkata"
```

#### 2. Get Coordinates of a City

```bash
GEOPOS alumni:locations "Bangalore"
# → [[77.5946, 12.9716]]
```

#### 3. Calculate Distance Between Cities

```bash
GEODIST alumni:locations "Mumbai" "Bangalore" km
# → "843.1"
```

#### 4. Find Nearby Cities

```bash
GEOSEARCH alumni:locations FROMLONLAT 77.5946 12.9716 BYRADIUS 1000 km
```

#### 5. Search with Box (instead of radius)

```bash
GEOSEARCH alumni:locations FROMLONLAT 77.5946 12.9716 BYBOX 300 300 km ASC
```

---

### 💡 Output Sample

```bash
127.0.0.1:6379> GEODIST alumni:locations Mumbai Bangalore km
"843.1474"

127.0.0.1:6379> GEOSEARCH alumni:locations FROMLONLAT 77.5946 12.9716 BYRADIUS 1000 km
1) "Bangalore"
2) "Mumbai"
```

---

### 📦 Real-Life Use Cases

| Scenario | How Redis Geospatial Helps |
|---------|-----------------------------|
| 📍 Nearby alumni | Suggest local connections |
| 📅 Events | Show nearby alumni events |
| 📦 Job location filtering | Filter job posts within X km |
| 📈 Analytics | Count alumni per region |
| 🧭 Distance-based ranking | Sort alumni by closeness |

---

### 🧑‍💻 In **Your Alumni Portal**

---

#### 1. **Location-Based Alumni Matching**

Store locations of users based on city or IP:

```bash
GEOADD alumni:users 77.1025 28.7041 "user:123"  # Delhi
```

➡ Feature: **"Find nearby alumni"**  
Query:

```bash
GEOSEARCH alumni:users FROMLONLAT 77.1025 28.7041 BYRADIUS 100 km
```

---

#### 2. **Suggest Events Nearby**

```bash
GEOADD alumni:events 88.3639 22.5726 "alumni-meet-kolkata"
```

➡ Fetch events within 500km of user

```bash
GEOSEARCH alumni:events FROMLONLAT 88.36 22.57 BYRADIUS 500 km
```

---

#### 3. **Job Postings Filter by Location**

```bash
GEOADD alumni:jobs 77.5946 12.9716 "job:1021"
```

➡ Use `GEOSEARCH` to show only relevant job postings nearby.

---

### 🧪 Tips

- Redis uses a **geohash** encoding behind the scenes.
- Precision is about **1 meter**.
- Use **GEOSEARCH** instead of older `GEORADIUS` for new apps.

---

### ✅ Summary Table

| Command | Example |
|--------|---------|
| `GEOADD` | `GEOADD key lon lat member` |
| `GEOPOS` | `GEOPOS key member` |
| `GEODIST` | `GEODIST key m1 m2 km` |
| `GEOSEARCH` | `GEOSEARCH key FROMLONLAT lon lat BYRADIUS 50 km` |
| `GEOSEARCHSTORE` | Store results in another key |

---

### 🔗 Docs  
[https://redis.io/docs/latest/develop/data-types/geospatial/](https://redis.io/docs/latest/develop/data-types/geospatial/)

---
