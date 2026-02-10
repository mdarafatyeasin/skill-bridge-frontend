'use client'

import React from "react"

import { Clock, User, Mail, Calendar, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import { useState } from 'react'
import { bookingService } from "@/services/booking.service"

const defaultStatusConfig = {
  bg: 'bg-background/50',
  badge: 'bg-muted text-muted-foreground',
  icon: <AlertCircle className="w-4 h-4" />,
  color: 'text-muted-foreground'
}

const statusConfig: Record<BookingStatus, { bg: string; badge: string; icon: React.ReactNode; color: string }> = {
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
  CANCELED: {
    bg: 'bg-destructive/5',
    badge: 'bg-destructive/15 text-destructive',
    icon: <XCircle className="w-4 h-4" />,
    color: 'text-destructive'
  },
  COMPLETED: {
    bg: 'bg-secondary/5',
    badge: 'bg-secondary/15 text-secondary',
    icon: <CheckCircle className="w-4 h-4" />,
    color: 'text-secondary'
  }
}

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
  const [loading, setLoading] = useState<string>('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleStatusUpdate = async (bookingId: string, newStatus: BookingStatus) => {
    setLoading(bookingId)
    setMessage(null)

    try {
      // const { bookingService } = await import('@/services/booking.service')
      await bookingService.updateTeacherBookingStatus(bookingId, newStatus)
      setMessage({ type: 'success', text: `Booking updated to ${newStatus}` })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update booking status' })
    } finally {
      setLoading('')
    }
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="text-muted-foreground font-medium">No bookings yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 border ${
            message.type === 'success'
              ? 'bg-primary/5 border-primary/20'
              : 'bg-destructive/5 border-destructive/20'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0 text-primary" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-destructive" />
          )}
          <p
            className={`text-sm font-medium ${
              message.type === 'success' ? 'text-primary' : 'text-destructive'
            }`}
          >
            {message.text}
          </p>
        </div>
      )}

      <div className="space-y-3">
        {bookings.map((booking) => {
          const config = statusConfig[booking.status] || defaultStatusConfig

          return (
            <div
              key={booking.id}
              className={`${config.bg} border border-current/10 rounded-lg p-5 transition-all hover:shadow-md`}
            >
              {/* Header with Status Badge */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-foreground text-lg">
                    {booking.user?.name || 'Student'}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground opacity-75 mt-1">ID: {booking.id}</p>
                </div>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${config.badge}`}>
                  {config.icon}
                  {booking.status}
                </span>
              </div>

              {/* Student Contact Info */}
              <div className="mb-4 pb-4 border-b border-current/10">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Student Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <a href={`mailto:${booking.user?.email}`} className="text-sm font-medium text-foreground hover:underline transition-colors break-all">
                    {booking.user?.email || 'Not available'}
                  </a>
                </div>
              </div>

              {/* Booking Time Details */}
              <div className="space-y-3 mb-4">
                <div className="bg-background/40 rounded-lg p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Start Time
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {booking.slot?.start_time
                      ? new Date(booking.slot.start_time).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })
                      : 'Not set'}
                  </p>
                </div>
                <div className="bg-background/40 rounded-lg p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    End Time
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {booking.slot?.end_time
                      ? new Date(booking.slot.end_time).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })
                      : 'Not set'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {booking.status !== 'CONFIRMED' && (
                  <button
                    onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}
                    disabled={loading === booking.id && booking.status === 'CANCELED'} // Disable if already canceled
                    className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading === booking.id ? 'Confirming...' : 'Confirm'}
                  </button>
                )}

                {booking.status !== 'COMPLETED' && booking.status === 'CONFIRMED' && (
                  <button
                    onClick={() => handleStatusUpdate(booking.id, 'COMPLETED')}
                    disabled={loading === booking.id}
                    className="flex-1 px-4 py-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading === booking.id ? 'Completing...' : 'Complete'}
                  </button>
                )}

                {booking.status !== 'CANCELED' && (
                  <button
                    onClick={() => handleStatusUpdate(booking.id, 'CANCELED')}
                    disabled={loading === booking.id} // Allow canceling if not already confirmed
                    className="flex-1 px-4 py-2 bg-destructive hover:bg-destructive/90 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading === booking.id ? 'Canceling...' : 'Cancel'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
