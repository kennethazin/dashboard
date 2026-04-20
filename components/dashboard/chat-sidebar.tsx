"use client"
import { useState } from "react"
import { BookOpen, CaretDown, FileText, FlowArrow, Microphone, PaperPlaneTilt, PictureInPicture, Plus, Question, X } from "@phosphor-icons/react"
import { assets, chatHistoryItems } from "@/lib/mock-data"
import { Icon } from "./shared"

export function ChatSidebar({
  onFloat,
  onClose,
  chatInput,
  setChatInput,
}: {
  onFloat: () => void
  onClose: () => void
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
            <button onClick={onClose} className="cursor-pointer hover:opacity-70" title="Close Assistant">
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
