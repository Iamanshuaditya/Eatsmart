 "use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  Clock,
  Utensils,
  TrendingUp,
  BarChart3,
  Eye
} from "lucide-react";

// One‑UI primitives
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/**
 * HistoryPage – displays the userʼs logged meals and summary analytics.
 * UI tuned to match the gradient/rounded‑glass dashboard theme and now
 * wrapped in generous padding on all sides ▸ `px‑4 sm:px‑6 lg:px‑8 pt‑6 pb‑12`.
 */
export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  /** Demo data – replace with API hook later */
  const mealHistory = [
    {
      id: 1,
      name: "Grilled Chicken Salad",
      date: "2024-01-15",
      time: "12:30 PM",
      calories: 320,
      healthScore: 85,
      type: "lunch",
      image:
        "https://res.cloudinary.com/dvfk4g3wh/image/upload/v1749916245/69079e7c-0444-4b50-9668-2df2dbd21ba1_jmsejy.png"
    },
    {
      id: 2,
      name: "Oatmeal with Berries",
      date: "2024-01-15",
      time: "8:00 AM",
      calories: 280,
      healthScore: 92,
      type: "breakfast",
      image:
        "https://res.cloudinary.com/dvfk4g3wh/image/upload/v1749916245/69079e7c-0444-4b50-9668-2df2dbd21ba1_jmsejy.png"
    },
    {
      id: 3,
      name: "Salmon with Quinoa",
      date: "2024-01-14",
      time: "7:00 PM",
      calories: 450,
      healthScore: 88,
      type: "dinner",
      image:
        "https://res.cloudinary.com/dvfk4g3wh/image/upload/v1749916245/69079e7c-0444-4b50-9668-2df2dbd21ba1_jmsejy.png"
    },
    {
      id: 4,
      name: "Greek Yogurt Parfait",
      date: "2024-01-14",
      time: "3:00 PM",
      calories: 180,
      healthScore: 78,
      type: "snack",
      image:
        "https://res.cloudinary.com/dvfk4g3wh/image/upload/v1749916245/69079e7c-0444-4b50-9668-2df2dbd21ba1_jmsejy.png"
    },
    {
      id: 5,
      name: "Vegetable Stir Fry",
      date: "2024-01-14",
      time: "12:00 PM",
      calories: 350,
      healthScore: 90,
      type: "lunch",
      image:
        "https://res.cloudinary.com/dvfk4g3wh/image/upload/v1749916245/69079e7c-0444-4b50-9668-2df2dbd21ba1_jmsejy.png"
    }
  ];

  const weeklyStats = {
    totalMeals: 21,
    avgCalories: 1850,
    avgHealthScore: 84,
    topFoods: ["Grilled Chicken", "Quinoa", "Avocado", "Salmon"]
  };

  /**
   * Memoise filtering so we donʼt recompute on every re‑render.
   */
  const filteredMeals = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return mealHistory.filter(({ name, type }) => {
      const matchesSearch = name.toLowerCase().includes(search);
      const matchesFilter = selectedFilter === "all" || type === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter]);

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      {/* Page header */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Meal History</h1>
        <p className="text-muted-foreground">
          Track your nutrition journey over time
        </p>
      </header>

      <Tabs defaultValue="meals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="meals">Meal History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* ───────────────────────────────── Meals Tab */}
        <TabsContent value="meals" className="space-y-4">
          {/* Search & Filters */}
          <Card className="one-ui-card">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search meals…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-full"
                  />
                </div>

                {/* Filters */}
                <FilterButtons
                  selected={selectedFilter}
                  onSelect={setSelectedFilter}
                />
              </div>
            </CardContent>
          </Card>

          {/* Meal list */}
          <div className="space-y-4">
            {filteredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </TabsContent>

        {/* ───────────────────────────────── Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsGrid stats={weeklyStats} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/*───────────────────────────────────────────*
 * Sub‑components
 *──────────────────────────────────────────*/

function FilterButtons({
  selected,
  onSelect
}: {
  selected: string;
  onSelect: (val: string) => void;
}) {
  const filters = [
    { key: "all", label: "All" },
    { key: "breakfast", label: "Breakfast" },
    { key: "lunch", label: "Lunch" },
    { key: "dinner", label: "Dinner" },
    { key: "snack", label: "Snacks" }
  ];
  return (
    <div className="flex gap-2">
      {filters.map(({ key, label }) => (
        <Button
          key={key}
          size="sm"
          variant={selected === key ? "default" : "outline"}
          onClick={() => onSelect(key)}
          className="rounded-full"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

function MealCard({
  meal
}: {
  meal: {
    id: number;
    name: string;
    date: string;
    time: string;
    calories: number;
    healthScore: number;
    type: string;
    image: string;
  };
}) {
  return (
    <Card className="hover:shadow-md transition-shadow one-ui-card">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={meal.image || "/placeholder.svg"}
              alt={meal.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold leading-5">{meal.name}</h3>
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
              <div className="text-right whitespace-nowrap">
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
  );
}

function AnalyticsGrid({
  stats
}: {
  stats: {
    totalMeals: number;
    avgCalories: number;
    avgHealthScore: number;
    topFoods: string[];
  };
}) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Meals" value={stats.totalMeals} helper="This week" />
        <StatCard title="Avg Calories" value={stats.avgCalories} helper="Per day" />
        <StatCard title="Health Score" value={`${stats.avgHealthScore}%`} helper="Average" />
        <StatCard title="Streak" value="7" helper="Days tracking" />
      </div>

      <Card className="one-ui-card">
        <CardHeader>
          <CardTitle>Top Foods This Week</CardTitle>
          <CardDescription>Most frequently consumed healthy foods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {stats.topFoods.map((food, i) => (
              <Badge key={i} variant="secondary">
                {food}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trends */}
      <Card className="one-ui-card">
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
    </>
  );
}

function StatCard({
  title,
  value,
  helper
}: {
  title: string;
  value: string | number;
  helper: string;
}) {
  return (
    <Card className="one-ui-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium leading-none">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{helper}</p>
      </CardContent>
    </Card>
  );
}

function NutritionTrend({ label, values }: { label: string; values: number[] }) {
  const max = Math.max(...values);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
          <TrendingUp className="h-3 w-3" />
          +5%
        </span>
      </div>
      <div className="flex items-end gap-1 h-16">
        {values.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full bg-primary rounded-t transition-all duration-300"
              style={{ height: `${(value / max) * 100}%` }}
            />
            <span className="text-xs text-muted-foreground">{days[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
