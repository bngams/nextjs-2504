import { logout } from "@/actions/logout";

export default async function DashboardPage() {

  // access verification moved to middleware.ts

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome!</p>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}
  
  