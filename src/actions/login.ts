'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  // TODO: validation
  const email = formData.get('email')
  const password = formData.get('password')

  // Simulate a login request
  if (email === 'test@test.com' && password === '1234') {
    (await cookies()).set('auth_token', 'fake-jwt-token', { httpOnly: true })
    redirect('/dashboard')
  }

  throw new Error('Invalid credentials')
}

