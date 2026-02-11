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
import { Label } from "@/components/ui/label"
import { RotateCcw, Save } from "lucide-react"

export default function PromptStudio() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col w-full min-w-0 p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System prompt</CardTitle>
          <CardDescription>
            General instructions for the voice agent: role, tone, goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="system-prompt" className="sr-only">System prompt</Label>
          <textarea
            id="system-prompt"
            value=""
            rows={12}
            className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Describe how the AI should behave..."
          />
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" size="sm">
            <RotateCcw className="size-4" />
            Reset to default
          </Button>
          <Button size="sm" onClick={handleSave}>
            {saved ? "Saved" : <><Save className="size-4" /> Save</>}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}