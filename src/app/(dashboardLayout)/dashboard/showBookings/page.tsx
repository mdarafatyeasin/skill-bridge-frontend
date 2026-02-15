import { bookingService } from "@/services/booking.service";
import TeacherBookingCard from "./booking-card";
import { userService } from "@/services/user.service";

export default async function page() {
    const session = await userService.getSession()
    const role = await session.user.role
    if (role === "ADMIN") {
        const teacherBooking = await bookingService.getAllBookings()
        return <div className="w-[80%] m-auto my-10">
            <h1>All Bookings</h1>
            <TeacherBookingCard bookings={teacherBooking.bookings ?? []} />
        </div>
    } else {

        const teacherBooking = await bookingService.getTeachersBookings()
        return <div className="w-[80%] m-auto my-10">
            <TeacherBookingCard bookings={teacherBooking.bookings ?? []} />
        </div>
    }

}