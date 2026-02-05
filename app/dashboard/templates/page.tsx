'use client'

import Link from 'next/link'
import { LayoutTemplate, Star, Download, Eye, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockTemplates } from '@/lib/mock-data/projects'

export default function TemplatesPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Templates</h1>
        <p className="text-text-secondary">Pre-built analysis templates to get started quickly</p>
      </div>

      {/* Featured Template */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <Star className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <Badge variant="warning" className="mb-3">Featured</Badge>
              <h2 className="text-2xl font-bold text-foreground mb-2">Complete Sales Analytics</h2>
              <p className="text-text-secondary mb-4">
                Comprehensive template for analyzing sales data including revenue trends, customer segments, 
                regional performance, and product analysis. Perfect for quarterly and annual reports.
              </p>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Download className="w-4 h-4" />
                  <span>2,156 uses</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <TrendingUp className="w-4 h-4" />
                  <span>Trending</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button>Use Template</Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Categories */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Browse Templates</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <LayoutTemplate className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-secondary mb-4">{template.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="default">{template.category}</Badge>
                  <span className="text-xs text-text-muted">{template.uses.toLocaleString()} uses</span>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">Use Template</Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom Template CTA */}
      <Card className="border-accent-coral/20 bg-gradient-to-br from-accent-coral/5 to-transparent">
        <CardContent className="p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Need a Custom Template?</h3>
            <p className="text-text-secondary mb-6">
              Contact our team to create a custom analysis template tailored to your specific business needs and workflows.
            </p>
            <Button>Request Custom Template</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
