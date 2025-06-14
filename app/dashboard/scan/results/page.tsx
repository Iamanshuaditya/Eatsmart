 "use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Save,
  Share2,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("nutrition")
  const [analysisData, setAnalysisData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem("scanResult")
    if (!stored) {
      router.push("/dashboard/scan")
      return
    }
    setAnalysisData(JSON.parse(stored))
  }, [router])

  if (!analysisData) {
    return (
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100dvh-64px)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#14005c] via-[#080024] to-[#030012] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-[0.05]" />
        <div className="relative z-10 text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Loading…</h1>
          <p className="text-muted-foreground">
            Please wait while we process your results
          </p>
        </div>
      </section>
    )
  }

  const additiveInfo = analysisData.additive_info

  return (
    <section className="relative flex flex-col items-center min-h-[calc(100dvh-64px)] overflow-y-auto px-4 py-10 sm:py-14 lg:py-20 text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#14005c] via-[#080024] to-[#030012]">
      {/* noise overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-[0.05]" />

      <div className="relative z-10 w-full max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analysis Results</h1>
          <p className="text-muted-foreground">
            Detailed analysis of the food additive
          </p>
        </div>

        <Card className="one-ui-card">
          <CardHeader className="pb-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-2xl">
                  {additiveInfo.common_name}
                </CardTitle>
                <CardDescription>
                  Chemical Name: {additiveInfo.chemical_name}
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="flex w-fit items-center gap-1 rounded-full"
              >
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {additiveInfo.health_profile.safety.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <Tabs
              defaultValue="overview"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="mb-4 grid w-full grid-cols-4">
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

              {/* ---------- Overview ---------- */}
              <TabsContent value="overview" className="space-y-4">
                <div className="space-y-4">
                  <div className="rounded-2xl bg-secondary/50 p-4">
                    <h3 className="mb-2 font-medium">Category</h3>
                    <p>{additiveInfo.category}</p>
                  </div>

                  <div className="rounded-2xl bg-secondary/50 p-4">
                    <h3 className="mb-2 font-medium">Usages</h3>
                    <div className="space-y-2">
                      {additiveInfo.usages.map(
                        (usage: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex justify-between"
                          >
                            <span className="font-medium">
                              {usage.role}
                            </span>
                            <span className="text-muted-foreground">
                              {usage.purpose}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* ---------- Properties ---------- */}
              <TabsContent value="properties" className="space-y-4">
                <div className="grid gap-4">
                  <PropertyCard
                    name="Brightness"
                    value={additiveInfo.properties.brightness}
                    color="blue"
                  />
                  <PropertyCard
                    name="Stability"
                    value={additiveInfo.properties.stability}
                    color="green"
                  />
                  <PropertyCard
                    name="Cost Efficiency"
                    value={additiveInfo.properties.cost_efficiency}
                    color="yellow"
                  />
                </div>
              </TabsContent>

              {/* ---------- Health ---------- */}
              <TabsContent value="health" className="space-y-4">
                <div className="space-y-4">
                  <div className="rounded-2xl bg-secondary/50 p-4">
                    <h3 className="mb-2 font-medium">Safety Status</h3>
                    <div className="space-y-2">
                      <p>
                        Status:{" "}
                        {additiveInfo.health_profile.safety.status}
                      </p>
                      <p>
                        Evaluated by:{" "}
                        {additiveInfo.health_profile.safety.evaluated_by}
                      </p>
                      <p>
                        Year: {additiveInfo.health_profile.safety.year}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-yellow-50 dark:bg-yellow-950/30 p-4">
                    <div className="mb-2 flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
                      <AlertTriangle className="h-5 w-5" />
                      <h3 className="font-medium">Potential Risks</h3>
                    </div>
                    <div className="space-y-2">
                      <p>
                        Environmental Impact:{" "}
                        {
                          additiveInfo.health_profile.potential_risks
                            .environmental
                        }
                      </p>
                      <p>
                        Digestive Effect:{" "}
                        {
                          additiveInfo.health_profile.potential_risks
                            .digestive_effect
                        }
                      </p>
                      <p>
                        Long-term Effect:{" "}
                        {
                          additiveInfo.health_profile.potential_risks
                            .long_term_effect
                        }
                      </p>
                      <p>
                        Metabolism Effect:{" "}
                        {
                          additiveInfo.health_profile.potential_risks
                            .metabolism_effect
                        }
                      </p>
                    </div>

                    <div className="mt-4">
                      <h4 className="mb-2 font-medium">
                        Vulnerable Groups
                      </h4>
                      <div className="space-y-2">
                        {additiveInfo.health_profile.potential_risks.vulnerable_groups.map(
                          (group: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex justify-between"
                            >
                              <span className="font-medium">
                                {group.group}
                              </span>
                              <span className="text-muted-foreground">
                                {group.effect}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* ---------- Regulatory ---------- */}
              <TabsContent value="regulatory" className="space-y-4">
                <div className="space-y-4">
                  <div className="rounded-2xl bg-secondary/50 p-4">
                    <h3 className="mb-2 font-medium">
                      Acceptable Daily Intake
                    </h3>
                    <div className="space-y-2">
                      <p>
                        Value:{" "}
                        {
                          additiveInfo.regulatory_status
                            .acceptable_daily_intake
                            .value_mg_per_kg_bw
                        }
                      </p>
                      <p>
                        Source:{" "}
                        {
                          additiveInfo.regulatory_status
                            .acceptable_daily_intake.source
                        }
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-secondary/50 p-4">
                    <h3 className="mb-2 font-medium">
                      Country Regulations
                    </h3>
                    <div className="space-y-2">
                      {additiveInfo.regulatory_status.country_regulations.map(
                        (reg: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex justify-between"
                          >
                            <span className="font-medium">
                              {reg.region}
                            </span>
                            <span className="text-muted-foreground">
                              {reg.status}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {reg.note}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 sm:flex-row">
            <Button className="one-ui-button w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4" />
              Save to History
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-full sm:w-auto"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Results
            </Button>
            <Link href="/dashboard/scan" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full rounded-full"
              >
                <Camera className="mr-2 h-4 w-4" />
                Scan Another
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
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
    green:
      "bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-300",
    yellow:
      "bg-yellow-100 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-300",
    orange:
      "bg-orange-100 dark:bg-orange-950/30 text-orange-800 dark:text-orange-300",
  }

  return (
    <div className={`rounded-2xl p-4 ${colorClasses[color]}`}>
      <p className="text-sm font-medium opacity-80">{name}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
