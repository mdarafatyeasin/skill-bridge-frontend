import TeacherProfile from "@/components/dashboard/teacher/TeacheProfile";
import StudentProfile from "@/components/dashboard/user/studentProfile";
import { userProfileService } from "@/services/profile.service";

export default async function page() {
    const profile = await userProfileService.getMyProfile();
    const tutorProfile = await userProfileService.getTutorProfile();

    console.log("Tutor Profile", tutorProfile);
    console.log("Dashboard data", profile.data[0].role);

    if (profile.data[0].role === "USER") {
        return (
            <div>
                <StudentProfile {...profile.data[0]} />
            </div>
        );
    } else if (profile.data[0].role === "TEACHER") {
        return (
            <div className="w-full py-10">
                <TeacherProfile {...tutorProfile.data[0]} />
            </div>
        );
    } else {
        return (
            <div>
                This is admin dashboard
            </div>
        );
    }

}