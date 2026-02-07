import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Layout from "./components/Layout"

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    return (
        <Routes>
            <Route path="/" element={<Login onSuccess={() => setIsLoggedIn(true)} />} />
            <Route path="/" element={isLoggedIn ? <Layout /> : <Navigate to="/" replace />}>
                <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes> 
    )
}