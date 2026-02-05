'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3, ChevronRight, ChevronLeft, Upload, Database, Code, TrendingUp, Users, DollarSign, Package, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const domains = [
  { id: 'sales', name: 'Sales & Revenue', icon: TrendingUp, description: 'Track sales performance and revenue trends' },
  { id: 'customer', name: 'Customer Analytics', icon: Users, description: 'Understand customer behavior and retention' },
  { id: 'financial', name: 'Financial Data', icon: DollarSign, description: 'Analyze financial metrics and reports' },
  { id: 'operations', name: 'Operations', icon: Package, description: 'Monitor operational efficiency' },
  { id: 'marketing', name: 'Marketing', icon: BarChart3, description: 'Measure campaign performance' },
  { id: 'hr', name: 'Human Resources', icon: Briefcase, description: 'Track HR metrics and analytics' }
]

const experienceLevels = [
  { id: 'beginner', name: 'Beginner', description: 'New to data analysis' },
  { id: 'intermediate', name: 'Intermediate', description: 'Some experience with data' },
  { id: 'advanced', name: 'Advanced', description: 'Experienced data analyst' }
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedDomain, setSelectedDomain] = useState('')
  const [selectedExperience, setSelectedExperience] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    setIsLoading(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  }

  const canProceed = () => {
    if (step === 1) return selectedDomain !== ''
    if (step === 2) return selectedExperience !== ''
    return true
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Refine Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              Step {step} of 3
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex gap-2 py-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  s <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          {/* Step 1: Data Domain */}
          {step === 1 && (
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                What type of data will you analyze?
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                This helps us provide relevant templates and analytics tailored to your needs
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
                {domains.map((domain) => (
                  <Card
                    key={domain.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedDomain === domain.id
                        ? 'border-primary shadow-lg scale-105'
                        : 'border-border hover:border-accent-coral/50'
                    }`}
                    onClick={() => setSelectedDomain(domain.id)}
                  >
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg ${
                        selectedDomain === domain.id ? 'bg-primary' : 'bg-primary/10'
                      } flex items-center justify-center mb-4`}>
                        <domain.icon className={`w-6 h-6 ${
                          selectedDomain === domain.id ? 'text-primary-foreground' : 'text-primary'
                        }`} />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{domain.name}</h3>
                      <p className="text-sm text-text-secondary">{domain.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Experience Level */}
          {step === 2 && (
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                What&apos;s your experience level?
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                We&apos;ll customize the interface to match your expertise
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
                {experienceLevels.map((level) => (
                  <Card
                    key={level.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedExperience === level.id
                        ? 'border-primary shadow-lg scale-105'
                        : 'border-border hover:border-accent-coral/50'
                    }`}
                    onClick={() => setSelectedExperience(level.id)}
                  >
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 rounded-full ${
                        selectedExperience === level.id ? 'bg-primary' : 'bg-primary/10'
                      } flex items-center justify-center mx-auto mb-4`}>
                        <Database className={`w-8 h-8 ${
                          selectedExperience === level.id ? 'text-primary-foreground' : 'text-primary'
                        }`} />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{level.name}</h3>
                      <p className="text-text-secondary">{level.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Upload or Sample */}
          {step === 3 && (
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Ready to start analyzing?
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
                Upload your CSV file or try a sample dataset
              </p>
              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <Card 
                  className="border-border hover:border-accent-coral/50 cursor-pointer transition-all duration-200 hover:shadow-lg"
                  onClick={() => router.push('/dashboard/upload')}
                >
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Upload className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">Upload CSV</h3>
                    <p className="text-text-secondary mb-6">
                      Start with your own data file
                    </p>
                    <Button className="w-full">
                      Choose File
                    </Button>
                  </CardContent>
                </Card>

                <Card 
                  className="border-border hover:border-accent-coral/50 cursor-pointer transition-all duration-200 hover:shadow-lg"
                  onClick={() => {
                    setIsLoading(true)
                    setTimeout(() => router.push('/dashboard'), 1000)
                  }}
                >
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 rounded-xl bg-accent-coral/10 flex items-center justify-center mx-auto mb-6">
                      <Code className="w-10 h-10 text-accent-coral" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">Use Sample Data</h3>
                    <p className="text-text-secondary mb-6">
                      Explore with our demo dataset
                    </p>
                    <Button variant="outline" className="w-full" isLoading={isLoading}>
                      Try Sample
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12">
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {step < 3 && (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                size="lg"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
