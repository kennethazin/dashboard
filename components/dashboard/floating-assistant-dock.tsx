"use client"
import { useState } from "react"
import { CaretDown, Microphone, PaperPlaneTilt, PictureInPicture, Plus, X } from "@phosphor-icons/react"
import { chatHistoryItems } from "@/lib/mock-data"

export function FloatingAssistantDock({
  onSidebar,
  onClose,
  chatInput,
  setChatInput,
}: {
  onSidebar: () => void
  onClose: () => void
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
          <button onClick={onClose} className="cursor-pointer hover:opacity-70" title="Close Assistant">
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
