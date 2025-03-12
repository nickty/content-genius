import type { ContentType, ContentTone } from "@/lib/ai-service"

interface GenerateContentParams {
  contentType: ContentType
  topic: string
  tone: ContentTone
  length: number
  additionalInstructions?: string
}

export async function generateContent(params: GenerateContentParams) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    content: `This is a mock generated ${params.contentType} about "${params.topic}".
    
    It's written in a ${params.tone} tone and is approximately ${params.length * 10 + 100} words long.
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    error: null,
  }
}

export function streamContentGeneration(params: {
  contentType: ContentType
  topic: string
  tone: ContentTone
  length: number
  additionalInstructions?: string
  onChunk?: (chunk: string) => void
  onFinish?: (fullText: string) => void
}) {
  const fullText = `This is a mock generated ${params.contentType} about "${params.topic}".
  
  It's written in a ${params.tone} tone and is approximately ${params.length * 10 + 100} words long.
  
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

  // Simulate streaming by sending chunks of text
  let currentIndex = 0
  const interval = setInterval(() => {
    if (currentIndex < fullText.length) {
      const endIndex = Math.min(currentIndex + 10, fullText.length)
      const chunk = fullText.substring(currentIndex, endIndex)
      params.onChunk?.(chunk)
      currentIndex = endIndex
    } else {
      clearInterval(interval)
      params.onFinish?.(fullText)
    }
  }, 50)

  return { error: null }
}

