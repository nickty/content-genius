import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, BarChart3, Cloud, Code } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Brain className="h-6 w-6" />
            <span>ContentGenius</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#technologies" className="text-sm font-medium hover:underline underline-offset-4">
              Technologies
            </Link>
            <Link href="#roadmap" className="text-sm font-medium hover:underline underline-offset-4">
              Roadmap
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  AI-Powered Content Management Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Create, manage, and analyze content with the power of AI. Built with Next.js, Python, Node.js, and
                  cloud technologies.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Start Building <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Explore the powerful capabilities of our platform
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg">
                <Brain className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">AI Content Generation</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Generate high-quality content with OpenAI's GPT models and customize it to your needs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg">
                <BarChart3 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">ML-Powered Analytics</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Analyze content performance with TensorFlow models and get actionable insights.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg">
                <Cloud className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Multi-Cloud Architecture</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Leverage the power of AWS and Azure for scalable and reliable infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="technologies" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Technologies Used</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Built with modern technologies for optimal performance and scalability
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg bg-white dark:bg-gray-800">
                <Code className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Next.js & React</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Modern frontend with server components and optimized rendering
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg bg-white dark:bg-gray-800">
                <Code className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Node.js</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Scalable middleware services for API integration and processing
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg bg-white dark:bg-gray-800">
                <Code className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Python</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Powerful backend services for AI/ML processing and data analysis
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg bg-white dark:bg-gray-800">
                <Brain className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">AI & ML Tools</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  OpenAI, TensorFlow, and custom models for intelligent features
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="roadmap" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Development Roadmap</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Follow this step-by-step guide to build your full-stack AI application
                </p>
              </div>
            </div>
            <div className="mt-12 space-y-8">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold">
                  1
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold">Setup Project Structure</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Initialize Next.js application, configure Python and Node.js services, and set up cloud
                    infrastructure
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold">
                  2
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold">Implement Core Features</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Build authentication, content management, and basic AI integration
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold">
                  3
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold">Develop AI/ML Components</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Integrate OpenAI models, build TensorFlow recommendation system, and implement analytics
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold">
                  4
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold">Cloud Integration</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Deploy services to AWS and Azure, implement cloud storage, and set up CI/CD pipelines
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold">
                  5
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold">Testing and Optimization</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Implement comprehensive testing, optimize performance, and enhance security
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12 px-4 md:px-6">
          <div className="flex flex-col gap-2 md:gap-4 md:flex-1">
            <div className="flex items-center gap-2 font-bold">
              <Brain className="h-6 w-6" />
              <span>ContentGenius</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              An advanced full-stack application showcasing expertise in Python, Node.js, React, and AI technologies.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:flex-1">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Features</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm hover:underline">
                  AI Content
                </Link>
                <Link href="#" className="text-sm hover:underline">
                  Analytics
                </Link>
                <Link href="#" className="text-sm hover:underline">
                  Cloud Services
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Technologies</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm hover:underline">
                  Next.js
                </Link>
                <Link href="#" className="text-sm hover:underline">
                  Python
                </Link>
                <Link href="#" className="text-sm hover:underline">
                  Node.js
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Resources</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm hover:underline">
                  Documentation
                </Link>
                <Link href="#" className="text-sm hover:underline">
                  GitHub
                </Link>
                <Link href="#" className="text-sm hover:underline">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

