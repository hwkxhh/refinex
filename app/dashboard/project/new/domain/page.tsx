'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TrendingUp, Users, DollarSign, Package, BarChart3, Briefcase, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert } from '@/components/ui/alert'

const domains = [
  { id: 'sales', name: 'Sales & Revenue', icon: TrendingUp, confidence: 87 },
  { id: 'customer', name: 'Customer Analytics', icon: Users, confidence: 72 },
  { id: 'financial', name: 'Financial Data', icon: DollarSign, confidence: 45 },
  { id: 'operations', name: 'Operations', icon: Package, confidence: 31 },
  { id: 'marketing', name: 'Marketing', icon: BarChart3, confidence: 28 },
  { id: 'hr', name: 'Human Resources', icon: Briefcase, confidence: 15 }
]

export default function DomainDetectionPage() {
  const router = useRouter()
  const [selectedDomain, setSelectedDomain] = useState('sales')
  const topDomain = domains[0]

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Domain Detection</h1>
          <p className="text-text-secondary">AI has analyzed your data to determine its domain</p>
        </div>
        <Button onClick={() => router.push('/dashboard/project/new/analytics')}>
          Next: Select Analytics
        </Button>
      </div>

      {/* AI Detection Result */}
      <Alert variant="success">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Domain Detected with {topDomain.confidence}% confidence</strong>
            <p className="mt-1">Based on your column names and data patterns, this appears to be <strong>{topDomain.name}</strong> data.</p>
          </div>
        </div>
      </Alert>

      {/* Detected Domain Card */}
      <Card className="border-primary shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-xl bg-primary flex items-center justify-center">
              <topDomain.icon className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">{topDomain.name}</h2>
              <p className="text-text-secondary mb-4">
                This domain includes metrics like revenue, sales volume, customer segments, and regional performance.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-sm text-text-muted">Confidence Score</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${topDomain.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{topDomain.confidence}%</span>
                  </div>
                </div>
                <Badge variant="success">Recommended</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Domains */}
      <Card>
        <CardHeader>
          <CardTitle>Or choose a different domain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domains.slice(1).map((domain) => (
              <div
                key={domain.id}
                onClick={() => setSelectedDomain(domain.id)}
                className={`p-6 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedDomain === domain.id
                    ? 'border-primary shadow-md'
                    : 'border-border hover:border-accent-coral/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedDomain === domain.id ? 'bg-primary' : 'bg-primary/10'
                  }`}>
                    <domain.icon className={`w-5 h-5 ${
                      selectedDomain === domain.id ? 'text-primary-foreground' : 'text-primary'
                    }`} />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{domain.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-text-muted"
                      style={{ width: `${domain.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-muted">{domain.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Indicators Detected */}
      <Card>
        <CardHeader>
          <CardTitle>Key Indicators Detected</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <span className="text-success">✓</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Revenue Metrics</h4>
                <p className="text-sm text-text-secondary">Found columns: Sales, Revenue, Quantity</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <span className="text-success">✓</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Customer Segments</h4>
                <p className="text-sm text-text-secondary">Found column: Customer_Segment</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <span className="text-success">✓</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Regional Data</h4>
                <p className="text-sm text-text-secondary">Found column: Region</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <span className="text-success">✓</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Time Series</h4>
                <p className="text-sm text-text-secondary">Found column: Date</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <Button onClick={() => router.push('/dashboard/project/new/analytics')}>
          Confirm & Continue
        </Button>
      </div>
    </div>
  )
}
