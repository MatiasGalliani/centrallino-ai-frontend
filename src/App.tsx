import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    return (
        <Routes>
            <Route path="/" element={<Login onSuccess={() => setIsLoggedIn(true)} />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes> 
    )
}