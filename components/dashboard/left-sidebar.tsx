"use client"
import { useState, useRef, useEffect } from "react"
import { CalendarDots, CaretDoubleLeft, CaretDown, ChartPieSlice, ClockCounterClockwise, CurrencyCircleDollar, GearSix, Globe, House } from "@phosphor-icons/react"
import { chatHistoryItems, assets } from "@/lib/mock-data"
import { AssistantMode, Divider, Icon } from "./shared"

export function LeftSidebar({
  collapsed,
  onToggle,
  onAssistantClick,
  width,
  onResizeStart,
  assistantMode
}: {
  collapsed: boolean;
  onToggle: () => void;
  onAssistantClick: () => void;
  width: number;
  onResizeStart: (e: React.MouseEvent) => void;
  assistantMode: AssistantMode;
}) {
  const [isHistoryVisible, setIsHistoryVisible] = useState(true)
  const [isCollapsedHistoryOpen, setIsCollapsedHistoryOpen] = useState(false)
  const historyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
        setIsCollapsedHistoryOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
            <button onClick={onAssistantClick} className={`flex w-full justify-center rounded-[8px] px-3 py-2 cursor-pointer transition-colors ${assistantMode !== "closed" ? "bg-white/60 shadow-sm" : "hover:bg-white/40"}`} title="AI Assistant"><img src="/daisy-ai.svg" alt="Daisy AI Logo" className="size-[20px]" /></button>
          </div>

          <Divider />

          <div className="space-y-2">
            <button className="flex w-full justify-center rounded-[8px] bg-[#27251e] p-2" title="Demand"><Globe size={20} weight="light" color="white" /></button>
            <button className="flex w-full justify-center rounded-[8px] p-2 hover:bg-white/40 transition-colors" title="Supply"><ChartPieSlice size={20} weight="light" color="#6d6963" /></button>
            <button className="flex w-full justify-center rounded-[8px] p-2 hover:bg-white/40 transition-colors" title="Pre-IBP"><CurrencyCircleDollar size={20} weight="light" color="#6d6963" /></button>
            <button className="flex w-full justify-center rounded-[8px] p-2 hover:bg-white/40 transition-colors" title="Master Schedule"><CalendarDots size={20} weight="light" color="#6d6963" /></button>
          </div>

          <Divider />

          <div className="relative space-y-2" ref={historyRef}>
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
          <button onClick={onAssistantClick} className={`flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-[13px] font-medium text-[#42413c] cursor-pointer transition-colors ${assistantMode !== "closed" ? "bg-white/60 shadow-sm" : "hover:bg-white/40"}`} title="AI Assistant"> <img src="/daisy-ai.svg" alt="Daisy AI Logo" className="size-[20px]" />AI Assistant</button>
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
