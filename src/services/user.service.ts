import { env } from "@/env";
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
    },

    getAllUsers: async function () {
        try {
            const cookieStore = await cookies();
            const result = await fetch(`${env.API_URL}/api/v1/user/allUser`, {
                cache: "no-store",
                credentials: 'include',
                headers: { 
                    Cookie: cookieStore.toString(),
                }
            });
            const users = await result.json();
            return users;
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    updateUserProfileById: async function (userId: string, role: string) {
        try {
            const cookieStore = await cookies();
            const result = await fetch(`${env.API_URL}/api/v1/user/updateProfile/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ role }),
                cache: "no-store",
                credentials: 'include',
            });
            const updatedProfile = await result.json();
            return updatedProfile;
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    }
}