'use client'

import { useState } from 'react'
import { Star, MapPin, Calendar, CheckCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

type TimeSlot = {
  id: string
  tutor_id: string
  start_time: string
  end_time: string
  available: boolean
  created_at: string
  updated_at: string
}

interface BookingCardProps {
  hourlyRate: number
  timeSlots?: TimeSlot[]
  tutorId: string
}

export default function BookingCard({ hourlyRate, timeSlots = [], tutorId }: BookingCardProps) {
  const [selectedSlotId, setSelectedSlotId] = useState<string>('')
  const [isBooking, setIsBooking] = useState(false)

  const availableSlots = timeSlots.filter(slot => slot.available)

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const handleBooking = () => {
    if (!selectedSlotId) {
      alert('Please select a time slot')
      return
    }
    setIsBooking(true)
    console.log('booking confirmed')
    setTimeout(() => setIsBooking(false), 1000)
  }

  return (
    <div className="bg-card rounded-xl border border-border p-8 sticky top-24 space-y-6">
      {/* Price Display */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6 text-center">
        <div className="text-4xl font-bold text-primary mb-2">${hourlyRate}</div>
        <div className="text-sm text-muted-foreground">Per hour</div>
      </div>

      {/* Contact Info */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Contact Information</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>Available for online lessons</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Flexible scheduling</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle className="w-4 h-4" />
          <span>Email verified</span>
        </div>
      </div>

      {/* Time Slot Selection */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Select a Time Slot</h3>
        </div>
        {availableSlots.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            No available time slots at the moment
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
            {availableSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlotId(slot.id)}
                className={`p-3 rounded-lg border-2 transition-all text-left text-sm font-medium ${
                  selectedSlotId === slot.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(slot.start_time)}</span>
                </div>
                <div className="flex items-center gap-2 ml-6 text-xs opacity-75">
                  <Clock className="w-3 h-3" />
                  {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3 pt-4 border-t border-border">
        <Button
          onClick={handleBooking}
          disabled={!selectedSlotId || isBooking}
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBooking ? 'Booking...' : 'Book a Lesson'}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full border-2 h-11 font-semibold bg-transparent"
        >
          Send Message
        </Button>
      </div>

      {/* Tutor Badge */}
      <div className="bg-secondary/10 rounded-lg p-4 text-center border border-secondary/20">
        <div className="flex items-center justify-center gap-2 text-secondary font-semibold">
          <Star className="w-4 h-4 fill-secondary" />
          Verified Tutor
        </div>
      </div>
    </div>
  )
}
