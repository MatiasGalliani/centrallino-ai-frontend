import { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

interface LoginProps {
    onSuccess: () => void
}

export default function Login({ onSuccess }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen w-full bg-[#000000] flex items-center justify-center dark">
            <div className="flex flex-col items-center w-full max-w-sm">
                <img
                    src="/logo.svg"
                    alt="Logo"
                    className="mb-4 h-20 w-auto"
                />
                <Card className="w-full max-w-sm bg-transparent">
                    <CardHeader>
                        <CardTitle className="text-center">Login con le tue credenziali Accelera</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="mail@creditplan.it"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Hai dimenticato la tua password?
                                        </a>
                                    </div>
                                    <div className="relative">
                                    <Input 
                                        id="password" 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="●●●●●●●●●" 
                                        required
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                                        aria-label={showPassword ? "Nascondi password" : "Mostra password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full cursor-pointer">
                            Login
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )

}