"use client"
import { useState, useMemo } from "react"
import { ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line, ResponsiveContainer } from "recharts"
import { Question } from "@phosphor-icons/react"
import { RangeSwitch, ChartTooltip } from "./shared"
import { planningItems, planningMonths } from "@/lib/mock-data"

export function DemandOverviewCard({ selectedProduct }: { selectedProduct: string }) {
  const [duration, setDuration] = useState("1Y")

  const data = useMemo(() => {
    const item = planningItems.find(p => p.name === selectedProduct) || planningItems[0]

    return item.values.map((val, i) => {
      const parsed = parseFloat(val.replace("k", "")) * (val.includes("k") ? 1000 : 1)
      const monthLabel = planningMonths[i] || `M${i + 1}`
      return {
        month: monthLabel,
        totalDemand: parsed,
        budget: parsed * 0.95 + (Math.sin(i) * 500)
      }
    })
  }, [selectedProduct])

  return (
    <article className="overflow-hidden rounded-[12px] bg-white p-6 transition-all border border-transparent hover:border-[#ebe8e4]">
      <div className="mb-4 flex items-start justify-between">
        <div className="space-y-[6px]">
          <div className="flex items-center gap-2">
            <h3 className="text-[16px] font-medium leading-none text-black">Demand Overview</h3>
            <Question size={16} weight="light" color="#6f6b65" />
          </div>
          <p className="text-[11px] text-black/56">Monthly demand vs budget across the selected product</p>
        </div>
        <RangeSwitch items={["1W", "4W", "3M", "6M", "1Y"]} selected={duration} onSelect={setDuration} />
      </div>

      <div className="h-[292px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 24 }}>
            <CartesianGrid vertical={false} stroke="#f0efec" />
            <XAxis dataKey="month" tick={{ fill: "#737373", fontSize: 12 }} tickLine={false} axisLine={false} dy={8} />
            <YAxis
              domain={[0, "auto"]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#737373", fontSize: 12 }}
              width={45}
              tickFormatter={(v: number) => {
                if (v === 0) return "0"
                if (v >= 1000) return `${(v / 1000).toFixed(0)}K`
                return v.toString()
              }}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
            <Legend
              verticalAlign="bottom"
              align="center"
              formatter={(value) => <span className="text-[#737373]">{value}</span>}
              wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
            />
            <Bar dataKey="totalDemand" name="Total Demand" fill="#86bd97" radius={[2, 2, 2, 2]} barSize={duration === "1Y" ? 24 : 56} legendType="square" isAnimationActive animationDuration={300} />
            <Line dataKey="budget" name="Budget" type="linear" stroke="#284c33" strokeWidth={1} dot={{ r: 3.5, fill: "white", stroke: "#284c33", strokeWidth: 1 }} legendType="line" isAnimationActive animationDuration={300} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}
