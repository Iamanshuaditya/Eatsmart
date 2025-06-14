"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Plus, ChefHat, Target, Utensils, ShoppingCart, Bookmark } from "lucide-react"

export default function MealPlanPage() {
  const [selectedDay, setSelectedDay] = useState("today")

  const mealPlan = {
    today: {
      date: "2024-01-15",
      meals: [
        {
          type: "breakfast",
          name: "Protein Smoothie Bowl",
          time: "8:00 AM",
          calories: 320,
          protein: 25,
          prepTime: 10,
          difficulty: "Easy",
          ingredients: ["Banana", "Protein powder", "Almond milk", "Berries", "Granola"],
        },
        {
          type: "lunch",
          name: "Mediterranean Quinoa Salad",
          time: "12:30 PM",
          calories: 420,
          protein: 18,
          prepTime: 15,
          difficulty: "Easy",
          ingredients: ["Quinoa", "Cucumber", "Tomatoes", "Feta cheese", "Olive oil"],
        },
        {
          type: "snack",
          name: "Greek Yogurt with Nuts",
          time: "3:30 PM",
          calories: 180,
          protein: 15,
          prepTime: 2,
          difficulty: "Easy",
          ingredients: ["Greek yogurt", "Mixed nuts", "Honey"],
        },
        {
          type: "dinner",
          name: "Grilled Salmon with Vegetables",
          time: "7:00 PM",
          calories: 480,
          protein: 35,
          prepTime: 25,
          difficulty: "Medium",
          ingredients: ["Salmon fillet", "Broccoli", "Sweet potato", "Olive oil", "Herbs"],
        },
      ],
    },
  }

  const recommendations = [
    {
      title: "High Protein Breakfast",
      description: "Start your day with 25g+ protein to boost metabolism",
      recipes: ["Protein Smoothie Bowl", "Egg White Omelet", "Greek Yogurt Parfait"],
    },
    {
      title: "Anti-Inflammatory Foods",
      description: "Include omega-3 rich foods to reduce inflammation",
      recipes: ["Salmon with Quinoa", "Chia Seed Pudding", "Walnut Salad"],
    },
    {
      title: "Low Sodium Options",
      description: "Based on your health report, try these low-sodium meals",
      recipes: ["Herb-Crusted Chicken", "Fresh Vegetable Soup", "Quinoa Buddha Bowl"],
    },
  ]

  const shoppingList = [
    { category: "Proteins", items: ["Salmon fillet", "Greek yogurt", "Protein powder", "Eggs"] },
    { category: "Vegetables", items: ["Broccoli", "Sweet potato", "Cucumber", "Tomatoes"] },
    { category: "Grains", items: ["Quinoa", "Oats", "Brown rice"] },
    { category: "Fruits", items: ["Banana", "Berries", "Avocado"] },
    { category: "Pantry", items: ["Olive oil", "Almond milk", "Honey", "Herbs"] },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meal Planning</h1>
        <p className="text-muted-foreground">Personalized meal recommendations based on your health goals</p>
      </div>

      <Tabs defaultValue="plan" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="plan">Today's Plan</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="recipes">Recipe Library</TabsTrigger>
          <TabsTrigger value="shopping">Shopping List</TabsTrigger>
        </TabsList>

        <TabsContent value="plan" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Today's Meal Plan
                  </CardTitle>
                  <CardDescription>Monday, January 15, 2024</CardDescription>
                </div>
                <Button size="sm" className="apple-button">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Meal
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mealPlan.today.meals.map((meal, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="capitalize">
                              <Utensils className="mr-1 h-3 w-3" />
                              {meal.type}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {meal.time}
                            </div>
                          </div>
                          <h3 className="font-semibold text-lg mb-1">{meal.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span>{meal.calories} kcal</span>
                            <span>{meal.protein}g protein</span>
                            <span>{meal.prepTime} min prep</span>
                            <Badge variant="secondary" className="text-xs">
                              {meal.difficulty}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {meal.ingredients.slice(0, 3).map((ingredient, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {ingredient}
                              </Badge>
                            ))}
                            {meal.ingredients.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{meal.ingredients.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <ChefHat className="mr-2 h-4 w-4" />
                            Cook
                          </Button>
                          <Button size="sm" variant="outline">
                            <Bookmark className="mr-2 h-4 w-4" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Daily Nutrition Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1,400</div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                  <div className="text-xs text-green-600">Target: 1,800</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">93g</div>
                  <div className="text-sm text-muted-foreground">Protein</div>
                  <div className="text-xs text-green-600">Target: 120g</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">165g</div>
                  <div className="text-sm text-muted-foreground">Carbs</div>
                  <div className="text-xs text-green-600">Target: 200g</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">52g</div>
                  <div className="text-sm text-muted-foreground">Fat</div>
                  <div className="text-xs text-green-600">Target: 70g</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {rec.recipes.map((recipe, i) => (
                      <Card key={i} className="border-dashed">
                        <CardContent className="pt-4 text-center">
                          <ChefHat className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <h4 className="font-medium">{recipe}</h4>
                          <Button size="sm" variant="outline" className="mt-2">
                            View Recipe
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recipes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recipe Library</CardTitle>
              <CardDescription>Curated recipes based on your dietary preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <ChefHat className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Recipe Library Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  We're building a comprehensive library of healthy recipes tailored to your needs.
                </p>
                <Button className="apple-button">
                  <Plus className="mr-2 h-4 w-4" />
                  Request Recipe
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shopping" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Shopping List
                  </CardTitle>
                  <CardDescription>Based on your meal plan for this week</CardDescription>
                </div>
                <Button size="sm" className="apple-button">
                  Export List
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {shoppingList.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-3 text-primary">{category.category}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {category.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded border">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
