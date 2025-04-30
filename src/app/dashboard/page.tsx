import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {

  // check if the user is authenticated
  const mCookies = await cookies();
  const token = mCookies.get('auth_token')?.value
  // is the token valid ?
  // ...
  if(!token) {
    // redirect to login page
    redirect('/login') 
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Token actuel : {token}</p>
    </div>
  )
}
  
  