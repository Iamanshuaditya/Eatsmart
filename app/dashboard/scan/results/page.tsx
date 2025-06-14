"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Camera, Save, Share2, AlertTriangle, Sparkles, Zap, Utensils } from "lucide-react"
import Link from "next/link"

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("nutrition")

  // Mock data for the food analysis
  const foodData = {
    name: "Grilled Chicken Salad",
    image: "/placeholder.svg?height=300&width=400",
    calories: 320,
    macros: {
      protein: 28,
      carbs: 12,
      fat: 18,
      fiber: 4,
    },
    ingredients: [
      { name: "Grilled Chicken Breast", amount: "120g", calories: 165 },
      { name: "Mixed Greens", amount: "80g", calories: 20 },
      { name: "Cherry Tomatoes", amount: "50g", calories: 15 },
      { name: "Avocado", amount: "50g", calories: 80 },
      { name: "Olive Oil Dressing", amount: "15ml", calories: 40 },
    ],
    allergens: ["None detected"],
    healthScore: 85,
    warnings: ["High sodium content"],
    aiInsights: [
      "This meal is high in protein and healthy fats",
      "Consider reducing the dressing to lower sodium intake",
      "Good source of vitamins A and C from the vegetables",
    ],
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analysis Results</h1>
        <p className="text-muted-foreground">Nutritional breakdown of your meal</p>
      </div>

      <Card className="one-ui-card">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{foodData.name}</CardTitle>
              <CardDescription>Analyzed on {new Date().toLocaleDateString()}</CardDescription>
            </div>
            <Badge variant="outline" className="w-fit flex items-center gap-1 rounded-full">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              {foodData.healthScore}% Healthy
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="aspect-[16/9] overflow-hidden rounded-3xl bg-muted mb-6">
            <img
              src={foodData.image || "/placeholder.svg"}
              alt={foodData.name}
              className="h-full w-full object-cover"
            />
          </div>

          <Tabs defaultValue="nutrition" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="nutrition" className="rounded-full">
                Nutrition
              </TabsTrigger>
              <TabsTrigger value="ingredients" className="rounded-full">
                Ingredients
              </TabsTrigger>
              <TabsTrigger value="health" className="rounded-full">
                Health Info
              </TabsTrigger>
              <TabsTrigger value="ai" className="rounded-full">
                AI Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="nutrition" className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-2xl">
                <span className="font-medium">Total Calories</span>
                <span className="text-xl font-bold">{foodData.calories} kcal</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <MacroCard name="Protein" value={foodData.macros.protein} unit="g" color="blue" />
                <MacroCard name="Carbs" value={foodData.macros.carbs} unit="g" color="orange" />
                <MacroCard name="Fat" value={foodData.macros.fat} unit="g" color="yellow" />
                <MacroCard name="Fiber" value={foodData.macros.fiber} unit="g" color="green" />
              </div>
            </TabsContent>

            <TabsContent value="ingredients" className="space-y-4">
              <div className="divide-y">
                {foodData.ingredients.map((ingredient, index) => (
                  <div key={index} className="py-3 flex justify-between">
                    <div>
                      <p className="font-medium">{ingredient.name}</p>
                      <p className="text-sm text-muted-foreground">{ingredient.amount}</p>
                    </div>
                    <span className="font-medium">{ingredient.calories} kcal</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="health" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Allergens</h3>
                  <div className="flex flex-wrap gap-2">
                    {foodData.allergens.map((allergen, index) => (
                      <Badge key={index} variant="secondary" className="rounded-full">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                </div>

                {foodData.warnings.length > 0 && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-2xl">
                    <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-300 mb-2">
                      <AlertTriangle className="h-5 w-5" />
                      <h3 className="font-medium">Warnings</h3>
                    </div>
                    <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300/80">
                      {foodData.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="ai" className="space-y-4">
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    Edge AI Analysis
                  </CardTitle>
                  <CardDescription>Personalized insights based on your dietary preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {foodData.aiInsights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Zap className="h-4 w-4 mt-1 text-blue-500" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="p-4 bg-secondary/50 rounded-2xl">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  Meal Recommendations
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on your health goals and this meal's nutrition profile
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full">
                    Add more fiber
                  </Badge>
                  <Badge variant="outline" className="rounded-full">
                    Pair with whole grains
                  </Badge>
                  <Badge variant="outline" className="rounded-full">
                    Reduce sodium at dinner
                  </Badge>
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

function MacroCard({
  name,
  value,
  unit,
  color,
}: {
  name: string
  value: number
  unit: string
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
      <p className="text-2xl font-bold">
        {value}
        <span className="text-sm ml-1">{unit}</span>
      </p>
    </div>
  )
}
