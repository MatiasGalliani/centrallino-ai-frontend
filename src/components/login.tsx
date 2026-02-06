import { useState } from "react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

interface LoginProps {
    onSuccess: () => void
}

export default function Login ({ onSuccess }: LoginProps) {
    return (
        <div className="min-h-screen w-full bg-[#000000]">
            <h1>Hello world</h1>
        </div>
    )
}