
import { userService } from "@/services/user.service";
import { User } from "@/type";
import UpdateUserRoleButton from "./userComponents/UpdateUserRoleButton";


export default async function page() {
    const users = await userService.getAllUsers();
    console.log("Users in admin page", users);


    return (
        <div>
            Welcome this is from admin users page
            {
                users.data.map((user: User) => (
                    <div key={user.id}>
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <UpdateUserRoleButton userId={user.id}/>
                    </div>
                ))
            }
        </div>
    );
}