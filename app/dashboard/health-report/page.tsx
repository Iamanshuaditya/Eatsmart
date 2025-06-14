"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Heart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Download,
  Calendar,
  Target,
} from "lucide-react"

export default function HealthReportPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const healthData = {
    overallScore: 78,
    trend: "improving",
    metrics: {
      nutrition: { score: 82, trend: "up" },
      hydration: { score: 65, trend: "down" },
      exercise: { score: 88, trend: "up" },
      sleep: { score: 72, trend: "stable" },
    },
    recommendations: [
      {
        type: "critical",
        title: "Increase Water Intake",
        description: "You're drinking 20% less water than recommended. Aim for 8 glasses daily.",
        action: "Set hourly reminders",
      },
      {
        type: "warning",
        title: "High Sodium Consumption",
        description: "Your sodium intake is 150% above the recommended daily limit.",
        action: "Choose low-sodium alternatives",
      },
      {
        type: "success",
        title: "Excellent Protein Intake",
        description: "You're consistently meeting your protein goals.",
        action: "Keep up the good work",
      },
    ],
    nutritionAnalysis: {
      calories: { avg: 1850, target: 2000, trend: -5 },
      protein: { avg: 95, target: 120, trend: 8 },
      carbs: { avg: 220, target: 250, trend: -2 },
      fat: { avg: 65, target: 70, trend: 3 },
      fiber: { avg: 18, target: 25, trend: 12 },
      sugar: { avg: 45, target: 35, trend: -8 },
    },
    riskFactors: [
      { name: "Cardiovascular Risk", level: "Low", color: "green" },
      { name: "Diabetes Risk", level: "Moderate", color: "yellow" },
      { name: "Obesity Risk", level: "Low", color: "green" },
      { name: "Hypertension Risk", level: "Low", color: "green" },
    ],
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden space-y-6   bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
   from-[#14005c] via-[#080024] to-[#030012] text-white">
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Health Report</h1>
          <p className="text-muted-foreground">Comprehensive analysis of your health metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            {selectedPeriod === "week" ? "This Week" : selectedPeriod === "month" ? "This Month" : "This Year"}
          </Button>
          <Button size="sm" className="apple-button">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overall Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]">
            <Heart className="h-6 w-6 text-red-500" />
            Overall Health Score
          </CardTitle>
          <CardDescription>Based on your nutrition, activity, and lifestyle data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-8 border-secondary flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{healthData.overallScore}</div>
                  <div className="text-sm text-muted-foreground">/ 100</div>
                </div>
              </div>
              <div
                className="absolute top-0 left-0 w-32 h-32 rounded-full border-8 border-primary border-t-transparent border-r-transparent"
                style={{
                  transform: `rotate(${(healthData.overallScore / 100) * 360}deg)`,
                  borderColor:
                    healthData.overallScore >= 80 ? "#22c55e" : healthData.overallScore >= 60 ? "#f59e0b" : "#ef4444",
                }}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={healthData.trend === "improving" ? "default" : "secondary"}>
                  {healthData.trend === "improving" ? (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3" />
                  )}
                  {healthData.trend}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Your health score has improved by 8 points this week. Keep up the great work with your nutrition and
                exercise routine.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(healthData.metrics).map(([key, metric]) => (
              <Card key={key}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium capitalize">{key}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{metric.score}</span>
                    <div
                      className={`flex items-center ${
                        metric.trend === "up"
                          ? "text-green-600"
                          : metric.trend === "down"
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : metric.trend === "down" ? (
                        <TrendingDown className="h-4 w-4" />
                      ) : (
                        <Activity className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  <Progress value={metric.score} className="mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nutritional Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your nutrient intake</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(healthData.nutritionAnalysis).map(([nutrient, data]) => (
                  <div key={nutrient} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium capitalize">{nutrient}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {data.avg} / {data.target}
                        </span>
                        <div className={`flex items-center ${data.trend > 0 ? "text-green-600" : "text-red-600"}`}>
                          {data.trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          <span className="text-xs ml-1">{Math.abs(data.trend)}%</span>
                        </div>
                      </div>
                    </div>
                    <Progress value={(data.avg / data.target) * 100} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Risk Assessment</CardTitle>
              <CardDescription>Based on your dietary patterns and lifestyle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthData.riskFactors.map((risk, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          risk.color === "green"
                            ? "bg-green-500"
                            : risk.color === "yellow"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <span className="font-medium">{risk.name}</span>
                    </div>
                    <Badge
                      variant={
                        risk.level === "Low" ? "default" : risk.level === "Moderate" ? "secondary" : "destructive"
                      }
                    >
                      {risk.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="space-y-4">
            {healthData.recommendations.map((rec, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        rec.type === "critical"
                          ? "bg-red-100 dark:bg-red-950/30"
                          : rec.type === "warning"
                            ? "bg-yellow-100 dark:bg-yellow-950/30"
                            : "bg-green-100 dark:bg-green-950/30"
                      }`}
                    >
                      {rec.type === "critical" ? (
                        <AlertTriangle
                          className={`h-5 w-5 ${rec.type === "critical" ? "text-red-600 dark:text-red-400" : ""}`}
                        />
                      ) : rec.type === "warning" ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{rec.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                      <Button size="sm" variant="outline">
                        <Target className="mr-2 h-4 w-4" />
                        {rec.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
