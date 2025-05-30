"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import ProjectApproval from "@/components/project-approval"
import ContractSigning from "@/components/contract-signing"
import PerformanceMonitoring from "@/components/performance-monitoring"
import QualityEffectiveness from "@/components/quality-effectiveness"
import FundSupervision from "@/components/fund-supervision"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("project-approval")
  const [activePage, setActivePage] = useState("audit-monitoring")
  const [collapsed, setCollapsed] = useState(false)

  const handleNavigation = (section: string, page: string) => {
    setActiveSection(section)
    setActivePage(page)
  }

  const renderContent = () => {
    switch (activeSection) {
      case "project-approval":
        return <ProjectApproval activePage={activePage} />
      case "contract-signing":
        return <ContractSigning activePage={activePage} />
      case "performance-monitoring":
        return <PerformanceMonitoring activePage={activePage} />
      case "quality-effectiveness":
        return <QualityEffectiveness activePage={activePage} />
      case "fund-supervision":
        return <FundSupervision activePage={activePage} />
      default:
        return <ProjectApproval activePage={activePage} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        activeSection={activeSection}
        activePage={activePage}
        onNavigate={handleNavigation}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">{renderContent()}</div>
      </div>
    </div>
  )
}
