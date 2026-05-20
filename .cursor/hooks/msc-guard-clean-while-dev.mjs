/**
 * Blocks clean:next / verify:next while MSC_DEV_PORT is listening.
 * Safe alternative: npm run verify:next:safe (consumer script alias).
 */
import net from 'node:net'
import process from 'node:process'

function readStdin() {
  return new Promise((resolve, reject) => {
    const chunks = []
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', (c) => chunks.push(c))
    process.stdin.on('end', () => resolve(chunks.join('')))
    process.stdin.on('error', reject)
  })
}

function portInUse(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const socket = net.createConnection({ port, host }, () => {
      socket.destroy()
      resolve(true)
    })
    socket.on('error', () => resolve(false))
    socket.setTimeout(1200, () => {
      socket.destroy()
      resolve(false)
    })
  })
}

function isNukeCommand(cmd) {
  if (!cmd || typeof cmd !== 'string') return false
  if (/verify:next:safe|msc-verify-next-safe/.test(cmd)) return false
  if (/(\bnpm\s+run\s+verify:next\b|\bverify:next\b)/.test(cmd) && !/verify:next:safe/.test(cmd)) return true
  if (/\bnpm\s+run\s+clean:next\b|\bclean:next\b/.test(cmd)) return true
  if (/msc-clean-next-cache/.test(cmd)) return true
  if (/\brimraf\b.*\.next\b/.test(cmd)) return true
  return false
}

function deny(msg, agentMsg) {
  process.stdout.write(
    JSON.stringify({
      permission: 'deny',
      userMessage: msg,
      user_message: msg,
      agentMessage: agentMsg,
      agent_message: agentMsg,
    }),
  )
}

async function main() {
  let input = {}
  try {
    const raw = await readStdin()
    if (raw?.trim()) input = JSON.parse(raw)
  } catch (e) {
    console.error('[msc-guard-clean-while-dev]', e.message)
  }

  const cmd =
    input.command ??
    input.shellCommand ??
    input.fullCommand ??
    (typeof input.arguments === 'string' ? input.arguments : '') ??
    ''

  if (!isNukeCommand(cmd)) {
    process.stdout.write(JSON.stringify({ permission: 'allow' }))
    return
  }

  const port = Number(process.env.MSC_DEV_PORT || 3000)
  if (!(await portInUse(port))) {
    process.stdout.write(JSON.stringify({ permission: 'allow' }))
    return
  }

  deny(
    `Port ${port} is in use. Do not delete .next while dev is running. Use verify:next:safe or stop dev first.`,
    `Use scripts/msc-verify-next-safe.mjs or stop the dev server on port ${port} before clean/verify:next.`,
  )
}

main().catch((e) => {
  console.error('[msc-guard-clean-while-dev]', e)
  process.stdout.write(JSON.stringify({ permission: 'allow' }))
})
