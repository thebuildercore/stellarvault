"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, RefreshCw, Star, Info } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

const vaults = [
  { id: "vault-b", name: "XLM Lending", balance: 1262.50, apy: 7.1 },
  { id: "vault-a", name: "USDC Staking", balance: 1258.75, apy: 5.2 }
]

const swapTokens = [
  { symbol: "XLM", name: "Stellar Lumens", price: 0.12 },
  { symbol: "USDC", name: "USD Coin", price: 1.00 },
  { symbol: "wETH", name: "Wrapped Ethereum", price: 2500 }
]

export default function WithdrawPage() {
  const router = useRouter()
  const [selectedVault, setSelectedVault] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawType, setWithdrawType] = useState("stellar") // stellar or original
  const [swapFrom, setSwapFrom] = useState("")
  const [swapTo, setSwapTo] = useState("")
  const [swapAmount, setSwapAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleWithdraw = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      router.push("/portfolio")
    }, 3000)
  }

  const handleSwap = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      router.push("/portfolio")
    }, 2500)
  }

  const selectedVaultData = vaults.find(v => v.id === selectedVault)
  const fromToken = swapTokens.find(t => t.symbol === swapFrom)
  const toToken = swapTokens.find(t => t.symbol === swapTo)
  
  const swapRate = fromToken && toToken ? (fromToken.price / toToken.price).toFixed(4) : "0"
  const swapOutput = swapAmount && fromToken && toToken ? 
    (parseFloat(swapAmount) * fromToken.price / toToken.price * 0.995).toFixed(4) : "0" // 0.5% slippage

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
        <div className="max-w-6xl mx-auto mb-8">
          <Link href="/portfolio" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Withdraw & Swap</h1>
          <p className="text-white/80">Exit your positions or swap to other assets</p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Withdraw Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                Withdraw from Vaults
                <div className="ml-2 group relative">
                  <Info className="w-4 h-4 text-white/60 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Withdrawals to original chain are simulated for demo
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Vault Selection */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Select Vault
                </label>
                <Select value={selectedVault} onValueChange={setSelectedVault}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Choose vault to withdraw from" />
                  </SelectTrigger>
                  <SelectContent>
                    {vaults.map((vault) => (
                      <SelectItem key={vault.id} value={vault.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{vault.name}</span>
                          <span className="text-sm text-gray-500">${vault.balance.toFixed(2)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedVaultData && (
                  <p className="text-white/60 text-xs mt-1">
                    Available: ${selectedVaultData.balance.toFixed(2)} ({selectedVaultData.apy}% APY)
                  </p>
                )}
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Withdraw Amount ($)
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
                {selectedVaultData && (
                  <div className="flex justify-between mt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setWithdrawAmount((selectedVaultData.balance * 0.25).toFixed(2))}
                      className="text-white/60 hover:text-white text-xs p-1 h-auto"
                    >
                      25%
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setWithdrawAmount((selectedVaultData.balance * 0.5).toFixed(2))}
                      className="text-white/60 hover:text-white text-xs p-1 h-auto"
                    >
                      50%
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setWithdrawAmount((selectedVaultData.balance * 0.75).toFixed(2))}
                      className="text-white/60 hover:text-white text-xs p-1 h-auto"
                    >
                      75%
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setWithdrawAmount(selectedVaultData.balance.toFixed(2))}
                      className="text-white/60 hover:text-white text-xs p-1 h-auto"
                    >
                      MAX
                    </Button>
                  </div>
                )}
              </div>

              {/* Withdrawal Type */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Withdraw To
                </label>
                <div className="space-y-2">
                  <div 
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      withdrawType === "stellar" 
                        ? "bg-blue-500/20 border-blue-500/50" 
                        : "bg-white/5 border-white/20 hover:bg-white/10"
                    }`}
                    onClick={() => setWithdrawType("stellar")}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={withdrawType === "stellar"}
                        onChange={() => setWithdrawType("stellar")}
                        className="text-blue-500"
                      />
                      <div>
                        <h3 className="text-white font-semibold">Stay on Stellar</h3>
                        <p className="text-white/60 text-sm">Withdraw to your Stellar wallet</p>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      withdrawType === "original" 
                        ? "bg-blue-500/20 border-blue-500/50" 
                        : "bg-white/5 border-white/20 hover:bg-white/10"
                    }`}
                    onClick={() => setWithdrawType("original")}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={withdrawType === "original"}
                        onChange={() => setWithdrawType("original")}
                        className="text-blue-500"
                      />
                      <div>
                        <h3 className="text-white font-semibold">Back to Original Chain</h3>
                        <p className="text-white/60 text-sm">Bridge back to Ethereum (Demo)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Withdraw Button */}
              <Button
                onClick={handleWithdraw}
                disabled={!selectedVault || !withdrawAmount || isProcessing}
                className="w-full h-12 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing Withdrawal...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Withdraw ${withdrawAmount || "0"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Swap Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Swap via Soroswap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* From Token */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  From
                </label>
                <Select value={swapFrom} onValueChange={setSwapFrom}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select token to swap from" />
                  </SelectTrigger>
                  <SelectContent>
                    {swapTokens.map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center justify-between w-full">
                          <span>{token.symbol}</span>
                          <span className="text-sm text-gray-500">${token.price}</span>
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
                  placeholder="Enter amount to swap"
                  value={swapAmount}
                  onChange={(e) => setSwapAmount(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              {/* Swap Arrow */}
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-white/60" />
                </div>
              </div>

              {/* To Token */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  To
                </label>
                <Select value={swapTo} onValueChange={setSwapTo}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select token to receive" />
                  </SelectTrigger>
                  <SelectContent>
                    {swapTokens.filter(token => token.symbol !== swapFrom).map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center justify-between w-full">
                          <span>{token.symbol}</span>
                          <span className="text-sm text-gray-500">${token.price}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Swap Preview */}
              {swapFrom && swapTo && swapAmount && (
                <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/80">Exchange Rate:</span>
                      <span className="text-white">1 {swapFrom} = {swapRate} {swapTo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">You'll receive:</span>
                      <span className="text-white font-semibold">{swapOutput} {swapTo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Slippage:</span>
                      <span className="text-white">0.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Fee:</span>
                      <span className="text-white">0.3%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Swap Button */}
              <Button
                onClick={handleSwap}
                disabled={!swapFrom || !swapTo || !swapAmount || isProcessing}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Swapping...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4" />
                    <span>Swap via Soroswap</span>
                  </div>
                )}
              </Button>

              {/* Info */}
              <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                <p className="text-yellow-200 text-sm">
                  ⚠️ Swaps are powered by Soroswap DEX on Stellar
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
