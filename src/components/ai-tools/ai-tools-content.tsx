"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Brain, Wand2, MessageSquare, FileText, Sparkles } from "lucide-react"

export function AIToolsContent() {
  const [generating, setGenerating] = useState(false)
  const [contentInput, setContentInput] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")

  const handleGenerate = () => {
    setGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      )
      setGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6 mt-6">
      <Tabs defaultValue="content-generator" className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 h-auto">
          <TabsTrigger value="content-generator" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Content Generator</span>
          </TabsTrigger>
          <TabsTrigger value="content-enhancer" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Content Enhancer</span>
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>AI Assistant</span>
          </TabsTrigger>
          <TabsTrigger value="image-generator" className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            <span>Image Generator</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content-generator">
          <Card>
            <CardHeader>
              <CardTitle>AI Content Generator</CardTitle>
              <CardDescription>Generate high-quality content using OpenAI's GPT models</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content-type">Content Type</Label>
                <Select defaultValue="blog-post">
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog-post">Blog Post</SelectItem>
                    <SelectItem value="product-description">Product Description</SelectItem>
                    <SelectItem value="social-media">Social Media Post</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="ad-copy">Ad Copy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic or Keywords</Label>
                <Input
                  id="topic"
                  placeholder="Enter the main topic or keywords"
                  value={contentInput}
                  onChange={(e) => setContentInput(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="tone">Tone</Label>
                  <span className="text-sm text-muted-foreground">Professional</span>
                </div>
                <Select defaultValue="professional">
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="length">Content Length</Label>
                  <span className="text-sm text-muted-foreground">Medium (~500 words)</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={1} className="py-4" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-instructions">Additional Instructions (Optional)</Label>
                <Textarea
                  id="additional-instructions"
                  placeholder="Add any specific requirements or instructions for the AI"
                  rows={3}
                />
              </div>

              {generatedContent && (
                <div className="space-y-2 pt-4">
                  <Label htmlFor="generated-content">Generated Content</Label>
                  <div className="border rounded-md p-4 bg-muted/50 min-h-[200px] whitespace-pre-line">
                    {generatedContent}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button onClick={handleGenerate} disabled={!contentInput || generating} className="gap-2">
                {generating ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4" />
                    <span>Generate Content</span>
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="content-enhancer">
          <Card>
            <CardHeader>
              <CardTitle>AI Content Enhancer</CardTitle>
              <CardDescription>Improve your existing content with AI suggestions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="existing-content">Your Content</Label>
                <Textarea id="existing-content" placeholder="Paste your existing content here" rows={6} />
              </div>

              <div className="space-y-2">
                <Label>Enhancement Options</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="grammar" className="rounded border-gray-300" />
                    <Label htmlFor="grammar" className="text-sm font-normal">
                      Grammar & Style
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="seo" className="rounded border-gray-300" />
                    <Label htmlFor="seo" className="text-sm font-normal">
                      SEO Optimization
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="clarity" className="rounded border-gray-300" />
                    <Label htmlFor="clarity" className="text-sm font-normal">
                      Clarity & Readability
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="tone" className="rounded border-gray-300" />
                    <Label htmlFor="tone" className="text-sm font-normal">
                      Tone Adjustment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="expand" className="rounded border-gray-300" />
                    <Label htmlFor="expand" className="text-sm font-normal">
                      Content Expansion
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="summarize" className="rounded border-gray-300" />
                    <Label htmlFor="summarize" className="text-sm font-normal">
                      Summarization
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Enhance Content</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="chatbot">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Chat with an AI assistant to help with your content creation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md h-[400px] mb-4 p-4 overflow-y-auto bg-muted/50">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary text-primary-foreground rounded-full p-2 mr-2">
                      <Brain className="h-4 w-4" />
                    </div>
                    <div className="bg-secondary rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        Hello! I'm your AI assistant. How can I help you with your content today?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Input placeholder="Type your message..." />
                <Button size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="image-generator">
          <Card>
            <CardHeader>
              <CardTitle>AI Image Generator</CardTitle>
              <CardDescription>Generate images for your content using AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-prompt">Image Description</Label>
                <Textarea id="image-prompt" placeholder="Describe the image you want to generate in detail" rows={4} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image-style">Style</Label>
                  <Select defaultValue="realistic">
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">Realistic</SelectItem>
                      <SelectItem value="cartoon">Cartoon</SelectItem>
                      <SelectItem value="3d">3D Render</SelectItem>
                      <SelectItem value="sketch">Sketch</SelectItem>
                      <SelectItem value="painting">Painting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image-size">Size</Label>
                  <Select defaultValue="square">
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Square (1:1)</SelectItem>
                      <SelectItem value="portrait">Portrait (3:4)</SelectItem>
                      <SelectItem value="landscape">Landscape (16:9)</SelectItem>
                      <SelectItem value="wide">Wide (2:1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border rounded-md h-[300px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Generated image will appear here</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="gap-2">
                <Wand2 className="h-4 w-4" />
                <span>Generate Image</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

