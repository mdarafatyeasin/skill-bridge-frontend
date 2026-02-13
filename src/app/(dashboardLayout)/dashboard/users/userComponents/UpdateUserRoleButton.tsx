"use client";
import { userClientService } from "@/services/user.client.service";

export default function UpdateUserRoleButton({ userId }: { userId: string }) {
  const handleUserRoleUpdate = async (id: string, role: string) => {
    const updatedProfile = await userClientService.updateUserProfileById(id, role)
    // console.log("Updated Profile for user:", id, "with role:", role);
  };

  return (
    <div>
      <button
        className="bg-primary text-white px-4 py-2 rounded"
        onClick={() => handleUserRoleUpdate(userId, "ADMIN")}
      >
        Set ADMIN
      </button>
    </div>
  );
}
