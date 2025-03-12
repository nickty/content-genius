import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Brain, BarChart3, TrendingUp, Users, Clock } from "lucide-react"

export function DashboardOverview() {
  return (
    <Tabs defaultValue="overview" className="space-y-4 mt-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="ai">AI Insights</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Content</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Generations</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">132</div>
              <p className="text-xs text-muted-foreground">+18 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.3%</div>
              <p className="text-xs text-muted-foreground">+5.1% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>View how your content is performing over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                Performance Chart
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent content and AI interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium leading-none">New article created</p>
                    <p className="text-sm text-muted-foreground">"10 Tips for Better Content"</p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">2h ago</div>
                </div>
                <div className="flex items-center">
                  <Brain className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium leading-none">AI content generated</p>
                    <p className="text-sm text-muted-foreground">Product description for "Smart Watch"</p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">5h ago</div>
                </div>
                <div className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium leading-none">Analytics report ready</p>
                    <p className="text-sm text-muted-foreground">Monthly performance summary</p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">1d ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Time on Page</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3m 24s</div>
              <p className="text-xs text-muted-foreground">+42s from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">+0.5% from last month</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Content Analytics</CardTitle>
            <CardDescription>Detailed performance metrics for your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
              Analytics Dashboard
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="ai" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>AI Content Insights</CardTitle>
            <CardDescription>Machine learning insights about your content performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Content Optimization Suggestions</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-green-500" />
                    <span>Add more visual elements to "Getting Started Guide" to increase engagement</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-green-500" />
                    <span>Shorten introduction paragraphs in "Product Features" for better readability</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-green-500" />
                    <span>Use more specific keywords in "Technical Documentation" for better SEO</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Topic Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-muted rounded-md">"Advanced AI Integration Techniques"</div>
                  <div className="p-3 bg-muted rounded-md">"Cloud Cost Optimization Strategies"</div>
                  <div className="p-3 bg-muted rounded-md">"TensorFlow vs PyTorch: A Comparison"</div>
                  <div className="p-3 bg-muted rounded-md">"Serverless Architecture Best Practices"</div>
                </div>
              </div>
              <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                AI Insight Visualization
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

