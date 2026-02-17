import { useState, useEffect } from "react"

export interface Voice {
    id: string
    name: string
    category: string
    description: string
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000"

export function useVoices() {
    const [voices, setVoices] = useState<Voice[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`${API_BASE}/api/voices`)
            .then((res) => res.json())
            .then ((data) => {
                if (data.error) throw new Error(data.error)
                    setVoices(data.voices || [])
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [])
    return { voices, loading, error }
}

