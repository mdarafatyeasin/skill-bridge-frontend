'use client'

import { useState } from 'react'
import { bookingService } from "@/services/booking.service"

type Booking = {
    id: string
    status: string
}

type BookingCardProps = {
    bookings: Booking[]
}

export function BookingCard({ bookings }: BookingCardProps) {
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<string>('')

    const handleBookingStatus = async (id: string, status: string) => {
        setError('')
        setLoading(id)
        
        try {
            const result = await bookingService.updateTeacherBookingStatus(id, status)
            console.log(result);
            
            if (result.error) {
                setError(`Failed to update booking: ${result.error.message}`)
            } else {
                console.log('Booking updated:', result)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update booking')
        } finally {
            setLoading('')
        }
    }

    return (
        <div className="p-4">
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            
            <div>
                This is all booking.....
                {bookings.map((booking: Booking) => (
                    <div key={booking.id} className="p-4 border rounded mb-4">
                        <p><strong>Booking ID:</strong> {booking.id}</p>
                        <p><strong>Status:</strong> {booking.status}</p>
                        <button
                            onClick={() => handleBookingStatus(booking.id, 'CONFIRMED')}
                            disabled={loading === booking.id}
                            className="mr-2 px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
                        >
                            {loading === booking.id ? 'Updating...' : 'Confirm'}
                        </button>
                        <button
                            onClick={() => handleBookingStatus(booking.id, 'REJECTED')}
                            disabled={loading === booking.id}
                            className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
                        >
                            {loading === booking.id ? 'Updating...' : 'Reject'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
