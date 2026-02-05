'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, BarChart3, PieChart as PieIcon, Settings, Download, Share2, Filter, ChevronDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockChartData, mockCategoryData, mockRegionData } from '@/lib/mock-data/charts'

const CHART_COLORS = ['#1F4A52', '#CBACBC', '#6FAEC9', '#3FA796', '#F2C078', '#8CA2A8']

export default function VisualizePage({ params }: { params: { id: string } }) {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  // Find highest and lowest values
  const maxRevenue = Math.max(...mockChartData.map(d => d.revenue))
  const minRevenue = Math.min(...mockChartData.map(d => d.revenue))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-foreground text-white px-4 py-3 rounded-lg shadow-lg">
          <p className="font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm">
              {entry.name}: <span className="font-semibold">${entry.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Q4 Sales Analysis</h1>
          <p className="text-text-secondary">Interactive data visualization and insights</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link href={`/dashboard/project/${params.id}/insights`}>
            <Button size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Insights
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-muted">Total Revenue</span>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <p className="text-3xl font-bold text-foreground">$740K</p>
            <p className="text-sm text-success mt-1">+18% vs last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-muted">Total Orders</span>
              <BarChart3 className="w-4 h-4 text-info" />
            </div>
            <p className="text-3xl font-bold text-foreground">3,653</p>
            <p className="text-sm text-success mt-1">+12% vs last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-muted">Avg Order Value</span>
              <PieIcon className="w-4 h-4 text-warning" />
            </div>
            <p className="text-3xl font-bold text-foreground">$203</p>
            <p className="text-sm text-success mt-1">+5% vs last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-muted">Customers</span>
              <TrendingUp className="w-4 h-4 text-accent-coral" />
            </div>
            <p className="text-3xl font-bold text-foreground">2,543</p>
            <p className="text-sm text-success mt-1">+24% vs last year</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Revenue Trends</CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setChartType('line')}
                className={`p-2 rounded-lg transition-colors ${
                  chartType === 'line'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-muted hover:bg-muted'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`p-2 rounded-lg transition-colors ${
                  chartType === 'bar'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-muted hover:bg-muted'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setChartType('pie')}
                className={`p-2 rounded-lg transition-colors ${
                  chartType === 'pie'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-muted hover:bg-muted'
                }`}
              >
                <PieIcon className="w-4 h-4" />
              </button>
            </div>
            <select className="h-9 px-3 rounded-lg border border-input bg-card text-sm">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 3 months</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D9E3E6" />
                  <XAxis dataKey="month" stroke="#8CA2A8" />
                  <YAxis stroke="#8CA2A8" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#1F4A52"
                    strokeWidth={3}
                    dot={(props: any) => {
                      const { cx, cy, payload } = props
                      const isHighest = payload.revenue === maxRevenue
                      const isLowest = payload.revenue === minRevenue
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isHighest || isLowest ? 6 : 4}
                          fill={isHighest ? '#3FA796' : isLowest ? '#F8A392' : '#1F4A52'}
                          stroke="white"
                          strokeWidth={2}
                        />
                      )
                    }}
                  />
                  <Line type="monotone" dataKey="orders" stroke="#CBACBC" strokeWidth={2} />
                </LineChart>
              ) : chartType === 'bar' ? (
                <BarChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D9E3E6" />
                  <XAxis dataKey="month" stroke="#8CA2A8" />
                  <YAxis stroke="#8CA2A8" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#1F4A52" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="orders" fill="#CBACBC" radius={[8, 8, 0, 0]} />
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={mockCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.percent}%`}
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
          
          {/* Legend Indicators */}
          <div className="flex items-center justify-center gap-8 mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-success"></div>
              <span className="text-sm text-text-secondary">Highest: Dec ($78K)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-accent-coral"></div>
              <span className="text-sm text-text-secondary">Lowest: Mar ($48K)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCategoryData.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                    <span className="text-sm text-text-muted">${(category.value / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${category.percentage}%`,
                        backgroundColor: CHART_COLORS[index % CHART_COLORS.length]
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRegionData.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{region.region.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{region.region}</p>
                      <p className="text-sm text-text-secondary">${(region.sales / 1000).toFixed(0)}K sales</p>
                    </div>
                  </div>
                  <Badge variant={region.growth > 15 ? 'success' : 'info'}>
                    +{region.growth}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
