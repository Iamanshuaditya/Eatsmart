"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Sparkles, Utensils, BarChart2, Clock, Zap } from "lucide-react"
import Link from "next/link"

export function EdgePanel() {
  const [isExpanded, setIsExpanded] = useState(false)

  const togglePanel = () => {
    setIsExpanded(!isExpanded)
  }

  const quickActions = [
    { icon: <Camera className="h-5 w-5" />, label: "Scan Food", href: "/dashboard/scan" },
    { icon: <Sparkles className="h-5 w-5" />, label: "AI Analysis", href: "/dashboard/health-report" },
    { icon: <Utensils className="h-5 w-5" />, label: "Meal Plan", href: "/dashboard/meal-plan" },
    { icon: <BarChart2 className="h-5 w-5" />, label: "Stats", href: "/dashboard/history" },
    { icon: <Clock className="h-5 w-5" />, label: "History", href: "/dashboard/history" },
  ]

  if (!isExpanded) {
    return <div className="edge-panel" onClick={togglePanel} />
  }

  return (
    <div className="edge-panel-expanded">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Quick Access</h3>
        <Button variant="ghost" size="sm" className="rounded-full" onClick={togglePanel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {quickActions.map((action, index) => (
          <Link key={index} href={action.href} onClick={togglePanel}>
            <Button
              variant="outline"
              className="w-full justify-start rounded-full hover:bg-primary/10 hover:text-primary"
            >
              {action.icon}
              <span className="ml-2">{action.label}</span>
            </Button>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t">
        <h4 className="text-sm font-medium mb-3">AI Features</h4>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start rounded-full bg-blue-50 dark:bg-blue-900/20">
            <Zap className="h-4 w-4 text-blue-500" />
            <span className="ml-2">Analyze Recipe</span>
          </Button>
          <Button variant="outline" className="w-full justify-start rounded-full bg-purple-50 dark:bg-purple-900/20">
            <Zap className="h-4 w-4 text-purple-500" />
            <span className="ml-2">Scan Barcode</span>
          </Button>
          <Button variant="outline" className="w-full justify-start rounded-full bg-green-50 dark:bg-green-900/20">
            <Zap className="h-4 w-4 text-green-500" />
            <span className="ml-2">Meal Suggestions</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
