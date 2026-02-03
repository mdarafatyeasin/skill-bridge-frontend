'use client'

import { Star, Clock, MapPin, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

interface TutorCardProps {
  tutor: {
    id: string
    user: {
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      created_at?: string
      update_at?: string
    }
    category: {
      id: string
      category: string
      description: string
      created_at: string
      update_at: string
    }
    experience_year: number
    hourly_rate: number
    qualification: string
    rating_avg: number
    created_at: string
    update_at: string
  }
}

export default function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Header with category badge */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
            {tutor.user.name.charAt(0)}
          </div>
          <span className="bg-accent/20 text-accent text-xs font-semibold px-3 py-1 rounded-full">
            {tutor.category.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-foreground">{tutor.user.name}</h3>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(tutor.rating_avg)
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground'
                  }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">{tutor.rating_avg}</span>
        </div>

        {/* Qualification */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Award className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Qualification</p>
              <p className="text-sm text-foreground">{tutor.qualification}</p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-secondary" />
            <span className="text-muted-foreground">{tutor.experience_year} years exp.</span>
          </div>
          <div className="flex-1 text-right">
            <p className="text-xs text-muted-foreground">Hourly Rate</p>
            <p className="text-lg font-bold text-primary">${tutor.hourly_rate}/hr</p>
          </div>
        </div>

        {/* Category Description */}
        <p className="text-sm text-muted-foreground italic">{tutor.category.description}</p>

        {/* CTA Buttons */}
        <div className="flex gap-2 pt-4">
          <Link href={`/teachers/${tutor.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              Profile
            </Button>
          </Link>
          <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">
            Book Session
          </Button>
        </div>
      </div>
    </Card>
  )
}
