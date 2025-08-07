"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Zap, TrendingUp, Star, Info } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

const vaults = [
  {
    id: "vault-a",
    name: "USDC Staking",
    apy: 5.2,
    tvl: "5.2M",
    risk: "Low",
    description: "Stable yield through USDC lending"
  },
  {
    id: "vault-b", 
    name: "XLM Lending",
    apy: 7.1,
    tvl: "3.8M",
    risk: "Medium",
    description: "Higher yields with XLM liquidity provision"
  },
  {
    id: "vault-c",
    name: "Multi-Asset",
    apy: 6.5,
    tvl: "2.1M", 
    risk: "Medium",
    description: "Diversified portfolio strategy"
  }
]

export default function StrategyPage() {
  const router = useRouter()
  const [selectedVault, setSelectedVault] = useState("")
  const [amount, setAmount] = useState("")
  const [autoOptimize, setAutoOptimize] = useState(false)
  const [isDepositing, setIsDepositing] = useState(false)

  const handleDeposit = async () => {
    setIsDepositing(true)
    // Simulate deposit process
    setTimeout(() => {
      setIsDepositing(false)
      router.push("/portfolio")
    }, 2500)
  }

  const bestVault = vaults.reduce((prev, current) => 
    prev.apy > current.apy ? prev : current
  )

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
        <div className="max-w-6xl mx-auto mb-8">
          <Link href="/import" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Import
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">{"Optimization Strategy"}</h1>
          <p className="text-white/80">Optimize your yields with DeFindex vaults</p>
        </div>

        {/* Strategy Cards */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Manual Strategy */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Manual Selection
              </CardTitle>
              <p className="text-white/70">Choose your preferred vault manually</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Vault Options */}
              <div className="space-y-3">
                {vaults.map((vault) => (
                  <div
                    key={vault.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedVault === vault.id
                        ? "bg-blue-500/20 border-blue-500/50"
                        : "bg-white/5 border-white/20 hover:bg-white/10"
                    }`}
                    onClick={() => setSelectedVault(vault.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          checked={selectedVault === vault.id}
                          onChange={() => setSelectedVault(vault.id)}
                          className="text-blue-500"
                        />
                        <div>
                          <h3 className="text-white font-semibold">{vault.name}</h3>
                          <p className="text-white/60 text-sm">{vault.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold text-lg">{vault.apy}% APY</div>
                        <div className="text-white/60 text-sm">TVL: ${vault.tvl}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        vault.risk === "Low" ? "bg-green-500/20 text-green-400" :
                        vault.risk === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>
                        {vault.risk} Risk
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Deposit Amount (Stellar-wETH)
                </label>
                <Input
                  type="number"
                  placeholder="0.5"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
                <p className="text-white/60 text-xs mt-1">Available: 1.0 Stellar-wETH</p>
              </div>

              {/* Deposit Button */}
              <Button
                onClick={handleDeposit}
                disabled={!selectedVault || !amount || isDepositing || autoOptimize}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isDepositing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Depositing...</span>
                  </div>
                ) : (
                  "Deposit to Vault"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Auto-Optimizer */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Auto-Optimizer
              </CardTitle>
              <p className="text-white/70">Let AI find the highest yields for you</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Auto-Optimize Toggle */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/20">
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={autoOptimize}
                    onCheckedChange={setAutoOptimize}
                  />
                  <div>
                    <h3 className="text-white font-semibold">Enable Auto-Optimization</h3>
                    <p className="text-white/60 text-sm">Automatically rebalance for best APY</p>
                  </div>
                </div>
              </div>

              {/* Current Best Vault */}
              <div className="p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-semibold">Currently Recommended</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">{bestVault.name}</h3>
                    <p className="text-white/70 text-sm">{bestVault.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold text-xl">{bestVault.apy}% APY</div>
                    <div className="text-white/60 text-sm">Best yield available</div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="text-white font-bold text-lg">$10.2M</div>
                  <div className="text-white/60 text-sm">Total TVL</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="text-white font-bold text-lg">6.3%</div>
                  <div className="text-white/60 text-sm">Avg APY</div>
                </div>
              </div>

              {/* Info */}
              <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <div className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-blue-200 text-sm">
                    <p className="font-semibold mb-1">How it works:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Monitors all vault APYs in real-time</li>
                      <li>• Automatically moves funds to highest yield</li>
                      <li>• Rebalances weekly or when 0.5% APY difference</li>
                      <li>• Gas fees covered by yield optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Start Optimizing Button */}
              <Button
                onClick={handleDeposit}
                disabled={!autoOptimize || isDepositing}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isDepositing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Starting Optimization...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Start Auto-Optimizing</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
