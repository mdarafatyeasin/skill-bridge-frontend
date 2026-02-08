import React from "react"
import { SidebarProvider } from '@/components/ui/sidebar'
import { DashboardSidebar } from "@/components/layout/Sidebar"
import { userProfileService } from "@/services/profile.service"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    let userRole: "ADMIN" | "TEACHER" | "USER" | undefined
    
    try {
        const profile = await userProfileService.getMyProfile()
        userRole = profile.data?.[0]?.user?.role
    } catch (err) {
        console.error("Failed to fetch user profile:", err)
    }

    return (
        <SidebarProvider>
            <div className="flex w-full">
                <DashboardSidebar role={userRole} />
                <main className="flex-1">{children}</main>
            </div>
        </SidebarProvider>
    )
}
