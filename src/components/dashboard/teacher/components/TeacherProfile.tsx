'use client'

import { Category, TutorProfile } from "@/type"
import CreateTeacherProfile from "./CreateTeacherProfile"

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
  console.log("📘 Tutor Profile:", tutorProfile)


  return (
    <div>
      <h1>Teacher Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      {!tutorProfile.success && (
        <div>
          <CreateTeacherProfile
            allCategories={allCategories}
            tutorProfile={tutorProfile}
            user={user}
          />
        </div>
      )}
    </div>
  )
}