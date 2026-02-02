'use client'

import { Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function SearchFilters() {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative lg:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search tutors..."
            className="pl-10 bg-background border-border focus:border-primary"
          />
        </div>

        {/* Subject Filter */}
        <div>
          <Select defaultValue="all">
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="english">English Literature</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience Filter */}
        <div>
          <Select defaultValue="any">
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Experience Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Experience</SelectItem>
              <SelectItem value="junior">0-5 years</SelectItem>
              <SelectItem value="mid">5-10 years</SelectItem>
              <SelectItem value="senior">10+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Filter */}
        <div>
          <Select defaultValue="any">
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Price</SelectItem>
              <SelectItem value="budget">Under $40/hr</SelectItem>
              <SelectItem value="mid">$40-$60/hr</SelectItem>
              <SelectItem value="premium">$60+/hr</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-4">
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border bg-transparent">
            Reset
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
