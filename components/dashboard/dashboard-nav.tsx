"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { User } from "@/lib/types"
import {
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Users,
  BarChart,
  PlusCircle,
  Video,
  FileCheck,
} from "lucide-react"

interface DashboardNavProps {
  user: User
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()

  // Define navigation items based on user role
  const navItems = (() => {
    const baseItems = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
      },
    ]

    const studentItems = [
      ...baseItems,
      {
        title: "My Courses",
        href: "/dashboard/courses",
        icon: BookOpen,
      },
      {
        title: "Calendar",
        href: "/dashboard/calendar",
        icon: Calendar,
      },
      {
        title: "Messages",
        href: "/dashboard/messages",
        icon: MessageSquare,
      },
      {
        title: "Certificates",
        href: "/dashboard/certificates",
        icon: FileCheck,
      },
      {
        title: "Billing",
        href: "/dashboard/billing",
        icon: CreditCard,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ]

    const instructorItems = [
      {
        title: "Dashboard",
        href: "/instructor/dashboard",
        icon: Home,
      },
      {
        title: "My Courses",
        href: "/instructor/courses",
        icon: BookOpen,
      },
      {
        title: "Create Course",
        href: "/instructor/courses/create",
        icon: PlusCircle,
      },
      {
        title: "Students",
        href: "/instructor/students",
        icon: Users,
      },
      {
        title: "Calendar",
        href: "/instructor/calendar",
        icon: Calendar,
      },
      {
        title: "Messages",
        href: "/instructor/messages",
        icon: MessageSquare,
      },
      {
        title: "Live Sessions",
        href: "/instructor/live-sessions",
        icon: Video,
      },
      {
        title: "Earnings",
        href: "/instructor/earnings",
        icon: CreditCard,
      },
      {
        title: "Settings",
        href: "/instructor/settings",
        icon: Settings,
      },
    ]

    const adminItems = [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: Home,
      },
      {
        title: "Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        title: "Courses",
        href: "/admin/courses",
        icon: BookOpen,
      },
      {
        title: "Analytics",
        href: "/admin/analytics",
        icon: BarChart,
      },
      {
        title: "Payments",
        href: "/admin/payments",
        icon: CreditCard,
      },
      {
        title: "Reports",
        href: "/admin/reports",
        icon: FileText,
      },
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ]

    switch (user.role) {
      case "admin":
        return adminItems
      case "instructor":
        return instructorItems
      default:
        return studentItems
    }
  })()

  return (
    <nav className="grid items-start gap-2 text-sm">
      {navItems.map((item, index) => {
        const Icon = item.icon
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent",
              pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}
