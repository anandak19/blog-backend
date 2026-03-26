export const AUTH_MESSAGES = {
  LOGIN: {
    SUCCESS: 'Login successful',
    OUT_SUCCESS: 'Logout successful',
    UNAUTHORIZED: 'Unauthorized access',
  },

  SIGNUP: {
    SUCCESS: 'User signup successful',
    USER_EXISTS: 'User already exists',
    SESSION_EXPIRED: 'Signup session expired! Try again',
  },

  OTP: {
    SENT: 'OTP sent',
    RESENT: 'New OTP has been sent',
    EXPIRED: 'OTP expired',
    INVALID: 'Invalid OTP',
  },

  EMAIL_VERIFICATION: {
    TITLE: 'Verify your email',
  },
} as const;