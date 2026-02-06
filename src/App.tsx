import { useState } from "react"
import Login from "./components/login"

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    if (!isLoggedIn) {
        return <Login onSuccess={() => setIsLoggedIn(true)} />
    }

    return (
        <div>

        </div>
    )
}