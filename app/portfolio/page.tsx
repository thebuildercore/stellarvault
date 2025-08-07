"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, TrendingUp, Zap, RefreshCw, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const portfolioData = [
  { date: "Day 1", value: 2500 },
  { date: "Day 2", value: 2510 },
  { date: "Day 3", value: 2525 },
  { date: "Day 4", value: 2515 },
  { date: "Day 5", value: 2540 },
  { date: "Day 6", value: 2555 },
  { date: "Day 7", value: 2570 }
]

const activeVaults = [
  {
    name: "XLM Lending",
    apy: 7.1,
    amount: 1250,
    gains: 12.50,
    period: "7 days",
    status: "active"
  },
  {
    name: "USDC Staking", 
    apy: 5.2,
    amount: 1250,
    gains: 8.75,
    period: "7 days",
    status: "active"
  }
]

export default function PortfolioPage() {
  const [isRebalancing, setIsRebalancing] = useState(false)

  const totalValue = 2570
  const totalGains = 21.25
  const weeklyReturn = ((totalGains / 2500) * 100).toFixed(2)

  const handleRebalance = async () => {
    setIsRebalancing(true)
    setTimeout(() => {
      setIsRebalancing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
        </div>
        {[...Array(15)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-white/20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 8 + 8}px`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6 bg-slate-950">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <Link href="/strategy" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Strategy
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Portfolio Dashboard</h1>
              <p className="text-white/80">Track your yields and performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleRebalance}
                disabled={isRebalancing}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white border-0"
              >
                {isRebalancing ? (
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Rebalancing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Optimize Now</span>
                  </div>
                )}
              </Button>
              <Link href="/withdraw">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-slate-400">
                  Withdraw
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Total Value</span>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                ${totalValue.toLocaleString()}
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +{weeklyReturn}% (7d)
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Total Gains</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                +${totalGains.toFixed(2)}
              </div>
              <div className="text-white/60 text-sm">Last 7 days</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Active Vaults</span>
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {activeVaults.length}
              </div>
              <div className="text-white/60 text-sm">Earning yield</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-sm">Avg APY</span>
                <Zap className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                6.15%
              </div>
              <div className="text-white/60 text-sm">Weighted average</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <Card className="lg:col-span-2 bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={portfolioData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="date" 
                      stroke="rgba(255,255,255,0.6)"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.6)"
                      fontSize={12}
                      domain={['dataMin - 10', 'dataMax + 10']}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Active Vaults */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Active Vaults</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeVaults.map((vault, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">{vault.name}</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs">Active</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">APY</span>
                      <div className="text-green-400 font-semibold">{vault.apy}%</div>
                    </div>
                    <div>
                      <span className="text-white/60">Amount</span>
                      <div className="text-white font-semibold">${vault.amount.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-white/60">Gains</span>
                      <div className="text-green-400 font-semibold">+${vault.gains.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-white/60">Period</span>
                      <div className="text-white/80">{vault.period}</div>
                    </div>
                  </div>
                </div>
              ))}

              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
                <Link href="/import" className="flex items-center space-x-2">
                  <span>Import More Assets</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="max-w-7xl mx-auto mt-8">
          <Card className="backdrop-blur-lg border-white/20 shadow-2xl bg-zinc-950">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Link href="/import">
                  <Button variant="outline" className="w-full h-12 border-white/20 hover:bg-white/10 text-white bg-black">
                    Import More
                  </Button>
                </Link>
                <Link href="/withdraw">
                  <Button variant="outline" className="w-full h-12 border-white/20 hover:bg-white/10 text-white bg-black">
                    Withdraw
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-white/20 hover:bg-white/10 text-white bg-black"
                  onClick={handleRebalance}
                >
                  Rebalance
                </Button>
                <Link href="/settings">
                  <Button variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white/10 bg-black">
                    Settings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
