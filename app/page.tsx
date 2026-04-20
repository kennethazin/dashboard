"use client"

import { useState, useEffect } from "react"
import { MobileOverlay } from "@/components/dashboard/mobile-overlay"
import { LeftSidebar } from "@/components/dashboard/left-sidebar"
import { CenterHeader } from "@/components/dashboard/center-header"
import { DemandOverviewCard } from "@/components/dashboard/demand-overview-card"
import { ForecastCard } from "@/components/dashboard/forecast-card"
import { PlanningCard } from "@/components/dashboard/planning-card"
import { SubHeader } from "@/components/dashboard/sub-header"
import { ChatSidebar } from "@/components/dashboard/chat-sidebar"
import { FloatingAssistantDock } from "@/components/dashboard/floating-assistant-dock"
import { AssistantMode } from "@/components/dashboard/shared"
import { planningItems } from "@/lib/mock-data"

export default function Page() {
  const [collapsed, setCollapsed] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(204)
  const [isResizing, setIsResizing] = useState(false)
  const [assistantMode, setAssistantMode] = useState<AssistantMode>("closed")
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
          onAssistantClick={() => {
            if (assistantMode === "closed") {
              setAssistantMode("sidebar")
            } else if (assistantMode === "sidebar") {
              setAssistantMode("float")
            } else {
              setAssistantMode("closed")
            }
          }}
          assistantMode={assistantMode}
        />

        <section className="flex h-full flex-1 flex-col overflow-hidden">
          <CenterHeader selectedProduct={selectedProduct} onSelect={setSelectedProduct} />
          <SubHeader />

          <div className="flex-1 overflow-y-auto bg-[#FBFAF9]">
            <div className="mx-auto flex w-full flex-col gap-[10px] px-8 py-8">
              <DemandOverviewCard selectedProduct={selectedProduct} />
              <ForecastCard />
              <PlanningCard selectedProduct={selectedProduct} onProductSelect={setSelectedProduct} />
            </div>
          </div>
        </section>

        {assistantMode === "sidebar" && (
          <ChatSidebar onFloat={() => setAssistantMode("float")} onClose={() => setAssistantMode("closed")} chatInput={chatInput} setChatInput={setChatInput} />
        )}
        {assistantMode === "float" && (
          <FloatingAssistantDock onSidebar={() => setAssistantMode("sidebar")} onClose={() => setAssistantMode("closed")} chatInput={chatInput} setChatInput={setChatInput} />
        )}
      </div>
    </main>
  )
}
