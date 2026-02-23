'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  FileUp,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const recentAnalyses = [
  {
    id: 1,
    fileName: 'Raw_Data.xlsx',
    workspace: 'Rider Payments',
    analyzedAt: 'Analyzed 2 hours ago',
    status: 'Issues Found',
    stats: '415 rows · 13 columns · 8 issues found · 3 auto-fixed',
    score: 90,
  },
  {
    id: 2,
    fileName: 'Monthly_Sales_Feb.csv',
    workspace: 'Retail Forecasting',
    analyzedAt: 'Analyzed yesterday',
    status: 'Complete',
    stats: '1,218 rows · 9 columns · 2 issues found · 2 auto-fixed',
    score: 96,
  },
  {
    id: 3,
    fileName: 'Admissions_Q1.xlsx',
    workspace: 'Enrollment Strategy',
    analyzedAt: 'Analyzed 3 days ago',
    status: 'Awaiting Review',
    stats: '782 rows · 16 columns · 6 issues found · 4 auto-fixed',
    score: 84,
  },
]

const latestInsights = [
  {
    id: 1,
    category: 'PERFORMANCE',
    text: 'Rider productivity at Manikonda store is 42% above the network average this week. Consider redistributing order load from underperforming stores.',
    source: 'From: Raw_Data.xlsx · Rider Payments',
    time: 'Generated 2 hours ago',
  },
  {
    id: 2,
    category: 'WARNING',
    text: '152 riders in the summary sheet are not present in the payment sheet. Review this discrepancy before using this file for payroll decisions.',
    source: 'From: Raw_Data.xlsx · Rider Payments',
    time: 'Generated 2 hours ago',
  },
  {
    id: 3,
    category: 'OPPORTUNITY',
    text: 'Category B products account for 67% of revenue but only 31% of shelf space. Consider reallocation.',
    source: 'From: Monthly_Sales_Feb.csv · Retail Forecasting',
    time: 'Generated yesterday',
  },
]

const chartItems = [
  { id: 1, title: 'Orders by Store — This Period', source: 'Raw_Data.xlsx', type: 'Bar' },
  { id: 2, title: 'Rider Earnings Distribution', source: 'Raw_Data.xlsx', type: 'Histogram' },
  { id: 3, title: 'MG Dependency by Store', source: 'Raw_Data.xlsx', type: 'Stacked Bar' },
  { id: 4, title: 'Order Count vs Total Earning', source: 'Raw_Data.xlsx', type: 'Scatter' },
]

const recommendations = [
  {
    id: 1,
    tag: 'THIS MONTH',
    title: 'Order volume typically peaks in the 3rd week of this month',
    body: 'Based on historical patterns in your dataset, delivery demand usually increases 18–22% between days 15–21. Consider increasing rider availability during this window.',
    source: 'Pattern detected across 3 months of data',
  },
  {
    id: 2,
    tag: 'DATA HEALTH',
    title: 'Your last 3 uploads have had name casing inconsistencies',
    body: 'Rider names in your payment files are consistently entered in mixed case. This affects deduplication and may be causing some riders to appear multiple times.',
    source: 'Detected in recent analyses',
  },
  {
    id: 3,
    tag: 'OPPORTUNITY',
    title: 'You have 6 months of data — you can now run a seasonal trend analysis',
    body: 'With 6 uploads in the same format, RefineX can detect seasonal patterns in your order volume. This analysis takes about 90 seconds.',
    source: 'Historical coverage threshold reached',
  },
]

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-gradient rounded-2xl p-5 text-white"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Good morning, John. Your workspace is ready.</p>
            <p className="text-sm text-white/90">Upload your first file to start. RefineX will clean it, analyze it, and tell you what it found.</p>
          </div>
          <Link href="/dashboard/upload">
            <Button variant="secondary" size="sm" className="h-10 px-4 text-primary">
              Upload a File <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <h1 className="text-2xl font-bold text-foreground">Good morning, John.</h1>
        <p className="text-sm text-text-secondary mt-1">Tuesday, 22 February 2026</p>
        <p className="text-sm text-text-muted mt-2">You have 3 unreviewed issues and 2 new insights since your last visit.</p>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Analyses Run', value: '23', sub: 'This month', icon: Activity },
          { label: 'Files Cleaned', value: '41', sub: 'Across 4 workspaces', icon: FileUp },
          { label: 'Issues Resolved', value: '127', sub: '38 flagged · 89 auto-fixed', icon: AlertTriangle },
          { label: 'Avg. Data Quality', value: '90/100', sub: '↑ 6 pts from last month', icon: TrendingUp },
        ].map((item) => (
          <div key={item.label} className="dashboard-card rounded-2xl p-5 dashboard-card-hover">
            <div className="flex items-start justify-between">
              <p className="text-sm text-text-secondary font-medium">{item.label}</p>
              <item.icon className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground mt-2">{item.value}</p>
            <p className="text-xs text-text-muted mt-1">{item.sub}</p>
          </div>
        ))}
      </motion.section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="dashboard-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Analyses</h2>
              <Link href="/dashboard/projects" className="text-sm text-primary font-medium hover:underline">View all →</Link>
            </div>
            <div className="space-y-3">
              {recentAnalyses.map((analysis) => (
                <div key={analysis.id} className="rounded-xl border border-border bg-card/60 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-foreground">{analysis.fileName}</p>
                      <p className="text-xs text-text-muted">{analysis.workspace} · {analysis.analyzedAt}</p>
                    </div>
                    <Badge variant={analysis.status === 'Complete' ? 'success' : analysis.status === 'Issues Found' ? 'warning' : 'info'}>{analysis.status}</Badge>
                  </div>
                  <p className="text-sm text-text-secondary mt-2">{analysis.stats}</p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs text-text-muted">Data Quality Score: <span className="font-semibold text-foreground">{analysis.score}/100</span></p>
                    <div className="flex items-center gap-3 text-xs font-medium text-primary">
                      <Link href="/dashboard/project/1/insights" className="hover:underline">View Report</Link>
                      <button className="hover:underline">Re-run</button>
                      <button className="hover:underline">Share</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="dashboard-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Latest Insights</h2>
              <Link href="/dashboard/insights" className="text-sm text-primary font-medium hover:underline">View all insights →</Link>
            </div>
            <div className="space-y-3">
              {latestInsights.map((insight) => (
                <div key={insight.id} className="rounded-xl border border-border bg-card/60 p-4">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <Badge variant="info">{insight.category}</Badge>
                    <p className="text-xs text-text-muted">{insight.time}</p>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{insight.text}</p>
                  <p className="text-xs text-text-muted mt-2">{insight.source}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs font-medium text-primary">
                    <button className="hover:underline">Mark as read</button>
                    <button className="hover:underline">Save</button>
                    <button className="hover:underline">Share</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        <div className="space-y-6">
          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="dashboard-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Your Charts</h2>
              <Link href="/dashboard/visualizations" className="text-sm text-primary font-medium hover:underline">Open Visualization Studio →</Link>
            </div>
            <div className="space-y-3">
              {chartItems.map((chart) => (
                <div key={chart.id} className="rounded-xl border border-border bg-card/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground text-sm">{chart.title}</p>
                      <p className="text-xs text-text-muted">{chart.source}</p>
                    </div>
                    <Badge variant="default">{chart.type}</Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs font-medium text-primary">
                    <button className="hover:underline">Expand</button>
                    <button className="hover:underline">Download</button>
                    <button className="hover:underline">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="dashboard-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">RefineX Recommends</h2>
            </div>
            <p className="text-xs text-text-muted mb-4">Based on your data patterns and goals</p>
            <div className="space-y-3">
              {recommendations.map((item, index) => (
                <div key={item.id} className="rounded-xl border border-border bg-card/60 p-4">
                  <Badge variant="info" className="mb-2">{item.tag}</Badge>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-text-secondary mt-2 leading-relaxed">{item.body}</p>
                  <p className="text-[11px] text-text-muted mt-2">{item.source}</p>
                  <div className="mt-3">
                    {index === 0 && <Button size="sm" variant="outline" className="h-8 px-3 text-xs">Show me the data</Button>}
                    {index === 1 && <Button size="sm" variant="outline" className="h-8 px-3 text-xs">Fix in my files</Button>}
                    {index === 2 && <Button size="sm" className="h-8 px-3 text-xs">Run Trend Analysis →</Button>}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="dashboard-card rounded-2xl p-5 border-dashed border border-primary/30"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="font-semibold text-foreground">+ Analyze a new file</p>
            <p className="text-sm text-text-secondary">Drop a file here or click to browse · Accepts CSV, XLSX, XLS</p>
          </div>
          <Link href="/dashboard/upload">
            <Button size="sm" className="h-10 px-4">
              <FileUp className="w-4 h-4 mr-2" />
              Analyze a File →
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
