// Re-export from auth.ts for backward compatibility
// Note: 'use server' is not needed here since auth.ts already has it
// The re-exported functions maintain their server action status from auth.ts
export {
  loginWithWordPress,
  logoutAdmin,
  getSession,
  isAuthenticated,
  requireAuth,
} from './auth'
