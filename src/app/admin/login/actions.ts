'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  ADMIN_AUTH_COOKIE_MAX_AGE,
  ADMIN_AUTH_COOKIE_NAME,
  createAdminAuthToken,
  isAdminAuthConfigured,
} from '@/lib/admin-auth';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const formSchema = z.object({
  password: z.string(),
});

export interface LoginFormState {
  message: string;
  success: boolean;
}

export async function loginAction(
  prevState: LoginFormState,
  data: FormData
): Promise<LoginFormState> {
  if (!ADMIN_PASSWORD || !isAdminAuthConfigured()) {
    console.error('Admin password or auth secret is not set in environment variables.');
    return {
      message: 'Server-Konfigurationsfehler. Bitte kontaktieren Sie den Support.',
      success: false,
    };
  }

  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: 'Ungueltige Eingabe.',
      success: false,
    };
  }

  if (parsed.data.password === ADMIN_PASSWORD) {
    const token = await createAdminAuthToken();
    const cookieStore = await cookies();

    cookieStore.set(ADMIN_AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: ADMIN_AUTH_COOKIE_MAX_AGE,
      path: '/',
    });
    redirect('/admin');
  } else {
    return {
      message: 'Falsches Passwort.',
      success: false,
    };
  }
}
