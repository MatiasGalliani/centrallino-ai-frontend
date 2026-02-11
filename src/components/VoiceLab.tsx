import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const MOCK_VOICES = [
  { id: "rachel", name: "Rachel", style: "Professional", description: "Clear and neutral, ideal for business calls." },
  { id: "adam", name: "Adam", style: "Warm", description: "Friendly and conversational tone." },
  { id: "bella", name: "Bella", style: "Expressive", description: "Natural emphasis and emotion." },
  { id: "josh", name: "Josh", style: "Calm", description: "Relaxed and reassuring delivery." },
  { id: "emily", name: "Emily", style: "Professional", description: "Polished and articulate." },
  { id: "sam", name: "Sam", style: "Conversational", description: "Casual and approachable." },
]

export default function VoiceLab() {
  const [testingId, setTestingId] = useState<string | null>(null)

  const handleTest = (id: string) => {
    setTestingId(id)
    // Mock: simulate playback for 2 seconds
    setTimeout(() => setTestingId(null), 2000)
  }

  return (
    <div className="flex flex-col w-full min-w-0 p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_VOICES.map((voice) => (
          <Card
            key={voice.id}
            className={cn(
              "flex flex-col transition-colors",
              testingId === voice.id && "ring-2 ring-primary"
            )}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{voice.name}</CardTitle>
                <Badge variant="secondary" className="shrink-0">
                  {voice.style}
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {voice.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xs text-muted-foreground">
                Voice ID: <code className="rounded bg-muted px-1">{voice.id}</code>
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => handleTest(voice.id)}
                disabled={testingId !== null}
              >
                {testingId === voice.id ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Playing…
                  </>
                ) : (
                  <>
                    <Play className="size-4" />
                    Test voice
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}