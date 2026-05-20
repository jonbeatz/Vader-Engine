#!/usr/bin/env node
/**
 * Emergency admin unlock — env-driven only (no hardcoded credentials).
 *
 * Required: MSC_RESCUE_EMAIL, MSC_RESCUE_PASSWORD
 * Optional: PAYLOAD_CONFIG_PATH, MSC_RESCUE_ROLE (default admin)
 * Sets PAYLOAD_MIGRATING=true, PAYLOAD_SQLITE_PUSH=false for the run.
 */
import process from 'node:process'

const BANNER = '[msc:rescue-admin]'

const email = process.env.MSC_RESCUE_EMAIL?.trim()
const password = process.env.MSC_RESCUE_PASSWORD
const role = process.env.MSC_RESCUE_ROLE?.trim() || 'admin'

if (!email || !password) {
  console.error(`${BANNER} set MSC_RESCUE_EMAIL and MSC_RESCUE_PASSWORD`)
  process.exit(1)
}

process.env.PAYLOAD_MIGRATING = 'true'
process.env.PAYLOAD_SQLITE_PUSH = 'false'

console.log(`${BANNER} stub — wire in consumer Payload project:`)
console.log(`  import getPayload from 'payload'`)
console.log(`  overrideAccess: find user by email "${email}", set role=${role}, reset password`)
console.log(`${BANNER} copy scripts/msc-rescue-admin.mjs body from your app's payload.config entry`)
process.exit(0)
