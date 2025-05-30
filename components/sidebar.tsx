"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileCodeIcon as FileContract,
  BarChart3,
  Award,
  DollarSign,
  ChevronDown,
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  activePage: string
  onNavigate: (section: string, page: string) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

interface NavItem {
  id: string
  title: string
  icon: React.ReactNode
  subItems: {
    id: string
    title: string
  }[]
}

export default function Sidebar({ activeSection, activePage, onNavigate, collapsed, setCollapsed }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["project-approval"])

  const navItems: NavItem[] = [
    {
      id: "project-approval",
      title: "立项审核监管",
      icon: <ClipboardCheck className="h-5 w-5" />,
      subItems: [
        { id: "audit-monitoring", title: "审核过程监控" },
        { id: "quality-assessment", title: "审核质量评估" },
        { id: "violation-warning", title: "违规行为预警" },
      ],
    },
    {
      id: "contract-signing",
      title: "合同签订监管",
      icon: <FileContract className="h-5 w-5" />,
      subItems: [
        { id: "compliance-review", title: "合同合规性审查" },
        { id: "risk-assessment", title: "合同风险评估" },
        { id: "signing-process", title: "合同签订过程监管" },
      ],
    },
    {
      id: "performance-monitoring",
      title: "履约过程监管",
      icon: <BarChart3 className="h-5 w-5" />,
      subItems: [
        { id: "progress-compliance", title: "进度合规性监管" },
        { id: "quality-compliance", title: "质量合规性监管" },
        { id: "fund-usage", title: "资金使用监管" },
      ],
    },
    {
      id: "quality-effectiveness",
      title: "质量成效监管",
      icon: <Award className="h-5 w-5" />,
      subItems: [
        { id: "goal-achievement", title: "质量目标达成监管" },
        { id: "indicator-assessment", title: "成效指标评估监管" },
        { id: "feedback-handling", title: "反馈意见处理监管" },
      ],
    },
    {
      id: "fund-supervision",
      title: "经费收支监管",
      icon: <DollarSign className="h-5 w-5" />,
      subItems: [
        { id: "budget-execution", title: "预算执行监管" },
        { id: "expenditure-compliance", title: "收支合规性监管" },
        { id: "fund-security", title: "资金安全监管" },
      ],
    },
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 h-full border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && <h1 className="text-lg font-semibold text-gray-900 dark:text-white">监管信息系统</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  toggleSection(item.id)
                  if (!expandedSections.includes(item.id)) {
                    onNavigate(item.id, item.subItems[0].id)
                  }
                }}
                className={cn(
                  "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md",
                  activeSection === item.id
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700",
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedSections.includes(item.id) ? "rotate-180" : "",
                      )}
                    />
                  </>
                )}
              </button>
              {!collapsed && expandedSections.includes(item.id) && (
                <div className="mt-1 pl-10 space-y-1">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => onNavigate(item.id, subItem.id)}
                      className={cn(
                        "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md",
                        activePage === subItem.id
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700",
                      )}
                    >
                      {subItem.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
