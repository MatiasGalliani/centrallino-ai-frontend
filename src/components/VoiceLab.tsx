import { useState, useEffect } from "react"
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

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000"

interface Voice {
  id: string
  name: string
  category: string
  description: string
}

export default function VoiceLab() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [testingId, setTestingId] = useState<string | null>(null)
  const [previewError, setPreviewError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/voices`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setVoices(data.voices || [])
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const handleTest = async (id: string) => {
    setPreviewError(null)
    setTestingId(id)
    try {
      const res = await fetch(`${API_BASE}/api/voices/${id}/preview`)
      const contentType = res.headers.get("Content-Type") || ""

      if (!res.ok) {
        const body = await res.text()
        let msg = body
        try {
          const json = JSON.parse(body)
          msg = json.details || json.error || body
        } catch {
          msg = body || `HTTP ${res.status}`
        }
        throw new Error(msg)
      }

      if (!contentType.includes("audio")) {
        const text = await res.text()
        throw new Error(text ? text.slice(0, 200) : "Server did not return audio")
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audio.onended = () => {
        URL.revokeObjectURL(url)
        setTestingId(null)
      }
      audio.onerror = () => {
        URL.revokeObjectURL(url)
        setTestingId(null)
        setPreviewError("Playback failed")
      }
      await audio.play()
    } catch (e: unknown) {
      setTestingId(null)
      setPreviewError(e instanceof Error ? e.message : "Failed to load preview")
    }
  }

  if (loading) return <div className="p-6">Loading voices…</div>
  if (error) return <div className="p-6 text-destructive">Error: {error}</div>

  return (
    <div className="flex flex-col w-full min-w-0 p-6">
      {previewError && (
        <div className="mb-4 rounded-md bg-destructive/10 px-4 py-2 text-sm text-destructive">
          Preview: {previewError}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {voices.map((voice) => (
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
                  {voice.category}
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {voice.description || voice.category}
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