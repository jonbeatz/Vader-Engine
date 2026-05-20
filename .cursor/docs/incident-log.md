# Incident Log & Runtime Recovery Ledger

Use this ledger to document any breaking runtime faults, locked ports, or deployment exceptions encountered during development sessions.

## 🚨 [INCIDENT-001] [Brief Fault Description Label]
- **Timestamp:** YYYY-MM-DD HH:MM
- **Environment:** Local / Live Staging
- **Symptoms:** [e.g., Terminal port deadlock, 500 error response]

### 🛠️ Root Cause Analysis
- [Detail what broke, what file caused it, or if it was an orphaned process loop]

### 🔄 Resolution Execution
1. `node scripts/msc-kill-dev-port.mjs <port>` — web **3000** or proxy **4000**/**8000**
2. Applied safe code fallback logic.
3. `node scripts/msc-local-http-smoke.mjs <port>` — web gate on **3000** after dev server restart

