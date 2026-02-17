import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useVoices } from "@/hooks/useVoices"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeft, FileEdit, Save, Headphones, Trash2, Copy } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const API = "http://localhost:3000"

type CampaignFromApi = {
    id: number
    slug: string
    name: string
    description: string | null
    [key: string]: unknown
}

export default function CampaignDetail() {
    const { slug } = useParams<{ slug: string }>()
    const navigate = useNavigate()
    const [campaign, setCampaign] = useState<CampaignFromApi | null>(null)
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [copiedLeadsUrl, setCopiedLeadsUrl] = useState(false)

    useEffect(() => {
        if (!slug) {
            setCampaign(null)
            setLoading(false)
            return
        }
        setLoading(true)
        setFetchError(null)
        fetch(`${API}/campaigns`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load campaigns")
                return res.json()
            })
            .then((data) => {
                const list = data.campaigns ?? []
                const c = list.find((item: { slug: string }) => item.slug === slug)
                setCampaign(c ? { ...c, id: c.id, slug: c.slug, name: c.name, description: c.description ?? null } : null)
            })
            .catch((e) => {
                setFetchError(e.message)
                setCampaign(null)
            })
            .finally(() => setLoading(false))
    }, [slug])

    useEffect(() => {
        if (!campaign) return
        const p = (campaign.campaign_prompt as string) ?? ""
        const v = (campaign.voice_id as string) ?? ""
        const w = (campaign.webhook_url as string) ?? ""
        setCampaignPrompt(p)
        setSelectedVoiceId(v)
        setInitialDelay(String(campaign.initial_delay ?? "0"))
        setMaxRetries(String(campaign.max_retries ?? "3"))
        setRetryInterval(String(campaign.retry_interval ?? "30"))
        setWebhookUrl(w)
    }, [campaign])

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/d32fa3f5-c8dd-4c14-a1af-f7e34d2fa2d9', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'CampaignDetail.tsx:params', message: 'CampaignDetail params and lookup', data: { slug, loading, campaignFound: !!campaign, fetchError }, timestamp: Date.now(), hypothesisId: 'post-fix' }) }).catch(() => { });
    // #endregion

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState<string | null>(null)
    const [deleteConfirmText, setDeleteConfirmText] = useState("")

    const [campaignPrompt, setCampaignPrompt] = useState("")
    const [saved, setSaved] = useState(false)
    const [promptError, setPromptError] = useState<string | null>(null)

    const handleSavePrompt = async () => {
        if (!campaign) return
        setPromptError(null)
        try {
            const res = await fetch(`${API}/campaigns/${campaign.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ campaign_prompt: campaignPrompt }),
            })
            if (!res.ok) throw new Error("Failed to save prompt")
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        } catch (e) {
            setPromptError(e instanceof Error ? e.message : "Failed to save prompt")
        }
    }

    const [promptDialogOpen, setPromptDialogOpen] = useState(false)

    const [selectedVoiceId, setSelectedVoiceId] = useState("")
    const [initialDelay, setInitialDelay] = useState("0")
    const [maxRetries, setMaxRetries] = useState("3")
    const [retryInterval, setRetryInterval] = useState("30")
    const [webhookUrl, setWebhookUrl] = useState("")

    const handleDeleteContinue = () => {
        setDeleteDialogOpen(false)
        setDeleteConfirmOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!campaign) return
        setDeleteError(null)
        setDeleting(true)
        try {
            const res = await fetch(`${API}/campaigns/${campaign.id}`, { method: "DELETE" })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) throw new Error(data.error || "Failed to delete campaign")
            setDeleteConfirmOpen(false)
            navigate("/campaigns")
        } catch (err) {
            setDeleteError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setDeleting(false)
        }
    }

    const { voices, loading: voicesLoading, error: voicesError } = useVoices()

    if (loading) {
        return (
            <div className="p-6">
                <p className="text-muted-foreground">Loading campaign…</p>
            </div>
        )
    }
    if (!campaign) {
        return (
            <div className="p-6">
                <p className="text-muted-foreground">{fetchError || "Campaign not found."}</p>
                <Button variant="link" asChild className="mt-2 pl-0">
                    <Link to="/campaigns">Back to campaigns</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="w-full min-w-0 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link to="/campaigns">
                            <ArrowLeft className="size-4" />
                        </Link>
                    </Button>
                    <h2 className="text-lg font-semibold">{campaign.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={() => {
                            setDeleteError(null)
                            setDeleteDialogOpen(true)
                        }}
                    >
                        <Trash2 className="size-4" />
                        Delete campaign
                    </Button>
                </div>
            </div>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete campaign?</DialogTitle>
                        <DialogDescription>
                            This will remove the campaign from the list. You can confirm or cancel in the next step.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row justify-between gap-2 sm:justify-between sm:gap-0">
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteContinue}>
                            Continue
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This campaign will be permanently deleted.
                        </DialogDescription>
                    </DialogHeader>
                    {deleteError && (
                        <p className="text-sm text-destructive">{deleteError}</p>
                    )}
                    <DialogFooter className="flex flex-row justify-between gap-2 sm:justify-between sm:gap-0">
                        <Input
                            className="mr-5"
                            value={deleteConfirmText}
                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                            placeholder="Type DELETE to confirm"
                        />
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                            disabled={deleting || deleteConfirmText !== "DELETE"}
                        >
                            {deleting ? "Deleting…" : "Delete permanently"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="flex flex-col gap-6">
                    <Card className="lg:max-h-[250px] flex flex-col">
                        <CardHeader>
                            <CardTitle>Campaign prompts for the AI</CardTitle>
                            <CardDescription>
                                Instructions and context you give to the AI for this campaign. Define role, tone, goals and how the agent should behave on calls.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Dialog open={promptDialogOpen} onOpenChange={setPromptDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full sm:w-auto">
                                        <FileEdit className="size-4" />
                                        Edit prompts
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
                                    <DialogHeader>
                                        <DialogTitle>Campaign prompts for the AI</DialogTitle>
                                        <DialogDescription>
                                            Instructions and context for this campaign. Define role, tone, goals and how the agent should behave on calls.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <Label htmlFor="campaign-prompt-dialog" className="sr-only">Campaign prompt</Label>
                                        <Textarea
                                            id="campaign-prompt-dialog"
                                            value={campaignPrompt}
                                            onChange={(e) => setCampaignPrompt(e.target.value)}
                                            rows={14}
                                            className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder:text-muted-foreground"
                                            placeholder="You are an outbound sales agent for this campaign. Your goal is to..."
                                        />
                                    </div>
                                    {promptError && <p className="text-sm text-destructive">{promptError}</p>}
                                    <DialogFooter showCloseButton>
                                        <Button size="sm" onClick={handleSavePrompt}>
                                            {saved ? "Saved" : <><Save className="size-4" /> Save</>}
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => setPromptDialogOpen(false)}>
                                            Done
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Integrations</CardTitle>
                            <CardDescription>
                                Inbound leads URL (copy) and outbound leads destination URL.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="leads-in-url" className="text-sm font-medium">
                                    Inbound leads URL
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="leads-in-url"
                                        readOnly
                                        value={campaign ? `${API}/campaigns/${campaign.id}/leads/in` : ""}
                                        className="bg-muted font-mono text-sm flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="shrink-0"
                                        onClick={() => {
                                            const url = campaign ? `${API}/campaigns/${campaign.id}/leads/in` : ""
                                            if (url) {
                                                navigator.clipboard.writeText(url)
                                                setCopiedLeadsUrl(true)
                                                setTimeout(() => setCopiedLeadsUrl(false), 2000)
                                            }
                                        }}
                                        disabled={!campaign}
                                    >
                                        <Copy className="size-4" />
                                        <span className="sr-only">Copy</span>
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {copiedLeadsUrl ? "Copied to clipboard!" : "System-generated URL. Copy and use it in your CRM or form to send leads to this campaign."}
                                </p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="webhook-url" className="text-sm font-medium">
                                    Outbound leads destination
                                </Label>
                                <Input
                                    id="webhook-url"
                                    type="url"
                                    placeholder="https://hooks.zapier.com/..."
                                    value={webhookUrl}
                                    onChange={(e) => setWebhookUrl(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    URL where qualified leads are sent (e.g. Zapier, CRM webhook).
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="lg:max-h-[250px] flex flex-col">
                    <CardHeader>
                        <CardTitle>AI voice</CardTitle>
                        <CardDescription>
                            Choose the voice the AI will use for this campaign. You can test and compare voices in the Voice Lab.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <Select value={selectedVoiceId} onValueChange={setSelectedVoiceId} disabled={voicesLoading}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a voice…" />
                            </SelectTrigger>
                            <SelectContent>
                                {voices.map((voice) => (
                                    <SelectItem key={voice.id} value={voice.id}>
                                        {voice.name} — {voice.category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="outline" asChild className="w-full">
                            <Link to="/voice-lab">
                                <Headphones className="size-4" />
                                Test voices in Voice Lab
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Call Settings</CardTitle>
                        <CardDescription>
                            Configure timing and retry behavior for this campaign.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="initial-delay" className="text-sm font-medium">
                                Initial Delay
                            </Label>
                            <Select value={initialDelay} onValueChange={setInitialDelay}>
                                <SelectTrigger id="initial-delay" className="w-full">
                                    <SelectValue placeholder="Select delay…" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Immediate</SelectItem>
                                    <SelectItem value="2">2 minutes</SelectItem>
                                    <SelectItem value="5">5 minutes</SelectItem>
                                    <SelectItem value="10">10 minutes</SelectItem>
                                    <SelectItem value="30">30 minutes</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                How long the AI should wait before calling the lead.
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="max-retries" className="text-sm font-medium">
                                Max Retries
                            </Label>
                            <Select value={maxRetries} onValueChange={setMaxRetries}>
                                <SelectTrigger id="max-retries" className="w-full">
                                    <SelectValue placeholder="Select retries…" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">No retries</SelectItem>
                                    <SelectItem value="1">1 retry</SelectItem>
                                    <SelectItem value="2">2 retries</SelectItem>
                                    <SelectItem value="3">3 retries</SelectItem>
                                    <SelectItem value="5">5 retries</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                How many times to retry if the customer doesn't answer.
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="retry-interval" className="text-sm font-medium">
                                Retry Interval
                            </Label>
                            <Select value={retryInterval} onValueChange={setRetryInterval}>
                                <SelectTrigger id="retry-interval" className="w-full">
                                    <SelectValue placeholder="Select interval…" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15">15 minutes</SelectItem>
                                    <SelectItem value="30">30 minutes</SelectItem>
                                    <SelectItem value="60">1 hour</SelectItem>
                                    <SelectItem value="120">2 hours</SelectItem>
                                    <SelectItem value="240">4 hours</SelectItem>
                                    <SelectItem value="1440">24 hours</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                                How long to wait between retry attempts.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}