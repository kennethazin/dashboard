/* eslint-disable @next/next/no-img-element */
import React from "react"

export function MobileOverlay() {
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
