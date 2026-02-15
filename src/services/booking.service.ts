// import { cookies } from "next/headers";

// bookingData types "time_slot", "tutor_id"
interface BookingData {
    time_slot: string;
    tutor_id: string;
}

export const bookingService = {
    createBooking: async function (bookingData: BookingData) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${baseUrl}/api/v1/booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Cookie": cookieStore.toString()
                },
                credentials: 'include',
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
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${baseUrl}/api/v1/booking/myBooking`, {
                cache: "no-store",
                // automatically include cookies in the request
                credentials: 'include',
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
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${baseUrl}/api/v1/booking/myBooking/${id}`, {
                cache: "no-store",
                credentials: 'include',
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
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${baseUrl}/api/v1/booking/myBooking/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
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
            console.log(id, status);
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${baseUrl}/api/v1/booking/teachersBooking/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify( {status} )
            });
            const updatedBooking = await res.json();
            return updatedBooking;
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    getTeachersBookings: async function () {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies()
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${baseUrl}/api/v1/booking/teachersBooking`, {
                cache: "no-store",
                headers: {
                    Cookie: cookieStore.toString()
                }
            });
            const bookings = await res.json();
            return bookings;
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    getAllBookings: async function () {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies()
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${baseUrl}/api/v1/booking`, {
                cache: "no-store",
                headers: {
                    Cookie: cookieStore.toString()
                }
            });
            const bookings = await res.json();
            return bookings;
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
}