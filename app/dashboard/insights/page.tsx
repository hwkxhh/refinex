import { Badge } from '@/components/ui/badge'

const insights = [
  {
    id: 1,
    category: 'ANOMALY',
    text: '152 riders in the summary sheet are not in the payment sheet.',
    source: 'Raw_Data.xlsx · Rider Payments',
    severity: 'High',
  },
  {
    id: 2,
    category: 'EFFICIENCY',
    text: '83% of riders required minimum guarantee payment this period.',
    source: 'Raw_Data.xlsx · Rider Payments',
    severity: 'Medium',
  },
  {
    id: 3,
    category: 'PERFORMANCE',
    text: 'Manikonda store has the highest average orders per rider (18.83).',
    source: 'Raw_Data.xlsx · Rider Payments',
    severity: 'Informational',
  },
]

export default function InsightsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Insights</h1>
        <p className="text-sm text-text-secondary">AI-generated observations across all your datasets</p>
      </div>

      <div className="dashboard-card rounded-2xl p-5 space-y-3">
        <div className="grid gap-3 md:grid-cols-3">
          <select defaultValue="All" className="h-10 rounded-lg border border-input bg-card px-3 text-sm">
            <option>All</option>
            <option>Anomalies</option>
            <option>Trends</option>
            <option>Performance</option>
            <option>Data Quality</option>
            <option>Opportunities</option>
          </select>
          <input className="h-10 rounded-lg border border-input bg-card px-3 text-sm" placeholder="Date range" />
          <input className="h-10 rounded-lg border border-input bg-card px-3 text-sm" placeholder="Workspace" />
        </div>

        {insights.map((insight) => (
          <div key={insight.id} className="rounded-xl border border-border bg-card/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <Badge variant="info">{insight.category}</Badge>
              <Badge variant={insight.severity === 'High' ? 'error' : insight.severity === 'Medium' ? 'warning' : 'default'}>{insight.severity}</Badge>
            </div>
            <p className="text-sm text-foreground">{insight.text}</p>
            <p className="text-xs text-text-muted mt-2">{insight.source}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
