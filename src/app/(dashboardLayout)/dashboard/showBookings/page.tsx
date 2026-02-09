
import TeacherBookingCard from "./booking-card";
import { bookingService } from "@/services/booking.service";

export default async function page() {
    const teacherBooking = await bookingService.getTeachersBookings()
    console.log(teacherBooking);
    return <TeacherBookingCard bookings={teacherBooking.bookings ?? []} />
}