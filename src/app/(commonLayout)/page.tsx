import { userService } from "@/services/user.service";

export default async function Home() {
  const session = await userService.getSession();
  console.log(session);
  return (
    <main className="min-h-screen bg-background">
      <h1>THis is home page</h1>
    </main>
  );
}
