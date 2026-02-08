'use client'

import { useState } from 'react'
import { Calendar, Clock, CheckCircle, ArrowRight, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

type TimeSlot = {
  date: string
  startTime: string
  endTime: string
}

export default function TimeSlotCreator() {
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [available, setAvailable] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [slots, setSlots] = useState<TimeSlot[]>([])

  const resetForm = () => {
    setDate('')
    setStartTime('')
    setEndTime('')
    setAvailable(true)
  }

  const handleCreateTimeSlot = async () => {
    setErrorMessage('')
    setSuccessMessage('')

    if (!date || !startTime || !endTime) {
      setErrorMessage('Please fill in all fields')
      return
    }

    setIsLoading(true)

    try {
      const { teacherService } = await import('@/services/teachers.service')
      
      const result = await teacherService.createTimeSlot({
        startTime: `${date}T${startTime}:00Z`,
        endTime: `${date}T${endTime}:00Z`,
        available,
      })

      if (result.success || result) {
        setSuccessMessage('Time slot created!')
        console.log('booking confirmed', result)
        resetForm()
        // Auto-clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000)
      } else {
        setErrorMessage('Failed to create time slot')
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to create time slot')
    } finally {
      setIsLoading(false)
    }
  }


//   const addSlot = () => {
//     if (date && startTime && endTime) {
//       setSlots([...slots, { date, startTime, endTime }]);
//       resetForm();
//     } else {
//       setErrorMessage('Please fill in all fields before adding a slot');
//     }
//   };

//   const removeSlot = (index: number) => {
//     setSlots(slots.filter((_, i) => i !== index));
//   };

  return (
    <div className="h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-foreground mb-4">Create Time Slot</h1>

          <div className="space-y-3">
            {/* Date Input */}
            <div>
              <label className="text-xs font-semibold text-foreground">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>

            {/* Time Inputs */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-foreground">Start</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">End</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
            </div>

            {/* Available Toggle */}
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border">
              <input
                type="checkbox"
                id="available"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <label htmlFor="available" className="text-sm font-medium text-foreground cursor-pointer flex-1">
                Mark as Available
              </label>
            </div>

            {/* Messages */}
            {successMessage && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-sm text-green-700 font-medium">{successMessage}</p>
              </div>
            )}

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleCreateTimeSlot}
              disabled={isLoading || !date || !startTime || !endTime}
              className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? 'Creating...' : 'Create Time Slot'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
