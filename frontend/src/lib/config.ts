export const config = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001',

  // MUST be a number (backend expects number)
  CURRENT_USER_ID: Number(process.env.NEXT_PUBLIC_CURRENT_USER_ID || 1),
}
