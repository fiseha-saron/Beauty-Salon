import { neon } from "@neondatabase/serverless"

// Create a SQL client with neon
const sql = neon(process.env.DATABASE_URL!)

// Helper function to run SQL queries
export async function query(text: string, params?: any[]) {
  try {
    const start = Date.now()
    const result = await sql(text, params)
    const duration = Date.now() - start
    console.log("Executed query", { text, duration, rows: Array.isArray(result) ? result.length : 0 })

    // Format the result to match the expected structure
    if (Array.isArray(result)) {
      return { rows: result, rowCount: result.length }
    } else {
      return { rows: [result], rowCount: 1 }
    }
  } catch (error) {
    console.error("Error executing query", error)
    throw error
  }
}

// Export the sql client for direct use
export { sql }
