export interface User {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    role: string
    bookings: Booking[]
}

export interface Booking{
    id: string
    tutor_id: string
    student_id: string
    time_slot: string
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
}
export default function userProfile(profile: User) {
    console.log(profile);
    return (
        <div>
            <h1>{profile.name}</h1>
            <p>{profile.email}</p>
            <p>Role: {profile.role}</p>
            <h1>{profile.bookings.length} Bookings</h1>
            <h2>Bookings:</h2>
            
            {profile.bookings.map((booking) => (
                <div key={booking.id}>
                    <p>Time Slot: {booking.time_slot}</p>
                    <p>Status: {booking.status}</p>
                </div>
            ))}
        </div>
    );
}