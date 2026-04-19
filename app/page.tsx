"use client"
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react"
import {
  BookOpen,
  CalendarDots,
  CaretDoubleLeft,
  CaretDown,
  CaretLeft,
  CaretRight,
  ChartPieSlice,
  ClockCounterClockwise,
  CornersIn,
  CurrencyCircleDollar,
  DotsThree,
  DownloadSimple,
  FileText,
  FlowArrow,
  GearSix,
  Globe,
  House,
  Infinity as InfinityIcon,
  Microphone,
  Package,
  PaperPlaneTilt,
  PictureInPicture,
  Plus,
  Question,
  X,
  BuildingOfficeIcon,
  ArrowClockwise,
  ShareNetwork,
  FloppyDisk,
  Layout,
  BellRinging,
  Sparkle,
} from "@phosphor-icons/react"
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"


type AssistantMode = "sidebar" | "float"

const assets = {
  sidebarLogo: "/daisy-logo.svg",
  sidebarCollapse: "https://www.figma.com/api/mcp/asset/1b35c725-a4cc-4101-a389-bb53a8451299",
  sidebarExpand: "https://www.figma.com/api/mcp/asset/5c458a0c-5759-4653-8791-c7cb3e6bd8b8",
  home: "https://www.figma.com/api/mcp/asset/3b6a3348-84d9-47ed-b2f3-184e22da4727",
  starFour: "https://www.figma.com/api/mcp/asset/f62a7a87-eba1-4385-b9e3-2b70e1d6486b",
  globe: "https://www.figma.com/api/mcp/asset/15c36962-c6cb-4a86-97c3-cfb3d921f6d7",
  chartPie: "https://www.figma.com/api/mcp/asset/d46b5f4b-00a6-4e96-b1ed-55fb2c89533b",
  dollar: "https://www.figma.com/api/mcp/asset/df4d1f4f-73ed-4f82-a730-e84f233aac82",
  calendar: "https://www.figma.com/api/mcp/asset/086a3a3f-1e11-4981-9f5b-296ae3d9ff33",
  history: "https://www.figma.com/api/mcp/asset/226c6ae9-e5f0-431e-9457-2ce1d6d9ee94",
  chevronUp: "https://www.figma.com/api/mcp/asset/db377f44-92f2-4c50-b6cc-af93c928be42",
  settings: "https://www.figma.com/api/mcp/asset/8c78df13-b050-4761-88b5-827fd79d3dad",

  topChevron: "https://www.figma.com/api/mcp/asset/d3b9d0ab-5d64-45d3-a58f-f4c21410c131",
  topDots: "https://www.figma.com/api/mcp/asset/a4e12fda-03d8-4e7b-a54e-3b27066277ee",
  topDownload: "https://www.figma.com/api/mcp/asset/a6f1eef0-85ee-4e10-800c-f3bd9e80168d",

  question: "https://www.figma.com/api/mcp/asset/ee28275a-6c4b-4fd2-854f-0324569fceeb",
  forecastQuestion: "https://www.figma.com/api/mcp/asset/412d3b50-6135-4641-81c5-9c8dbc640d6c",
  forecastCaret: "https://www.figma.com/api/mcp/asset/0ce27d4a-576b-45e6-b9ea-19de0c4df534",
  forecastInfinity: "https://www.figma.com/api/mcp/asset/0a57d4a2-ae64-4f3a-bd28-3e6a440ff5e3",
  forecastDownload: "https://www.figma.com/api/mcp/asset/110491a7-11ef-4c7e-8645-776d4f45b9c9",
  forecastClose: "https://www.figma.com/api/mcp/asset/01d04b18-e2fa-4d5b-b425-11512bd17c94",

  planningQuestion: "https://www.figma.com/api/mcp/asset/f9ee5e79-c332-48ee-bf50-9cd3f30b5c5a",
  planningBuilding: "https://www.figma.com/api/mcp/asset/ed77b636-6e58-46bb-9e76-9437f4ba2197",
  planningCaret: "https://www.figma.com/api/mcp/asset/d66669e8-7134-4f9d-a6cd-00ca239ff06c",
  planningPackage: "https://www.figma.com/api/mcp/asset/7cbc0837-90bb-4886-ada0-f2e8c413c12c",
  pageLeft: "https://www.figma.com/api/mcp/asset/25fd3cd0-79d1-4168-9aec-991df9b3d34d",
  pageRight: "https://www.figma.com/api/mcp/asset/d2d2afd5-f66b-4b63-b1b9-646795007a45",

  chatStar: "https://www.figma.com/api/mcp/asset/25c4df6f-d803-4d7b-91bc-458aacfc9610",
  chatCaret: "https://www.figma.com/api/mcp/asset/5f6f4738-7f5c-4ff3-90a5-8a8d426612aa",
  chatPlus: "https://www.figma.com/api/mcp/asset/502e641d-34e6-40fb-aac1-9630b2266028",
  chatPip: "https://www.figma.com/api/mcp/asset/7b53a1b1-f4a1-4175-8077-691579c7c870",
  chatX: "https://www.figma.com/api/mcp/asset/de03f674-7c59-429e-8ee5-1864c3543f83",
  chatLogo: "/daisy-ai.svg",
  chatBook: "https://www.figma.com/api/mcp/asset/d3847953-252c-4dfd-80aa-366123e4e29f",
  chatFlow: "https://www.figma.com/api/mcp/asset/3ed0ede4-b5f7-4660-b019-2e0a9102bb8c",
  chatFile: "https://www.figma.com/api/mcp/asset/e6fda36f-6430-4624-b0df-99e46ce56e00",
  chatQuestion: "https://www.figma.com/api/mcp/asset/86d81bdf-70a9-4f1c-b5cf-11f18753d251",
  chatMic: "https://www.figma.com/api/mcp/asset/86ab786a-e057-402e-aa00-3abd1ae7f0da",

  floatStar: "https://www.figma.com/api/mcp/asset/25e82177-70bf-450f-a164-e48bd09d78ee",
  floatCaret: "https://www.figma.com/api/mcp/asset/376311a5-a0d5-407c-80de-d8b8055db763",
  floatPlus: "https://www.figma.com/api/mcp/asset/878b7f2a-6405-4a1d-a630-00505ac3eba2",
  floatPip: "https://www.figma.com/api/mcp/asset/03531788-320c-46e7-822c-44974c9047aa",
  floatX: "https://www.figma.com/api/mcp/asset/daf1854f-543c-4334-9859-20440289d97c",
  floatMic: "https://www.figma.com/api/mcp/asset/b1568846-09b9-4413-9d5f-c8014ab16025",
}

const overviewDataSets: Record<string, any[]> = {
  "1Y": [
    { month: "Jul 25", totalDemand: 8200, budget: 8500 },
    { month: "Aug 25", totalDemand: 8500, budget: 8600 },
    { month: "Sep 25", totalDemand: 7800, budget: 8000 },
    { month: "Oct 25", totalDemand: 8100, budget: 8200 },
    { month: "Nov 25", totalDemand: 9200, budget: 9000 },
    { month: "Dec 25", totalDemand: 9800, budget: 9500 },
    { month: "Jan 26", totalDemand: 9000, budget: 9500 },
    { month: "Feb 26", totalDemand: 8000, budget: 8500 },
    { month: "Mar 26", totalDemand: 7700, budget: 8200 },
    { month: "Apr 26", totalDemand: 7400, budget: 7700 },
    { month: "May 26", totalDemand: 8300, budget: 8400 },
    { month: "Jun 26", totalDemand: 9000, budget: 9500 },
  ],
  "6M": [
    { month: "Jan 26", totalDemand: 9000, budget: 9500 },
    { month: "Feb 26", totalDemand: 8000, budget: 8500 },
    { month: "Mar 26", totalDemand: 7700, budget: 8200 },
    { month: "Apr 26", totalDemand: 7400, budget: 7700 },
    { month: "May 26", totalDemand: 8300, budget: 8400 },
    { month: "Jun 26", totalDemand: 9000, budget: 9500 },
  ],
  "3M": [
    { month: "Apr 26", totalDemand: 7400, budget: 7700 },
    { month: "May 26", totalDemand: 8300, budget: 8400 },
    { month: "Jun 26", totalDemand: 9000, budget: 9500 },
  ],
  "4W": [
    { month: "W23", totalDemand: 1800, budget: 2000 },
    { month: "W24", totalDemand: 2100, budget: 2100 },
    { month: "W25", totalDemand: 2300, budget: 2200 },
    { month: "W26", totalDemand: 1950, budget: 2150 },
  ],
  "1W": [
    { month: "Mon", totalDemand: 300, budget: 320 },
    { month: "Tue", totalDemand: 350, budget: 330 },
    { month: "Wed", totalDemand: 280, budget: 310 },
    { month: "Thu", totalDemand: 320, budget: 310 },
    { month: "Fri", totalDemand: 410, budget: 350 },
  ]
}

const forecastDataSets: Record<string, any[]> = {
  "1Y": [
    { month: "Jan 2026", s1A: 550, s2A: 380, s3A: 180, s1F: null, s2F: null, s3F: null },
    { month: "Feb 2026", s1A: 520, s2A: 360, s3A: 160, s1F: null, s2F: null, s3F: null },
    { month: "Mar 2026", s1A: 580, s2A: 400, s3A: 200, s1F: null, s2F: null, s3F: null },
    { month: "Apr 2026", s1A: 600, s2A: 420, s3A: 220, s1F: null, s2F: null, s3F: null },
    { month: "May 2026", s1A: 615, s2A: 430, s3A: 230, s1F: null, s2F: null, s3F: null },
    { month: "Jun 2026", s1A: 635, s2A: 445, s3A: 245, s1F: null, s2F: null, s3F: null },
    { month: "Jul 2026", s1A: 680, s1F: 680, s2A: 476, s2F: 476, s3A: 332, s3F: 332 },
    { month: "Aug 2026", s1A: null, s1F: 645, s2A: null, s2F: 450, s3A: null, s3F: 270 },
    { month: "Sep 2026", s1A: null, s1F: 610, s2A: null, s2F: 430, s3A: null, s3F: 240 },
    { month: "Oct 2026", s1A: null, s1F: 650, s2A: null, s2F: 440, s3A: null, s3F: 280 },
    { month: "Nov 2026", s1A: null, s1F: 620, s2A: null, s2F: 420, s3A: null, s3F: 230 },
    { month: "Dec 2026", s1A: null, s1F: 598, s2A: null, s2F: 405, s3A: null, s3F: 186 },
  ],
  "6M": [
    { month: "Mar 2026", s1A: 580, s2A: 400, s3A: 200, s1F: null, s2F: null, s3F: null },
    { month: "Apr 2026", s1A: 600, s2A: 420, s3A: 220, s1F: null, s2F: null, s3F: null },
    { month: "May 2026", s1A: 615, s2A: 430, s3A: 230, s1F: null, s2F: null, s3F: null },
    { month: "Jun 2026", s1A: 635, s2A: 445, s3A: 245, s1F: null, s2F: null, s3F: null },
    { month: "Jul 2026", s1A: 680, s1F: 680, s2A: 476, s2F: 476, s3A: 332, s3F: 332 },
    { month: "Aug 2026", s1A: null, s1F: 645, s2A: null, s2F: 450, s3A: null, s3F: 270 },
  ],
  "3M": [
    { month: "May 2026", s1A: 615, s2A: 430, s3A: 230, s1F: null, s2F: null, s3F: null },
    { month: "Jun 2026", s1A: 635, s2A: 445, s3A: 245, s1F: null, s2F: null, s3F: null },
    { month: "Jul 2026", s1A: 680, s1F: 680, s2A: 476, s2F: 476, s3A: 332, s3F: 332 },
  ],
  "4W": [
    { month: "Week 25", s1A: 640, s2A: 450, s3A: 290, s1F: null, s2F: null, s3F: null },
    { month: "Week 26", s1A: 660, s2A: 460, s3A: 310, s1F: null, s2F: null, s3F: null },
    { month: "Week 27", s1A: 680, s1F: 680, s2A: 476, s2F: 476, s3A: 332, s3F: 332 },
    { month: "Week 28", s1A: null, s1F: 670, s2A: null, s2F: 465, s3A: null, s3F: 320 },
  ],
  "1W": [
    { month: "Sun", s1A: 660, s2A: 465, s3A: 315, s1F: null, s2F: null, s3F: null },
    { month: "Mon", s1A: 670, s2A: 470, s3A: 320, s1F: null, s2F: null, s3F: null },
    { month: "Tue", s1A: 680, s1F: 680, s2A: 476, s2F: 476, s3A: 332, s3F: 332 },
  ]
}

const planningItems = [
  { name: "Cheddar Mild 20kg Block", shortName: "Cheddar Mild", values: ["2.9k", "2.7k", "2.7k", "2.6k", "2.8k", "3.0k"] },
  { name: "Cheddar Mature 20kg Block", shortName: "Cheddar Mature", values: ["1.5k", "1.4k", "1.6k", "1.5k", "1.7k", "1.8k"] },
  { name: "Butter Unsalted Block", shortName: "Butter Unsalted Block", values: ["4.2k", "4.0k", "4.1k", "4.3k", "4.5k", "4.4k"] },
  { name: "SMP Medium Heat", shortName: "SMP Medium Heat", values: ["800", "750", "820", "810", "850", "880"] },
  { name: "WPC80 Instant", shortName: "WPC80 Instant", values: ["1.2k", "1.1k", "1.3k", "1.2k", "1.4k", "1.5k"] },
  { name: "Rennet Casein", shortName: "Rennet Casein", values: ["500", "480", "520", "510", "550", "580"] },
]

const productColors = ["#4f855f", "#86bd97", "#284c33", "#d9d6cf", "#6f6b65", "#42413c"]

const chatHistoryItems = [
  "Forecast analysis for Q3 2026",
  "Butter Unsalted inventory performance",
  "SKU demand vs budget comparison",
  "Historical price trend for Cheddar",
]

function Icon({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  return <img src={src} alt={alt} className={className} />
}

function MobileOverlay() {
  return (
    <div className="fixed inset-0 z-[1000] hidden flex-col items-center justify-center bg-white/70 px-8 text-center backdrop-blur-xl max-[650px]:flex">
      <div className="flex max-w-[320px] flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#86bd97]/20" />
          <img src="/daisy-logo.svg" alt="Daisy Logo" className="relative size-20" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-[#27251e]">Desktop View Required</h2>
          <p className="text-sm leading-relaxed text-[#6d6963]">
            This daisy-demo is tailored for professional desktop resolutions to ensure full visibility of data and AI interactions.
          </p>
        </div>
        <div className="h-px w-12 bg-[#ebe8e4]" />
      </div>
    </div>
  )
}

function Divider({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-divider ${className}`} />
}

function RangeSwitch({ items, selected, onSelect }: { items: string[]; selected?: string; onSelect?: (item: string) => void }) {
  return (
    <div className="flex items-center pr-px">
      {items.map((item, idx) => (
        <button
          key={item}
          onClick={() => onSelect?.(item)}
          className={`-mr-px flex h-[34px] w-[34px] items-center justify-center border border-[#f5f5f5] text-[10px] leading-[18px] cursor-pointer transition-colors ${selected === item ? "bg-[#27251e] text-white border-[#27251e] z-10" : "bg-white text-[#42413c] hover:bg-[#fcfcfc]"} ${idx === 0 ? "rounded-l-[8px]" : ""} ${idx === items.length - 1 ? "rounded-r-[8px]" : ""}`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-[8px] border border-[#e7e3dd] bg-white px-3 py-2 text-[11px] shadow-sm">
      <p className="mb-1 text-[12px] font-medium text-[#303030]">{label}</p>
      {payload.map((item) => (
        <p key={item.name} className="flex items-center gap-1 text-[#55524d]">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          {item.name}: {item.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

function DemandOverviewCard() {
  const [duration, setDuration] = useState("1Y")
  const data = overviewDataSets[duration]

  return (
    <article className="overflow-hidden rounded-[12px] bg-white p-6">
      <div className="mb-4 flex items-end justify-between">
        <div className="space-y-[2px]">
          <div className="flex items-center gap-1">
            <h3 className="text-[16px] font-medium leading-none text-black">Demand Overview</h3>
            <Question size={16} weight="light" color="#6f6b65" />
          </div>
          <p className="text-[10px] text-black/56">Monthly demand vs budget across the selected product</p>
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

function ForecastCard() {
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
          <p className="text-[10px] text-black/56">Track demand performance and forecasted movement overtime</p>
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
            <button className="flex h-[34px] items-center gap-1 rounded-[8px] border border-[#f5f5f5] px-3 text-[10px] text-[#42413c] cursor-default">
              <InfinityIcon size={16} weight="light" color="#42413c" /> CI
            </button>
            <button className="flex h-[34px] w-[34px] items-center justify-center rounded-[8px] border border-[#f5f5f5] cursor-default"><DownloadSimple size={16} weight="light" color="#42413c" /></button>
            <button className="flex h-[34px] items-center gap-1 rounded-[8px] border border-[#f5f5f5] px-3 text-[10px] text-[#42413c] cursor-default"><CornersIn size={16} weight="light" color="#42413c" /> Close</button>
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

function PlanningCard({ selectedProduct }: { selectedProduct: string }) {
  return (
    <article className="overflow-hidden rounded-[12px] border border-[#fafafa] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="space-y-[2px]">
          <div className="flex items-center gap-1">
            <h3 className="text-[16px] font-medium leading-none text-black">Demand Assumption Planning</h3>
            <Question size={16} weight="light" color="#6f6b65" />
          </div>
          <p className="text-[10px] text-black/56">View and adjust demand overlays per SKU</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-[34px] items-center gap-4 rounded-[8px] border border-[#f5f5f5] px-3 text-[12px] text-[#42413c] cursor-default"><span className="flex items-center gap-2"><BuildingOfficeIcon size={16} weight="light" color="#42413c" />All accounts</span><CaretDown size={12} weight="light" color="#6f6b65" /></button>
          <button className="flex h-[34px] items-center gap-4 rounded-[8px] border border-[#f5f5f5] px-3 text-[12px] text-[#42413c] cursor-default"><span className="flex items-center gap-2"><Package size={16} weight="light" color="#42413c" />All SKUs</span><CaretDown size={12} weight="light" color="#6f6b65" /></button>
        </div>
      </div>

      <div className="mb-4 flex gap-3 text-[14px] text-[#1e1e1e]">
        <button className="border-b border-black px-[14px] py-[10px]">Total Demand Plan</button>
        <button className="px-[14px] py-[10px]">Budget</button>
        <button className="px-[14px] py-[10px]">Baseline</button>
        <button className="px-[14px] py-[10px]">Adjustments</button>
      </div>

      <div className="overflow-x-auto rounded-[12px] border border-[#e5e5e5]">
        <table className="min-w-[1123px] w-full bg-white text-left">
          <thead className="bg-[#fafafa] text-[12px] uppercase leading-[18px] text-[#5e5e5e]">
            <tr>
              {["Product", "Jan", "Feb", "Apr", "May", "Jun", "Jul"].map((h) => (
                <th key={h} className="h-[44px] border-b border-[#e2e2e2] px-6 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planningItems.map((item, idx) => (
              <tr key={item.name} className={selectedProduct === item.name ? "bg-[#f5f9f6]" : ""}>
                <td className="h-[44px] border-b border-[#e2e2e2] px-6 text-[14px] leading-[1.3] text-[#1e1e1e]">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-[2px]" style={{ backgroundColor: productColors[idx % productColors.length] }} />
                    {item.shortName}
                  </div>
                </td>
                {item.values.map((value, vIdx) => (
                  <td key={`${item.name}-${vIdx}`} className="h-[52px] border-b border-[#e2e2e2] px-6 text-[14px] leading-[1.3] text-[#5e5e5e]">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-[12px] px-2 py-4">
        <div className="flex items-center gap-[12px]">
          <button className="grid size-[38px] place-items-center rounded-[10px]"><CaretLeft size={16} weight="light" color="#42413c" /></button>
          <button className="flex items-center gap-3 rounded-[8px] border border-[#c6c6c6] bg-white px-3 py-3 text-[14px] text-[#303030]">1 <CaretDown size={12} weight="light" color="#6f6b65" /></button>
          <button className="grid size-[38px] place-items-center rounded-[10px]"><CaretRight size={16} weight="light" color="#42413c" /></button>
        </div>
        <p className="text-[14px] text-black">1 - 1 of 1</p>
      </div>
    </article>
  )
}

function LeftSidebar({
  collapsed,
  onToggle,
  onAssistantClick,
  width,
  onResizeStart
}: {
  collapsed: boolean;
  onToggle: () => void;
  onAssistantClick: () => void;
  width: number;
  onResizeStart: (e: React.MouseEvent) => void
}) {
  const [isHistoryVisible, setIsHistoryVisible] = useState(true)
  const [isCollapsedHistoryOpen, setIsCollapsedHistoryOpen] = useState(false)

  if (collapsed) {
    return (
      <aside className="relative flex h-full w-[62px] shrink-0 flex-col justify-between border-r border-[#ebe8e4] bg-[#f2f0ec] px-2 pb-2 pt-6">
        <div
          onMouseDown={onResizeStart}
          className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-black/5 z-50 transition-colors"
        />
        <div className="flex min-h-0 flex-1 flex-col gap-8">
          <div className="flex w-full flex-col items-center gap-4">
            <button onClick={onToggle} className="rotate-180 p-2 cursor-pointer hover:bg-white/40 rounded-lg transition-colors" title="Expand Sidebar">
              <CaretDoubleLeft size={14} weight="light" color="#7a766f" />
            </button>
            <Icon src={assets.sidebarLogo} className="size-[38px]" />
          </div>

          <div className="space-y-2">
            <button className="flex w-full justify-center rounded-[8px] px-3 py-2 hover:bg-white/40 transition-colors" title="Home"><House size={20} weight="light" color="#6d6963" /></button>
            <button onClick={onAssistantClick} className="flex w-full justify-center rounded-[8px] px-3 py-2 cursor-pointer hover:bg-white/40 transition-colors" title="AI Assistant"><img src="/daisy-ai.svg" alt="Daisy AI Logo" className="size-[20px]" /></button>
          </div>

          <Divider />

          <div className="space-y-2">
            <button className="flex w-full justify-center rounded-[8px] bg-[#27251e] p-2" title="Demand"><Globe size={20} weight="light" color="white" /></button>
            <button className="flex w-full justify-center rounded-[8px] p-2 hover:bg-white/40 transition-colors" title="Supply"><ChartPieSlice size={20} weight="light" color="#6d6963" /></button>
            <button className="flex w-full justify-center rounded-[8px] p-2 hover:bg-white/40 transition-colors" title="Pre-IBP"><CurrencyCircleDollar size={20} weight="light" color="#6d6963" /></button>
            <button className="flex w-full justify-center rounded-[8px] p-2 hover:bg-white/40 transition-colors" title="Master Schedule"><CalendarDots size={20} weight="light" color="#6d6963" /></button>
          </div>

          <Divider />

          <div className="relative space-y-2">
            <button
              onClick={() => setIsCollapsedHistoryOpen(!isCollapsedHistoryOpen)}
              className="flex w-full justify-center rounded-[8px] px-3 py-2 hover:bg-white/40 transition-colors cursor-pointer"
              title="History"
            >
              <ClockCounterClockwise size={20} weight="light" color="#6d6963" />
            </button>

            {isCollapsedHistoryOpen && (
              <div className="absolute left-full top-0 ml-2 w-64 z-[100] rounded-lg border border-[#ebe8e4] bg-white p-2 shadow-xl animate-in fade-in slide-in-from-left-1">
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#9a9a9a]">Recent History</p>
                <div className="space-y-1">
                  {chatHistoryItems.map((item) => (
                    <button key={item} onClick={() => setIsCollapsedHistoryOpen(false)} className="w-full truncate px-3 py-2 text-left text-[12px] hover:bg-[#f5f5f5] rounded-md text-[#6d6963] transition-colors">
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="h-6 rounded-[8px]" />
            <div className="h-6 rounded-[8px]" />
            <div className="h-6 rounded-[8px]" />
            <div className="h-6 rounded-[8px]" />
          </div>
        </div>

        <button className="flex w-full justify-center rounded-[8px] px-3 py-2 hover:bg-white/40 transition-colors" title="Settings"><GearSix size={20} weight="light" color="#6d6963" /></button>
      </aside>
    )
  }

  return (
    <aside
      className="relative flex h-full shrink-0 flex-col justify-between border-r border-[#ebe8e4] bg-[#f2f0ec] p-2 overflow-hidden"
      style={{ width: `${width}px` }}
    >
      <div
        onMouseDown={onResizeStart}
        className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-black/5 z-50 transition-colors"
      />
      <div className="flex min-h-0 flex-1 flex-col gap-8">
        <div className="flex items-center justify-between">
          <Icon src={assets.sidebarLogo} className="size-[38px]" />
          <button onClick={onToggle} className="p-2 cursor-pointer hover:bg-white/40 rounded-lg transition-colors" title="Collapse Sidebar">
            <CaretDoubleLeft size={14} weight="light" color="#7a766f" />
          </button>
        </div>

        <div className="space-y-2">
          <button className="flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-[13px] font-medium text-[#42413c] hover:bg-white/40 transition-colors" title="Home"><House size={20} weight="light" color="#6d6963" />Home</button>
          <button onClick={onAssistantClick} className="flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-[13px] font-medium text-[#42413c] cursor-pointer hover:bg-white/40 transition-colors" title="AI Assistant"> <img src="/daisy-ai.svg" alt="Daisy AI Logo" className="size-[20px]" />AI Assistant</button>
        </div>

        <Divider />

        <div className="space-y-2">
          <button className="flex w-full items-center gap-2 rounded-[8px] bg-[#27251e] px-3 py-2 text-[13px] font-medium text-white hover:bg-[#1a1a1a] transition-colors"><Globe size={20} weight="light" color="white" />Demand</button>
          <button className="flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-[13px] font-medium text-[#42413c] hover:bg-white/40 transition-colors"><ChartPieSlice size={20} weight="light" color="#6d6963" />Supply</button>
          <button className="flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-[13px] font-medium text-[#42413c] hover:bg-white/40 transition-colors"><CurrencyCircleDollar size={20} weight="light" color="#6d6963" />Pre-IBP</button>
          <button className="flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-[13px] font-medium text-[#42413c] hover:bg-white/40 transition-colors"><CalendarDots size={20} weight="light" color="#6d6963" />Master Schedule</button>
        </div>

        <Divider />

        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar">
          <button
            onClick={() => setIsHistoryVisible(!isHistoryVisible)}
            className="mb-2 flex w-full items-center justify-between rounded-[8px] px-3 py-2 hover:bg-white/40 transition-colors cursor-pointer group text-left"
            title={isHistoryVisible ? "Hide History" : "Show History"}
          >
            <p className="text-[13px] font-medium text-[#42413c]">History</p>
            <CaretDown size={12} weight="light" color="#7a766f" className={`transition-transform duration-200 ${isHistoryVisible ? "rotate-0" : "-rotate-90"}`} />
          </button>

          {isHistoryVisible && (
            <div className="space-y-1 animate-in slide-in-from-top-1 fade-in duration-200">
              {chatHistoryItems.map((line) => (
                <p key={line} className="truncate px-3 py-1 text-[12px] text-[#6e6c66] hover:text-[#27251e] cursor-pointer transition-colors" title={line}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      <button className="flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-[14px] font-medium text-[#42413c] hover:bg-white/40 transition-colors" title="Settings"><GearSix size={20} weight="light" color="#6d6963" />Settings</button>
    </aside>
  )
}

function CenterHeader({ selectedProduct, onSelect }: { selectedProduct: string; onSelect: (name: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  return (
    <header className="relative h-[58px] border-b border-[#ebe8e4] bg-white px-4 py-3 z-30">
      <div className="mx-auto flex h-full w-full items-center justify-between">
        <div className="space-y-[2px] leading-none">
          <p className="text-[12px] font-medium text-black">Demand</p>
          <p className="text-[10px] text-black/56">Week 15, April 2026</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-4 text-[12px] font-medium text-black cursor-pointer"
          >
            {selectedProduct}
            <CaretDown size={12} weight="light" color="#6f6b65" className={isOpen ? "rotate-180 transition-transform" : "transition-transform"} />
          </button>

          {isOpen && (
            <div className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 rounded-lg border border-[#ebe8e4] bg-white p-1 shadow-lg">
              {planningItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onSelect(item.name)
                    setIsOpen(false)
                  }}
                  className={`flex w-full items-center px-3 py-2 text-left text-[12px] hover:bg-[#f5f5f5] rounded-md ${selectedProduct === item.name ? "bg-[#f5f5f5] font-medium" : ""}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
              className="grid size-8 place-items-center rounded-full hover:bg-[#f5f5f5] transition-colors cursor-pointer"
              title="Dashboard Options"
            >
              <DotsThree size={20} weight="light" color="#7a766f" />
            </button>

            {isOptionsOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-[#ebe8e4] bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-1">
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#9a9a9a]">Dashboard Settings</p>
                <div className="space-y-1">
                  {[
                    { label: "Refresh Data", icon: <ArrowClockwise size={16} /> },
                    { label: "Share View", icon: <ShareNetwork size={16} /> },
                  ].map((opt) => (
                    <button key={opt.label} onClick={() => setIsOptionsOpen(false)} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-[#f5f5f5] transition-colors cursor-pointer">
                      <div className="text-[#6f6b65]">{opt.icon}</div>
                      <span className="text-[12px] font-medium text-[#1a1a1a]">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative grid size-8 place-items-center rounded-full hover:bg-[#f5f5f5] transition-colors cursor-pointer"
              title="Notifications"
            >
              <BellRinging size={20} weight="light" color="#7a766f" />
              <div className="absolute right-1 top-1 size-2 rounded-full bg-[#069668] ring-2 ring-white" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-[340px] rounded-xl border border-[#ebe8e4] bg-white p-2 shadow-2xl animate-in fade-in slide-in-from-top-1 z-50">
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#f5f5f5] mb-2">
                  <div className="flex items-center gap-2">
                    <img src="/daisy-ai.svg" alt="Daisy AI Logo" className="size-4" />
                    <p className="text-[12px] font-bold text-[#1a1a1a]">Daisy AI Insights</p>
                  </div>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-[#f5f5f5] text-[#7a766f]">3 New</span>
                </div>

                <div className="space-y-1">
                  {[
                    {
                      title: "Critical Stock Warning",
                      msg: "Butter Unsalted projected to hit zero in 12 days.",
                      type: "warning"
                    },
                    {
                      title: "Demand Spike Detected",
                      msg: "Heavy Cream demand is 18% above Q3-26 forecast.",
                      type: "info"
                    },
                    {
                      title: "Cost Opportunity",
                      msg: "Milk Class III futures dropped 4.2% today.",
                      type: "success"
                    }
                  ].map((note, i) => (
                    <div key={i} className="group p-3 rounded-lg hover:bg-[#f9fafb] transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`mt-1.5 size-1.5 shrink-0 rounded-full ${note.type === 'warning' ? 'bg-red-500' : note.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
                        <div className="space-y-0.5">
                          <p className="text-[13px] font-semibold text-[#111827]">{note.title}</p>
                          <p className="text-[11px] text-[#4b5563] leading-relaxed">{note.msg}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="flex items-center gap-3 rounded-[8px] border border-[#f5f5f5] bg-[#27251e] px-3 py-2 text-[12px] text-white cursor-pointer"
            >
              <DownloadSimple size={16} weight="light" color="white" />Export
            </button>

            {isExportOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-lg border border-[#ebe8e4] bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1">
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#9a9a9a]">Export Options</p>
                <div className="space-y-1">
                  {[
                    { label: "Detailed SKU Breakdown", desc: "Excel (.xlsx) for SKU planning", icon: <FileText size={16} /> },
                    { label: "Supply Chain Raw Data", desc: "CSV format for logistics modeling", icon: <DownloadSimple size={16} /> },
                  ].map((opt) => (
                    <button key={opt.label} onClick={() => setIsExportOpen(false)} className="flex w-full items-start gap-3 rounded-md px-3 py-2 text-left hover:bg-[#f5f5f5] transition-colors cursor-pointer">
                      <div className="mt-0.5 text-[#6f6b65]">{opt.icon}</div>
                      <div>
                        <p className="text-[12px] font-medium text-[#1a1a1a]">{opt.label}</p>
                        <p className="text-[10px] text-[#7a766f]">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="h-[29px] w-px bg-divider" />
          <div className="grid size-8 place-items-center rounded-[32px] bg-[#ccf3d8] text-[12px] font-medium text-[#413f3f]">KR</div>
        </div>
      </div>
    </header>
  )
}

function ChatSidebar({
  onFloat,
  chatInput,
  setChatInput,
}: {
  onFloat: () => void
  chatInput: string
  setChatInput: (value: string) => void
}) {
  const [historyOpen, setHistoryOpen] = useState(false)
  return (
    <aside className="relative flex h-full w-[320px] shrink-0 flex-col justify-between border-l border-[#ebe8e4] bg-white p-4">
      <div className="flex min-h-0 flex-1 flex-col justify-between">
        <div className="flex items-center justify-between rounded-[8px] bg-white py-2">
          <div className="flex items-center gap-4">
            <img src="/daisy-ai.svg" alt="Daisy AI Logo" className="size-[20px]" />
            <div className="relative">
              <button
                onClick={() => setHistoryOpen(!historyOpen)}
                className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                title="View History"
              >
                <p className="text-[14px] font-medium text-[#42413c]">New chat</p>
                <CaretDown size={16} weight="light" color="#6f6b65" className={historyOpen ? "rotate-180" : ""} />
              </button>

              {historyOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 z-50 rounded-lg border border-[#ebe8e4] bg-white p-1 shadow-lg">
                  {chatHistoryItems.map((item) => (
                    <button key={item} onClick={() => setHistoryOpen(false)} className="w-full truncate px-3 py-2 text-left text-[12px] hover:bg-[#f5f5f5] rounded-md text-[#6d6963]">
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="cursor-pointer hover:opacity-70" title="New Chat">
              <Plus size={20} weight="light" color="#42413c" />
            </button>
            <button onClick={onFloat} className="cursor-pointer hover:opacity-70" title="Floating Mode">
              <PictureInPicture size={20} weight="light" color="#42413c" />
            </button>
            <button className="cursor-pointer hover:opacity-70" title="Close Assistant">
              <X size={20} weight="light" color="#42413c" />
            </button>
          </div>
        </div>

        <div className="pb-8">
          <Icon src={assets.chatLogo} className="size-[38px]" />
          <h2 className="mt-4 w-[300px] text-[19px] font-medium text-[#42413c]">What would you like to know about demand?</h2>
          <div className="mt-4 space-y-1">
            <button className="flex w-full items-center gap-2 rounded-[8px] pb-2 pr-[14px] pt-1 text-[14px] text-[#42413c]"><BookOpen size={20} weight="light" color="#42413c" /><span>Explain</span></button>
            <button className="flex w-full items-center gap-2 rounded-[8px] pb-2 pr-[14px] pt-1 text-[14px] text-[#42413c]"><FlowArrow size={20} weight="light" color="#42413c" /><span>Optimise</span></button>
            <button className="flex w-full items-center gap-2 rounded-[8px] pb-2 pr-[14px] pt-1 text-[14px] text-[#42413c]"><FileText size={20} weight="light" color="#42413c" /><span>Report</span></button>
            <button className="flex w-full items-center gap-2 rounded-[8px] pb-2 pr-[14px] pt-1 text-[14px] text-[#42413c]"><Question size={20} weight="light" color="#42413c" /><span>Help</span></button>
          </div>
        </div>
      </div>

      <div className="flex h-[171px] flex-col justify-between rounded-[12px] border border-[#f3efeb] p-3">
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="w-full bg-transparent text-[14px] text-[#27251E] outline-none placeholder:text-[#6e6e6e]"
          placeholder="Ask Daisy anything about your data..."
        />
        <div className="flex justify-end">
          {chatInput.trim().length > 0 ? (
            <button aria-label="Send message" className="grid place-items-center rounded-[8px] p-1 text-[#27251E] cursor-pointer">
              <PaperPlaneTilt size={17} weight="fill" />
            </button>
          ) : (
            <Microphone size={17} weight="fill" color="#27251E" />
          )}
        </div>
      </div>
    </aside>
  )
}

function FloatingAssistantDock({
  onSidebar,
  chatInput,
  setChatInput,
}: {
  onSidebar: () => void
  chatInput: string
  setChatInput: (value: string) => void
}) {
  const [historyOpen, setHistoryOpen] = useState(false)
  return (
    <div className="fixed bottom-5 right-5 z-[50] w-[392px] rounded-[12px] border border-white/10 bg-[#42413c] p-1 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between rounded-[10px] bg-[#42413c] px-3 py-2">
        <div className="flex items-center gap-4">
          <img src="/daisy-ai.svg" alt="Daisy AI Logo" className="size-[20px] brightness-0 invert" />
          <div className="relative">
            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors"
              title="View History"
            >
              <p className="text-[14px] font-medium text-white">New chat</p>
              <CaretDown size={16} weight="light" color="#e6e1d8" className={historyOpen ? "rotate-180" : ""} />
            </button>

            {historyOpen && (
              <div className="absolute left-0 bottom-full mb-2 w-64 z-50 rounded-lg border border-white/10 bg-[#42413c] p-1 shadow-2xl">
                {chatHistoryItems.map((item) => (
                  <button key={item} onClick={() => setHistoryOpen(false)} className="w-full truncate px-3 py-2 text-left text-[12px] hover:bg-white/10 rounded-md text-[#e6e1d8]">
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="cursor-pointer hover:opacity-70" title="New Chat">
            <Plus size={20} weight="light" color="white" />
          </button>
          <button onClick={onSidebar} className="cursor-pointer hover:opacity-70" title="Dock to Sidebar">
            <PictureInPicture size={20} weight="light" color="white" />
          </button>
          <button className="cursor-pointer hover:opacity-70" title="Close Assistant">
            <X size={20} weight="light" color="white" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-start justify-between gap-3 px-4 pb-4 pt-2">
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-[#acacac] pb-1"
          placeholder="How can I help?"
        />
        {chatInput.trim().length > 0 ? (
          <button aria-label="Send message" className="grid place-items-center rounded-[8px] p-1 text-white cursor-pointer">
            <PaperPlaneTilt size={17} weight="fill" />
          </button>
        ) : (
          <Microphone size={17} weight="fill" color="white" />
        )}
      </div>
    </div>
  )
}

export default function Page() {
  const [collapsed, setCollapsed] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(204)
  const [isResizing, setIsResizing] = useState(false)
  const [assistantMode, setAssistantMode] = useState<AssistantMode>("float")
  const [chatInput, setChatInput] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(planningItems[0].name)

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return

      let newWidth = e.clientX

      // If expanding from collapsed
      if (collapsed && newWidth > 100) {
        setCollapsed(false)
        setSidebarWidth(204)
        setIsResizing(false)
        return
      }

      if (!collapsed) {
        if (newWidth < 160) {
          setCollapsed(true)
          setSidebarWidth(62)
          setIsResizing(false)
        } else if (newWidth > 204) {
          setSidebarWidth(204)
        } else {
          setSidebarWidth(newWidth)
        }
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, collapsed])

  return (
    <main
      className={`h-screen overflow-hidden border-2 border-[#ebe8e4] bg-white text-[#42413c] [color-scheme:light] ${isResizing ? "select-none cursor-col-resize" : ""}`}
    >
      <MobileOverlay />
      <div className="relative flex h-full w-full">
        <LeftSidebar
          collapsed={collapsed}
          width={collapsed ? 62 : sidebarWidth}
          onResizeStart={handleResizeStart}
          onToggle={() => {
            if (collapsed) {
              setCollapsed(false)
              setSidebarWidth(204)
            } else {
              setCollapsed(true)
              setSidebarWidth(62)
            }
          }}
          onAssistantClick={() => setAssistantMode((m) => (m === "sidebar" ? "float" : "sidebar"))}
        />

        <section className="flex h-full flex-1 flex-col overflow-hidden">
          <CenterHeader selectedProduct={selectedProduct} onSelect={setSelectedProduct} />

          <div className="flex-1 overflow-y-auto bg-[#FBFAF9]">
            <div className="mx-auto flex w-full flex-col gap-[10px] px-8 py-8">
              <DemandOverviewCard />
              <ForecastCard />
              <PlanningCard selectedProduct={selectedProduct} />
            </div>
          </div>
        </section>

        {assistantMode === "sidebar" && (
          <ChatSidebar onFloat={() => setAssistantMode("float")} chatInput={chatInput} setChatInput={setChatInput} />
        )}
        {assistantMode === "float" && (
          <FloatingAssistantDock onSidebar={() => setAssistantMode("sidebar")} chatInput={chatInput} setChatInput={setChatInput} />
        )}
      </div>
    </main>
  )
}
