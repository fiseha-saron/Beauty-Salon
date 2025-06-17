"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Search, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminCoursesPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock courses data
  const courses = [
    {
      id: "1",
      title: "Advanced Hair Styling Techniques",
      instructor: "Sarah Johnson",
      category: "Hair Styling",
      students: 324,
      price: "$299",
      status: "published",
      createdAt: "May 10, 2025",
    },
    {
      id: "2",
      title: "Professional Makeup Artistry",
      instructor: "Michael Chen",
      category: "Makeup",
      students: 412,
      price: "$349",
      status: "published",
      createdAt: "April 15, 2025",
    },
    {
      id: "3",
      title: "Nail Art & Technology",
      instructor: "Emily Rodriguez",
      category: "Nail Care",
      students: 256,
      price: "$249",
      status: "published",
      createdAt: "March 20, 2025",
    },
    {
      id: "4",
      title: "Skincare & Facial Treatments",
      instructor: "David Kim",
      category: "Skincare",
      students: 189,
      price: "$279",
      status: "published",
      createdAt: "February 5, 2025",
    },
    {
      id: "5",
      title: "Bridal Hair & Makeup",
      instructor: "Sarah Johnson",
      category: "Bridal",
      students: 0,
      price: "$399",
      status: "pending",
      createdAt: "June 1, 2025",
    },
  ]

  // Filter courses based on search query, category, and status
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || course.category.toLowerCase() === categoryFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleApproveCourse = (courseId: string) => {
    toast({
      title: "Course approved",
      description: "The course has been approved and is now published.",
    })
  }

  const handleRejectCourse = (courseId: string) => {
    toast({
      title: "Course rejected",
      description: "The course has been rejected and the instructor has been notified.",
    })
  }

  return (
    <DashboardLayout>
      <DashboardHeader heading="Course Management" text="Manage all courses on the platform." />

      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative col-span-1 md:col-span-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="hair styling">Hair Styling</SelectItem>
              <SelectItem value="makeup">Makeup</SelectItem>
              <SelectItem value="nail care">Nail Care</SelectItem>
              <SelectItem value="skincare">Skincare</SelectItem>
              <SelectItem value="bridal">Bridal</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>{course.students}</TableCell>
                <TableCell>{course.price}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === "published"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : course.status === "pending"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{course.createdAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/courses/${course.id}`}>View Course</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/courses/${course.id}/edit`}>Edit Course</Link>
                      </DropdownMenuItem>
                      {course.status === "pending" && (
                        <>
                          <DropdownMenuItem onClick={() => handleApproveCourse(course.id)}>
                            Approve Course
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRejectCourse(course.id)}>
                            Reject Course
                          </DropdownMenuItem>
                        </>
                      )}
                      {course.status === "published" && (
                        <DropdownMenuItem className="text-amber-600">Unpublish Course</DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">Delete Course</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  )
}
