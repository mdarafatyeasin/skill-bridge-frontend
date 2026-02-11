"use client";

import React from "react"

import { useState } from "react";
import { Star, Calendar, CheckCircle, AlertCircle, XCircle, Mail, User as UserIcon } from "lucide-react";
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
  slot: TimeSlot;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETE";
}

type TimeSlot = {
  id: string
  tutor_id: string
  start_time: string
  end_time: string
  available: boolean
  created_at: string
  updated_at: string
}


const statusConfig: Record<string, { bg: string; badge: string; icon: React.ReactNode; color: string }> = {
  PENDING: {
    bg: 'bg-accent/5',
    badge: 'bg-accent/15 text-accent',
    icon: <AlertCircle className="w-4 h-4" />,
    color: 'text-accent'
  },
  CONFIRMED: {
    bg: 'bg-primary/5',
    badge: 'bg-primary/15 text-primary',
    icon: <CheckCircle className="w-4 h-4" />,
    color: 'text-primary'
  },
  CANCELLED: {
    bg: 'bg-destructive/5',
    badge: 'bg-destructive/15 text-destructive',
    icon: <XCircle className="w-4 h-4" />,
    color: 'text-destructive'
  },
  COMPLETE: {
    bg: 'bg-secondary/5',
    badge: 'bg-secondary/15 text-secondary',
    icon: <CheckCircle className="w-4 h-4" />,
    color: 'text-secondary'
  }
};

const defaultConfig = {
  bg: 'bg-background/50',
  badge: 'bg-muted text-muted-foreground',
  icon: <AlertCircle className="w-4 h-4" />,
  color: 'text-muted-foreground'
};

export default function AdminProfile(profile: User) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState<string>("");
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  console.log(profile);

  const handleBooking = async (bookingId: string, newStatus: string) => {
    setLoading(bookingId);
    setMessage(null);
    try {
      await bookingService.updateMyBookingStatus(bookingId, newStatus);
      setMessage({ type: 'success', text: `Booking ${newStatus.toLowerCase()}` });
    } catch (error) {
      setMessage({ type: 'error', text: "Failed to update booking" });
    } finally {
      setLoading("");
    }
  };

  const handleReview = async (bookingId: string, tutorId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!comment || rating === 0) {
      setMessage({ type: 'error', text: "Please enter comment and rating" });
      return;
    }
    setLoading(bookingId);
    try {
      await reviewService.createReview({
        booking_id: bookingId,
        tutor_id: tutorId,
        comment,
        rating,
      });
      setMessage({ type: 'success', text: "Review submitted successfully!" });
      setComment("");
      setRating(0);
    } catch (error) {
      setMessage({ type: 'error', text: "Failed to submit review" });
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
                <p className="text-sm text-muted-foreground mt-1">{profile.role}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-foreground">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <a href={`mailto:${profile.email}`} className="hover:underline text-primary">
              {profile.email}
            </a>
            {profile.emailVerified && <CheckCircle className="w-4 h-4 text-primary" />}
          </div>
        </div>

        {/* Bookings Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Your Bookings ({profile.bookings.length})
            </h2>
          </div>

          {message && (
            <div className={`p-4 rounded-lg flex items-center gap-3 border mb-6 ${
              message.type === 'success'
                ? 'bg-primary/5 border-primary/20'
                : 'bg-destructive/5 border-destructive/20'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              )}
              <p className={`text-sm font-medium ${
                message.type === 'success' ? 'text-primary' : 'text-destructive'
              }`}>
                {message.text}
              </p>
            </div>
          )}

          {profile.bookings.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground font-medium">No bookings yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {profile.bookings.map((booking) => {
                const config = statusConfig[booking.status] || defaultConfig;
                return (
                  <div
                    key={booking.id}
                    className={`${config.bg} border border-current/10 rounded-xl p-6 transition-all hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.badge}`}>
                            {config.icon}
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground opacity-75">ID: {booking.id}</p>
                      </div>
                    </div>

                    <div className="bg-background/40 rounded-lg p-4 mb-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Scheduled Time</p>
                      <p className="text-sm font-bold text-foreground">
                        <strong>Start: </strong>
                        {new Date(booking.slot.start_time).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </p>
                      <p className="text-sm font-bold text-foreground">
                        <strong>End: </strong>
                        {new Date(booking.slot.end_time).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </p>
                    </div>

                    <div className="flex gap-2 mb-4">
                      {booking.status !== 'CANCELLED' && (
                        <button
                          onClick={() => handleBooking(booking.id, 'CANCELLED')}
                          disabled={loading === booking.id}
                          className="flex-1 px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading === booking.id ? 'Cancelling...' : 'Cancel Booking'}
                        </button>
                      )}
                    </div>

                    {booking.status === 'COMPLETE' && (
                      <form
                        onSubmit={(e) => handleReview(booking.id, booking.tutor_id, e)}
                        className="mt-6 pt-6 border-t border-current/10 space-y-4"
                      >
                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          Leave a Review
                        </h3>

                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Share your experience..."
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                          rows={3}
                        />

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                          <select
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                          >
                            <option value={0}>Select rating...</option>
                            {[1, 2, 3, 4, 5].map((r) => (
                              <option key={r} value={r}>
                                {'★'.repeat(r)}{'☆'.repeat(5-r)} {r} stars
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={loading === booking.id}
                          className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading === booking.id ? 'Submitting...' : 'Submit Review'}
                        </button>
                      </form>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
