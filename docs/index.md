---
sql:
  electricity: ./data/electricity.arrow
  regions: https://raw.githubusercontent.com/allisonhorst/us-electricity/main/docs/data/eia-regions.csv
---

# US Electricity Demand

## Data: Energy Information Administration Opendata API

```sql
SELECT * FROM electricity
LEFT JOIN regions ON electricity.id = regions.id
```

```sql
SELECT * FROM electricity
```

```sql
SELECT * FROM regions
```
