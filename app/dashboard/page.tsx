'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TrendingUp, MoreVertical, Download } from 'lucide-react'

export default function DashboardPage() {
  const transactionsToday = [
    { id: 1, name: 'Tom Skilled', type: 'Payment receive', amount: '+€200', avatar: '👨' },
    { id: 2, name: 'Chris Jericho', type: 'Payment sent', amount: '+€450', avatar: '👨‍💼' },
    { id: 3, name: 'John Cena', type: 'Payment sent', amount: '+€320', avatar: '👨‍🦱' }
  ]

  const transactionsYesterday = [
    { id: 4, name: 'Chris Evans', type: 'Payment sent', amount: '+€250', avatar: '👨‍🎤' }
  ]

  const historyData = [
    { month: 'APR', income: 65, expense: 45 },
    { month: 'MAR', income: 85, expense: 35 },
    { month: 'FEB', income: 75, expense: 40 },
    { month: 'JAN', income: 90, expense: 30 },
    { month: 'AUG', income: 80, expense: 35 }
  ]

  return (
    <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Top Row - Card and Exchange */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Credit Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-gradient rounded-3xl p-6 text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <p className="text-sm opacity-80 mb-1">Balance</p>
              <h2 className="text-3xl font-bold mb-6">$3,250</h2>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-0.5">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    </div>
                  ))}
                </div>
                <span className="text-sm font-semibold ml-2">6352</span>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs opacity-70 mb-1">Card holders</p>
                  <p className="text-sm font-semibold">Jonas</p>
                </div>
                <div>
                  <p className="text-xs opacity-70 mb-1">Exp. date</p>
                  <p className="text-sm font-semibold">02/26</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <div className="text-xl">💳</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Exchange Rates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="dashboard-card rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-foreground">Exchange rates</h3>
              <div className="flex items-center gap-2 text-sm">
                <button className="px-3 py-1 rounded-lg bg-muted/50 text-text-secondary font-semibold">USD</button>
                <span className="text-text-muted">/</span>
                <button className="px-3 py-1 rounded-lg text-text-secondary font-semibold">IDR</button>
              </div>
            </div>
            
            <div className="relative h-24 mb-4">
              <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                <motion.path
                  d="M 0,40 Q 25,20 50,35 T 100,30 T 150,45 T 200,25"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5B4FE7" />
                    <stop offset="100%" stopColor="#9785FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex justify-between text-xs text-text-muted">
              <span>USD</span>
              <span>EUR</span>
              <span>GBP</span>
              <span>JPY</span>
              <span>IDR</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row - History and Efficiency */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* History Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="dashboard-card rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-foreground">History</h3>
              <button className="text-text-muted hover:text-foreground">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-48 mb-4">
              <div className="flex items-end justify-between h-full gap-4 pb-6">
                {historyData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end items-center gap-3">
                    <div className="w-full flex flex-col gap-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${data.income}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                        className="w-full rounded-t-lg"
                        style={{ 
                          background: 'linear-gradient(180deg, #5B4FE7 0%, #7367F0 100%)',
                          minHeight: '20px'
                        }}
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${data.expense}%` }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                        className="w-full rounded-t-lg bg-muted/50"
                        style={{ minHeight: '15px' }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-text-muted">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-text-secondary font-medium">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted/50"></div>
                <span className="text-text-secondary font-medium">Expense</span>
              </div>
            </div>
          </motion.div>

          {/* Efficiency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="dashboard-card rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-foreground">Efficiency</h3>
              <button className="text-text-muted hover:text-foreground">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="transform -rotate-90 w-full h-full">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#f0f1f8"
                    strokeWidth="12"
                    fill="none"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#circleGradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 0.86 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    style={{
                      strokeDasharray: 440,
                      strokeDashoffset: 0
                    }}
                  />
                  <defs>
                    <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5B4FE7" />
                      <stop offset="100%" stopColor="#9785FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-foreground">$1,700</span>
                  <span className="text-xs text-white bg-primary px-2 py-1 rounded-full mt-1">86.3%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-text-secondary font-medium">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted/50"></div>
                <span className="text-text-secondary font-medium">Expense</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Annual Report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="dashboard-card rounded-3xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
              <div className="text-2xl">📊</div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-foreground mb-1">Annual Report</h4>
              <p className="text-sm text-text-secondary">Annually weekly report</p>
            </div>
            <button className="px-6 py-3 rounded-xl card-gradient text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Profile and Transactions */}
      <div className="space-y-6">
        {/* User Profile */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="dashboard-card rounded-3xl p-6 text-center"
        >
          <div className="flex justify-end gap-2 mb-4">
            <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Image src="/icons8/icons8-settings-50.png" alt="Settings" width={20} height={20} className="opacity-60" />
            </button>
            <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <span className="text-text-muted">✕</span>
            </button>
          </div>

          <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden dashboard-card">
            <div className="w-full h-full flex items-center justify-center text-4xl">
              👨‍💼
            </div>
          </div>

          <h3 className="font-bold text-foreground text-lg mb-1">Jonas Kanwald</h3>
          <p className="text-sm text-text-secondary mb-6">jonas@email.com</p>

          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: '↑', label: 'Top Up', color: '#5B4FE7' },
              { icon: '💳', label: 'Pay', color: '#7367F0' },
              { icon: '→', label: 'Send', color: '#9785FF' },
              { icon: '📥', label: 'Request', color: '#B8AAFF' }
            ].map((action, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted/30 transition-all group"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: action.color }}
                >
                  {action.icon}
                </div>
                <span className="text-xs font-semibold text-text-secondary">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="dashboard-card rounded-3xl p-6"
        >
          <h3 className="font-bold text-foreground mb-6">Recent Transaction</h3>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase mb-3">TODAY</p>
              <div className="space-y-3">
                {transactionsToday.map((tx) => (
                  <div key={tx.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg">
                      {tx.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{tx.name}</p>
                      <p className="text-xs text-text-muted">{tx.type}</p>
                    </div>
                    <span className="font-bold text-foreground">{tx.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-text-muted uppercase mb-3">YESTERDAY</p>
              <div className="space-y-3">
                {transactionsYesterday.map((tx) => (
                  <div key={tx.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg">
                      {tx.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{tx.name}</p>
                      <p className="text-xs text-text-muted">{tx.type}</p>
                    </div>
                    <span className="font-bold text-foreground">{tx.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
