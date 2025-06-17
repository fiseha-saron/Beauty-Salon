import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const category = url.searchParams.get("category")
    const level = url.searchParams.get("level")
    const search = url.searchParams.get("search")
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    // Build the query
    let sql = `
      SELECT c.*, u.name as instructor_name, 
      COUNT(DISTINCT e.id) as student_count,
      COALESCE(AVG(r.rating), 0) as average_rating,
      COUNT(DISTINCT r.id) as review_count
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN enrollments e ON c.id = e.course_id
      LEFT JOIN reviews r ON c.id = r.course_id
    `

    const queryParams: any[] = []
    const conditions: string[] = []

    if (category) {
      queryParams.push(category)
      conditions.push(`c.category = $${queryParams.length}`)
    }

    if (level) {
      queryParams.push(level)
      conditions.push(`c.level = $${queryParams.length}`)
    }

    if (search) {
      queryParams.push(`%${search}%`)
      conditions.push(`(c.title ILIKE $${queryParams.length} OR c.description ILIKE $${queryParams.length})`)
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(" AND ")}`
    }

    sql += ` GROUP BY c.id, u.name ORDER BY c.created_at DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`

    queryParams.push(limit, offset)

    // Execute the query
    const result = await query(sql, queryParams)

    // Get total count for pagination
    const countSql = `
      SELECT COUNT(*) FROM courses c
      ${conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""}
    `
    const countResult = await query(countSql, queryParams.slice(0, -2))
    const totalCount = Number.parseInt(countResult.rows[0].count)

    return NextResponse.json({
      courses: result.rows,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "An error occurred while fetching courses" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (session.user.role !== "instructor" && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { title, description, price, duration, category, level, image_url } = await request.json()

    // Validate input
    if (!title || !description || !price) {
      return NextResponse.json({ error: "Title, description, and price are required" }, { status: 400 })
    }

    // Insert course into database
    const result = await query(
      `INSERT INTO courses 
       (title, description, price, duration, category, level, image_url, instructor_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [title, description, price, duration, category, level, image_url, session.user.id],
    )

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ error: "An error occurred while creating the course" }, { status: 500 })
  }
}
