import { userService } from "@/services/user.service";

export default async function page() {
    const users = await userService.getAllUsers();
    console.log("Users in admin page", users);
    return (
        <div>
            Welcome this is from admin users page
        </div>
    );
}