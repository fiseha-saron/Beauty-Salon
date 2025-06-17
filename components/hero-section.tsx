import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Transform Your Passion into a<span className="text-pink-600 dark:text-pink-400"> Beautiful Career</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Join Glamour Academy for professional beauty salon training and certification. Learn from industry experts
              and launch your career in beauty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register">Join Now</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 dark:from-pink-900 dark:to-purple-900 opacity-20 rounded-lg"></div>
            <img
              src="/placeholder.svg?height=500&width=600"
              alt="Beauty professionals teaching students"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  )
}
