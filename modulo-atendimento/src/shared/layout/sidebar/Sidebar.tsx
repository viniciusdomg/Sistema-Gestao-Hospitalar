import SidebarItem from "./SidebarItem";

interface MenuItem {
    label: string;
    href: string;
}

function Sidebar({ title = 'Sistema', menuItems = [] }: 
    { title?: string, menuItems?: MenuItem[] }
) {
    return (
        <aside className="w-64 h-screen p-6 flex flex-col shadow-xl sidebar-container">
            <div className="mb-8 hidden">
                <h2 className="text-xl uppercase tracking-wider sidebar-title">
                {title}
                </h2>
            </div>
            
            <nav className="flex-1">
                <ul>
                {menuItems.map((item) => (
                    <SidebarItem 
                    key={item.href} 
                    href={item.href} 
                    label={item.label} 
                    />
                ))}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;