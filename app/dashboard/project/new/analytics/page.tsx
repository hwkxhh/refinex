'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Users, MapPin, Package, DollarSign, Calendar, Check, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AnalyticType {
  id: string
  name: string
  description: string
  icon: any
  color: string
  estimatedTime: string
  recommended?: boolean
}

const analyticsTypes: AnalyticType[] = [
  {
    id: 'revenue',
    name: 'Revenue Trends',
    description: 'Track revenue patterns over time with forecasting and seasonal analysis',
    icon: TrendingUp,
    color: 'from-blue-100 to-blue-200',
    estimatedTime: '2 min',
    recommended: true
  },
  {
    id: 'customer',
    name: 'Customer Segmentation',
    description: 'Group customers by behavior, value, and demographics for targeted insights',
    icon: Users,
    color: 'from-purple-100 to-purple-200',
    estimatedTime: '3 min',
    recommended: true
  },
  {
    id: 'regional',
    name: 'Regional Performance',
    description: 'Compare metrics across locations to identify top-performing regions',
    icon: MapPin,
    color: 'from-green-100 to-green-200',
    estimatedTime: '2 min'
  },
  {
    id: 'product',
    name: 'Product Analysis',
    description: 'Analyze product performance, bestsellers, and inventory insights',
    icon: Package,
    color: 'from-orange-100 to-orange-200',
    estimatedTime: '2 min'
  },
  {
    id: 'pricing',
    name: 'Pricing Optimization',
    description: 'Discover optimal price points and elasticity patterns in your data',
    icon: DollarSign,
    color: 'from-pink-100 to-pink-200',
    estimatedTime: '4 min'
  },
  {
    id: 'seasonal',
    name: 'Seasonal Patterns',
    description: 'Identify recurring patterns and prepare for seasonal fluctuations',
    icon: Calendar,
    color: 'from-indigo-100 to-indigo-200',
    estimatedTime: '3 min'
  }
]

export default function AnalyticsSelectionPage() {
  const router = useRouter()
  const [selectedAnalytics, setSelectedAnalytics] = useState<string[]>(['revenue', 'customer'])
  const [groupBy, setGroupBy] = useState<{ [key: string]: string }>({
    revenue: 'month',
    customer: 'value',
    regional: 'country',
    product: 'category'
  })

  const toggleAnalytic = (id: string) => {
    setSelectedAnalytics(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const totalEstimatedTime = analyticsTypes
    .filter(a => selectedAnalytics.includes(a.id))
    .reduce((sum, a) => sum + parseInt(a.estimatedTime), 0)

  const handleContinue = () => {
    router.push('/dashboard/project/1/visualize')
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
          <span>Step 3 of 4</span>
          <span>•</span>
          <span className="text-primary font-medium">Select Analytics</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Choose Your Analytics
        </h1>
        <p className="text-text-secondary text-lg max-w-3xl">
          Select the types of analysis you'd like to run on your data. You can always change this later.
        </p>
      </motion.div>

      {/* Selected Summary */}
      {selectedAnalytics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 dashboard-card rounded-2xl p-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">
                  {selectedAnalytics.length} {selectedAnalytics.length === 1 ? 'analytic' : 'analytics'} selected
                </span>
              </div>
              <div className="text-sm text-text-secondary">
                Est. time: ~{totalEstimatedTime} min
              </div>
            </div>
            <Button onClick={handleContinue} className="gap-2">
              Continue to Visualization
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Analytics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {analyticsTypes.map((analytic, index) => {
          const isSelected = selectedAnalytics.includes(analytic.id)
          const Icon = analytic.icon

          return (
            <motion.div
              key={analytic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleAnalytic(analytic.id)}
                className={`w-full text-left dashboard-card rounded-2xl p-6 transition-all duration-200 relative overflow-hidden group ${
                  isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-lg'
                }`}
              >
                {/* Recommended Badge */}
                {analytic.recommended && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                      Recommended
                    </span>
                  </div>
                )}

                {/* Selection Indicator */}
                <div className={`absolute top-4 left-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected ? 'bg-primary border-primary' : 'border-border group-hover:border-primary'
                }`}>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${analytic.color} flex items-center justify-center mb-4 mt-8`}>
                  <Icon className="w-7 h-7 text-gray-700" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {analytic.name}
                </h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {analytic.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">~{analytic.estimatedTime}</span>
                  {isSelected && (
                    <div className="flex items-center gap-2">
                      <label className="text-text-secondary">Group by:</label>
                      <select
                        value={groupBy[analytic.id] || ''}
                        onChange={(e) => {
                          e.stopPropagation()
                          setGroupBy({ ...groupBy, [analytic.id]: e.target.value })
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="px-2 py-1 rounded-lg border border-border bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {analytic.id === 'revenue' && (
                          <>
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                            <option value="quarter">Quarter</option>
                            <option value="year">Year</option>
                          </>
                        )}
                        {analytic.id === 'customer' && (
                          <>
                            <option value="value">Value</option>
                            <option value="frequency">Frequency</option>
                            <option value="recency">Recency</option>
                            <option value="segment">Segment</option>
                          </>
                        )}
                        {analytic.id === 'regional' && (
                          <>
                            <option value="country">Country</option>
                            <option value="state">State</option>
                            <option value="city">City</option>
                            <option value="zip">ZIP Code</option>
                          </>
                        )}
                        {analytic.id === 'product' && (
                          <>
                            <option value="category">Category</option>
                            <option value="brand">Brand</option>
                            <option value="sku">SKU</option>
                            <option value="price">Price Range</option>
                          </>
                        )}
                        {analytic.id === 'pricing' && (
                          <>
                            <option value="elasticity">Elasticity</option>
                            <option value="segment">Segment</option>
                            <option value="competitor">Competitor</option>
                          </>
                        )}
                        {analytic.id === 'seasonal' && (
                          <>
                            <option value="month">Month</option>
                            <option value="quarter">Quarter</option>
                            <option value="season">Season</option>
                            <option value="holiday">Holiday</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}
                </div>
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* Help Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="dashboard-card rounded-2xl p-5 flex items-start gap-4"
      >
        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-text-secondary">
          <span className="font-semibold text-foreground">Tip:</span> We recommend starting with 2-3 analytics to get quick insights. 
          You can always run additional analytics later from the dashboard.
        </div>
      </motion.div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <Button variant="ghost" onClick={() => router.back()}>
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={selectedAnalytics.length === 0}
          className="gap-2"
          size="lg"
        >
          Generate Analytics ({selectedAnalytics.length})
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
