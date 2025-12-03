'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Globe } from 'lucide-react'
import Link from 'next/link'

export default function Home() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 sm:p-8">
      <div className="bg-card rounded-2xl shadow-[0_8px_32px_rgba(129,85,217,0.08)] border border-border/60 p-12 sm:p-16 w-full max-w-4xl backdrop-blur-sm">
        <div className="text-center space-y-8">
          {/* Logo/Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-[0_4px_20px_rgba(129,85,217,0.25)] transition-all duration-300 hover:shadow-[0_6px_28px_rgba(129,85,217,0.35)] hover:scale-105">
                <Sparkles className="w-12 h-12 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary/20 rounded-full blur-sm animate-pulse" />
            </div>
          </div>
          
          {/* Heading Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">AI-Powered</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight leading-tight">
              WizCommerce
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary mt-2">
              AI Website Builder
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto pt-4 leading-relaxed">
              Build, customize, and deploy websites with AI-powered tools. Create multiple variants instantly with our professional workflow editor.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Link href="/flow">
              <Button
                size="lg"
                className="gap-3 text-base font-semibold px-10 py-7 h-auto shadow-[0_4px_16px_rgba(129,85,217,0.3)] hover:shadow-[0_6px_24px_rgba(129,85,217,0.4)] transition-all duration-300 hover:scale-105"
              >
                <Globe className="w-5 h-5" />
                Start Building
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="pt-12 border-t border-border/60">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">AI</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Powered</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">Fast</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Generation</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">Easy</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">To Use</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

