'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const COOKIE_NAME = 'admin-auth';

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
  if (!ADMIN_PASSWORD) {
    console.error('Admin password is not set in environment variables.');
    return {
      message: 'Server-Konfigurationsfehler. Bitte kontaktieren Sie den Support.',
      success: false,
    };
  }

  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: 'Ungültige Eingabe.',
      success: false,
    };
  }

  if (parsed.data.password === ADMIN_PASSWORD) {
    cookies().set(COOKIE_NAME, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
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
