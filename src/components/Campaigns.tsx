import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"
import { Plus } from "lucide-react"
import  { Link } from "react-router-dom"

const MOCK_ACTIVE_CAMPAIGNS = [
    {
        id: "1",
        name: "Outbound Q1 2025",
        description: "Cold prospection campaign for companies with Partita IVA",
        leads: 1240,
        calls: 892,
        qualified: 156,
    },
    {
        id: "2",
        name: "Re-engagement Inactives",
        description: "Reactivation of leads that didn't respond in old campaigns",
        leads: 420,
        calls: 380,
        qualified: 48,
    }
]

export default function Campaigns() {
    return (
        <TooltipProvider>
            <div className="flex flex-col w-full min-w-0 p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {MOCK_ACTIVE_CAMPAIGNS.map((campaign) => (
                        <Card key={campaign.id} className="flex flex-col">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-2">
                                    <CardTitle className="text-base leading-tight">
                                        {campaign.name}
                                    </CardTitle>
                                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                        Active
                                    </span>
                                </div>
                                <CardDescription className="line-clamp-2 text-sm">
                                    {campaign.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-3 pb-3">
                                <Separator />
                                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                    <div>
                                        <p className="font-medium tabular-nums">{campaign.leads}</p>
                                        <p className="text-muted-foreground">Leads</p>
                                    </div>
                                    <div>
                                        <p className="font-medium tabular-nums">{campaign.calls}</p>
                                        <p className="text-muted-foreground">Calls</p>
                                    </div>
                                    <div>
                                        <p className="font-medium tabular-nums">{campaign.qualified}</p>
                                        <p className="text-muted-foreground">Qualified</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button variant="outline" size="sm" className="w-full" asChild>
                                    <Link to={`/campaigns/${campaign.id}`}>See campaign</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className="flex flex-col border-dashed bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer min-h-[200px]">
                                <CardContent className="flex flex-1 flex-col items-center justify-center gap-3 p-6">
                                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                                        <Plus className="size-6 text-primary" />
                                    </div>
                                    <div className="text-center space-y-1">
                                        <p className="font-semibold">Create new campaign</p>
                                        <p className="text-sm text-muted-foreground">
                                            Assignate name, audience and flow.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    )
}