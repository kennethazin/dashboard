"use client"
import { useState, useRef, useEffect } from "react"
import { ArrowClockwise, BellRinging, CaretDown, DotsThree, DownloadSimple, FileText, MagnifyingGlass, ShareNetwork } from "@phosphor-icons/react"
import { products } from "@/lib/mock-data"

export function CenterHeader({ selectedProduct, onSelect }: { selectedProduct: string; onSelect: (name: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [search, setSearch] = useState("")

  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsExportOpen(false)
        setIsOptionsOpen(false)
        setIsNotificationsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const closeOthers = (current: string) => {
    if (current !== 'product') setIsOpen(false)
    if (current !== 'export') setIsExportOpen(false)
    if (current !== 'options') setIsOptionsOpen(false)
    if (current !== 'notifications') setIsNotificationsOpen(false)
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <header className="relative h-[48px] border-b border-[#ebe8e4] bg-white px-4 py-2 z-30" ref={headerRef}>
      <div className="mx-auto flex h-full w-full items-center justify-between">
        <div className="space-y-[2px] leading-none">
          <p className="text-[12px] font-medium text-black">Demand</p>
          <p className="text-[11px] text-black/56">Week 15, April 2026</p>
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setIsOpen(!isOpen)
              closeOthers('product')
            }}
            className="flex items-center gap-4 text-[12px] font-medium text-black cursor-pointer"
          >
            {selectedProduct}
            <CaretDown size={12} weight="light" color="#6f6b65" className={isOpen ? "rotate-180 transition-transform" : "transition-transform"} />
          </button>

          {isOpen && (
            <div className="absolute left-1/2 top-full mt-2 w-96 -translate-x-1/2 rounded-lg border border-[#ebe8e4] bg-white p-1 shadow-lg z-50 overflow-hidden">
              <div className="p-2 border-b border-[#f5f5f5]">
                <div className="relative">
                  <MagnifyingGlass size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
                  <input
                    type="text"
                    placeholder="Search SKU..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-[#f9fafb] rounded-md py-1.5 pl-8 pr-3 text-[12px] outline-none border border-transparent focus:border-[#e5e7eb] transition-all"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto no-scrollbar">
                {filteredProducts.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      onSelect(item.name)
                      setIsOpen(false)
                      setSearch("")
                    }}
                    className={`flex w-full items-center px-4 py-2.5 text-left text-[12px] hover:bg-[#f5f5f5] rounded-md transition-colors ${selectedProduct === item.name ? "bg-[#f5f5f5] font-semibold text-[#059669]" : "text-[#4b5563]"}`}
                  >
                    {item.name}
                  </button>
                ))}
                {filteredProducts.length === 0 && (
                  <p className="px-3 py-6 text-center text-[12px] text-[#9a9a9a]">No products matched your search</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => {
                setIsOptionsOpen(!isOptionsOpen)
                closeOthers('options')
              }}
              className="grid size-8 place-items-center rounded-lg hover:bg-[#f5f5f5] transition-colors cursor-pointer"
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
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen)
                closeOthers('notifications')
              }}
              className="relative grid size-8 place-items-center rounded-lg hover:bg-[#f5f5f5] transition-colors cursor-pointer"
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
                      type: "warning",
                      date: "2h ago"
                    },
                    {
                      title: "Demand Spike Detected",
                      msg: "Heavy Cream demand is 18% above Q3-26 forecast.",
                      type: "info",
                      date: "5h ago"
                    },
                    {
                      title: "Cost Opportunity",
                      msg: "Milk Class III futures dropped 4.2% today.",
                      type: "success",
                      date: "Yesterday"
                    }
                  ].map((note, i) => (
                    <div key={i} className="group p-2 rounded-lg hover:bg-[#f9fafb] transition-colors border-b border-[#f5f5f5] last:border-0">
                      <div className="flex items-start gap-2.5">
                        <div className={`mt-1.5 size-1.5 shrink-0 rounded-full ${note.type === 'warning' ? 'bg-red-500' : note.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`} />
                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[12px] font-semibold text-[#111827]">{note.title}</p>
                            <span className="text-[9px] text-[#9ca3af] whitespace-nowrap">{note.date}</span>
                          </div>
                          <p className="text-[11px] text-[#4b5563] leading-relaxed line-clamp-2">{note.msg}</p>
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
              onClick={() => {
                setIsExportOpen(!isExportOpen)
                closeOthers('export')
              }}
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
