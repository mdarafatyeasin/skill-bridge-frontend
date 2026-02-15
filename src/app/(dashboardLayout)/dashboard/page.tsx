import AdminProfile from "@/components/dashboard/admin/AdminProfile";
import TeacherProfile from "@/components/dashboard/teacher/components/TeacherProfile";
import StudentProfile from "@/components/dashboard/user/studentProfile";
import { CategoryService } from "@/services/category.service";
import { userProfileService } from "@/services/profile.service";

export default async function Page() {
  const profile = await userProfileService.getMyProfile();
  const tutorProfile = await userProfileService.getTutorProfile();
  const allCategories = await CategoryService.getAllCategories();

//   console.log("All Categories:", allCategories.result);
//   console.log("Tutor Profile:", tutorProfile);
//   console.log("User Profile:", profile.data[0]);
//   console.log("Role:", profile.data[0].role);

  const role = profile.data[0].role;

  if (role === "USER") {
    return (
      <div>
        <StudentProfile {...profile.data[0]} />
      </div>
    );
  } else if (role === "TEACHER") {
    return (
      <div className="w-full py-10">
        <TeacherProfile
          {...profile.data[0]} // passes user info (like id, email, role)
          tutorProfile={tutorProfile} // passes full tutor data
          allCategories={allCategories.result} // passes all categories
        />
      </div>
    );
  } else {
    return (
      <div>
        <AdminProfile {...profile.data[0]} />
      </div>
    );
  }
}