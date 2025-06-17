"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar, MessageSquare, Award, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return null // DashboardLayout will handle the loading state
  }

  // Mock data for dashboard
  const stats = [
    {
      title: "Courses Enrolled",
      value: "3",
      description: "Active courses",
      icon: BookOpen,
    },
    {
      title: "Certificates Earned",
      value: "1",
      description: "Completed courses",
      icon: Award,
    },
    {
      title: "Study Hours",
      value: "24",
      description: "This month",
      icon: Clock,
    },
    {
      title: "Progress",
      value: "65%",
      description: "Overall completion",
      icon: TrendingUp,
    },
  ]

  const recentCourses = [
    {
      id: "1",
      title: "Advanced Hair Styling Techniques",
      progress: 65,
      instructor: "Sarah Johnson",
    },
    {
      id: "2",
      title: "Professional Makeup Artistry",
      progress: 30,
      instructor: "Michael Chen",
    },
  ]

  const upcomingEvents = [
    {
      id: "1",
      title: "Live Q&A: Hair Styling",
      date: "June 15, 2025",
      time: "2:00 PM",
    },
    {
      id: "2",
      title: "Makeup Demo: Bridal Looks",
      date: "June 18, 2025",
      time: "1:00 PM",
    },
  ]

  return (
    <div className="space-y-6">
      <DashboardHeader
        heading={`Welcome back, ${user.name || "Student"}!`}
        text="Here's what's happening with your learning journey."
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCourses.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{course.title}</h4>
                  <span className="text-xs text-muted-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">Instructor: {course.instructor}</p>
              </div>
            ))}
            <Button asChild className="w-full">
              <Link href="/dashboard/courses">View All Courses</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Don't miss these sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-4">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.date} at {event.time}
                  </p>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/calendar">View Calendar</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/dashboard/messages">
                <MessageSquare className="h-6 w-6 mb-2" />
                Messages
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/dashboard/certificates">
                <Award className="h-6 w-6 mb-2" />
                Certificates
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/courses">
                <BookOpen className="h-6 w-6 mb-2" />
                Browse Courses
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
