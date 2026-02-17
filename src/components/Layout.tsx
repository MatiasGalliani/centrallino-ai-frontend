import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import ComponentSidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const pathToTitle: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/call-history": "Call History",
    "/live-console": "Live Console",
    "/campaigns": "Campaigns",
    "/voice-lab": "Voice Lab",
    "/finance": "Finance"
}

const navItems: { to: string, label: string }[] = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/call-history", label: "Call History" },
    { to: "/live-console", label: "Live Console" },
    { to: "/campaigns", label: "Campaigns" },
    { to: "/voice-lab", label: "Voice Lab" },
    { to: "/finance", label: "Finance" },
]

export default function Layout() {
    const [commandOpen, setCommandOpen] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const title = pathToTitle[pathname] ?? "Dashboard";

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <SidebarProvider style={{ "--sidebar-width-icon": "4.5rem" } as React.CSSProperties}>
            <ComponentSidebar />
            <main className="flex-1 min-w-0 overflow-auto flex flex-col">
                <header className="flex items-center justify-between gap-4 px-6 py-3 shrink-0 border-b">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger />
                        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
                    </div>
                    <Button
                        variant="outline"
                        className="relative h-9 w-full max-w-[200px] justify-start text-muted-foreground sm:max-w-[240px]"
                        onClick={() => setCommandOpen(true)}
                    >
                        <Search className="size-4" />
                        <span className="ml-2">Search...</span>
                        <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium sm:flex">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </Button>
                </header>
                <Outlet />
            </main>

            <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
                <CommandInput placeholder="Search or go to..." />
                <CommandList className="max-h-none overflow-visible">
                    <CommandEmpty>No results.</CommandEmpty>
                    <CommandGroup heading="Navigation">
                        {navItems.map(({ to, label }) => (
                            <CommandItem
                                key={to}
                                onSelect={() => {
                                    navigate(to);
                                    setCommandOpen(false);
                                }}
                            >
                                {label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </SidebarProvider>
    )
}