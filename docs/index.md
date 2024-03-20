---
sql:
  electricity: ./data/electricity.arrow
  regions: ./data/eia-regions.csv
---

# US Electricity Demand

## Data: Energy Information Administration Opendata API

```sql
SELECT * FROM regions
```

```sql
SELECT * FROM electricity
```
