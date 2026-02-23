import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const datasets = [
  {
    id: 1,
    name: 'Raw_Data.xlsx',
    rows: 415,
    columns: 13,
    quality: 90,
    issue: '3 unresolved issues',
  },
  {
    id: 2,
    name: 'Monthly_Sales_Feb.csv',
    rows: 1218,
    columns: 9,
    quality: 96,
    issue: 'All issues resolved',
  },
]

export default function DatasetsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Datasets</h1>
        <p className="text-sm text-text-secondary">Cleaned datasets generated from your analyses</p>
      </div>

      <div className="dashboard-card rounded-2xl p-5">
        <div className="grid gap-3 sm:grid-cols-2 mb-4">
          <input className="h-10 rounded-lg border border-input bg-card px-3 text-sm" placeholder="Search rows or columns..." />
          <select defaultValue="All" className="h-10 rounded-lg border border-input bg-card px-3 text-sm">
            <option>All</option>
            <option>Needs Review</option>
            <option>Ready</option>
          </select>
        </div>

        <div className="space-y-3">
          {datasets.map((dataset) => (
            <div key={dataset.id} className="rounded-xl border border-border bg-card/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-foreground">{dataset.name}</p>
                <Badge variant={dataset.issue.includes('unresolved') ? 'warning' : 'success'}>{dataset.issue.includes('unresolved') ? 'Needs Review' : 'Ready'}</Badge>
              </div>
              <p className="text-sm text-text-secondary mt-2">{dataset.rows} rows · {dataset.columns} columns · Data Quality {dataset.quality}/100</p>
              <p className="text-xs text-text-muted mt-1">{dataset.issue}</p>
              <div className="mt-3 flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 px-3 text-xs">Show cleaned</Button>
                <Button size="sm" variant="outline" className="h-8 px-3 text-xs">Download CSV</Button>
                <Button size="sm" variant="outline" className="h-8 px-3 text-xs">Download XLSX</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
