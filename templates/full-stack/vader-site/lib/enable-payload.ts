/** Build/runtime gate — Payload loads only when ENABLE_PAYLOAD=true */
export const ENABLE_PAYLOAD = process.env.ENABLE_PAYLOAD === 'true';
