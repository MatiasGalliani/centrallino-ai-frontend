import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import ComponentSidebar from "./Sidebar";

export default function Layout() {
    return (
        <SidebarProvider style={{ "--sidebar-width-icon": "4.5rem" } as React.CSSProperties}>
            <ComponentSidebar />
            <main>
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider> 
    )
}