import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type Verdict = "QUALIFIED" | "JUNK" | "NO_ANSWER" | "BUSY"

type CallRecord = {
    timestamp: string
    lead: string
    campaign: string
    duration: string
    verdict: Verdict
    aiSummary: string
    cost: string
}

const MOCK_CALLS: CallRecord[] = [
    {
        timestamp: "2025-02-08 14:32",
        lead: "Mario Rossi",
        campaign: "Recruiting Feb",
        duration: "02:45",
        verdict: "QUALIFIED",
        aiSummary: "Has Partita IVA, interested in interview next week.",
        cost: "€1.25",
    },
    {
        timestamp: "2025-02-08 14:18",
        lead: "+39 347 *** 5678",
        campaign: "Recruiting Feb",
        duration: "01:12",
        verdict: "JUNK",
        aiSummary: "No Partita IVA, not in target segment.",
        cost: "€0.62",
    },
    {
        timestamp: "2025-02-08 13:55",
        lead: "+39 320 *** 9012",
        campaign: "Recruiting Jan",
        duration: "00:00",
        verdict: "NO_ANSWER",
        aiSummary: "No answer after 3 attempts.",
        cost: "€0.00",
    },
    {
        timestamp: "2025-02-08 13:40",
        lead: "Laura Bianchi",
        campaign: "Recruiting Feb",
        duration: "01:58",
        verdict: "BUSY",
        aiSummary: "Line busy, callback requested.",
        cost: "€0.98",
    },
    {
        timestamp: "2025-02-08 13:22",
        lead: "+39 338 *** 3456",
        campaign: "Recruiting Feb",
        duration: "03:11",
        verdict: "QUALIFIED",
        aiSummary: "Decision maker, open to demo.",
        cost: "€1.55",
    },
]

function VerdictBadge({ verdict }: { verdict: Verdict }) {
    return (
        <span 
            className={cn(
                "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                verdict === "QUALIFIED" && "bg-green-500/15 text-green-700 dark:text-green-400",
                verdict === "JUNK" && "bg-red-500/15 text-red-700 dark:text-red-400",
                verdict === "NO_ANSWER" && "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
                verdict === "BUSY" && "bg-orange-500/15 text-orange-700 dark:text-orange-400"
            )}
        >
            {verdict.replace("_", " ")}
        </span>
    )
}

export default function CallHistory() {
    return (
        <div className="flex flex-col w-full min-w-0 p-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Lead</TableHead>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status / Verdict</TableHead>
                        <TableHead>AI Summary</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {MOCK_CALLS.map((row, i) => (
                        <TableRow>
                            <TableCell className="whitespace-nowrap">{row.timestamp}</TableCell>
                            <TableCell>{row.lead}</TableCell>
                            <TableCell>{row.campaign}</TableCell>
                            <TableCell className="font-mono tabular-nums">{row.duration}</TableCell>
                            <TableCell>
                                <VerdictBadge verdict={row.verdict} />
                            </TableCell>
                            <TableCell className="max-w-[280px] text-muted-foreground">{row.aiSummary}</TableCell>
                            <TableCell className="text-right tabular-nums">{row.cost}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}