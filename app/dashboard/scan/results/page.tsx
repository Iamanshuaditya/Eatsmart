"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Camera, Save, Share2, AlertTriangle, Sparkles, Zap, Utensils } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("nutrition")
  const [analysisData, setAnalysisData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Get the analysis data from localStorage
    const storedData = localStorage.getItem('scanResult')
    if (!storedData) {
      router.push('/dashboard/scan')
      return
    }
    setAnalysisData(JSON.parse(storedData))
  }, [router])

  if (!analysisData) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Loading...</h1>
          <p className="text-muted-foreground">Please wait while we process your results</p>
        </div>
      </div>
    )
  }

  const additiveInfo = analysisData.additive_info

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analysis Results</h1>
        <p className="text-muted-foreground">Detailed analysis of the food additive</p>
      </div>

      <Card className="one-ui-card">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{additiveInfo.common_name}</CardTitle>
              <CardDescription>Chemical Name: {additiveInfo.chemical_name}</CardDescription>
            </div>
            <Badge variant="outline" className="w-fit flex items-center gap-1 rounded-full">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              {additiveInfo.health_profile.safety.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview" className="rounded-full">
                Overview
              </TabsTrigger>
              <TabsTrigger value="properties" className="rounded-full">
                Properties
              </TabsTrigger>
              <TabsTrigger value="health" className="rounded-full">
                Health Info
              </TabsTrigger>
              <TabsTrigger value="regulatory" className="rounded-full">
                Regulatory
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-2xl">
                  <h3 className="font-medium mb-2">Category</h3>
                  <p>{additiveInfo.category}</p>
                </div>

                <div className="p-4 bg-secondary/50 rounded-2xl">
                  <h3 className="font-medium mb-2">Usages</h3>
                  <div className="space-y-2">
                    {additiveInfo.usages.map((usage: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-medium">{usage.role}</span>
                        <span className="text-muted-foreground">{usage.purpose}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="properties" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <PropertyCard name="Brightness" value={additiveInfo.properties.brightness} color="blue" />
                <PropertyCard name="Stability" value={additiveInfo.properties.stability} color="green" />
                <PropertyCard name="Cost Efficiency" value={additiveInfo.properties.cost_efficiency} color="yellow" />
              </div>
            </TabsContent>

            <TabsContent value="health" className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-2xl">
                  <h3 className="font-medium mb-2">Safety Status</h3>
                  <div className="space-y-2">
                    <p>Status: {additiveInfo.health_profile.safety.status}</p>
                    <p>Evaluated by: {additiveInfo.health_profile.safety.evaluated_by}</p>
                    <p>Year: {additiveInfo.health_profile.safety.year}</p>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-2xl">
                  <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300 mb-2">
                    <AlertTriangle className="h-5 w-5" />
                    <h3 className="font-medium">Potential Risks</h3>
                  </div>
                  <div className="space-y-2">
                    <p>Environmental Impact: {additiveInfo.health_profile.potential_risks.environmental}</p>
                    <p>Digestive Effect: {additiveInfo.health_profile.potential_risks.digestive_effect}</p>
                    <p>Long-term Effect: {additiveInfo.health_profile.potential_risks.long_term_effect}</p>
                    <p>Metabolism Effect: {additiveInfo.health_profile.potential_risks.metabolism_effect}</p>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Vulnerable Groups</h4>
                    <div className="space-y-2">
                      {additiveInfo.health_profile.potential_risks.vulnerable_groups.map((group: any, index: number) => (
                        <div key={index} className="flex justify-between">
                          <span className="font-medium">{group.group}</span>
                          <span className="text-muted-foreground">{group.effect}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="regulatory" className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-2xl">
                  <h3 className="font-medium mb-2">Acceptable Daily Intake</h3>
                  <div className="space-y-2">
                    <p>Value: {additiveInfo.regulatory_status.acceptable_daily_intake.value_mg_per_kg_bw}</p>
                    <p>Source: {additiveInfo.regulatory_status.acceptable_daily_intake.source}</p>
                  </div>
                </div>

                <div className="p-4 bg-secondary/50 rounded-2xl">
                  <h3 className="font-medium mb-2">Country Regulations</h3>
                  <div className="space-y-2">
                    {additiveInfo.regulatory_status.country_regulations.map((regulation: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-medium">{regulation.region}</span>
                        <span className="text-muted-foreground">{regulation.status}</span>
                        <span className="text-sm text-muted-foreground">{regulation.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button className="w-full sm:w-auto one-ui-button">
            <Save className="mr-2 h-4 w-4" />
            Save to History
          </Button>
          <Button variant="outline" className="w-full sm:w-auto rounded-full">
            <Share2 className="mr-2 h-4 w-4" />
            Share Results
          </Button>
          <Link href="/dashboard/scan" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full rounded-full">
              <Camera className="mr-2 h-4 w-4" />
              Scan Another
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

function PropertyCard({
  name,
  value,
  color,
}: {
  name: string
  value: string
  color: "blue" | "green" | "yellow" | "orange"
}) {
  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300",
    green: "bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-300",
    yellow: "bg-yellow-100 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-300",
    orange: "bg-orange-100 dark:bg-orange-950/30 text-orange-800 dark:text-orange-300",
  }

  return (
    <div className={`p-4 rounded-2xl ${colorClasses[color]}`}>
      <p className="text-sm font-medium opacity-80">{name}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
