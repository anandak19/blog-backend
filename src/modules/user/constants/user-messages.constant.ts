export const USER_MESSAGES = {
  AUTH: {
    NOT_FOUND: 'User not found',
    INCORRECT_PASSWORD: 'Incorrect password',
  },

  CREATE: {
    SUCCESS: 'User created successfully',
    EXISTS: 'User already exists',
    FAILED: 'Failed to create user',
  },
} as const;