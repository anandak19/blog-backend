export const BLOG_MESSAGES = {
  CREATE: {
    SUCCESS: 'Blog created successfully',
    TITLE_EXISTS: 'You already have a blog with this title',
    IMAGE_REQUIRED: 'Image is required',
    ERROR: 'Error while saving blog',
  },

  UPDATE: {
    SUCCESS: 'Blog updated successfully',
    FAILED: 'Failed to update blog',
  },

  DELETE: {
    SUCCESS: 'Blog deleted successfully',
  },

  FETCH: {
    NOT_FOUND: 'Blog not found',
  },
} as const;