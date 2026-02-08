import { userProfileService } from "@/services/profile.service";
import { BookingCard } from "./booking-card";

export default async function page() {
    const myBookings = await userProfileService.getMyProfile()
    console.log(myBookings.data[0].bookings);
    const bookings = await myBookings.data[0].bookings

    return <BookingCard bookings={bookings} />
}