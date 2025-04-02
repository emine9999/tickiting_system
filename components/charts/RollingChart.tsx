"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", Solved_Tickets: 186, Unsolved_Tickets: 80 },
  { month: "February", Solved_Tickets: 305, Unsolved_Tickets: 200 },
  { month: "March", Solved_Tickets: 237, Unsolved_Tickets: 120 },
  { month: "April", Solved_Tickets: 73, Unsolved_Tickets: 190 },
  { month: "May", Solved_Tickets: 209, Unsolved_Tickets: 130 },
  { month: "June", Solved_Tickets: 214, Unsolved_Tickets: 140 },
]
const chartConfig = {
  Unsolved_Tickets: {
    label: "Unsolved",
    color: "hsl(var(--chart-1))",
  },
  Solved_Tickets: {
    label: "Solved ",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig
export function RollingChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rolling Tikcet Stats</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className=' w-full'>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
             <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="Solved_Tickets" fill="#006BFF" radius={4} />
        <Bar dataKey="Unsolved_Tickets" fill="#BFECFF" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total Solved and Unsolved tickets for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
