import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Layout from "./components/Layout"
import CallHistory from "./components/CallHistory"

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    return (
        <Routes>
            <Route path="/" element={<Login onSuccess={() => setIsLoggedIn(true)} />} />
            <Route path="/" element={isLoggedIn ? <Layout /> : <Navigate to="/" replace />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="call-history" element={<CallHistory />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes> 
    )
}