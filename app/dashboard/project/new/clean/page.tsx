'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Wand2, RefreshCw, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert } from '@/components/ui/alert'
import { mockColumnProfiles, mockCSVData } from '@/lib/mock-data/csv-data'

export default function DataCleanPage() {
  const router = useRouter()
  const [autoClean, setAutoClean] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showBefore, setShowBefore] = useState(true)
  const [cleaningLog, setCleaningLog] = useState<string[]>([])

  const handleAutoClean = () => {
    setIsProcessing(true)
    setCleaningLog([])
    
    setTimeout(() => {
      const logs = [
        '✓ Removed 23 duplicate rows',
        '✓ Filled 127 missing values using mean/mode',
        '✓ Standardized date formats across Date column',
        '✓ Trimmed whitespace from text columns',
        '✓ Converted numeric strings to proper number format'
      ]
      setCleaningLog(logs)
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Data Cleaning</h1>
          <p className="text-text-secondary">Clean and prepare your data for analysis</p>
        </div>
        <Button onClick={() => router.push('/dashboard/project/new/domain')}>
          Next: Domain Detection
        </Button>
      </div>

      {/* Auto-Clean Toggle */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wand2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Auto-Clean Data</h3>
                <p className="text-sm text-text-secondary">Let AI automatically fix common data quality issues</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoClean}
                  onChange={(e) => setAutoClean(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
              {autoClean && (
                <Button onClick={handleAutoClean} isLoading={isProcessing}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Run Auto-Clean
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cleaning Log */}
      {cleaningLog.length > 0 && (
        <Alert variant="success">
          <strong>Cleaning complete!</strong>
          <div className="mt-2 space-y-1">
            {cleaningLog.map((log, i) => (
              <div key={i} className="text-sm">{log}</div>
            ))}
          </div>
        </Alert>
      )}

      {/* Before/After Toggle */}
      <div className="flex justify-center gap-2">
        <Button
          variant={showBefore ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setShowBefore(true)}
        >
          <EyeOff className="w-4 h-4 mr-2" />
          Before
        </Button>
        <Button
          variant={!showBefore ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setShowBefore(false)}
        >
          <Eye className="w-4 h-4 mr-2" />
          After
        </Button>
      </div>

      {/* Data Preview */}
      <Card>
        <CardHeader>
          <CardTitle>{showBefore ? 'Original Data' : 'Cleaned Data'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    {mockCSVData.headers.map((header, index) => (
                      <th key={index} className="px-4 py-3 text-left font-semibold text-foreground border-b border-border">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockCSVData.rows.slice(0, 5).map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-muted/50">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`px-4 py-3 border-b border-border ${
                            !showBefore && cleaningLog.length > 0 && (rowIndex === 1 || cellIndex === 3)
                              ? 'bg-success/10 text-success font-medium'
                              : 'text-text-secondary'
                          }`}
                        >
                          {cell || (showBefore ? <span className="text-error">NULL</span> : cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Column Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Column-Level Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockColumnProfiles.filter(c => c.missingPercent > 0).map((column, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <div>
                    <h4 className="font-medium text-foreground">{column.name}</h4>
                    <p className="text-sm text-text-secondary">{column.missingPercent}% missing values</p>
                  </div>
                </div>
                <select className="h-9 px-3 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Fill with mean</option>
                  <option>Fill with median</option>
                  <option>Fill with mode</option>
                  <option>Fill with zero</option>
                  <option>Drop rows</option>
                </select>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <Button onClick={() => router.push('/dashboard/project/new/domain')}>
          Continue to Domain Detection
        </Button>
      </div>
    </div>
  )
}
