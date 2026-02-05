'use client'

import Link from 'next/link'
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, Download, Share2, FileText, Edit } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockInsights } from '@/lib/mock-data/charts'

export default function InsightsPage({ params }: { params: { id: string } }) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return <TrendingUp className="w-5 h-5" />
      case 'negative': return <AlertTriangle className="w-5 h-5" />
      case 'trend': return <Sparkles className="w-5 h-5" />
      default: return <Lightbulb className="w-5 h-5" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'success'
      case 'negative': return 'warning'
      case 'trend': return 'info'
      default: return 'default'
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AI-Generated Insights</h1>
          <p className="text-text-secondary">Automated analysis and recommendations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Link href={`/dashboard/project/${params.id}/visualize`}>
            <Button size="sm" variant="outline">
              Back to Charts
            </Button>
          </Link>
        </div>
      </div>

      {/* Executive Summary */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground mb-4">
              Analysis of Q4 sales data reveals strong overall performance with a total revenue of $740K, 
              representing an 18% year-over-year growth. December emerged as the strongest month with $78K 
              in revenue, while March showed the lowest performance at $48K.
            </p>
            <p className="text-foreground">
              The Electronics category continues to dominate with 42% market share, and the Asia Pacific 
              region demonstrates the highest growth rate at 24.7%, presenting significant expansion opportunities.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Summary
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Generated Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Key Findings</h2>
        {mockInsights.map((insight) => (
          <Card
            key={insight.id}
            className={`border-${getInsightColor(insight.type)}/20 hover:shadow-md transition-shadow`}
          >
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-lg bg-${getInsightColor(insight.type)}/10 flex items-center justify-center flex-shrink-0 text-${getInsightColor(insight.type)}`}>
                  {getInsightIcon(insight.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-lg">{insight.title}</h3>
                    <Badge variant={getInsightColor(insight.type) as any}>
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-text-secondary mb-4">{insight.description}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-warning" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: 'Expand in Asia Pacific',
                description: 'With 24.7% growth, consider increasing marketing budget and inventory in this region.',
                priority: 'High'
              },
              {
                title: 'Investigate March Performance',
                description: 'Analyze factors contributing to lowest revenue month to prevent future dips.',
                priority: 'Medium'
              },
              {
                title: 'Leverage December Success',
                description: 'Identify and replicate successful strategies from the peak performance month.',
                priority: 'High'
              },
              {
                title: 'Diversify Product Mix',
                description: 'Electronics dominates but diversification could reduce risk and capture new markets.',
                priority: 'Low'
              }
            ].map((rec, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-foreground">{rec.title}</h4>
                    <Badge variant={rec.priority === 'High' ? 'error' : rec.priority === 'Medium' ? 'warning' : 'info'}>
                      {rec.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-sm text-text-secondary">{rec.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistical Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Statistical Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-text-muted mb-3">Revenue Statistics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Mean:</span>
                  <span className="font-semibold text-foreground">$61,667</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Median:</span>
                  <span className="font-semibold text-foreground">$64,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Std Dev:</span>
                  <span className="font-semibold text-foreground">$9,823</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-muted mb-3">Growth Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">YoY Growth:</span>
                  <span className="font-semibold text-success">+18.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">MoM Avg:</span>
                  <span className="font-semibold text-success">+5.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Peak Month:</span>
                  <span className="font-semibold text-foreground">December</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-muted mb-3">Data Quality</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Completeness:</span>
                  <span className="font-semibold text-success">98.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Accuracy:</span>
                  <span className="font-semibold text-success">99.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Records:</span>
                  <span className="font-semibold text-foreground">12,543</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
