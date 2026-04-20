"use client"
import { useState } from "react"
import { ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Line, ResponsiveContainer } from "recharts"
import { CaretDown, CornersIn, DownloadSimple, Infinity as InfinityIcon, Question } from "@phosphor-icons/react"
import { RangeSwitch, ChartTooltip } from "./shared"
import { forecastDataSets } from "@/lib/mock-data"

export function ForecastCard() {
  const [duration, setDuration] = useState("1Y")
  const data = forecastDataSets[duration]

  return (
    <article className="overflow-hidden rounded-[12px] bg-white p-6">
      <div className="mb-4 space-y-4">
        <div className="space-y-[2px]">
          <div className="flex items-center gap-1">
            <h3 className="text-[16px] font-medium leading-none text-black">Demand Forecast</h3>
            <Question size={16} weight="light" color="#6f6b65" />
          </div>
          <p className="text-[11px] text-black/56">Track demand performance and forecasted movement overtime</p>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-[10px]">
            <button className="flex h-[34px] items-center gap-4 rounded-[8px] border border-[#f5f5f5] px-3 text-[12px] text-[#42413c] cursor-default">
              Total demand
              <CaretDown size={12} weight="light" color="#6f6b65" />
            </button>
            <div className="flex items-center gap-1">
              <span className="text-[20px] leading-[16px] font-medium text-[#42413c]">2.0k</span>
              <span className="pt-1 text-[10px] font-light text-[#747474]">tonnes</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-[#069668]">+2.5%</span>
              <span className="pt-1 text-[10px] font-light text-[#747474]">YoY</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <RangeSwitch items={["1W", "4W", "3M", "6M", "1Y"]} selected={duration} onSelect={setDuration} />
            <button className="flex h-[34px] items-center gap-1 rounded-[8px] border border-[#f5f5f5] px-3 text-[12px] text-[#42413c] cursor-default">
              <InfinityIcon size={16} weight="light" color="#42413c" /> CI
            </button>
            <button className="flex h-[34px] w-[34px] items-center justify-center rounded-[8px] border border-[#f5f5f5] cursor-default"><DownloadSimple size={16} weight="light" color="#42413c" /></button>
            <button className="flex h-[34px] items-center gap-1 rounded-[8px] border border-[#f5f5f5] px-3 text-[12px] text-[#42413c] cursor-default"><CornersIn size={16} weight="light" color="#42413c" /> Close</button>
          </div>
        </div>
      </div>

      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#f5f5f5" />
            <XAxis dataKey="month" tick={{ fill: "#727272", fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis domain={[0, 1000]} ticks={[0, 200, 400, 600, 800, 1000]} tick={{ fill: "#525252", fontSize: 12 }} tickLine={false} axisLine={false} width={45} />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#d9d6cf", strokeDasharray: "3 3" }} />
            <defs>
              <linearGradient id="colorS1F" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f855f" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#4f855f" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area dataKey="s1F" stroke="none" fill="url(#colorS1F)" connectNulls isAnimationActive={false} />
            <Line dataKey="s1A" type="linear" name="Series 1" stroke="#4f855f" strokeWidth={2} dot={false} connectNulls animationDuration={300} />
            <Line dataKey="s1F" type="linear" name="Series 1 Forecast" stroke="#4f855f" strokeWidth={2} strokeDasharray="4 4" dot={false} connectNulls animationDuration={300} />
            <Line dataKey="s2A" type="linear" name="Series 2" stroke="#4b7a5a" strokeWidth={2} dot={false} connectNulls animationDuration={300} />
            <Line dataKey="s2F" type="linear" name="Series 2 Forecast" stroke="#4b7a5a" strokeWidth={2} strokeDasharray="4 4" dot={false} connectNulls animationDuration={300} />
            <Line dataKey="s3A" type="linear" name="Series 3" stroke="#3f6f4e" strokeWidth={2} dot={false} connectNulls animationDuration={300} />
            <Line dataKey="s3F" type="linear" name="Series 3 Forecast" stroke="#3f6f4e" strokeWidth={2} strokeDasharray="4 4" dot={false} connectNulls animationDuration={300} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}
