import { cookies } from "next/headers";

export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();

            const res = await fetch("http://localhost:8000/api/auth/get-session", {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store"
            })
            const session = await res.json();
            // if (session.data===null) {
            //     return { data: null, error: { massage: "session is missing" } }
            // }
            return session
        } catch (err) {
            console.error(err);
            return { data: null, error: { massage: "Something went wrong" } }
        }
    }
}