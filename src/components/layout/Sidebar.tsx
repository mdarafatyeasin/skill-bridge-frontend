'use client'

import { BarChart3, Users, Settings, LogOut, Menu, Gauge, User, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { RoleType } from '@/constants/role'
import { userService } from '@/services/user.service'

type MenuItem = {
  title: string
  icon: string | React.ComponentType
  href: string
  allowedRoles?: RoleType[]
}

const menuItems: MenuItem[] = [
  {
    title: 'Home',
    icon: Home,
    href: '/',
    allowedRoles: ['ADMIN', 'TEACHER', 'USER'],
  },
  {
    title: 'My Profile',
    icon: User,
    href: '/dashboard',
    allowedRoles: ['ADMIN', 'TEACHER', 'USER'],
  },
  {
    title: 'Add Time Slot',
    icon: BarChart3,
    href: '/dashboard/addTimeSlot',
    allowedRoles: ['TEACHER'],
  },
  {
    title: 'Show Bookings',
    icon: BarChart3,
    href: '/dashboard/showBookings',
    allowedRoles: ['TEACHER', 'ADMIN'],
  },
  {
    title: 'Users',
    icon: Users,
    href: '/dashboard/users',
    allowedRoles: ['ADMIN'],
  },
  {
    title: 'Add Category',
    icon: Gauge,
    href: '/dashboard/createCategory',
    allowedRoles: ['ADMIN', 'TEACHER'],
  }
]

export function DashboardSidebar({ role }: { role?: RoleType }) {
  const pathname = usePathname()

  const visibleItems = menuItems.filter((item) => {
    if (!item.allowedRoles) return true
    if (!role) return true
    return item.allowedRoles.includes(role)
  }) 

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Menu className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">Dashboard</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {visibleItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className={`cursor-pointer transition-colors ${pathname === item.href
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <Separator className="my-2" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                console.log('Logging out...')
              }}
              className="cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
