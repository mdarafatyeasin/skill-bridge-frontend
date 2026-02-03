import { env } from "@/env";


// bookingData types "time_slot", "tutor_id"
interface BookingData {
    time_slot: string;
    tutor_id: string;
}

export const bookingService = {
    createBooking: async function (bookingData: BookingData) {
        try {
            const res = await fetch(`${env.API_URL}/api/v1/booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingData)
            });
            const bookingResponse = await res.json();
            return bookingResponse;
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    getMyBookings: async function () {
        try {
            const res = await fetch(`${env.API_URL}/api/v1/booking/myBooking`, {
                cache: "no-store"
            });
            const bookings = await res.json();
            return bookings;
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
    
    getMyBookingsById: async function (id: string) {
        try {
            const res = await fetch(`${env.API_URL}/api/v1/booking/myBooking/${id}`, {
                cache: "no-store"
            });
            const booking = await res.json();
            return booking;
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    updateMyBookingStatus: async function (id: string, status: string) {
        try {
            const res = await fetch(`${env.API_URL}/api/v1/booking/myBooking/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status })
            });
            const updatedBooking = await res.json();
            return updatedBooking;
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    updateTeacherBookingStatus: async function (id: string, status: string) {
        try {
            const res = await fetch(`${env.API_URL}/api/v1/booking/teacherBooking/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status })
            });
            const updatedBooking = await res.json();
            return updatedBooking;
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    }
}