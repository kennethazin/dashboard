"use client"
import { useState, useRef, useEffect, useMemo } from "react"
import { BuildingOfficeIcon, CaretDown, CaretLeft, CaretRight, MagnifyingGlass, Package, Question } from "@phosphor-icons/react"
import { accounts, planningItems, planningMonths, productColors, products } from "@/lib/mock-data"

export function PlanningCard({ selectedProduct, onProductSelect }: { selectedProduct: string; onProductSelect: (name: string) => void }) {
  const [accountFilter, setAccountFilter] = useState("Tesco")
  const [skuFilter, setSkuFilter] = useState("All SKUs")
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isSkuOpen, setIsSkuOpen] = useState(false)
  const [skuSearch, setSkuSearch] = useState("")

  const accountList = ["All Accounts", ...accounts]
  const skuList = ["All SKUs", ...products.map(p => p.shortName)]

  const filteredSkuList = skuList.filter(sku =>
    sku.toLowerCase().includes(skuSearch.toLowerCase())
  )

  const parseValue = (v: string | number) => {
    const s = v.toString().toLowerCase().replace(/,/g, "")
    if (s.endsWith("k")) return parseFloat(s.slice(0, -1)) * 1000
    return parseFloat(s) || 0
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [isViewAll, setIsViewAll] = useState(false)
  const itemsPerPage = 10

  const accountRef = useRef<HTMLDivElement>(null)
  const skuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) setIsAccountOpen(false)
      if (skuRef.current && !skuRef.current.contains(event.target as Node)) setIsSkuOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredItems = useMemo(() => {
    let items = []
    if (accountFilter === "All Accounts") {
      items = products.map(prod => {
        const values = planningMonths.map((_, mIdx) => {
          const sum = planningItems
            .filter(item => item.shortName === prod.shortName)
            .reduce((acc, item) => acc + parseValue(item.values[mIdx]), 0)
          return sum >= 1000 ? `${(sum / 1000).toFixed(1)}k` : sum.toLocaleString()
        })
        return { account: "All Accounts", ...prod, values }
      })
    } else {
      items = planningItems.filter(item => item.account === accountFilter)
    }

    if (skuFilter !== "All SKUs") {
      items = items.filter(item => item.shortName === skuFilter)
    }

    return items
  }, [accountFilter, skuFilter])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [accountFilter, skuFilter])

  const paginatedItems = useMemo(() => {
    if (isViewAll) return filteredItems
    const start = (currentPage - 1) * itemsPerPage
    return filteredItems.slice(start, start + itemsPerPage)
  }, [filteredItems, currentPage, isViewAll, itemsPerPage])

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  return (
    <article className="overflow-hidden rounded-[12px] border border-[#fafafa] bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="space-y-[2px]">
          <div className="flex items-center gap-1">
            <h3 className="text-[16px] font-medium leading-none text-black">Demand Assumption Planning</h3>
            <Question size={16} weight="light" color="#6f6b65" />
          </div>
          <p className="text-[11px] text-black/56">View and adjust demand overlays per SKU</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Account Filter */}
          <div className="relative" ref={accountRef}>
            <button
              onClick={() => {
                setIsAccountOpen(!isAccountOpen)
                setIsSkuOpen(false)
              }}
              className="flex h-[34px] items-center gap-4 rounded-[8px] border border-[#f5f5f5] px-3 text-[12px] text-[#42413c] cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <BuildingOfficeIcon size={16} weight="light" color="#42413c" />
                {accountFilter}
              </span>
              <CaretDown size={12} weight="light" color="#6f6b65" className={isAccountOpen ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            {isAccountOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-[#ebe8e4] bg-white p-1 shadow-lg z-50 overflow-hidden">
                <div className="max-h-60 overflow-y-auto no-scrollbar">
                  {accountList.map(acc => (
                    <button
                      key={acc}
                      onClick={() => {
                        setAccountFilter(acc)
                        setIsAccountOpen(false)
                      }}
                      className={`flex w-full items-center px-3 py-2 text-left text-[12px] hover:bg-[#f5f5f5] rounded-md ${accountFilter === acc ? "bg-[#f5f5f5] font-semibold" : ""}`}
                    >
                      {acc}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SKU Filter */}
          <div className="relative" ref={skuRef}>
            <button
              onClick={() => {
                setIsSkuOpen(!isSkuOpen)
                setIsAccountOpen(false)
              }}
              className="flex h-[34px] items-center gap-4 rounded-[8px] border border-[#f5f5f5] px-3 text-[12px] text-[#42413c] cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Package size={16} weight="light" color="#42413c" />
                {skuFilter}
              </span>
              <CaretDown size={12} weight="light" color="#6f6b65" className={isSkuOpen ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            {isSkuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-[#ebe8e4] bg-white p-1 shadow-lg z-50 overflow-hidden">
                <div className="p-2 border-b border-[#f5f5f5]">
                  <div className="relative">
                    <MagnifyingGlass size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
                    <input
                      type="text"
                      placeholder="Search SKU..."
                      value={skuSearch}
                      onChange={(e) => setSkuSearch(e.target.value)}
                      className="w-full bg-[#f9fafb] rounded-md py-1.5 pl-8 pr-3 text-[12px] outline-none border border-transparent focus:border-[#e5e7eb] transition-all"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto no-scrollbar">
                  {filteredSkuList.map(sku => (
                    <button
                      key={sku}
                      onClick={() => {
                        setSkuFilter(sku)
                        setIsSkuOpen(false)
                        setSkuSearch("")
                      }}
                      className={`flex w-full items-center px-3 py-2 text-left text-[12px] hover:bg-[#f5f5f5] rounded-md ${skuFilter === sku ? "bg-[#f5f5f5] font-semibold" : ""}`}
                    >
                      {sku}
                    </button>
                  ))}
                  {filteredSkuList.length === 0 && (
                    <p className="px-3 py-4 text-center text-[11px] text-[#9a9a9a]">No SKUs found</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>



      <div className="overflow-x-auto rounded-[12px] border border-[#e5e5e5]">
        <table className="min-w-[1123px] w-full bg-white text-left">
          <thead className="bg-[#fafafa] text-[12px] uppercase leading-[18px] text-[#5e5e5e]">
            <tr>
              {["Product", ...planningMonths, "Total"].map((h) => (
                <th
                  key={h}
                  className={`h-[44px] border-b border-[#e2e2e2] px-6 font-normal whitespace-nowrap ${h === 'Product'
                    ? 'sticky left-0 z-20 bg-[#fafafa] w-px'
                    : h === 'Total'
                      ? 'sticky right-0 z-20 bg-[#f4f4f4] w-px border-l-2 border-l-[#e5e5e5] font-bold text-black'
                      : ''
                    }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, idx) => {
              const total = item.values.reduce((sum, val) => sum + parseValue(val), 0)

              return (
                <tr
                  key={item.name}
                  onClick={() => onProductSelect(item.name)}
                  className={`${selectedProduct === item.name ? "bg-[#f5f9f6]" : "bg-white"} group cursor-pointer transition-colors hover:bg-[#fcfcfc]`}
                >
                  <td className={`sticky left-0 z-10 h-[44px] border-b border-[#e2e2e2] px-6 text-[12px] leading-[1.3] text-[#1e1e1e] whitespace-nowrap ${selectedProduct === item.name ? "bg-[#f0f7f1]" : "bg-[#fbfbfb]"}`}>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-[2px]" style={{ backgroundColor: productColors[idx % productColors.length] }} />
                      <span>{item.shortName}</span>
                    </div>
                  </td>
                  {item.values.map((value, vIdx) => (
                    <td key={`${item.name}-${vIdx}`} className="h-[52px] border-b border-[#e2e2e2] px-6 text-[12px] leading-[1.3] text-[#5e5e5e]">{value}</td>
                  ))}
                  <td className={`sticky right-0 z-10 h-[52px] border-b border-[#e2e2e2] px-6 text-[12px] font-bold leading-[1.3] text-[#1e1e1e] border-l-2 border-l-[#e5e5e5] ${selectedProduct === item.name ? "bg-[#eef4ef]" : "bg-[#f9f9f9]"}`}>
                    {total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total.toLocaleString()}
                  </td>
                </tr>
              )
            })}
            <tr className="bg-[#f4f4f4] font-bold">
              <td className="sticky left-0 z-10 h-[44px] border-b border-[#e2e2e2] bg-inherit px-6 text-[12px] leading-[1.3] text-[#1e1e1e] whitespace-nowrap border-t border-t-[#e2e2e2]">
                TOTAL
              </td>
              {planningMonths.map((_, i) => {
                const colTotal = filteredItems.reduce((sum, item) => sum + parseValue(item.values[i]), 0)
                return (
                  <td key={`total-${i}`} className="h-[52px] border-b border-[#e2e2e2] px-6 text-[12px] leading-[1.3] text-[#1e1e1e] border-t border-t-[#e2e2e2]">
                    {colTotal >= 1000 ? `${(colTotal / 1000).toFixed(1)}k` : colTotal.toLocaleString()}
                  </td>
                )
              })}
              <td className="sticky right-0 z-10 h-[52px] border-b border-[#e2e2e2] bg-inherit px-6 text-[12px] leading-[1.3] text-[#1e1e1e] border-l-2 border-l-[#e5e5e5] border-t border-t-[#e2e2e2]">
                {(() => {
                  const grandTotal = filteredItems.reduce((acc, item) =>
                    acc + item.values.reduce((s, v) => s + parseValue(v), 0), 0)
                  return grandTotal >= 1000 ? `${(grandTotal / 1000).toFixed(1)}k` : grandTotal.toLocaleString()
                })()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-start gap-2 px-2 py-4">
        <div className="flex items-center gap-[12px]">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1 || isViewAll}
            className={`grid size-[38px] place-items-center rounded-[10px] transition-colors ${currentPage === 1 || isViewAll ? "opacity-30 cursor-not-allowed" : "hover:bg-[#f5f5f5] cursor-pointer"}`}
            title="Previous Page"
          >
            <CaretLeft size={16} weight="light" color="#42413c" />
          </button>
          
          <div className="flex items-center gap-1 min-w-[60px] justify-center">
             <span className="text-[14px] font-medium text-[#303030]">{isViewAll ? 1 : currentPage}</span>
             <span className="text-[14px] text-[#9a9a9a]">/</span>
             <span className="text-[14px] text-[#9a9a9a]">{isViewAll ? 1 : totalPages}</span>
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || isViewAll}
            className={`grid size-[38px] place-items-center rounded-[10px] transition-colors ${currentPage === totalPages || isViewAll ? "opacity-30 cursor-not-allowed" : "hover:bg-[#f5f5f5] cursor-pointer"}`}
            title="Next Page"
          >
            <CaretRight size={16} weight="light" color="#42413c" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-[14px] text-black">
            {isViewAll ? `1 - ${filteredItems.length}` : `${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, filteredItems.length)}`} of {filteredItems.length}
          </p>
          <button 
            onClick={() => {
              setIsViewAll(!isViewAll)
              setCurrentPage(1)
            }}
            className="text-[14px] font-medium text-[#059669] hover:underline cursor-pointer"
          >
            {isViewAll ? "Show Paged" : "View All"}
          </button>
        </div>
      </div>
    </article>
  )
}
