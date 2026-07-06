# Australia TAM Dashboard

GUI for tracking Australian tech accounts with **≤250 engineers**, with TAM calculated as **SKU price × engineering headcount**.

## Features

- **Sidebar GUI** with navigation, SKU selector, and billing toggle
- **93 target accounts** (Canva & Atlassian excluded — over 250 engineers)
- **TAM by SKU**: Each license type = unit price × total engineers
- **Top 10 accounts** with individual visual dashboards
- Charts by state, industry, and SKU comparison

## TAM Formula

```
Monthly TAM (per SKU) = unit price × engineering headcount
Annual TAM (per SKU)  = monthly TAM × 12
```

Each SKU row is independent (ceiling if all engineers adopted that license).

## Cursor Pricing (July 2026)

| SKU | Monthly | Annual (20% off) |
|-----|---------|------------------|
| Pro | $20/seat | $16/seat |
| Pro+ | $60/seat | $48/seat |
| Ultra | $200/seat | $160/seat |
| Teams Standard | $40/seat | $32/seat |
| Teams Premium | $120/seat | $96/seat |
| Enterprise | ~$55/seat | ~$44/seat |

## Run

```bash
npm install
npm run dev
```

- **Overview**: http://localhost:3000
- **Top 10**: http://localhost:3000/accounts
- **TAM by SKU**: http://localhost:3000/tam
