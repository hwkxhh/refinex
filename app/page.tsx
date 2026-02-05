'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Play } from 'lucide-react'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeSlice, setActiveSlice] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    setMounted(true)
    const sliceInterval = setInterval(() => {
      setActiveSlice((prev) => (prev + 1) % 4)
    }, 2000)
    
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4)
    }, 5000)
    
    return () => {
      clearInterval(sliceInterval)
      clearInterval(slideInterval)
    }
  }, [])

  // Pie chart data
  const pieData = [
    { label: 'Sales', value: 35, color: '#5B4FE7', icon: 'icons8-bar-chart-50.png' },
    { label: 'Marketing', value: 25, color: '#7367F0', icon: 'icons8-increase-50.png' },
    { label: 'Operations', value: 20, color: '#9785FF', icon: 'icons8-workflow-50.png' },
    { label: 'Support', value: 20, color: '#B8AAFF', icon: 'icons8-online-support-50.png' }
  ]

  // Hospital data
  const hospitalData = [
    { label: 'Doctors', value: 145, icon: 'icons8-manager-50.png', color: '#5B4FE7', change: '+12%' },
    { label: 'Patients', value: 2847, icon: 'icons8-people-50.png', color: '#7367F0', change: '+8%' },
    { label: 'Surgeries', value: 89, icon: 'icons8-approval-50.png', color: '#9785FF', change: '+15%' },
    { label: 'Staff', value: 423, icon: 'icons8-organization-50.png', color: '#B8AAFF', change: '+5%' }
  ]

  // Monthly trend data
  const monthlyData = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 62 },
    { month: 'Mar', value: 58 },
    { month: 'Apr', value: 78 },
    { month: 'May', value: 72 },
    { month: 'Jun', value: 88 },
    { month: 'Jul', value: 95 },
    { month: 'Aug', value: 85 }
  ]

  // Calculate pie chart paths
  const createPieSlice = (startAngle: number, endAngle: number, radius: number = 100) => {
    const start = polarToCartesian(120, 120, radius, endAngle)
    const end = polarToCartesian(120, 120, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
    return `M 120 120 L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`
  }

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    }
  }

  let currentAngle = 0
  const slices = pieData.map((data, index) => {
    const slice = {
      ...data,
      startAngle: currentAngle,
      endAngle: currentAngle + (data.value / 100) * 360
    }
    currentAngle = slice.endAngle
    return slice
  })

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 glass-effect"
      >
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-12 h-12 rounded-2xl dashboard-card flex items-center justify-center"
              >
                <Image 
                  src="/icons8/icons8-bar-chart-50.png" 
                  alt="Logo"
                  width={28}
                  height={28}
                />
              </motion.div>
              <span className="text-xl font-bold text-foreground">Refine</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-10">
              {[
                { label: 'Features', href: '#features' },
                { label: 'How it works', href: '#how-it-works' },
                { label: 'Pricing', href: '#pricing' }
              ].map((item) => (
                <Link 
                  key={item.label}
                  href={item.href} 
                  className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 h-11 rounded-xl font-semibold text-text-secondary hover:text-foreground transition-colors"
                >
                  Sign in
                </motion.button>
              </Link>
              <Link href="/auth/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 h-11 rounded-xl card-gradient text-white font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  Start free
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px] relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full dashboard-card">
                  <Image 
                    src="/icons8/icons8-chatbot-50.png"
                    alt="AI"
                    width={20}
                    height={20}
                  />
                  <span className="text-sm font-bold text-primary">
                    AI-Powered Analytics
                  </span>
                </div>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-foreground">
                Transform data
                <br />
                into <span className="text-primary">insights</span>
                <br />
                instantly
              </h1>

              <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
                Upload CSV files and watch AI analyze, clean, and visualize your data. 
                No coding needed. Get actionable insights in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard/upload">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 h-14 rounded-2xl card-gradient text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    Start analyzing
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </Link>
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 h-14 rounded-2xl dashboard-card font-bold text-lg flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Watch demo
                  </motion.button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                {[
                  'Free 14-day trial',
                  'No credit card',
                  'Cancel anytime'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Slider with Multiple Charts */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative dashboard-card dashboard-card-hover rounded-3xl overflow-hidden min-h-[600px]">
                <AnimatePresence mode="wait">
                  {/* Slide 1: Revenue Pie Chart */}
                  {currentSlide === 0 && (
                    <motion.div
                      key="slide1"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 p-8 space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-1">
                            Revenue Overview
                          </p>
                          <p className="text-4xl font-bold text-foreground">$847,234</p>
                        </div>
                        <motion.div 
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="px-4 py-2.5 rounded-xl bg-success/10"
                        >
                          <div className="flex items-center gap-1.5">
                            <Image 
                              src="/icons8/icons8-increase-50.png"
                              alt="Increase"
                              width={18}
                              height={18}
                            />
                            <span className="text-lg font-bold text-success">+24.5%</span>
                          </div>
                        </motion.div>
                      </div>

                      <div className="relative flex items-center justify-center py-4">
                        <svg width="320" height="320" viewBox="0 0 240 240" className="transform -rotate-90">
                          {slices.map((slice, index) => (
                            <motion.path
                              key={index}
                              d={createPieSlice(slice.startAngle, slice.endAngle)}
                              fill={slice.color}
                              animate={{ 
                                scale: activeSlice === index ? 1.08 : 1,
                              }}
                              transition={{ duration: 0.3 }}
                              style={{ 
                                transformOrigin: '120px 120px',
                                filter: activeSlice === index ? 'drop-shadow(0 4px 12px rgba(91, 79, 231, 0.4))' : 'none'
                              }}
                            />
                          ))}
                          <circle cx="120" cy="120" r="50" fill="white" />
                        </svg>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-sm font-semibold text-text-muted mb-1">Total</p>
                            <p className="text-3xl font-bold text-foreground">100%</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {pieData.map((item, index) => (
                          <div
                            key={index}
                            onMouseEnter={() => setActiveSlice(index)}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                              activeSlice === index ? 'dashboard-card' : 'bg-muted/30'
                            }`}
                          >
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${item.color}20` }}
                            >
                              <Image 
                                src={`/icons8/${item.icon}`}
                                alt={item.label}
                                width={20}
                                height={20}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-text-muted">{item.label}</p>
                              <p className="text-lg font-bold text-foreground">{item.value}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Slide 2: Hospital Stats */}
                  {currentSlide === 1 && (
                    <motion.div
                      key="slide2"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 p-8 space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-1">
                            Hospital Dashboard
                          </p>
                          <p className="text-4xl font-bold text-foreground">3,504</p>
                          <p className="text-sm text-text-secondary">Total Capacity</p>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <Image 
                            src="/icons8/icons8-business-50.png"
                            alt="Hospital"
                            width={32}
                            height={32}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {hospitalData.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-5 rounded-2xl dashboard-card"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div 
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: `${item.color}15` }}
                              >
                                <Image 
                                  src={`/icons8/${item.icon}`}
                                  alt={item.label}
                                  width={24}
                                  height={24}
                                />
                              </div>
                            </div>
                            <p className="text-xs font-semibold text-text-muted uppercase mb-1">{item.label}</p>
                            <p className="text-3xl font-bold text-foreground mb-2">{item.value}</p>
                            <div className="flex items-center gap-1">
                              <Image 
                                src="/icons8/icons8-positive-dynamic-50.png"
                                alt="Trend"
                                width={14}
                                height={14}
                              />
                              <span className="text-sm font-bold text-success">{item.change}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Slide 3: Monthly Trend Bar Chart */}
                  {currentSlide === 2 && (
                    <motion.div
                      key="slide3"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 p-8 space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-1">
                            Monthly Growth
                          </p>
                          <p className="text-4xl font-bold text-foreground">+127%</p>
                        </div>
                        <div className="px-4 py-2.5 rounded-xl primary-gradient">
                          <span className="text-white font-bold text-sm">YTD</span>
                        </div>
                      </div>

                      <div className="relative rounded-2xl bg-muted/20 p-6 flex-1">
                        <div className="flex items-end justify-between h-full gap-3 pb-8">
                          {monthlyData.map((data, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${data.value}%` }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="w-full rounded-t-xl relative group cursor-pointer"
                                style={{ 
                                  background: `linear-gradient(180deg, ${i % 2 === 0 ? '#5B4FE7' : '#7367F0'} 0%, ${i % 2 === 0 ? '#7367F0' : '#9785FF'} 100%)`,
                                  boxShadow: '0 4px 12px rgba(91, 79, 231, 0.3)'
                                }}
                              >
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  whileHover={{ opacity: 1, y: -8 }}
                                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap shadow-lg"
                                >
                                  {data.value}%
                                </motion.div>
                              </motion.div>
                              <span className="text-xs font-bold text-text-muted absolute -bottom-6">{data.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Slide 4: Activity Stats */}
                  {currentSlide === 3 && (
                    <motion.div
                      key="slide4"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 p-8 space-y-6"
                    >
                      <div>
                        <p className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-1">
                          Weekly Activity
                        </p>
                        <p className="text-4xl font-bold text-foreground">47,523</p>
                        <p className="text-sm text-text-secondary">Total Actions</p>
                      </div>

                      <div className="space-y-4">
                        {[
                          { label: 'Data Uploads', value: 89, icon: 'icons8-documents-50.png', color: '#5B4FE7' },
                          { label: 'AI Analysis', value: 72, icon: 'icons8-chatbot-50.png', color: '#7367F0' },
                          { label: 'Reports Generated', value: 95, icon: 'icons8-statistics-50.png', color: '#9785FF' },
                          { label: 'Team Collaboration', value: 64, icon: 'icons8-collaboration-50.png', color: '#B8AAFF' }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                                  style={{ backgroundColor: `${item.color}15` }}
                                >
                                  <Image 
                                    src={`/icons8/${item.icon}`}
                                    alt={item.label}
                                    width={20}
                                    height={20}
                                  />
                                </div>
                                <span className="text-sm font-semibold text-foreground">{item.label}</span>
                              </div>
                              <span className="text-sm font-bold text-foreground">{item.value}%</span>
                            </div>
                            <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.value}%` }}
                                transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Slider Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {[0, 1, 2, 3].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        currentSlide === index ? 'w-8 bg-primary' : 'w-2 bg-text-muted/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -left-6 top-20 hidden xl:block"
              >
                <motion.div 
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="dashboard-card rounded-2xl p-5 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Image 
                        src="/icons8/icons8-people-50.png"
                        alt="Users"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase">Users</p>
                      <p className="text-2xl font-bold text-foreground">12.5K</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="absolute -right-6 bottom-20 hidden xl:block"
              >
                <motion.div 
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="dashboard-card rounded-2xl p-5 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                      <Image 
                        src="/icons8/icons8-positive-dynamic-50.png"
                        alt="Growth"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase">Growth</p>
                      <p className="text-2xl font-bold text-success">+94%</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-28 relative">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Simple process, <span className="text-primary">powerful results</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              From raw CSV to actionable insights in three easy steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: 'icons8-documents-50.png',
                title: 'Upload CSV',
                description: 'Drag & drop or browse. Support for files up to 1GB on Pro plans.',
              },
              {
                step: '02',
                icon: 'icons8-process-50.png',
                title: 'AI Analysis',
                description: 'Machine learning cleans data, detects patterns, and finds insights automatically.',
              },
              {
                step: '03',
                icon: 'icons8-statistics-50.png',
                title: 'View Results',
                description: 'Interactive dashboards, charts, and recommendations ready to share.',
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative h-full dashboard-card dashboard-card-hover rounded-3xl p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl primary-gradient flex items-center justify-center">
                      <Image 
                        src={`/icons8/${item.icon}`}
                        alt={item.title}
                        width={32}
                        height={32}
                        className="brightness-0 invert"
                      />
                    </div>
                    <span className="text-6xl font-bold text-foreground/5">{item.step}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28 relative">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Built for modern <span className="text-primary">data teams</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Everything you need to analyze, visualize, and share insights
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: 'icons8-chatbot-50.png',
                title: 'AI Analysis',
                description: 'Automatically detect trends, outliers, and patterns with ML algorithms',
                color: '#5B4FE7'
              },
              {
                icon: 'icons8-area-chart-50.png',
                title: 'Visual Dashboards',
                description: 'Create interactive charts that make complex data easy to understand',
                color: '#7367F0'
              },
              {
                icon: 'icons8-inspection-50.png',
                title: 'Data Cleaning',
                description: 'One-click fixes for missing values, duplicates, and formatting issues',
                color: '#9785FF'
              },
              {
                icon: 'icons8-increase-50.png',
                title: 'Predictions',
                description: 'Forecast future trends with confidence scores and statistical modeling',
                color: '#5B4FE7'
              },
              {
                icon: 'icons8-delivery-time-50.png',
                title: 'Lightning Fast',
                description: 'Process millions of rows in seconds with optimized cloud infrastructure',
                color: '#7367F0'
              },
              {
                icon: 'icons8-guarantee-50.png',
                title: 'Secure',
                description: 'Enterprise-grade security with encryption, SSO, and compliance',
                color: '#9785FF'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full dashboard-card dashboard-card-hover rounded-3xl p-6"
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <Image 
                      src={`/icons8/${feature.icon}`}
                      alt={feature.title}
                      width={28}
                      height={28}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="dashboard-card rounded-3xl p-12 lg:p-16 text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              Join thousands of data teams using Refine to make better decisions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 h-14 rounded-2xl card-gradient text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Start free trial
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 h-14 rounded-2xl dashboard-card font-bold text-lg flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  View demo
                </motion.button>
              </Link>
            </div>
            <p className="text-sm text-text-muted mt-6">
              No credit card required • Cancel anytime • 14-day free trial
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border">
        <div className="mx-auto px-6 lg:px-12 max-w-[1400px]">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl dashboard-card flex items-center justify-center">
                  <Image 
                    src="/icons8/icons8-bar-chart-50.png"
                    alt="Logo"
                    width={24}
                    height={24}
                  />
                </div>
                <span className="text-lg font-bold text-foreground">Refine</span>
              </Link>
              <p className="text-sm text-text-secondary leading-relaxed">
                Turn messy CSV data into actionable insights with AI-powered analytics.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm text-text-secondary">
                <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-text-secondary">
                <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2.5 text-sm text-text-secondary">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-muted">
              © 2026 Refine. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-text-muted hover:text-primary transition-colors text-sm">Twitter</Link>
              <Link href="#" className="text-text-muted hover:text-primary transition-colors text-sm">LinkedIn</Link>
              <Link href="#" className="text-text-muted hover:text-primary transition-colors text-sm">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
