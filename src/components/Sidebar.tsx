import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { CaretCircleDoubleRight, UserCircle } from "@phosphor-icons/react"
import { LayoutDashboard } from "lucide-react"
import { CaretCircleDoubleRightIcon } from "@phosphor-icons/react/dist/ssr"

const navItems = [
    {
        to: "/dashboard", label: "Dashboard", icon: LayoutDashboard
    }
]

export default function ComponentSidebar() {
    const location = useLocation()
    const { state } = useSidebar()
    const isCollapsed = state === "collapsed"

    return (
        <div>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <Link to="/Dashboard" className={`flex items-center gap-2 px-2 py-2 hover:bg-white/10 rounded-lg ${isCollapsed ? "w-full justify-center" : ""}`}>
                        {isCollapsed ? (
                            <UserCircle size={32} className="shrink-0 size-8" />
                        ) : (
                           <>
                            <img src="/logo.svg" alt="Logo" className="h-10 w-auto shrink-0" />
                            <div className="flex flex-col items-start min-w-0">
                                <span className="font-semibold text-sm">Creditplan Italia</span>
                                <span className="text-xs text-muted-foreground">Premium user</span>
                            </div>
                            <CaretCircleDoubleRight size={20} className="shrink-0 ml-5" />
                           </> 
                        )}
                    </Link>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Operations</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navItems.map(({ to, label, icon: Icon }) => (
                                    <SidebarMenuItem key={to}>
                                        <Link to={to}>
                                            <Icon className="size-4" />
                                            <span>{label}</span>
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
        </div>
    )
}