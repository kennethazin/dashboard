"use client"

import { useState } from "react"

const tabs = ["Total Demand Plan", "Budget", "Baseline", "Adjustments"]

export function SubHeader() {
  const [activeTab, setActiveTab] = useState("Total Demand Plan")

  return (
    <nav className="h-[44px] border-b border-[#ebe8e4] bg-white px-8 z-20">
      <div className="flex h-full items-center gap-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative flex h-full items-center text-[13px] font-medium transition-colors cursor-pointer ${
              activeTab === tab ? "text-[#1a1a1a]" : "text-[#7a766f] hover:text-[#1a1a1a]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#1a1a1a]" />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}
