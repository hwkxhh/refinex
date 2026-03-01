'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area,
} from 'recharts'
import {
  TrendingUp, BarChart3, PieChart as PieIcon, Download, Filter,
  Sparkles, Target, Activity, Award, Users,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  mockChartData, mockCategoryData, mockRegionData,
  topProductsData, salespersonData, goalVsActualData,
} from '@/lib/mock-data/charts'

// â”€â”€ Theme-aligned chart palette â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CHART_COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#67e8f9', '#f9a8d4', '#93c5fd']

// â”€â”€ Shared tooltip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-foreground text-white px-4 py-3 rounded-xl shadow-lg text-sm">
      <p className="font-semibold mb-1.5">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-xs flex items-center gap-2 mt-1">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: entry.color || entry.fill }}
          />
          <span className="opacity-70">{entry.name}:</span>
          <span className="font-semibold">{entry.value?.toLocaleString()}</span>
        </p>
      ))}
    </div>
  )
}

// â”€â”€ AI Insight block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function InsightBlock({ insights }: { insights: string[] }) {
  return (
    <div className="border-t border-primary/10 bg-gradient-to-br from-primary/[0.05] to-transparent px-6 py-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">AI Insight</p>
          <div className="space-y-1.5">
            {insights.map((text, i) => (
              <p key={i} className="text-sm text-text-secondary leading-relaxed">
                {i > 0 && <span className="text-primary/40 mr-1.5 select-none">â€º</span>}
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// â”€â”€ Chart-type toggle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ChartToggle<T extends string>({
  options, value, onChange,
}: {
  options: { type: T; icon: React.ElementType; label: string }[]
  value: T
  onChange: (t: T) => void
}) {
  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
      {options.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          title={label}
          onClick={() => onChange(type)}
          className={`p-1.5 rounded-md transition-all ${
            value === type
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-muted hover:text-foreground'
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
        </button>
      ))}
    </div>
  )
}

// â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function VisualizePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [categoryType, setCategoryType] = useState<'bar' | 'progress' | 'pie'>('bar')

  const maxRevenue = Math.max(...mockChartData.map(d => d.revenue))
  const minRevenue = Math.min(...mockChartData.map(d => d.revenue))

  return (
    <div className="p-6 lg:p-8 space-y-6">

      {/* â”€â”€ Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Q4 Sales Analysis</h1>
          <p className="text-sm text-text-secondary mt-0.5">Interactive data visualization and insights</p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" /> Filters
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Link href={`/dashboard/project/${id}/insights`}>
            <Button size="sm" className="gap-2">
              <TrendingUp className="w-4 h-4" /> View Insights
            </Button>
          </Link>
        </div>
      </div>

      {/* â”€â”€ KPI Cards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {([
          { label: 'Total Revenue',   value: '$740K', change: '+18%', Icon: TrendingUp, ic: 'text-primary',  bg: 'bg-primary/10' },
          { label: 'Total Orders',    value: '3,653', change: '+12%', Icon: BarChart3,  ic: 'text-info',    bg: 'bg-info/20'    },
          { label: 'Avg Order Value', value: '$203',  change: '+5%',  Icon: Activity,   ic: 'text-warning', bg: 'bg-warning/30' },
          { label: 'Customers',       value: '2,543', change: '+24%', Icon: Users,      ic: 'text-pink-400',bg: 'bg-pink-100'   },
        ] as const).map(({ label, value, change, Icon, ic, bg }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-text-muted">{label}</span>
                <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${ic}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-sm text-success mt-1">{change} vs last year</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Trends — 3 charts side by side */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Card 1 — Line Chart: Revenue Trend */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { month: 'Jan', revenue: 52000 },
                    { month: 'Feb', revenue: 47000 },
                    { month: 'Mar', revenue: 61000 },
                    { month: 'Apr', revenue: 58000 },
                    { month: 'May', revenue: 73000 },
                    { month: 'Jun', revenue: 69000 },
                    { month: 'Jul', revenue: 81000 },
                    { month: 'Aug', revenue: 76000 },
                    { month: 'Sep', revenue: 88000 },
                    { month: 'Oct', revenue: 92000 },
                    { month: 'Nov', revenue: 85000 },
                    { month: 'Dec', revenue: 104000 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
                    <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366f1"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#6366f1', stroke: 'white', strokeWidth: 2 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 — Bar Chart: Orders by Month */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Orders by Month</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { month: 'Jan', orders: 210 },
                    { month: 'Feb', orders: 185 },
                    { month: 'Mar', orders: 240 },
                    { month: 'Apr', orders: 195 },
                    { month: 'May', orders: 310 },
                    { month: 'Jun', orders: 278 },
                    { month: 'Jul', orders: 330 },
                    { month: 'Aug', orders: 295 },
                    { month: 'Sep', orders: 360 },
                    { month: 'Oct', orders: 415 },
                    { month: 'Nov', orders: 380 },
                    { month: 'Dec', orders: 455 },
                  ]} barSize={18}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
                    <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="orders" fill="#818cf8" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Card 3 — Donut Chart: Sales by Category */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Sales by Category</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Electronics', value: 34 },
                        { name: 'Furniture',   value: 22 },
                        { name: 'Supplies',    value: 18 },
                        { name: 'Software',    value: 16 },
                        { name: 'Other',       value: 10 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {['#6366f1', '#818cf8', '#67e8f9', '#f9a8d4', '#a5b4fc'].map((color, i) => (
                        <Cell key={i} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 pt-2">
                {[
                  { label: 'Electronics', color: '#6366f1', pct: '34%' },
                  { label: 'Furniture',   color: '#818cf8', pct: '22%' },
                  { label: 'Supplies',    color: '#67e8f9', pct: '18%' },
                  { label: 'Software',    color: '#f9a8d4', pct: '16%' },
                  { label: 'Other',       color: '#a5b4fc', pct: '10%' },
                ].map(({ label, color, pct }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-xs text-text-secondary">{label}</span>
                    <span className="text-xs font-semibold text-foreground">{pct}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        <Card className="overflow-hidden">
          <InsightBlock insights={[
            "December hit peak revenue at $104K, a 34% spike above the annual average — driven by holiday purchasing and year-end enterprise budget deployment. A targeted December campaign could further amplify this structural tailwind.",
            "Electronics dominates category share at 34%. Cross-selling Software (16%) to existing Electronics buyers represents a high-conversion upsell pathway with minimal acquisition cost.",
            "H2 accounts for 62% of annual order volume. A deliberate H1 acceleration strategy — a Q1 volume push followed by a Q2 upsell campaign — could reduce late-year dependency and smooth full-year cash flow.",
          ]} />
        </Card>
      </div>

      {/* â”€â”€ Middle Row: 3 columns â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Sales by Category */}
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base">Sales by Category</CardTitle>
            <ChartToggle
              value={categoryType}
              onChange={setCategoryType}
              options={[
                { type: 'bar'      as const, icon: BarChart3, label: 'Bar'      },
                { type: 'progress' as const, icon: Activity,  label: 'Progress' },
                { type: 'pie'      as const, icon: PieIcon,   label: 'Pie'      },
              ]}
            />
          </CardHeader>

          <CardContent className="pb-4">
            {categoryType === 'bar' ? (
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockCategoryData} layout="vertical" margin={{ left: 0, right: 20, top: 4, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" horizontal={false} />
                    <XAxis type="number" stroke="#9ca3af" tick={{ fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                    <YAxis type="category" dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} width={74} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[0, 5, 5, 0]}>
                      {mockCategoryData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : categoryType === 'progress' ? (
              <div className="space-y-4 py-2">
                {mockCategoryData.map((cat, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{cat.name}</span>
                      <span className="text-sm text-text-muted">${(cat.value / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${cat.percentage}%`, backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockCategoryData}
                      cx="50%" cy="45%"
                      innerRadius={52} outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {mockCategoryData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconSize={10} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>

          <InsightBlock insights={[
            "Electronics leads at $385K (42%) but grew only 4% year-over-year â€” an early signal of saturation in existing segments. Exploring adjacent sub-categories or bundling with Software could unlock the next growth tier.",
            "Supplies grew 31% â€” the fastest-growing category this quarter â€” yet accounts for just 16% of revenue. A targeted inventory increase and promotional push could unlock an estimated $40â€“60K in annual uplift.",
            "Software carries the highest margin potential per revenue dollar. Bundling it with Electronics at point-of-sale could accelerate its share without any additional acquisition cost.",
          ]} />
        </Card>

        {/* Regional Performance */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Regional Performance</CardTitle>
          </CardHeader>

          <CardContent className="pb-4">
            <div className="space-y-3">
              {mockRegionData.map((region, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/60 hover:bg-muted transition-colors">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                    style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                  >
                    {region.region.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{region.region}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(region.sales / 425000) * 100}%`,
                            backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                          }}
                        />
                      </div>
                      <span className="text-xs text-text-muted w-11 text-right flex-shrink-0">
                        ${(region.sales / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                  <Badge variant={region.growth > 20 ? 'success' : 'info'}>
                    +{region.growth}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>

          <InsightBlock insights={[
            "Asia Pacific is the standout region with +24.7% growth despite being third by volume â€” the fastest-growing market in the portfolio. This likely reflects earlier-stage penetration. Increasing investment here could yield disproportionate returns relative to cost.",
            "North America leads at $425K but growth has cooled to 12.5% â€” the slowest of all regions. This likely signals saturation within existing accounts. A land-and-expand motion into underserved SMB segments may be the highest-leverage next step.",
            "Latin America and Middle East show 15â€“19% growth at only 21% combined revenue â€” structurally underserved relative to their trajectory. A modest headcount increase in those regions could compound significantly over a 12-month horizon.",
          ]} />
        </Card>

        {/* Top Performing Products */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              Top Products
            </CardTitle>
          </CardHeader>

          <CardContent className="pb-4">
            <div className="space-y-3.5">
              {topProductsData.map((product, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-primary">#{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(product.revenue / 142000) * 100}%`,
                            backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                          }}
                        />
                      </div>
                      <span className="text-xs text-text-muted w-10 text-right flex-shrink-0">
                        ${(product.revenue / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-success flex-shrink-0">+{product.growth}%</span>
                </div>
              ))}
            </div>
          </CardContent>

          <InsightBlock insights={[
            "The top 3 products account for 68% of total product revenue â€” a concentration risk if any line faces supply pressure or competitive repricing. Actively developing the bottom two reduces this structural dependency.",
            "Office Suite Pro shows the highest growth velocity at +42% with near-zero fulfilment cost as a software product. Promoting it within the existing Electronics customer base â€” via post-purchase upsell or bundle pricing â€” may be the highest-ROI opportunity this quarter.",
          ]} />
        </Card>
      </div>

      {/* â”€â”€ Bottom Row: 2 columns â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Salesperson Performance */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Salesperson Performance</CardTitle>
          </CardHeader>

          <CardContent className="pb-4">
            <div className="h-[230px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salespersonData} layout="vertical" margin={{ left: 0, right: 20, top: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" horizontal={false} />
                  <XAxis type="number" stroke="#9ca3af" tick={{ fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} width={98} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" iconSize={8} />
                  <Bar dataKey="revenue" name="Actual" fill="#6366f1" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="target"  name="Target" fill="#a5b4fc" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>

          <InsightBlock insights={[
            "Sarah Chen is tracking 26% above target â€” her average deal size ($3,765) is 28% above the team median. Her pipeline sequencing and client mix may offer a replicable playbook. Consider a structured knowledge-share session before next quarter.",
            "Two team members are tracking at 68â€“69% of target. Historical data suggests reps below 75% at this stage rarely close the full gap without intervention. Early coaching, territory rebalancing, or deal support is advisable before quarter-end.",
          ]} />
        </Card>

        {/* Goal vs Actual */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Goal vs Actual
            </CardTitle>
          </CardHeader>

          <CardContent className="pb-4">
            <div className="space-y-5 py-1">
              {goalVsActualData.map((item, i) => {
                const pct = Math.round((item.actual / item.goal) * 100)
                const isOver = pct >= 100
                const isMoney = ['Revenue', 'Avg Order Value'].includes(item.metric)
                const fmt = (v: number) => {
                  if (isMoney && v >= 1000) return `$${(v / 1000).toFixed(0)}K`
                  if (isMoney) return `$${v}`
                  return v.toLocaleString()
                }
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{item.metric}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-text-muted">{fmt(item.actual)} / {fmt(item.goal)}</span>
                        <span className={`text-xs font-bold min-w-[36px] text-right ${isOver ? 'text-success' : 'text-warning'}`}>
                          {pct}%
                        </span>
                      </div>
                    </div>
                    <div className="relative h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(pct, 100)}%`,
                          background: isOver
                            ? 'linear-gradient(90deg, #6366f1 0%, #86efac 100%)'
                            : 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>

          <InsightBlock insights={[
            "Revenue ($740K) and orders (3,653) are both tracking ahead of target by 8â€“14%, putting the team on pace to exceed annual goals if current momentum holds through Q4.",
            "Customer acquisition is 4% behind target despite revenue being ahead â€” signalling higher average deal values ($203 vs $190 target). This is a healthy signal, but over-reliance on fewer, larger accounts introduces concentration risk that warrants monitoring in pipeline reviews.",
          ]} />
        </Card>

      </div>
    </div>
  )
}
