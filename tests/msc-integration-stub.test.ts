/**
 * MSC-Core integration test stub (no Jest/Vitest required).
 * Run: npm run test:integration
 *
 * Consumer apps may adopt Jest/Vitest and import these patterns.
 */

import {
  MSC_PROJECT_ROOT,
  msc_envHydrationReady,
} from "../scripts/lib/msc-load-env.mjs"
import {
  MSC_MEDIA_ENGINE_MODULES,
  msc_createVideoTrackingEvent,
} from "../core/msc-core-engine.ts"

export type MscConnectivityReport = {
  ok: boolean
  hydration: boolean
  engine: boolean
  projectRoot: string
}

/**
 * Baseline connectivity check for agents extending the boilerplate test suite.
 */
export async function msc_test_connectivity(): Promise<MscConnectivityReport> {
  const hydration = typeof msc_envHydrationReady === "function" && msc_envHydrationReady()
  const engine =
    Array.isArray(MSC_MEDIA_ENGINE_MODULES) &&
    MSC_MEDIA_ENGINE_MODULES.length > 0 &&
    typeof msc_createVideoTrackingEvent === "function"

  const report: MscConnectivityReport = {
    ok: hydration && engine && Boolean(MSC_PROJECT_ROOT),
    hydration,
    engine,
    projectRoot: MSC_PROJECT_ROOT ?? "",
  }

  return report
}

async function msc_runStubAssertions() {
  const report = await msc_test_connectivity()

  if (!report.hydration) {
    throw new Error("[msc:integration-stub] env hydration not ready — check .env.local / .env.example")
  }
  if (!report.engine) {
    throw new Error("[msc:integration-stub] msc-core-engine exports missing or empty")
  }
  if (!report.ok) {
    throw new Error("[msc:integration-stub] connectivity check failed")
  }

  console.log("[msc:integration-stub] OK")
  console.log(`  projectRoot: ${report.projectRoot}`)
  console.log(`  hydration: ${report.hydration}`)
  console.log(`  engine modules: ${MSC_MEDIA_ENGINE_MODULES.length}`)
}

const isMain =
  typeof process !== "undefined" &&
  process.argv[1] &&
  (process.argv[1].endsWith("msc-integration-stub.test.ts") ||
    process.argv[1].endsWith("msc-integration-stub.test.mjs"))

if (isMain) {
  msc_runStubAssertions().catch((err) => {
    console.error(err instanceof Error ? err.message : err)
    process.exit(1)
  })
}
