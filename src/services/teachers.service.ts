import { env } from "@/env";
import { get } from "http";

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
            const res = await fetch(`${env.API_URL}/api/v1/tutor/${id}`, {
                cache: "no-store"
            })
            const tutor = await res.json();
            return tutor
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    }
}