'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Upload, 
  FolderOpen, 
  FileText, 
  LayoutTemplate, 
  Settings, 
  HelpCircle,
  LucideIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Upload', href: '/dashboard/upload', icon: Upload },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderOpen },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Templates', href: '/dashboard/templates', icon: LayoutTemplate },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-border bg-white/80 backdrop-blur-sm">
      {/* Logo */}
      <div className="h-20 flex items-center gap-3 px-6 border-b border-border">
        <div className="flex items-center gap-1">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <div className="w-1 h-6 bg-primary rounded-full"></div>
        </div>
        <span className="text-xl font-bold text-primary">Refine</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                isActive
                  ? 'card-gradient text-white shadow-md'
                  : 'text-text-secondary hover:bg-muted/30 hover:text-foreground'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Help */}
      <div className="px-4 py-6 border-t border-border">
        <Link
          href="/dashboard/help"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-text-secondary hover:bg-muted/30 hover:text-foreground transition-all duration-200"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Help & Docs</span>
        </Link>
      </div>
    </aside>
  )
}
