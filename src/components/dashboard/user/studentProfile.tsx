"use client";

import { useState } from "react";
import { bookingService } from "@/services/booking.service";
import { reviewService } from "@/services/review.service";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string;
  bookings: Booking[];
}

export interface Booking {
  id: string;
  tutor_id: string;
  student_id: string;
  booking_id: string;
  time_slot: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETE";
}

export default function UserProfile(profile: User) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleBooking = async (bookingId: string, newStatus: string) => {
    try {
      await bookingService.updateMyBookingStatus(bookingId, newStatus);
      alert(`Booking status updated to ${newStatus}`);
    } catch (error) {
      console.error(error);
      alert("Failed to update booking status");
    }
  };

  const handleReview = async (
    bookingId: string,
    tutorId: string,
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (!comment || rating === 0) {
      alert("Please enter both comment and rating!");
      return;
    }
    try {
      await reviewService.createReview({
        booking_id: bookingId,
        tutor_id: tutorId,
        comment,
        rating,
      });
      alert("Review submitted successfully!");
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Error creating review:", error);
      alert("Failed to submit review");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold">{profile.name}</h1>
      <p>{profile.email}</p>
      <p>Role: {profile.role}</p>

      <h2 className="mt-4 font-semibold">
        {profile.bookings.length} Bookings
      </h2>

      {profile.bookings.map((booking) => (
        <div
          key={booking.id}
          className="border rounded p-4 my-4 bg-gray-50 shadow-sm"
        >
          <p>
            <strong>Time Slot:</strong> {booking.time_slot}
          </p>
          <p>
            <strong>Status:</strong> {booking.status}
          </p>

          <div className="space-x-2 mt-2">
            <button
              onClick={() => handleBooking(booking.id, "CONFIRMED")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Confirm
            </button>
            <button
              onClick={() => handleBooking(booking.id, "CANCELLED")}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>

          {booking.status === "COMPLETE" && (
            <form
              onSubmit={(e) => handleReview(booking.id, booking.tutor_id, e)}
              className="mt-4 border-t pt-3"
            >
              <h3 className="font-semibold mb-2">Leave a Review</h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                className="w-full border rounded p-2 mb-2"
              />

              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="border p-2 rounded mb-2 w-full"
              >
                <option value={0}>Select rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r} ⭐
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}
