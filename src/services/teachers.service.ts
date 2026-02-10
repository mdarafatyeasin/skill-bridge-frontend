import { env } from "@/env";

export const teacherService = {
    getTutors: async function () {
        try {
            const res = await fetch("http://localhost:8000/api/v1/tutor", {
                cache: "no-store"
            })
            const tutors = await res.json();
            return tutors
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    getTutorsById: async function (id: string) {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies()
            const res = await fetch(`${env.API_URL}/api/v1/tutor/${id}`, {
                cache: "no-store",
                headers: {
                    Cookie: cookieStore.toString(),
                    "Content-Type": "application/json",
                }
            })
            const tutor = await res.json();
            console.log(tutor);
            return tutor
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    createTimeSlot: async function (data: { startTime: string, endTime: string, available?: boolean }) {
        try {
            const res = await fetch("http://localhost:8000/api/v1/slot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    start_time: data.startTime,
                    end_time: data.endTime,
                    available: data.available,
                }),
                credentials: 'include',
            })
            const result = await res.json();
            return result
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    }
}