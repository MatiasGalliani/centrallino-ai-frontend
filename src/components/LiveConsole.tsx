import { useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Pause, Play, RefreshCw, Send } from "lucide-react"

type LogLevel = "info" | "success" | "warn" | "error"

type LiveEvent = {
    id: number
    time: string
    level: LogLevel
    message: string
    campaign?: string
}

const MOCK_EVENTS: LiveEvent[] = [
    { id: 1, time: "14:32:01", level: "success", message: "Call completed — Qualified", campaign: "Recruiting Feb" },
    { id: 2, time: "14:32:00", level: "info", message: "AI summary generated" },
    { id: 3, time: "14:31:58", level: "info", message: "Hangup detected" },
    { id: 4, time: "14:31:12", level: "warn", message: "No answer — 3rd attempt", campaign: "Recruiting Feb" },
    { id: 5, time: "14:30:45", level: "success", message: "Call started — +39 333 *** 1234", campaign: "Recruiting Feb" },
    { id: 6, time: "14:30:44", level: "info", message: "Campaign Recruiting Feb triggered dial" },
]

function LevelBadge({ level }: { level: LogLevel }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                level === "success" && "bg-green-500/15 text-green-700 dark:text-green-400",
                level === "info" && "bg-blue-500/15 text-blue-700 dark:text-blue-400",
                level === "warn" && "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
                level === "error" && "bg-red-500/15 text-red-700 dark:text-red-400"
            )}
        >
            {level}
        </span>
    )
}

export default function LiveConsole() {
    const [connected, setConnected] = useState(false)
    const [connecting, setConnecting] = useState(false)
    const [command, setCommand] = useState("")

    const handleConnect = () => {
        setConnecting(true)
        setTimeout(() => {
            setConnecting(false)
            setConnected(true)
        }, 1500)
    }

    return (
        <TooltipProvider>
            <div className="flex flex-col w-full min-w-0 gap-6 p-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div>
                                <CardTitle>
                                    Live connection
                                </CardTitle>
                                <CardDescription className="mt-2">
                                    Real-time stream of calls and events
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                {connecting ? (
                                    <Skeleton className="h-9 w-24 rounded-md" />
                                ) : (
                                    <Button
                                        variant={connected ? "destructive" : "default"}
                                        size="sm"
                                        onClick={connected ? () => setConnected(false) : handleConnect}
                                    >
                                        {connected ? "Disconnect" : "Connect"}
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                    </Card>
                    
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Quick actions</CardTitle>
                            <CardDescription>Control campaigns and refresh stream</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="sm" disabled={!connected}>
                                        <Pause className="size-4" />
                                        Pause campaigns
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Pause all active campaigns</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="sm" disabled={!connected}>
                                        <Play className="size-4" />
                                        Resume
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Resume paused campaigns</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <RefreshCw className="size-4" />
                                        Refresh
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Reload latest events</TooltipContent>
                            </Tooltip>
                        </CardContent>
                    </Card>
                </div>
                
                <Separator />

                <Card className="flex flex-1 flex-col overflow-hidden bg-transparent border-transparent -mt-6 -mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            Event stream
                        </CardTitle>
                        <CardDescription>
                            Latest events in real time
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Time</TableHead>
                                    <TableHead className="w-[90px]">Level</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead className="hidden md:table-cell">Campaign</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {MOCK_EVENTS.map((ev) => (
                                    <TableRow key={ev.id}>
                                        <TableCell className="font-mono text-muted-foreground tabular-nums">{ev.time}</TableCell>
                                        <TableCell><LevelBadge level={ev.level} /></TableCell>
                                        <TableCell className="text-sm">{ev.message}</TableCell>
                                        <TableCell className="hidden text-muted-foreground md:table-cell text-sm">{ev.campaign ?? "—"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Separator />

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Send command</CardTitle>
                        <CardDescription>
                            Run a command in the live session (e.g. status, pause, resume)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="console-command">Command</Label>
                            <Input
                                id="console-command"
                                placeholder="Type a command"
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                className="font-mono mt-2"
                            />
                        </div>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button disabled={!connected || !command.trim()} className="sm:shrink-0">
                                    <Send className="size-4" />
                                    Send
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Send command to live session</TooltipContent>
                        </Tooltip>
                    </CardContent>
                </Card>
            </div>
        </TooltipProvider>
    )
}