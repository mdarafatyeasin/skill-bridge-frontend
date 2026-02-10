import { bookingService } from "@/services/booking.service";
import TeacherBookingCard from "./booking-card";

export default async function page() {
    const teacherBooking = await bookingService.getTeachersBookings()
    console.log(teacherBooking);
    return <div className="w-[80%] m-auto my-10">
        <TeacherBookingCard bookings={teacherBooking.bookings ?? []} />
    </div>
}