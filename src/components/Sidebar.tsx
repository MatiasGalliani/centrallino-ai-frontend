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
    SidebarMenuSubButton,
    useSidebar
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { 
    CaretCircleDoubleRight, 
    UserCircle,
    PhoneList,
    TerminalWindow,
    Megaphone,
    Plugs,
    Path,
    OpenAiLogo,
    HeadCircuit,
    Coins,
    SignOut } from "@phosphor-icons/react"
import { LayoutDashboard } from "lucide-react"


const operationsItems = [
    {
        to: "/dashboard", label: "Dashboard", icon: LayoutDashboard
    },
    {
        to: "/call-history", label: "Call History", icon: PhoneList
    },
    {
        to: "/live-console", label: "Live Console", icon: TerminalWindow
    }
]

const orchestrationItems = [
    {
        to: "/campaigns", label: "Campaigns", icon: Megaphone
    },
    {
        to: "/crm-integration", label: "CRM Integration", icon: Plugs
    },
    {
        to: "/routing-routes", label: "Routing Rules", icon: Path
    }
]

const aiEngine = [
    {
        to: "/prompt-studio", label: "Prompt Studio", icon: OpenAiLogo
    },
    {
        to: "/voice-lab", label: "Voice Lab", icon: HeadCircuit
    }
]

const finance = [
    {
        to: "/finance", label: "Finance", icon: Coins
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
                                {operationsItems.map(({ to, label, icon: Icon }) => (
                                    <SidebarMenuItem key={to}>
                                        <SidebarMenuButton asChild isActive={location.pathname === to} className="group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!justify-center">
                                            <Link to={to}>
                                                {isCollapsed ? (
                                                    <div className="flex w-full justify-center items-center">
                                                        <Icon className="shrink-0 size-6" />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Icon className="size-4 shrink-0"/>
                                                        <span>{label}</span>
                                                    </>
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>Orchestration</SidebarGroupLabel>
                        <SidebarGroupContent>
                        <SidebarMenu>
                                {orchestrationItems.map(({ to, label, icon: Icon }) => (
                                    <SidebarMenuItem key={to}>
                                        <SidebarMenuButton asChild isActive={location.pathname === to} className="group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!justify-center">
                                            <Link to={to}>
                                                {isCollapsed ? (
                                                    <div className="flex w-full justify-center items-center">
                                                        <Icon className="shrink-0 size-6" />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Icon className="size-4 shrink-0"/>
                                                        <span>{label}</span>
                                                    </>
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                    <SidebarGroupLabel>AI Engine</SidebarGroupLabel>
                        <SidebarGroupContent>
                        <SidebarMenu>
                                {aiEngine.map(({ to, label, icon: Icon }) => (
                                    <SidebarMenuItem key={to}>
                                        <SidebarMenuButton asChild isActive={location.pathname === to} className="group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!justify-center">
                                            <Link to={to}>
                                                {isCollapsed ? (
                                                    <div className="flex w-full justify-center items-center">
                                                        <Icon className="shrink-0 size-6" />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Icon className="size-4 shrink-0"/>
                                                        <span>{label}</span>
                                                    </>
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                    <SidebarGroupLabel>Finance</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                                {aiEngine.map(({ to, label, icon: Icon }) => (
                                    <SidebarMenuItem key={to}>
                                        <SidebarMenuButton asChild isActive={location.pathname === to} className="group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!justify-center">
                                            <Link to={to}>
                                                {isCollapsed ? (
                                                    <div className="flex w-full justify-center items-center">
                                                        <Icon className="shrink-0 size-6" />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Icon className="size-4 shrink-0"/>
                                                        <span>{label}</span>
                                                    </>
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild className="group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]!justify-center">
                                <button
                                 type="button"
                                 onClick={() => {
                                    onLogout?.()
                                    Navigate("/")
                                 }}
                                 className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2"
                                >
                                    {isCollapsed ? (
                                        <div className="flex w-ful justify-center items-center">
                                            <SignOut className="size-6 shrink-0" />
                                        </div>
                                    ) : (
                                      <>
                                        <SignOut className="size-4 shrink-0" />
                                        <span>Log out</span>
                                      </>  
                                    )}
                                </button>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </div>
    )
}