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
import { Separator } from "@/components/ui/separator"
import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type Campaign = {
    id: number
    slug: string
    name: string
    description: string | null
    leads: number
    calls: number
    qualified: number
}

const API = "http://localhost:3000"

export default function Campaigns() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [newName, setNewName] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [creating, setCreating] = useState(false)
    const [createError, setCreateError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`${API}/campaigns`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load campaigns")
                return res.json()
            })
            .then((data) => {
                const list = data.campaigns ?? [];
                // #region agent log
                if (list.length > 0) fetch('http://127.0.0.1:7243/ingest/d32fa3f5-c8dd-4c14-a1af-f7e34d2fa2d9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Campaigns.tsx:list',message:'Campaigns from API',data:{firstSlug:list[0].slug,allSlugs:list.map((c: { slug: string }) => c.slug)},timestamp:Date.now(),hypothesisId:'A,D'})}).catch(()=>{});
                // #endregion
                setCampaigns(list);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [])

    const handleCreateSubmit = async (e: { preventDefault(): void }) => {
        e.preventDefault()
        setCreateError(null)
        setCreating(true)
        try {
            const res = await fetch(`${API}/campaigns`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newName.trim(),
                    slug: newName.trim().toLowerCase().replace(/\s+/g, "-"),
                    description: newDescription.trim() || null,
                }),
            })
            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err.error || "Failed to create campaign")
            }
            const data = await res.json()
            setCampaigns((prev) => [...prev, data.campaign ?? data])
            setCreateDialogOpen(false)
            setNewName("")
            setNewDescription("")
        } catch (err) {
            setCreateError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setCreating(false)
        }
    }


    if (loading) return <div className="p-6">Loading campaigns...</div>
    if (error) return <div className="p-6 text-destructive">Error: {error}</div>

    return (
        <TooltipProvider>
            <div className="flex flex-col w-full min-w-0 p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {campaigns.map((campaign) => (
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
                                    <Link to={`/campaigns/${campaign.slug}`}>See campaign</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card
                                role="button"
                                tabIndex={0}
                                className="flex flex-col border-dashed bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer min-h-[200px]"
                                onClick={() => setCreateDialogOpen(true)}
                                onKeyDown={(e) => e.key === "Enter" && setCreateDialogOpen(true)}
                            >
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

                    <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>New campaign</DialogTitle>
                    <DialogDescription>
                        Create a new campaign. The URL slug will be generated from the name.
                    </DialogDescription>
                            </DialogHeader>
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Campaign details</CardTitle>
                                    <CardDescription className="text-sm">
                                        Name and short description.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleCreateSubmit} className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-name">Name</Label>
                                            <Input
                                                id="new-name"
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                                placeholder="e.g. Outbound Q1 2025"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-description">Description</Label>
                                            <Input
                                                id="new-description"
                                                value={newDescription}
                                                onChange={(e) => setNewDescription(e.target.value)}
                                                placeholder="Short description of the campaign"
                                            />
                                        </div>
                                        {createError && (
                                            <p className="text-sm text-destructive">{createError}</p>
                                        )}
                                        <DialogFooter className="flex flex-row justify-between gap-2 sm:justify-between sm:gap-0">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setCreateDialogOpen(false)}
                                                className="cursor-pointer justify-left"
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit" disabled={creating} className="cursor-pointer">
                                                {creating ? "Creating…" : "Create campaign"}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </CardContent>
                            </Card>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </TooltipProvider>
    )
}