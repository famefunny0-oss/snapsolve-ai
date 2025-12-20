import { z } from 'zod';
import { insertUserSchema, insertQuestionSchema, questions } from './schema';

export { insertUserSchema, insertQuestionSchema };


export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/login',
      input: z.object({
        username: z.string(),
        password: z.string(),
      }),
      responses: {
        200: insertUserSchema, // Returns user object
        401: z.object({ message: z.string() }),
      },
    },
    register: {
      method: 'POST' as const,
      path: '/api/register',
      input: z.object({
        username: z.string(),
        password: z.string(),
      }),
      responses: {
        201: insertUserSchema,
        400: z.object({ message: z.string() }),
      },
    },
    guest: {
      method: 'POST' as const,
      path: '/api/guest-login',
      input: z.object({}),
      responses: {
        200: insertUserSchema,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout',
      responses: {
        200: z.object({ message: z.string() }),
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/user',
      responses: {
        200: insertUserSchema.nullable(),
      },
    }
  },
  solver: {
    solve: {
      method: 'POST' as const,
      path: '/api/solve',
      input: z.object({
        content: z.string().optional(),
        image: z.string().optional(), // Base64 or URL
        subject: z.string(),
        classLevel: z.string(),
      }),
      responses: {
        200: z.object({
          solution: z.string(),
        }),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
