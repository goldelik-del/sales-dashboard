# Australia TAM Dashboard

A dashboard tracking Australian tech accounts with **250 engineers or under**, applying **Cursor's July 2026 pricing** to calculate total addressable market (TAM) by license type.

## Features

- **95 target accounts** across NSW, VIC, QLD, WA, SA, and ACT
- **~8,800 engineers** in the addressable segment
- **TAM by license type**: Pro, Pro+, Ultra, Teams Standard, Teams Premium, Enterprise
- **4 scenarios**: Conservative (50%), Base Case (65%), Optimistic (80%), Teams Only ceiling (100%)
- Interactive charts by state and industry
- Searchable, sortable accounts table

## Cursor Pricing (July 2026)

| License | Monthly | Annual (20% off) |
|---------|---------|------------------|
| Pro | $20/seat | $16/seat |
| Pro+ | $60/seat | $48/seat |
| Ultra | $200/seat | $160/seat |
| Teams Standard | $40/seat | $32/seat |
| Teams Premium | $120/seat | $96/seat |
| Enterprise | ~$55/seat (est.) | ~$44/seat (est.) |

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## TAM Summary (Base Case — 65% penetration)

At annual billing rates with a realistic seat mix (68% Standard, 15% Premium, 8% Pro, 4% Pro+, 5% Enterprise):

- **~5,700 addressable seats**
- **~$2.9M annual TAM** (AUD, at USD-equivalent pricing)

See the dashboard for full breakdowns by license, state, and industry.

## Data Sources

Engineer counts are estimates from public sources (LinkedIn, company reports, industry directories). Companies with global HQs are capped at 250 AU-based engineers for this segment.
