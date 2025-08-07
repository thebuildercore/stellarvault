"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Settings, Zap, Shield, Star } from 'lucide-react'
import Link from "next/link"

export default function SettingsPage() {
  const [autoOptimize, setAutoOptimize] = useState(true)
  const [slippage, setSlippage] = useState([0.5])
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  const handleDisconnect = () => {
    // Simulate wallet disconnection
    window.location.href = "/"
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

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link href="/portfolio" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/80">Customize your yield optimization preferences</p>
        </div>

        {/* Settings Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Auto-Optimization Settings */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Auto-Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Enable Auto-Optimization</h3>
                  <p className="text-white/60 text-sm">Automatically rebalance funds to highest yielding vaults</p>
                </div>
                <Switch
                  checked={autoOptimize}
                  onCheckedChange={setAutoOptimize}
                />
              </div>

              {autoOptimize && (
                <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <h4 className="text-white font-semibold mb-2">Optimization Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-white/80 text-sm">Rebalance Threshold</span>
                        <span className="text-white text-sm">0.5% APY difference</span>
                      </div>
                      <div className="text-white/60 text-xs">
                        Funds will be moved when a vault offers 0.5% higher APY
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-white/80 text-sm">Rebalance Frequency</span>
                        <span className="text-white text-sm">Weekly</span>
                      </div>
                      <div className="text-white/60 text-xs">
                        Maximum once per week to minimize gas costs
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trading Settings */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Trading Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold">Slippage Tolerance</h3>
                    <p className="text-white/60 text-sm">Maximum price movement for Soroswap trades</p>
                  </div>
                  <span className="text-white font-semibold">{slippage[0]}%</span>
                </div>
                <Slider
                  value={slippage}
                  onValueChange={setSlippage}
                  max={3}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-white/60 mt-2">
                  <span>0.1%</span>
                  <span>3.0%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Price Impact Warnings</h3>
                  <p className="text-white/60 text-sm">Show warnings for high price impact trades</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Portfolio Updates</h3>
                  <p className="text-white/60 text-sm">Get notified about yield changes and rebalancing</p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Security Alerts</h3>
                  <p className="text-white/60 text-sm">Important security and transaction notifications</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Weekly Reports</h3>
                  <p className="text-white/60 text-sm">Summary of your portfolio performance</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Account */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-white/5 rounded-lg border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">Connected Wallet</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-white font-mono text-sm">
                  GDQP...7XYZ (Freighter)
                </div>
                <div className="text-white/60 text-xs mt-1">
                  Balance: 1,000 XLM
                </div>
              </div>

              <Button
                onClick={handleDisconnect}
                className="w-full h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Disconnect Wallet
              </Button>
            </CardContent>
          </Card>

          {/* Learn More */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Learn More</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="#"
                  className="p-4 bg-white/5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors text-center"
                >
                  <div className="text-blue-400 font-semibold mb-1">DeFindex</div>
                  <div className="text-white/60 text-sm">Learn about yield vaults</div>
                </a>
                <a
                  href="#"
                  className="p-4 bg-white/5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors text-center"
                >
                  <div className="text-purple-400 font-semibold mb-1">Soroswap</div>
                  <div className="text-white/60 text-sm">Understand DEX trading</div>
                </a>
                <a
                  href="#"
                  className="p-4 bg-white/5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors text-center"
                >
                  <div className="text-green-400 font-semibold mb-1">Stellar</div>
                  <div className="text-white/60 text-sm">Explore Soroban smart contracts</div>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
