"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Star, Zap, TrendingUp, Shield } from 'lucide-react'
import Link from "next/link"

export default function LandingPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  const connectWallet = async () => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      setWalletConnected(true)
      setIsConnecting(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
        </div>
        {/* Floating stars */}
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            className={`absolute text-white/20 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 8 + 8}px`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 bg-slate-900">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">{"Stellar Sync"}</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#" className="text-white/80 hover:text-white transition-colors">Home</Link>
            <Link href="#" className="text-white/80 hover:text-white transition-colors">Docs</Link>
            <Link href="#" className="text-white/80 hover:text-white transition-colors">About</Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardContent className="p-12 text-center bg-slate-950">
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                Maximize Your Yield on{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Stellar
                </span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Bridge assets, earn high APYs, and exit easily—all in one click.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">High Yields</h3>
                <p className="text-white/60 text-sm">Earn up to 7% APY with DeFindex vaults</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Auto-Optimize</h3>
                <p className="text-white/60 text-sm">Smart contracts find the best yields</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Secure</h3>
                <p className="text-white/60 text-sm">Built on Stellar's Soroban platform</p>
              </div>
            </div>

            {/* Wallet Connection */}
            {!walletConnected ? (
              <div className="space-y-4">
                <Button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {isConnecting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Connecting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Wallet className="w-5 h-5" />
                      <span>Connect Wallet</span>
                    </div>
                  )}
                </Button>
                <p className="text-white/60 text-sm">
                  Supports Freighter, Albedo, and more
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                  <p className="text-green-400 font-semibold">✓ Wallet Connected</p>
                  <p className="text-white/80 text-sm">Balance: 1,000 XLM</p>
                </div>
                <Link href="/import">
                  <Button className="w-full h-14 text-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Start Earning →
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/60 text-sm mb-4">
            Powered by Stellar, Soroswap, and DeFindex
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="#" className="text-white/60 hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="text-white/60 hover:text-white transition-colors">Discord</Link>
            <Link href="#" className="text-white/60 hover:text-white transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
