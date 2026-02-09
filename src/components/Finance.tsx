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
import { cn } from "@/lib/utils"
import { Send } from "lucide-react"

export default function Finance() {
    const LOW_BALANCE_THRESHOLD = 50
    const MOCK_FINANCE = {
        currentBalance: 127.50,
        monthlyBurnRate: "12.30",
        totalInvested: 450.00,
    }

    const [reference, setReference] = useState("")
    const [notifySent, setNotifySent] = useState(false)
    const BANK_DETAILS = {
        name: "Matias Nahuel Galliani",
        iban : "NL00 BUNQ 0000 0000 00",
        bic: "BUNQNL2A"
    }

    return (
        <div className="flex flex-col w-full min-w-0">
            <div className="grid gap-4 p-6 md:grid-cols-3">
                <Card className="flex-1 flex flex-col">
                    <CardHeader>
                        <CardTitle>Current Balance</CardTitle>
                        <CardDescription>Available credit in your account.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                        <p
                            className={cn(
                                "text-3xl font-bold tabular-nums",
                                MOCK_FINANCE.currentBalance < LOW_BALANCE_THRESHOLD &&
                                    "text-red-600 dark:text-red-400"
                            )}
                        >
                            €{MOCK_FINANCE.currentBalance.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Available to spend on calls
                        </p>
                    </CardContent>
                </Card>

                <Card className="flex-1 flex flex-col">
                    <CardHeader>
                        <CardTitle>Monthly Burn Rate</CardTitle>
                        <CardDescription>
                            Average daily spend - helps you predict when to top up.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                        <p className="text-3xl font-bold tabular-nums">
                            €{MOCK_FINANCE.monthlyBurnRate} <span className="text-lg text-muted-foreground">/ day</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Based on last 30 days
                        </p>
                    </CardContent>
                </Card>

                <Card className="flex-1 flex flex-col">
                    <CardHeader>
                        <CardTitle>Total Invested</CardTitle>
                        <CardDescription>
                            Total amount you have loaded since you started.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                        <p className="text-3xl font-bold tabular-nums">
                            €{MOCK_FINANCE.totalInvested.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            All-time top-ups
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="px-6 pb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Credits</CardTitle>
                        <CardDescription>
                            To top-up your balance, please make a SEPA transfer to our billing account.
                        </CardDescription>
                        <CardContent className="pl-0 pr-6">
                            <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm mt-4 pl-6">                                <dl className="text-muted-foreground">Name</dl>
                                <dd>{BANK_DETAILS.name}</dd>
                                <dl className="text-muted-foreground">IBAN</dl>
                                <dd>{BANK_DETAILS.iban}</dd>
                                <dt className="text-muted-foreground">BIC / SWIFT</dt>
                                <dd>{BANK_DETAILS.bic}</dd>
                            </div>
                            <div className="grid gap-2 mt-4 -ml-6 pl-6">     
                                <Label htmlFor="transfer-reference">Reference to include in transfer</Label>
                                <Input
                                    id="trasnfer-reference"
                                    placeholder="ACC-VOICE-CREDITS-12345"
                                    value={reference}
                                    onChange={(e) => setReference(e.target.value)}
                                    className="font-mono mt-1"
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-4">
                                <Button
                                    onClick={() => setNotifySent(true)}
                                    disabled={!reference.trim()}
                                >
                                    <Send className="size-4" />
                                    Notify Deposit
                                </Button>
                                {notifySent && (
                                    <p className="text-sm text-muted-foreground">
                                        We&apos;ve been notified. We&apos;ll confirm once the transfer is received.
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}