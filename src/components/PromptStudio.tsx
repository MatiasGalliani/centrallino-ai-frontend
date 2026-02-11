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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Copy, RotateCcw, Save } from "lucide-react"

const VARIABLES = [
  { name: "{{lead_name}}", description: "Lead's first or full name" },
  { name: "{{company}}", description: "Company name" },
  { name: "{{campaign_name}}", description: "Current campaign name" },
  { name: "{{agent_name}}", description: "Name of the AI agent" },
]

export default function PromptStudio() {
  const [saved, setSaved] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    // optional: toast
  }

  const handleSave = () => {
    // TODO: persist to API
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col w-full min-w-0 p-6 space-y-6">
        {/* System prompt */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              System prompt
            </CardTitle>
            <CardDescription>
              Main instructions for the voice agent: role, tone, goals, and qualification rules.
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

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Opening script */}
          <Card>
            <CardHeader>
              <CardTitle>Opening script</CardTitle>
              <CardDescription>
                First thing the agent says when the lead answers. Use variables below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="opening" className="sr-only">Opening script</Label>
              <textarea
                id="opening"
                value=""
                rows={4}
                className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Hi, this is..."
              />
            </CardContent>
          </Card>

          {/* Variables */}
          <Card>
            <CardHeader>
              <CardTitle>Variables</CardTitle>
              <CardDescription>
                Use these in your prompts; they are replaced at runtime.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {VARIABLES.map((v) => (
                  <li key={v.name} className="flex items-center justify-between gap-2 rounded-md border px-3 py-2">
                    <div>
                      <code className="text-sm font-medium">{v.name}</code>
                      <p className="text-xs text-muted-foreground">{v.description}</p>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon-sm" onClick={() => handleCopy(v.name)}>
                          <Copy className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy</TooltipContent>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}