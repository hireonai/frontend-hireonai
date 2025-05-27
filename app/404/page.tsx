import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <span className="text-9xl font-bold text-gray-300">4</span>
          <span className="text-9xl font-bold text-[#4A90A4]">0</span>
          <span className="text-9xl font-bold text-gray-300">4</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{"Oops! We're working on it!"}</h1>

        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link href="/">
          <Button className="bg-[#4A90A4] hover:bg-[#4A90A4]/90 px-8 py-3 text-lg">Go Home</Button>
        </Link>
      </div>
    </div>
  )
}
