'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, File, X, CheckCircle, AlertCircle, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { mockCSVData } from '@/lib/mock-data/csv-data'
import { formatBytes } from '@/lib/utils'

export default function UploadPage() {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.name.endsWith('.csv')) {
      handleFile(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    setUploadedFile(file)
    setIsUploading(true)
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      setUploadComplete(true)
      setTimeout(() => setShowPreview(true), 300)
    }, 2000)
  }

  const handleRemove = () => {
    setUploadedFile(null)
    setUploadComplete(false)
    setShowPreview(false)
  }

  const handleProceed = () => {
    router.push('/dashboard/project/new/profile')
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Upload CSV File</h1>
        <p className="text-text-secondary">Upload your data file to start analyzing</p>
      </div>

      {/* Upload Area */}
      {!uploadedFile ? (
        <Card>
          <CardContent className="p-12">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                isDragging
                  ? 'border-primary bg-primary/5 scale-105'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors ${
                  isDragging ? 'bg-primary' : 'bg-primary/10'
                }`}>
                  <Upload className={`w-10 h-10 ${isDragging ? 'text-primary-foreground' : 'text-primary'}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {isDragging ? 'Drop your file here' : 'Drag and drop your CSV file'}
                  </h3>
                  <p className="text-text-secondary mb-4">or click to browse from your computer</p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button as="span" className="cursor-pointer">
                      Select File
                    </Button>
                  </label>
                </div>
                <div className="flex items-center gap-6 text-sm text-text-muted mt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Max file size: 100MB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Supported: CSV files</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* File Info Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                    uploadComplete ? 'bg-success/10' : 'bg-primary/10'
                  }`}>
                    {uploadComplete ? (
                      <CheckCircle className="w-7 h-7 text-success" />
                    ) : (
                      <FileText className="w-7 h-7 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{uploadedFile.name}</h3>
                    <p className="text-sm text-text-secondary">{formatBytes(uploadedFile.size)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {isUploading && (
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary animate-pulse" style={{ width: '70%' }} />
                      </div>
                      <span className="text-sm text-text-muted">Uploading...</span>
                    </div>
                  )}
                  {uploadComplete && (
                    <Badge variant="success">Upload Complete</Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleRemove}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          {showPreview && (
            <>
              <Alert variant="success">
                <strong>File uploaded successfully!</strong> Review your data below before proceeding.
              </Alert>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Data Preview</CardTitle>
                    <p className="text-sm text-text-secondary mt-1">First 10 rows of your dataset</p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-text-muted">Rows:</span>{' '}
                      <span className="font-semibold text-foreground">{mockCSVData.stats.totalRows.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">Columns:</span>{' '}
                      <span className="font-semibold text-foreground">{mockCSVData.stats.totalColumns}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted sticky top-0">
                          <tr>
                            {mockCSVData.headers.map((header, index) => (
                              <th
                                key={index}
                                className="px-4 py-3 text-left font-semibold text-foreground border-b border-border"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {mockCSVData.rows.map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              className="hover:bg-muted/50 transition-colors"
                            >
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={cellIndex}
                                  className="px-4 py-3 border-b border-border text-text-secondary"
                                >
                                  {cell}
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

              {/* Data Info Panel */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">Total Rows</h4>
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{mockCSVData.stats.totalRows.toLocaleString()}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">Total Columns</h4>
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{mockCSVData.stats.totalColumns}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">Missing Values</h4>
                      <AlertCircle className="w-5 h-5 text-warning" />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{mockCSVData.stats.missingValues}</p>
                    <p className="text-sm text-text-muted mt-1">
                      {((mockCSVData.stats.missingValues / (mockCSVData.stats.totalRows * mockCSVData.stats.totalColumns)) * 100).toFixed(2)}%
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={handleRemove}>
                  Cancel
                </Button>
                <Button onClick={handleProceed} size="lg">
                  Proceed to Analysis
                </Button>
              </div>
            </>
          )}
        </>
      )}

      {/* Help Text */}
      {!uploadedFile && (
        <Card className="border-info/20 bg-info/5">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">ℹ️</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Tips for best results</h3>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• Ensure your CSV has column headers in the first row</li>
                  <li>• Remove any special characters or formatting from your data</li>
                  <li>• Keep file sizes under 100MB for optimal performance</li>
                  <li>• Use standard date formats (YYYY-MM-DD) for date columns</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
