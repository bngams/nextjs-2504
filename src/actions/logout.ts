'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function logout() {
  // Clear the authentication token
  (await cookies()).delete('auth_token')

  // Redirect to the login page
  redirect('/login')
}
