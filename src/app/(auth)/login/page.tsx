import { login } from "@/actions/login";

export default function Login() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Login</h1>
      <form action={login}>
        <input name="email" type="email" required />
        <input name="password" type="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}