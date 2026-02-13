import { userService } from "@/services/user.service";
import { User } from "@/type";
import { Users, Mail, Shield, User as UserIcon } from "lucide-react";
import UpdateUserRoleButton from "./userComponents/UpdateUserRoleButton";

export default async function AdminUsersPage() {
  const users = await userService.getAllUsers();

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">User Management</h1>
              <p className="text-muted-foreground mt-1">Manage system users and their roles</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Total Users</p>
            <p className="text-3xl font-bold text-foreground">{users.data.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Admins</p>
            <p className="text-3xl font-bold text-primary">{users.data.filter((u: User) => u.role === "ADMIN").length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Regular Users</p>
            <p className="text-3xl font-bold text-accent">{users.data.filter((u: User) => u.role !== "ADMIN").length}</p>
          </div>
        </div>

        {/* Users Grid */}
        {users.data.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <UserIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground font-medium">No users found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.data.map((user: User) => (
              <div
                key={user.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all"
              >
                {/* User Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-foreground truncate">{user.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{user.id}</p>
                    </div>
                  </div>
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold items-center gap-1 ${
                    user.role === "ADMIN"
                      ? 'bg-primary/15 text-primary'
                      : user.role === "TEACHER"
                      ? 'bg-secondary/15 text-secondary'
                      : 'bg-accent/15 text-accent'
                  }`}>
                    <Shield className="w-3 h-3" />
                    {user.role}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                  <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <a
                    href={`mailto:${user.email}`}
                    className="text-sm text-primary hover:underline truncate"
                  >
                    {user.email}
                  </a>
                </div>

                {/* Role Update Button */}
                <UpdateUserRoleButton userId={user.id} userRole={user.role} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
