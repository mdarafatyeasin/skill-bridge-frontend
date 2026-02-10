import { env } from "@/env";
import { cookies } from "next/headers";

export const userProfileService = {
    getMyProfile: async function () {
        const cookieStore = await cookies()
        try {
            const res = await fetch(`${env.API_URL}/api/v1/user/myProfile`, {
                cache: "no-store",
                headers: {
                    Cookie: cookieStore.toString()
                }
            })
            const profile = await res.json();
            return profile
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
    
    getTutorProfile: async function () {
        const cookieStore = await cookies()
        try {
            const res = await fetch(`${env.API_URL}/api/v1/tutor/myProfile`, {
                cache: "no-store",
                headers: {
                    Cookie: cookieStore.toString()
                }
            })
            const profile = await res.json();
            return profile
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    }
}