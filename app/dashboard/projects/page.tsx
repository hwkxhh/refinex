'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FolderOpen, MoreVertical, Search, Filter, Plus, Download, Trash2, Copy, Archive } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { EmptyState } from '@/components/ui/empty-state'
import { mockProjects } from '@/lib/mock-data/projects'
import { formatDate } from '@/lib/utils'

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'archived'>('all')
  const [showMenu, setShowMenu] = useState<string | null>(null)

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
          <p className="text-text-secondary">Manage and organize your data analysis projects</p>
        </div>
        <Link href="/dashboard/upload">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('active')}
              >
                Active
              </Button>
              <Button
                variant={filterStatus === 'completed' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('completed')}
              >
                Completed
              </Button>
              <Button
                variant={filterStatus === 'archived' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('archived')}
              >
                Archived
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FolderOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowMenu(showMenu === project.id ? null : project.id)}
                      className="p-1 text-text-muted hover:text-foreground hover:bg-muted rounded transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {showMenu === project.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-10">
                        <Link
                          href={`/dashboard/project/${project.id}/visualize`}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-muted"
                        >
                          <FolderOpen className="w-4 h-4" />
                          Open
                        </Link>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-muted w-full text-left">
                          <Copy className="w-4 h-4" />
                          Duplicate
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-muted w-full text-left">
                          <Download className="w-4 h-4" />
                          Export
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-muted w-full text-left">
                          <Archive className="w-4 h-4" />
                          Archive
                        </button>
                        <hr className="my-2 border-border" />
                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-muted w-full text-left">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <Link href={`/dashboard/project/${project.id}/visualize`}>
                  <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                    <span>{project.rows.toLocaleString()} rows</span>
                    <span>·</span>
                    <span>{project.columns} columns</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        project.status === 'active' ? 'info' :
                        project.status === 'completed' ? 'success' : 'default'
                      }
                    >
                      {project.status}
                    </Badge>
                    <span className="text-xs text-text-disabled">{formatDate(project.lastModified)}</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="No projects found"
          description="Try adjusting your search or filter criteria"
        />
      )}
    </div>
  )
}
