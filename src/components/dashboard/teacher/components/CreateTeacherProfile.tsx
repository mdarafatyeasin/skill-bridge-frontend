'use client'

import { Category, TutorProfile } from "@/type"
import { useForm } from "@tanstack/react-form"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { teacherService } from "@/services/teachers.service"

type CreateTeacherProfileProps = {
  allCategories: Category[]
  tutorProfile: TutorProfile
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export default function CreateTeacherProfile({ allCategories, tutorProfile, user }: CreateTeacherProfileProps) {
  const form = useForm({
    defaultValues: {
      hourly_rate: 0,
      experience_year: 0,
      qualification: "",
      category_id: "",
    },
    onSubmit: async ({ value }) => {
      console.log("🟢 Submitted Form:", value)
      const createTeacherProfile = await teacherService.createTeacherProfile(value);
    },
  })

  return (
    <div className="border border-gray-400 rounded p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          {/* Hourly Rate */}
          <form.Field name="hourly_rate">
            {(field) => (
              <Field>
                <FieldLabel>Hourly Rate</FieldLabel>
                <Input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </Field>
            )}
          </form.Field>

          {/* Experience Year */}
          <form.Field name="experience_year">
            {(field) => (
              <Field>
                <FieldLabel>Experience (years)</FieldLabel>
                <Input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </Field>
            )}
          </form.Field>

          {/* Qualification */}
          <form.Field name="qualification">
            {(field) => (
              <Field>
                <FieldLabel>Qualification</FieldLabel>
                <Input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          {/* Category Dropdown */}
          <form.Field name="category_id">
            {(field) => (
              <Field>
                <FieldLabel>Category</FieldLabel>
                <select
                  className="border rounded p-1"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                >
                  <option value="">Select category</option>
                  {allCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </form.Field>
        </FieldGroup>

        <Button type="submit" className="mt-4">Submit</Button>
      </form>
    </div>
  )
}
