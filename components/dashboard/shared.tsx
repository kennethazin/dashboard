/* eslint-disable @next/next/no-img-element */

export type AssistantMode = "sidebar" | "float" | "closed"

export function Icon({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  return <img src={src} alt={alt} className={className} />
}

export function Divider({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-divider ${className}`} />
}

export function RangeSwitch({ items, selected, onSelect }: { items: string[]; selected?: string; onSelect?: (item: string) => void }) {
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

export function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
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
