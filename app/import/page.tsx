"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Info, Star } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

const chains = [
  { id: "ethereum", name: "Ethereum", icon: "🔷" },
  { id: "solana", name: "Solana", icon: "🟣" },
  { id: "bnb", name: "BNB Chain", icon: "🟡" }
]

const tokens = {
  ethereum: [{ symbol: "ETH", price: 2500, name: "Ethereum" }],
  solana: [{ symbol: "SOL", price: 150, name: "Solana" }],
  bnb: [{ symbol: "BNB", price: 500, name: "BNB" }]
}

export default function ImportPage() {
  const router = useRouter()
  const [selectedChain, setSelectedChain] = useState("")
  const [selectedToken, setSelectedToken] = useState("")
  const [amount, setAmount] = useState("")
  const [isImporting, setIsImporting] = useState(false)

  const handleImport = async () => {
    if (!selectedChain || !selectedToken || !amount) return
    
    setIsImporting(true)
    // Simulate import process
    setTimeout(() => {
      setIsImporting(false)
      router.push("/strategy")
    }, 3000)
  }

  const selectedTokenData = selectedChain && selectedToken ? 
    tokens[selectedChain as keyof typeof tokens]?.find(t => t.symbol === selectedToken) : null

  const estimatedValue = selectedTokenData && amount ? 
    (parseFloat(amount) * selectedTokenData.price).toLocaleString() : "0"

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

      <div className="relative z-10 p-6 font-sans font-medium text-base rounded-none text-black bg-slate-950">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2 font-sans border-none border-transparent">{"Asset Imports"}</h1>
          <p className="text-white/80">Bridge tokens from other chains to Stellar</p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Import Form */}
          <Card className="backdrop-blur-lg shadow-2xl border-solid border-2 rounded-lg shadow-lg border-gray-500 bg-slate-900">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                Import Token
                <div className="ml-2 group relative">
                  <Info className="w-4 h-4 text-white/60 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Assets are wrapped as Stellar tokens (e.g., wETH)
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Chain Selection */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Source Chain
                </label>
                <Select value={selectedChain} onValueChange={setSelectedChain}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select chain" />
                  </SelectTrigger>
                  <SelectContent>
                    {chains.map((chain) => (
                      <SelectItem key={chain.id} value={chain.id}>
                        <div className="flex items-center space-x-2">
                          <span>{chain.icon}</span>
                          <span>{chain.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Token Selection */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Token
                </label>
                <Select 
                  value={selectedToken} 
                  onValueChange={setSelectedToken}
                  disabled={!selectedChain}
                >
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedChain && tokens[selectedChain as keyof typeof tokens]?.map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center justify-between w-full">
                          <span>{token.symbol}</span>
                          <span className="text-sm text-gray-500">${token.price.toLocaleString()}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Amount
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount (e.g., 1)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              {/* Import Button */}
              <Button
                onClick={handleImport}
                disabled={!selectedChain || !selectedToken || !amount || isImporting}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isImporting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Importing to Stellar...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Import to Stellar</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card className="backdrop-blur-lg shadow-2xl border-2 border-slate-200 bg-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Import Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedChain && selectedToken && amount ? (
                <>
                  <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/80">From:</span>
                      <span className="text-white font-semibold">
                        {amount} {selectedToken}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/80">To:</span>
                      <span className="text-white font-semibold">
                        {amount} Stellar-w{selectedToken}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Value:</span>
                      <span className="text-white font-semibold">
                        ${estimatedValue}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Bridge Fee:</span>
                      <span className="text-white">0.1%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Gas Fee:</span>
                      <span className="text-white">0.00001 XLM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Estimated Time:</span>
                      <span className="text-white">~30 seconds</span>
                    </div>
                  </div>

                  <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                    <p className="text-yellow-200 text-sm">
                      ⚠️ This is a demo. Real bridging would require actual cross-chain infrastructure.
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white/60">
                    Select a chain, token, and amount to see the import preview
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
