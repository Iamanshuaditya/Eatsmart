 "use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Heart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Download,
  Calendar,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function HealthReportPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  /** ----------------------- MOCK DATA ---------------------- */
  const healthData = {
    overallScore: 78,
    trend: "improving",
    metrics: {
      nutrition: { score: 82, trend: "up" },
      hydration: { score: 65, trend: "down" },
      exercise: { score: 88, trend: "up" },
      sleep: { score: 72, trend: "stable" }
    },
    recommendations: [
      {
        type: "critical",
        title: "Increase Water Intake",
        description: "You're drinking 20% less water than recommended. Aim for 8 glasses daily.",
        action: "Set hourly reminders"
      },
      {
        type: "warning",
        title: "High Sodium Consumption",
        description: "Your sodium intake is 150% above the recommended daily limit.",
        action: "Choose low-sodium alternatives"
      },
      {
        type: "success",
        title: "Excellent Protein Intake",
        description: "You're consistently meeting your protein goals.",
        action: "Keep up the good work"
      }
    ],
    nutritionAnalysis: {
      calories: { avg: 1850, target: 2000, trend: -5 },
      protein: { avg: 95, target: 120, trend: 8 },
      carbs: { avg: 220, target: 250, trend: -2 },
      fat: { avg: 65, target: 70, trend: 3 },
      fiber: { avg: 18, target: 25, trend: 12 },
      sugar: { avg: 45, target: 35, trend: -8 }
    },
    riskFactors: [
      { name: "Cardiovascular Risk", level: "Low", color: "green" },
      { name: "Diabetes Risk", level: "Moderate", color: "yellow" },
      { name: "Obesity Risk", level: "Low", color: "green" },
      { name: "Hypertension Risk", level: "Low", color: "green" }
    ]
  } as const;

  /** ----------------------- HELPERS ------------------------ */
  const periodLabel = selectedPeriod === "week" ? "This Week" : selectedPeriod === "month" ? "This Month" : "This Year";

  /** ----------------------- COMPONENT ---------------------- */
  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-8 pt-6 pb-12 min-h-screen w-full overflow-x-hidden bg-[radial-gradient(ellipse_at_top,theme(colors.violet.950)_0%,theme(colors.violet.950/_80)_20%,theme(colors.black)_100%)] text-white">
      {/* Heading & actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Health Report</h1>
          <p className="text-muted-foreground">Comprehensive analysis of your health metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <Calendar className="mr-2 h-4 w-4" />
            {periodLabel}
          </Button>
          <Button size="sm" className="one-ui-button rounded-full">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overall score */}
      <Card className="one-ui-card">
        <CardHeader className="bg-black/10 rounded-t-2xl border-b border-white/5 backdrop-blur-sm">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" /> Overall Health Score
          </CardTitle>
          <CardDescription>Based on your nutrition, activity, and lifestyle data</CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Circular score meter */}
            <div className="relative self-start">
              <div className="w-32 h-32 rounded-full border-[10px] border-secondary/50 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-foreground">{healthData.overallScore}</p>
                  <p className="text-sm text-muted-foreground">/ 100</p>
                </div>
              </div>
              {/* Dynamic arc */}
              <div
                className="absolute top-0 left-0 w-32 h-32 rounded-full border-[10px] border-transparent border-t-current border-r-current"
                style={{
                  transform: `rotate(${(healthData.overallScore / 100) * 360}deg)`,
                  transition: "transform 0.6s ease",
                  color:
                    healthData.overallScore >= 80
                      ? "#22c55e"
                      : healthData.overallScore >= 60
                      ? "#eab308"
                      : "#ef4444"
                }}
              />
            </div>

            {/* Trend + message */}
            <div className="flex-1 space-y-2">
              <Badge
                variant={healthData.trend === "improving" ? "default" : "secondary"}
                className="rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide w-max"
              >
                {healthData.trend === "improving" ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                {healthData.trend}
              </Badge>
              <p className="text-sm text-muted-foreground max-w-xl">
                Your health score has improved by 8 points this week. Keep up the great work with your nutrition and exercise
                routine.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-4 bg-white/5 rounded-full p-1">
          <TabsTrigger value="overview" className="rounded-full py-1.5">Overview</TabsTrigger>
          <TabsTrigger value="nutrition" className="rounded-full py-1.5">Nutrition</TabsTrigger>
          <TabsTrigger value="risks" className="rounded-full py-1.5">Risk Analysis</TabsTrigger>
          <TabsTrigger value="recommendations" className="rounded-full py-1.5">Recommendations</TabsTrigger>
        </TabsList>

        {/* ---------------- Overview -------------- */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(healthData.metrics).map(([key, metric]) => (
              <Card key={key} className="one-ui-card">
                <CardHeader className="pb-1">
                  <CardTitle className="text-sm font-medium capitalize">{key}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{metric.score}</span>
                    <div
                      className={`flex items-center ${
                        metric.trend === "up"
                          ? "text-green-500"
                          : metric.trend === "down"
                          ? "text-red-500"
                          : "text-gray-500"
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
                  <Progress value={metric.score} className="mt-3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* -------------- Nutrition -------------- */}
        <TabsContent value="nutrition" className="space-y-4">
          <Card className="one-ui-card">
            <CardHeader>
              <CardTitle>Nutritional Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your nutrient intake</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(healthData.nutritionAnalysis).map(([nutrient, data]) => (
                  <div key={nutrient} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium capitalize">{nutrient}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {data.avg} / {data.target}
                        </span>
                        <div className={data.trend > 0 ? "text-green-500" : "text-red-500"}>
                          {data.trend > 0 ? <TrendingUp className="h-3 w-3 inline-block" /> : <TrendingDown className="h-3 w-3 inline-block" />}
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

        {/* -------------- Risks -------------- */}
        <TabsContent value="risks" className="space-y-4">
          <Card className="one-ui-card">
            <CardHeader>
              <CardTitle>Health Risk Assessment</CardTitle>
              <CardDescription>Based on your dietary patterns and lifestyle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {healthData.riskFactors.map((risk) => (
                <div key={risk.name} className="flex items-center justify-between p-4 bg-black/10 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${
                        risk.color === "green" ? "bg-green-500" : risk.color === "yellow" ? "bg-yellow-400" : "bg-red-500"
                      }`}
                    />
                    <span className="font-medium text-sm">{risk.name}</span>
                  </div>
                  <Badge
                    variant={
                      risk.level === "Low" ? "default" : risk.level === "Moderate" ? "secondary" : "destructive"
                    }
                    className="rounded-full px-3 py-1 text-xs"
                  >
                    {risk.level}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ------------- Recommendations ------------- */}
        <TabsContent value="recommendations" className="space-y-4">
          {healthData.recommendations.map((rec) => (
            <Card key={rec.title} className="one-ui-card">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      rec.type === "critical"
                        ? "bg-red-500/10 text-red-400"
                        : rec.type === "warning"
                        ? "bg-yellow-400/10 text-yellow-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                  >
                    {rec.type === "critical" ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : rec.type === "warning" ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : (
                      <CheckCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-semibold leading-tight">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug">{rec.description}</p>
                    <Button size="sm" variant="outline" className="rounded-full">
                      <Target className="mr-2 h-4 w-4" />
                      {rec.action}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
