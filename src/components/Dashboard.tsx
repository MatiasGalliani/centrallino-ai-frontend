import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"
import type { ChartConfig } from "@/components/ui/chart"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

const MOCK = {
    qualifiedLeads: 87,
    totalLeads: 100,
    totalCalls: 288,
    activeLeadsToday: 42,
}

type InteractionStatus = "QUALIFIED" | "JUNK" | "NO_ANSWER"

const MOCK_INTERACTIONS: { phone: string; status: InteractionStatus; verdict: string }[] = [
    { phone: "+39 333 *** 1234", status: "QUALIFIED", verdict: "Has experience, has Partita IVA, interested in interview." },
    { phone: "+39 347 *** 5678", status: "JUNK", verdict: "No Partita IVA, not in target segment." },
    { phone: "+39 320 *** 9012", status: "NO_ANSWER", verdict: "No answer after 3 attempts." },
    { phone: "+39 338 *** 3456", status: "QUALIFIED", verdict: "Decision maker, open to demo next week." },
    { phone: "+39 331 *** 7890", status: "JUNK", verdict: "Out of business, wrong contact." },
]

function StatusBadge({ status }: { status: InteractionStatus }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                status === "QUALIFIED" && "bg-green-500/15 text-green-700 dark:text-green-400",
                status === "JUNK" && "bg-red-500/15 text-red-700 dark:text-red-400",
                status === "NO_ANSWER" && "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400"
            )}
        >
            {status.replace("_", " ")}
        </span>
    )
}

function getUsageData(days: 7 | 30) {
    const data = []
    const now = new Date()
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now)
        d.setDate(d.getDate() - i)
        data.push({
            date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            minutes: Math.round(20 + Math.random() * 80),
        })
    }
    return data
}

const usageChartConfig = {
    minutes: {
        label: "Minutes used",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function Dashboard() {
    const filteringEfficiency =
        MOCK.totalLeads > 0
            ? Math.round((MOCK.qualifiedLeads / MOCK.totalLeads) * 100)
            : 0
    const humanHoursSavedMinutes = MOCK.totalCalls * 5
    const humanHoursSavedHours = (humanHoursSavedMinutes / 60).toFixed(1)

    const [usageDays, setUsageDays] = useState<7 | 30>(7)
    const usageData = getUsageData(usageDays)

    return (
        <div className="flex flex-col w-full min-w-0">
            <div className="grid gap-4 p-6 md:grid-cols-3">
                <Card className="flex-1 flex flex-col">
                    <CardHeader>
                        <CardTitle>Filtering Efficiency</CardTitle>
                        <CardDescription>
                            Qualified leads vs total leads — shows how well the AI is cleaning the database.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                        <p className="text-3xl font-bold tabular-nums">{filteringEfficiency}%</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {MOCK.qualifiedLeads} / {MOCK.totalLeads} qualified
                        </p>
                    </CardContent>
                </Card>

                <Card className="flex-1 flex flex-col">
                    <CardHeader>
                        <CardTitle>Human Hours Saved</CardTitle>
                        <CardDescription>
                            Total calls × 5 min per call — time your team would have spent on the phone.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                        <p className="text-3xl font-bold tabular-nums">{humanHoursSavedHours}h</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {MOCK.totalCalls} calls × 5 min
                        </p>
                    </CardContent>
                </Card>

                <Card className="flex-1 flex flex-col">
                    <CardHeader>
                        <CardTitle>Active Leads Today</CardTitle>
                        <CardDescription>
                            Number of leads the AI has contacted in the last 24 hours.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                        <p className="text-3xl font-bold tabular-nums">{MOCK.activeLeadsToday}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            last 24 hours
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 px-6 pb-6 md:grid-cols-2">
                <Card className="flex flex-col overflow-hidden">
                    <CardHeader>
                        <CardTitle>Live Activity Feed</CardTitle>
                        <CardDescription>
                            A scrolling list of the most recent interactions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-hidden p-0">
                        <ul className="divide-y divide-border px-6 pb-6">
                            {MOCK_INTERACTIONS.slice(0, 4).map((item, i) => (
                                <li key={i} className="py-4 first:pt-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="flex items-center gap-2 mb-1">
                                            {item.phone}
                                        </span>
                                        <StatusBadge status={item.status} />
                                    </div>
                                    <p className="text-sm text-foreground">{item.verdict}</p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                            <CardTitle>Usage & Cost</CardTitle>
                            <CardDescription>
                                Minutes used over time — last 7 or 30 days.
                            </CardDescription>
                        </div>
                        <div className="flex gap-1">
                            <button
                                type="button"
                                onClick={() => setUsageDays(7)}
                                className={`rounded-md px-2 py-2 text-xs font-medium transition-colors ${usageDays === 7 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                            >
                                7 days
                            </button>
                            <button
                                type="button"
                                onClick={() => setUsageDays(30)}
                                className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${usageDays === 30 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                            >
                                30 days
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={usageChartConfig} className="h-[280px] w-full">
                            <BarChart data={usageData} margin={{ top:12, right: 12, bottom: 0, left: 0}}>
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                                <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `${v} min`} />
                                <Bar dataKey="minutes" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}