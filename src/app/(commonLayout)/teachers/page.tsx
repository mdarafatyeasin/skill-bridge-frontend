import { env } from "@/env";
import { userService } from "@/services/user.service";
import { cookies } from "next/headers";

export default async function TeachersPage() {
    const session = await userService.getSession()
    console.log(session);
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_URL}/api/v1/tutor`, {
        cache: "no-store",
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    const { data: tutors } = await res.json();
    console.log(tutors);
    return (
        <main className="min-h-screen bg-background dark:bg-background">
            <h1>This is teachers page</h1>

        </main>
    );
}
