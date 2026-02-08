import TeacherProfile from "@/components/dashboard/teacher/TeacheProfile";
import { userProfileService } from "@/services/profile.service";

export default async function page() {
    const profile = await userProfileService.getMyProfile();
    console.log("Dashboard data", profile.data[0]);
    if (profile.data[0].user.role === "USER") {
        return (
            <div>
                This is student dashboard
            </div>
        );
    } else if (profile.data[0].user.role === "TEACHER") {
        return (
            <div className="w-full">
                This is teacher dashboard
                {/* <TeacherProfile {...profile.data[0]} /> */}
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