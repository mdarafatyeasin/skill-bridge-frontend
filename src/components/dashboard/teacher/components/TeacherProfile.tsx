'use client'

import { Category, TutorProfile } from "@/type"
import CreateTeacherProfile from "./CreateTeacherProfile"
import { Mail, BookOpen, Award, CheckCircle } from "lucide-react"

type TeacherProfileProps = {
  tutorProfile: TutorProfile
  allCategories: Category[]
  id: string
  name: string
  email: string
  role: string
}

export default function TeacherProfile({
  tutorProfile,
  allCategories,
  ...user
}: TeacherProfileProps) {
  const profile = tutorProfile?.data?.[0]

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                <p className="text-sm text-muted-foreground mt-1">Teacher Profile</p>
              </div>
            </div>
            {profile && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Profile Active</span>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex items-center gap-2 text-foreground mb-4">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <a href={`mailto:${user.email}`} className="hover:text-primary transition-colors">
              {user.email}
            </a>
          </div>
        </div>

        {/* Stats Cards */}
        {profile && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-6 shadow-md">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Experience</p>
              <p className="text-2xl font-bold text-foreground">
                {profile.experience_year || 0} <span className="text-sm text-muted-foreground">years</span>
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-md">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Hourly Rate</p>
              <p className="text-2xl font-bold text-foreground">
                ${profile.hourly_rate || 0} <span className="text-sm text-muted-foreground">/hour</span>
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-md">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Rating</p>
              <p className="text-2xl font-bold text-foreground">
                {profile.rating_avg || 0} <span className="text-sm text-muted-foreground">stars</span>
              </p>
            </div>
          </div>
        )}

        {/* Tutor Profile Section */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          {profile ? (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Your Tutor Profile
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Qualification</h3>
                  <p className="text-foreground font-medium">{profile.qualification}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Category</h3>
                  <div className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-lg">
                    {profile.category?.category}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Create Your Tutor Profile
              </h2>

              <p className="text-muted-foreground mb-6">
                Set up your tutor profile to start accepting bookings from students. Add your qualifications, experience, and teaching expertise.
              </p>

              <CreateTeacherProfile
                allCategories={allCategories}
                tutorProfile={tutorProfile}
                user={user}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
