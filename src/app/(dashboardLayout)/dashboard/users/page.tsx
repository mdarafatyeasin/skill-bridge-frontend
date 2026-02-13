"use client";
import { userService } from "@/services/user.service";
import { User } from "@/type";


export default async function page() {
    const users = await userService.getAllUsers();
    console.log("Users in admin page", users);

    const handleUserRoleUpdate = async (userId: string) => {
        // const updatedProfile = await userService.updateUserProfileById(userId);
        console.log("Updated Profile");
    };
    return (
        <div>
            Welcome this is from admin users page
            {
                users.data.map((user: User) => (
                    <div key={user.id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <button onClick={(()=>handleUserRoleUpdate(user.id))}>Update Role</button>
                    </div>
                ))
            }
        </div>
    );
}