'use client'

import { Star, Clock, BookOpen, Award, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Review = {
  id: string
  student_id: string
  tutor_id: string
  booking_id: string
  rating: number
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

type Booking = {
  id: string
  tutor_id: string
  student_id: string
  time_slot: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
}

type TeacherProfileProps = {
  user: {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    role: string
  }
  hourly_rate: number
  experience_year: number
  qualification: string
  rating_avg: number
  category: {
    id: string
    category: string
    description: string
  }
  reviews: Review[]
  timeSlots: TimeSlot[]
  bookings: Booking[]
}

export default function TeacherProfile({
  user,
  hourly_rate,
  experience_year,
  qualification,
  rating_avg,
  category,
  reviews,
  timeSlots,
  bookings,
}: TeacherProfileProps) {
  const availableSlots = timeSlots.filter((slot) => slot.available).length
  const confirmedBookings = bookings.filter((b) => b.status === 'CONFIRMED').length
  const averageRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0'

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header Card */}
      <div className="bg-card border border-border rounded-xl p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
              {category.category} Tutor
            </p>
          </div>
          {user.emailVerified && (
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Verified</span>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-secondary/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Rating</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{averageRating}</div>
            <p className="text-xs text-muted-foreground mt-1">from {reviews.length} reviews</p>
          </div>

          <div className="bg-primary/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Experience</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{experience_year}+</div>
            <p className="text-xs text-muted-foreground mt-1">Years</p>
          </div>

          <div className="bg-accent/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Rate</span>
            </div>
            <div className="text-2xl font-bold text-foreground">${hourly_rate}</div>
            <p className="text-xs text-muted-foreground mt-1">per hour</p>
          </div>
        </div>
      </div>

      {/* Contact & Qualification */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Contact
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-foreground font-medium break-all">{user.email}</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" />
            Qualification
          </h3>
          <p className="text-foreground">{qualification}</p>
        </div>
      </div>

      {/* Time Slots Overview */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Availability
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-foreground">{availableSlots}</p>
            <p className="text-sm text-muted-foreground">Available slots out of {timeSlots.length}</p>
          </div>
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl font-bold text-primary">{Math.round((availableSlots / timeSlots.length) * 100)}%</p>
              <p className="text-xs text-muted-foreground">free</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Overview */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent" />
          Booking Status
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
            <p className="text-2xl font-bold text-emerald-600">{confirmedBookings}</p>
            <p className="text-xs text-muted-foreground mt-1">Confirmed</p>
          </div>
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
            <p className="text-2xl font-bold text-blue-600">{bookings.filter((b) => b.status === 'PENDING').length}</p>
            <p className="text-xs text-muted-foreground mt-1">Pending</p>
          </div>
          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
            <p className="text-2xl font-bold text-red-600">{bookings.filter((b) => b.status === 'CANCELLED').length}</p>
            <p className="text-xs text-muted-foreground mt-1">Cancelled</p>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Recent Reviews ({reviews.length})
        </h3>
        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-sm">No reviews yet</p>
        ) : (
          <div className="space-y-3">
            {reviews.slice(0, 5).map((review) => (
              <div key={review.id} className="flex items-center gap-3 pb-3 border-b border-border last:border-0">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-auto">{review.rating}/5</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
          Edit Profile
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          View Calendar
        </Button>
      </div>
    </div>
  )
}
