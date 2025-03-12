import { streamContentGeneration as mockStreamContentGeneration } from "@/lib/mock-ai-service"

export type ContentType = "blog-post" | "product-description" | "social-media" | "email" | "ad-copy"
export type ContentTone = "professional" | "casual" | "friendly" | "authoritative" | "humorous"

interface GenerateContentParams {
  contentType: ContentType
  topic: string
  tone: ContentTone
  length: number
  additionalInstructions?: string
}

export async function generateContent({
  contentType,
  topic,
  tone,
  length,
  additionalInstructions,
}: GenerateContentParams) {
  // For now, we'll use the mock implementation
  try {
    // Call the Python API endpoint
    const response = await fetch("http://localhost:5000/api/generate-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contentType,
        topic,
        tone,
        length,
        additionalInstructions,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate content")
    }

    const data = await response.json()
    return { content: data.content, error: null }
  } catch (error) {
    console.error("Error generating content:", error)
    return {
      content: null,
      error: "Failed to generate content. Please try again later.",
    }
  }
}

export function streamContentGeneration({
  contentType,
  topic,
  tone,
  length,
  additionalInstructions,
  onChunk,
  onFinish,
}: GenerateContentParams & {
  onChunk?: (chunk: string) => void
  onFinish?: (fullText: string) => void
}) {
  // Use the mock implementation for now
  return mockStreamContentGeneration({
    contentType,
    topic,
    tone,
    length,
    additionalInstructions,
    onChunk,
    onFinish,
  })
}

