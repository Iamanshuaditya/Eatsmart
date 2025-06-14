"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, Clock, Utensils, TrendingUp, BarChart3, Eye } from "lucide-react"
import Link from "next/link"

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const mealHistory = [
    {
      id: 1,
      name: "Grilled Chicken Salad",
      date: "2024-01-15",
      time: "12:30 PM",
      calories: 320,
      healthScore: 85,
      type: "lunch",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Oatmeal with Berries",
      date: "2024-01-15",
      time: "8:00 AM",
      calories: 280,
      healthScore: 92,
      type: "breakfast",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Salmon with Quinoa",
      date: "2024-01-14",
      time: "7:00 PM",
      calories: 450,
      healthScore: 88,
      type: "dinner",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Greek Yogurt Parfait",
      date: "2024-01-14",
      time: "3:00 PM",
      calories: 180,
      healthScore: 78,
      type: "snack",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      name: "Vegetable Stir Fry",
      date: "2024-01-14",
      time: "12:00 PM",
      calories: 350,
      healthScore: 90,
      type: "lunch",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const weeklyStats = {
    totalMeals: 21,
    avgCalories: 1850,
    avgHealthScore: 84,
    topFoods: ["Grilled Chicken", "Quinoa", "Avocado", "Salmon"],
  }

  const filteredMeals = mealHistory.filter((meal) => {
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || meal.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meal History</h1>
        <p className="text-muted-foreground">Track your nutrition journey over time</p>
      </div>

      <Tabs defaultValue="meals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="meals">Meal History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="meals" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search meals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={selectedFilter === "breakfast" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("breakfast")}
                  >
                    Breakfast
                  </Button>
                  <Button
                    variant={selectedFilter === "lunch" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("lunch")}
                  >
                    Lunch
                  </Button>
                  <Button
                    variant={selectedFilter === "dinner" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("dinner")}
                  >
                    Dinner
                  </Button>
                  <Button
                    variant={selectedFilter === "snack" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("snack")}
                  >
                    Snacks
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meal List */}
          <div className="space-y-4">
            {filteredMeals.map((meal) => (
              <Card key={meal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={meal.image || "/placeholder.svg"}
                        alt={meal.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{meal.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {meal.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {meal.time}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">{meal.calories} kcal</div>
                          <Badge variant={meal.healthScore >= 80 ? "default" : "secondary"}>
                            {meal.healthScore}% Healthy
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline" className="capitalize">
                          <Utensils className="mr-1 h-3 w-3" />
                          {meal.type}
                        </Badge>
                        <Link href={`/dashboard/history/${meal.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Meals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weeklyStats.totalMeals}</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Calories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weeklyStats.avgCalories}</div>
                <p className="text-xs text-muted-foreground">Per day</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weeklyStats.avgHealthScore}%</div>
                <p className="text-xs text-muted-foreground">Average</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">Days tracking</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Foods This Week</CardTitle>
              <CardDescription>Most frequently consumed healthy foods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {weeklyStats.topFoods.map((food, index) => (
                  <Badge key={index} variant="secondary">
                    {food}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Weekly Nutrition Trends
              </CardTitle>
              <CardDescription>Your nutrition patterns over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <NutritionTrend label="Calories" values={[1800, 1950, 1750, 1900, 1850, 2000, 1800]} />
                <NutritionTrend label="Protein (g)" values={[85, 92, 78, 95, 88, 102, 85]} />
                <NutritionTrend label="Carbs (g)" values={[220, 240, 200, 235, 225, 250, 210]} />
                <NutritionTrend label="Fat (g)" values={[65, 70, 58, 72, 68, 75, 62]} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NutritionTrend({ label, values }: { label: string; values: number[] }) {
  const max = Math.max(...values)
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="flex items-center gap-1 text-green-600">
          <TrendingUp className="h-3 w-3" />
          +5%
        </span>
      </div>
      <div className="flex items-end gap-1 h-16">
        {values.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-primary rounded-t" style={{ height: `${(value / max) * 100}%` }} />
            <span className="text-xs text-muted-foreground">{days[index]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
