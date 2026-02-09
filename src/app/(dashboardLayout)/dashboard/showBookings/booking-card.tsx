"use client";

import { bookingService } from "@/services/booking.service";

export interface TutorProfile {
  id: string;
  user_id: string;
  user: User;

  hourly_rate?: number;
  experience_year?: number;
  qualification?: string;
  rating_avg?: number;

  category_id: string;
  category: Category;

  created_at: Date;
  update_at: Date;

  reviews: Review[];
  bookings: Booking[];
  timeSlots: TimeSlot[];
}

export interface Review {
  id: string;
  student_id: string;
  tutor_id: string;
  tutor: TutorProfile;
  booking_id: string;
  rating: number;
  comment: string;

  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: string;
  category: string;
  description?: string;
  created_at: Date;
  update_at: Date;
  tutorProfiles: TutorProfile[];
}

export interface Booking {
  id: string;
  tutor_id: string;
  tutor: TutorProfile;
  student_id: string;
  user: User;
  time_slot: string;
  slot: TimeSlot;
  status: BookingStatus;
}

export interface TimeSlot {
  id: string;
  tutor_id: string;
  tutor: TutorProfile;
  start_time: Date;
  end_time: Date;
  available: boolean;
  created_at: Date;
  updated_at: Date;
  booking?: Booking;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role?: string;
  bookings: Booking[];
  tutorProfiles: TutorProfile[];
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED';

export default function TeacherBookingCard({ bookings = [] }: { bookings?: Booking[] }) {
    console.log(bookings);
    const handleStatusUpdate = async (bookingId: string, newStatus: BookingStatus) => {
        try {
            await bookingService.updateTeacherBookingStatus(bookingId, newStatus);
            alert(`Booking status updated to ${newStatus}`);
        } catch (error) {
            console.error("Error updating booking status:", error);
            alert("Failed to update booking status. Please try again.");
        }
    };
    return (
        <div>
            {
                bookings.map((b) => (
                    <div key={b.id} className="border p-4 rounded mb-4">
                        <h3 className="text-lg font-bold">Booking ID: {b.id}</h3>
                        <p>Student: {b.user.name}</p>
                        <p>Start Time: {b.slot?.start_time ? new Date(b.slot.start_time).toLocaleString() : "Not Available"}</p>
                        <p>End Time: {b.slot?.end_time ? new Date(b.slot.end_time).toLocaleString() : "Not Available"}</p>
                        <p>Slot: {b.slot?.available ? "Available" : "Not Available"}</p>
                        <p>Status: {b.status}</p>
                        <button onClick={() => handleStatusUpdate(b.id, "PENDING")} className="bg-blue-500 text-white px-4 py-2 rounded">Update Status</button>
                    </div>
                ))
            }
        </div>
    );
}