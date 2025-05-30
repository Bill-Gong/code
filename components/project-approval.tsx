"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertCircle, Clock, Eye, Filter, Search, Send, AlertTriangle, Download } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Doughnut, Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Filler,
} from "chart.js"
import { Textarea } from "@/components/ui/textarea"

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Filler,
)

interface ProjectApprovalProps {
  activePage: string
}

export default function ProjectApproval({ activePage }: ProjectApprovalProps) {
  const renderContent = () => {
    switch (activePage) {
      case "audit-monitoring":
        return <AuditMonitoring />
      case "quality-assessment":
        return <QualityAssessment />
      case "violation-warning":
        return <ViolationWarning />
      default:
        return <AuditMonitoring />
    }
  }

  return <div>{renderContent()}</div>
}

function AuditMonitoring() {
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for projects
  const projects = [
    {
      id: 1,
      name: "城市基础设施改造项目",
      organization: "城市建设局",
      submitTime: "2025-05-15 09:30",
      currentNode: "财务审核",
      progress: 65,
      status: "normal", // normal, warning, danger
    },
    {
      id: 2,
      name: "智慧城市数据中心建设",
      organization: "信息技术局",
      submitTime: "2025-05-14 14:20",
      currentNode: "技术评估",
      progress: 45,
      status: "warning",
    },
    {
      id: 3,
      name: "公共卫生服务中心扩建",
      organization: "卫生健康委员会",
      submitTime: "2025-05-13 11:15",
      currentNode: "初审",
      progress: 25,
      status: "normal",
    },
    {
      id: 4,
      name: "城市绿化带改造工程",
      organization: "园林绿化局",
      submitTime: "2025-05-10 16:45",
      currentNode: "专家评审",
      progress: 85,
      status: "danger",
    },
    {
      id: 5,
      name: "农村饮水安全工程",
      organization: "水利局",
      submitTime: "2025-05-08 10:30",
      currentNode: "领导审批",
      progress: 95,
      status: "normal",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">审核过程监控</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="搜索项目..." className="pl-8 w-64" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">全部审核项目 ({projects.length})</TabsTrigger>
          <TabsTrigger value="inProgress">
            在审项目 ({projects.filter((p) => p.progress > 0 && p.progress < 100).length})
          </TabsTrigger>
          <TabsTrigger value="completed">已审项目 ({projects.filter((p) => p.progress === 100).length})</TabsTrigger>
          <TabsTrigger value="abnormal">
            异常审核项目 ({projects.filter((p) => p.status === "warning" || p.status === "danger").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{projects.length}</div>
                  <div className="text-sm text-gray-500">总项目数</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {projects.filter((p) => p.progress > 0 && p.progress < 100).length}
                  </div>
                  <div className="text-sm text-gray-500">在审项目</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{projects.filter((p) => p.progress === 100).length}</div>
                  <div className="text-sm text-gray-500">已审项目</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {projects.filter((p) => p.status === "warning" || p.status === "danger").length}
                  </div>
                  <div className="text-sm text-gray-500">异常项目</div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">最近1年立项申报项目总数量</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <Line
                    data={{
                      labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                      datasets: [
                        {
                          label: "项目申报数量",
                          data: [42, 38, 45, 56, 65, 58, 52, 48, 60, 68, 72, 63],
                          borderColor: "#60a5fa",
                          backgroundColor: "rgba(96, 165, 250, 0.1)",
                          tension: 0.3,
                          fill: true,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top" as const,
                        },
                        tooltip: {
                          mode: "index",
                          intersect: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "项目数量",
                          },
                        },
                        x: {
                          title: {
                            display: true,
                            text: "月份",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">审核时效分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <Bar
                    data={{
                      labels: ["初审", "技术评估", "财务审核", "专家评审", "领导审批"],
                      datasets: [
                        {
                          label: "平均审核时长（天）",
                          data: [2, 5, 3, 4, 1],
                          backgroundColor: "#60a5fa",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="p-4 bg-gray-50 rounded-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">项目名称</label>
                <Input placeholder="搜索项目名称..." />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">申报单位</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择申报单位" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部单位</SelectItem>
                    <SelectItem value="城市建设局">城市建设局</SelectItem>
                    <SelectItem value="信息技术局">信息技术局</SelectItem>
                    <SelectItem value="卫生健康委员会">卫生健康委员会</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">审核节点</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择审核节点" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部节点</SelectItem>
                    <SelectItem value="初审">初审</SelectItem>
                    <SelectItem value="技术评估">技术评估</SelectItem>
                    <SelectItem value="财务审核">财务审核</SelectItem>
                    <SelectItem value="专家评审">专家评审</SelectItem>
                    <SelectItem value="领导审批">领导审批</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">提交时间</label>
                <div className="flex space-x-2">
                  <Input type="date" className="w-full" />
                  <span className="flex items-center">至</span>
                  <Input type="date" className="w-full" />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="mr-2">
                重置
              </Button>
              <Button>筛选</Button>
            </div>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>项目名称</TableHead>
                    <TableHead>申报单位</TableHead>
                    <TableHead>提交时间</TableHead>
                    <TableHead>当前审核节点</TableHead>
                    <TableHead>审核进度</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.organization}</TableCell>
                      <TableCell>{project.submitTime}</TableCell>
                      <TableCell>{project.currentNode}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={project.progress}
                            className={`h-2 ${
                              project.status === "normal"
                                ? "bg-gray-200"
                                : project.status === "warning"
                                  ? "bg-yellow-200"
                                  : "bg-red-200"
                            }`}
                          />
                          <span className="text-sm">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                查看详情
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>项目详情 - {project.name}</DialogTitle>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-4 py-4">
                                <div>
                                  <h3 className="font-semibold mb-2">基本信息</h3>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">项目名称:</span>
                                      <span>{project.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">申报单位:</span>
                                      <span>{project.organization}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">提交时间:</span>
                                      <span>{project.submitTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">当前节点:</span>
                                      <span>{project.currentNode}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2">审核进度</h3>
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                      <span>初审</span>
                                      <span className="text-xs text-gray-500 ml-auto">2025-05-13</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                      <span>技术评估</span>
                                      <span className="text-xs text-gray-500 ml-auto">2025-05-14</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                      <span>财务审核</span>
                                      <span className="text-xs text-gray-500 ml-auto">进行中</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                      <span>专家评审</span>
                                      <span className="text-xs text-gray-500 ml-auto">待处理</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                      <span>领导审批</span>
                                      <span className="text-xs text-gray-500 ml-auto">待处理</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">审核意见</h3>
                                <div className="space-y-3 max-h-40 overflow-y-auto">
                                  <div className="p-3 bg-gray-50 rounded-md">
                                    <div className="flex justify-between">
                                      <span className="font-medium">张工 (初审)</span>
                                      <span className="text-xs text-gray-500">2025-05-13 11:30</span>
                                    </div>
                                    <p className="text-sm mt-1">项目基本符合申报要求，建议进入下一阶段评审。</p>
                                  </div>
                                  <div className="p-3 bg-gray-50 rounded-md">
                                    <div className="flex justify-between">
                                      <span className="font-medium">李工 (技术评估)</span>
                                      <span className="text-xs text-gray-500">2025-05-14 16:20</span>
                                    </div>
                                    <p className="text-sm mt-1">技术方案可行，但建议加强对安全风险的评估。</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4 mr-1" />
                            催办
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="flex justify-between mt-4">
            <div className="text-sm text-gray-500">
              显示 1-{projects.length} 共 {projects.length} 条记录
            </div>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" disabled>
                上一页
              </Button>
              <Button variant="outline" size="sm" className="bg-gray-100">
                1
              </Button>
              <Button variant="outline" size="sm">
                下一页
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="inProgress" className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">项目名称</label>
                <Input placeholder="搜索项目名称..." />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">申报单位</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择申报单位" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部单位</SelectItem>
                    <SelectItem value="城市建设局">城市建设局</SelectItem>
                    <SelectItem value="信息技术局">信息技术局</SelectItem>
                    <SelectItem value="卫生健康委员会">卫生健康委员会</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">审核节点</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择审核节点" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部节点</SelectItem>
                    <SelectItem value="初审">初审</SelectItem>
                    <SelectItem value="技术评估">技术评估</SelectItem>
                    <SelectItem value="财务审核">财务审核</SelectItem>
                    <SelectItem value="专家评审">专家评审</SelectItem>
                    <SelectItem value="领导审批">领导审批</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">提交时间</label>
                <div className="flex space-x-2">
                  <Input type="date" className="w-full" />
                  <span className="flex items-center">至</span>
                  <Input type="date" className="w-full" />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="mr-2">
                重置
              </Button>
              <Button>筛选</Button>
            </div>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>项目名称</TableHead>
                    <TableHead>申报单位</TableHead>
                    <TableHead>提交时间</TableHead>
                    <TableHead>当前审核节点</TableHead>
                    <TableHead>审核进度</TableHead>
                    <TableHead>预计完成时间</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.slice(0, 3).map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.organization}</TableCell>
                      <TableCell>{project.submitTime}</TableCell>
                      <TableCell>{project.currentNode}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={project.progress}
                            className={`h-2 ${
                              project.status === "normal"
                                ? "bg-gray-200"
                                : project.status === "warning"
                                  ? "bg-yellow-200"
                                  : "bg-red-200"
                            }`}
                          />
                          <span className="text-sm">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{`2025-${(5 + Math.floor(Math.random() * 3)).toString().padStart(2, "0")}-${(20 + Math.floor(Math.random() * 10)).toString().padStart(2, "0")}`}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                查看详情
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>项目详情 - {project.name}</DialogTitle>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-4 py-4">
                                <div>
                                  <h3 className="font-semibold mb-2">基本信息</h3>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">项目名称:</span>
                                      <span>{project.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">申报单位:</span>
                                      <span>{project.organization}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">提交时间:</span>
                                      <span>{project.submitTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">当前节点:</span>
                                      <span>{project.currentNode}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2">审核进度</h3>
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                      <span>初审</span>
                                      <span className="text-xs text-gray-500 ml-auto">2025-05-13</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                      <span>技术评估</span>
                                      <span className="text-xs text-gray-500 ml-auto">2025-05-14</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                      <span>财务审核</span>
                                      <span className="text-xs text-gray-500 ml-auto">进行中</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                      <span>专家评审</span>
                                      <span className="text-xs text-gray-500 ml-auto">待处理</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                      <span>领导审批</span>
                                      <span className="text-xs text-gray-500 ml-auto">待处理</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">审核意见</h3>
                                <div className="space-y-3 max-h-40 overflow-y-auto">
                                  <div className="p-3 bg-gray-50 rounded-md">
                                    <div className="flex justify-between">
                                      <span className="font-medium">张工 (初审)</span>
                                      <span className="text-xs text-gray-500">2025-05-13 11:30</span>
                                    </div>
                                    <p className="text-sm mt-1">项目基本符合申报要求，建议进入下一阶段评审。</p>
                                  </div>
                                  <div className="p-3 bg-gray-50 rounded-md">
                                    <div className="flex justify-between">
                                      <span className="font-medium">李工 (技术评估)</span>
                                      <span className="text-xs text-gray-500">2025-05-14 16:20</span>
                                    </div>
                                    <p className="text-sm mt-1">技术方案可行，但建议加强对安全风险的评估。</p>
                                  </div>
                                  <div className="p-3 bg-gray-50 rounded-md">
                                    <div className="flex justify-between">
                                      <span className="font-medium">王主任 (财务审核)</span>
                                      <span className="text-xs text-gray-500">2025-05-16 09:45</span>
                                    </div>
                                    <p className="text-sm mt-1">
                                      预算编制合理，建议关注成本控制措施的落实。请项目组补充详细的资金使用计划。
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 flex justify-end space-x-2">
                                <Button variant="outline">导出审核记录</Button>
                                <Button>添加审核意见</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4 mr-1" />
                            催办
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="flex justify-between mt-4">
            <div className="text-sm text-gray-500">
              显示 1-{projects.length} 共 {projects.length} 条记录
            </div>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" disabled>
                上一页
              </Button>
              <Button variant="outline" size="sm" className="bg-gray-100">
                1
              </Button>
              <Button variant="outline" size="sm">
                下一页
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">项目名称</label>
                <Input placeholder="搜索项目名称..." />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">申报单位</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择申报单位" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部单位</SelectItem>
                    <SelectItem value="城市建设局">城市建设局</SelectItem>
                    <SelectItem value="信息技术局">信息技术局</SelectItem>
                    <SelectItem value="卫生健康委员会">卫生健康委员会</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">审核节点</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择审核节点" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部节点</SelectItem>
                    <SelectItem value="初审">初审</SelectItem>
                    <SelectItem value="技术评估">技术评估</SelectItem>
                    <SelectItem value="财务审核">财务审核</SelectItem>
                    <SelectItem value="专家评审">专家评审</SelectItem>
                    <SelectItem value="领导审批">领导审批</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">提交时间</label>
                <div className="flex space-x-2">
                  <Input type="date" className="w-full" />
                  <span className="flex items-center">至</span>
                  <Input type="date" className="w-full" />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="mr-2">
                重置
              </Button>
              <Button>筛选</Button>
            </div>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>项目名称</TableHead>
                    <TableHead>申报单位</TableHead>
                    <TableHead>提交时间</TableHead>
                    <TableHead>审核完成时间</TableHead>
                    <TableHead>审核用时</TableHead>
                    <TableHead>审核结果</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">城市公园绿化改造项目</TableCell>
                    <TableCell>市政园林局</TableCell>
                    <TableCell>2025-04-25 08:30</TableCell>
                    <TableCell>2025-05-10 14:20</TableCell>
                    <TableCell>15天</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">已通过</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              查看详情
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>项目详情 - 城市公园绿化改造项目</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                              <div>
                                <h3 className="font-semibold mb-2">基本信息</h3>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">项目名称:</span>
                                    <span>城市公园绿化改造项目</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">申报单位:</span>
                                    <span>市政园林局</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">提交时间:</span>
                                    <span>2025-04-25 08:30</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">审核结果:</span>
                                    <span className="text-green-600">已通过</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">审核进度</h3>
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span>初审</span>
                                    <span className="text-xs text-gray-500 ml-auto">2025-04-27</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span>技术评估</span>
                                    <span className="text-xs text-gray-500 ml-auto">2025-05-02</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span>财务审核</span>
                                    <span className="text-xs text-gray-500 ml-auto">2025-05-06</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span>专家评审</span>
                                    <span className="text-xs text-gray-500 ml-auto">2025-05-09</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span>领导审批</span>
                                    <span className="text-xs text-gray-500 ml-auto">2025-05-10</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2">审核意见</h3>
                              <div className="space-y-3 max-h-40 overflow-y-auto">
                                <div className="p-3 bg-gray-50 rounded-md">
                                  <div className="flex justify-between">
                                    <span className="font-medium">赵工 (初审)</span>
                                    <span className="text-xs text-gray-500">2025-04-27 11:30</span>
                                  </div>
                                  <p className="text-sm mt-1">项目材料完整，符合申报要求，建议进入下一阶段评审。</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-md">
                                  <div className="flex justify-between">
                                    <span className="font-medium">钱工 (技术评估)</span>
                                    <span className="text-xs text-gray-500">2025-05-02 14:20</span>
                                  </div>
                                  <p className="text-sm mt-1">
                                    技术方案先进可行，植物选择适合本地气候，灌溉系统设计合理。
                                  </p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-md">
                                  <div className="flex justify-between">
                                    <span className="font-medium">孙主任 (财务审核)</span>
                                    <span className="text-xs text-gray-500">2025-05-06 09:45</span>
                                  </div>
                                  <p className="text-sm mt-1">预算编制合理，资金使用计划清晰，符合财务规范。</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-md">
                                  <div className="flex justify-between">
                                    <span className="font-medium">周教授 (专家评审)</span>
                                    <span className="text-xs text-gray-500">2025-05-09 10:30</span>
                                  </div>
                                  <p className="text-sm mt-1">
                                    项目设计符合城市生态建设要求，绿化方案科学合理，建议通过。
                                  </p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-md">
                                  <div className="flex justify-between">
                                    <span className="font-medium">吴局长 (领导审批)</span>
                                    <span className="text-xs text-gray-500">2025-05-10 14:20</span>
                                  </div>
                                  <p className="text-sm mt-1">
                                    项目整体设计符合城市发展规划，各环节审核均已通过，同意立项。
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                              <Button>生成审核报告</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          导出报告
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">老旧小区改造提升工程</TableCell>
                    <TableCell>住建局</TableCell>
                    <TableCell>2025-04-18 13:45</TableCell>
                    <TableCell>2025-05-07 16:30</TableCell>
                    <TableCell>19天</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">已通过</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          查看详情
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          导出报告
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">城市废弃物循环利用项目</TableCell>
                    <TableCell>环保局</TableCell>
                    <TableCell>2025-04-12 09:15</TableCell>
                    <TableCell>2025-05-03 11:40</TableCell>
                    <TableCell>21天</TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800">未通过</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          查看详情
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          导出报告
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="flex justify-between mt-4">
            <div className="text-sm text-gray-500">
              显示 1-{projects.length} 共 {projects.length} 条记录
            </div>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" disabled>
                上一页
              </Button>
              <Button variant="outline" size="sm" className="bg-gray-100">
                1
              </Button>
              <Button variant="outline" size="sm">
                下一页
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="abnormal" className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">项目名称</label>
                <Input placeholder="搜索项目名称..." />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">申报单位</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择申报单位" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部单位</SelectItem>
                    <SelectItem value="城市建设局">城市建设局</SelectItem>
                    <SelectItem value="信息技术局">信息技术局</SelectItem>
                    <SelectItem value="卫生健康委员会">卫生健康委员会</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">审核节点</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择审核节点" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部节点</SelectItem>
                    <SelectItem value="初审">初审</SelectItem>
                    <SelectItem value="技术评估">技术评估</SelectItem>
                    <SelectItem value="财务审核">财务审核</SelectItem>
                    <SelectItem value="专家评审">专家评审</SelectItem>
                    <SelectItem value="领导审批">领导审批</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">提交时间</label>
                <div className="flex space-x-2">
                  <Input type="date" className="w-full" />
                  <span className="flex items-center">至</span>
                  <Input type="date" className="w-full" />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="mr-2">
                重置
              </Button>
              <Button>筛选</Button>
            </div>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>项目名称</TableHead>
                    <TableHead>申报单位</TableHead>
                    <TableHead>异常类型</TableHead>
                    <TableHead>发现时间</TableHead>
                    <TableHead>当前状态</TableHead>
                    <TableHead>处理人</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">城市绿化带改造工程</TableCell>
                    <TableCell>园林绿化局</TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800">审核超时</Badge>
                    </TableCell>
                    <TableCell>2025-05-12 10:30</TableCell>
                    <TableCell>技术评估阶段超时15天</TableCell>
                    <TableCell>王工</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              查看详情
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>异常项目详情 - 城市绿化带改造工程</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                              <div>
                                <h3 className="font-semibold mb-2">基本信息</h3>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">项目名称:</span>
                                    <span>城市绿化带改造工程</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">申报单位:</span>
                                    <span>园林绿化局</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">提交时间:</span>
                                    <span>2025-04-15 14:30</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">当前节点:</span>
                                    <span>技术评估</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">处理人:</span>
                                    <span>王工</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">异常详情</h3>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">异常类型:</span>
                                    <span className="text-red-600">审核超时</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">发现时间:</span>
                                    <span>2025-05-12 10:30</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">标准审核时限:</span>
                                    <span>12个工作日</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">已超时:</span>
                                    <span className="text-red-600">15天</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="p-4 bg-red-50 rounded-md mb-4">
                              <h3 className="font-semibold text-red-800 mb-2">异常情况说明</h3>
                              <p className="text-sm">
                                技术评估阶段已超过规定时限15天，系统多次自动提醒无响应。根据调查，负责该项目技术评估的外部专家因个人原因暂时无法完成评估工作。
                              </p>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2">处理记录</h3>
                              <div className="space-y-3 max-h-40 overflow-y-auto">
                                <div className="p-3 bg-gray-50 rounded-md">
                                  <div className="flex justify-between">
                                    <span className="font-medium">系统</span>
                                    <span className="text-xs text-gray-500">2025-04-28 00:00</span>
                                  </div>
                                  <p className="text-sm mt-1">
                                    技术评估阶段已达到预警时间（10个工作日），系统自动提醒。
                                  </p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-md">
                                  <div className="flex justify-between">
                                    <span className="font-medium">系统</span>
                                    <span className="text-xs text-gray-500">2025-05-02 00:00</span>
                                  </div>
                                  <p className="text-sm mt-1">技术评估阶段已超时，系统自动提醒并标记为异常。</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-md">
                                  <div className="flex justify-between">
                                    <span className="font-medium">李主任</span>
                                    <span className="text-xs text-gray-500">2025-05-12 14:20</span>
                                  </div>
                                  <p className="text-sm mt-1">
                                    已联系技术评估专家，对方因健康原因暂时无法完成评估工作，建议更换评估专家。
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <h3 className="font-semibold mb-2">处理措施</h3>
                              <Textarea
                                placeholder="请输入处理措施..."
                                defaultValue="建议更换技术评估专家，并重新安排评估工作。已联系张教授接替评估工作，预计3个工作日内完成。"
                              />
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                              <Button variant="outline">转交他人</Button>
                              <Button>提交处理结果</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          处理异常
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">智慧交通系统升级项目</TableCell>
                    <TableCell>交通运输局</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-100 text-yellow-800">材料缺失</Badge>
                    </TableCell>
                    <TableCell>2025-05-14 15:45</TableCell>
                    <TableCell>初审阶段发现材料不完整</TableCell>
                    <TableCell>张工</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          查看详情
                        </Button>
                        <Button size="sm">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          处理异常
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">城市供水管网更新项目</TableCell>
                    <TableCell>水务局</TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800">多次退回</Badge>
                    </TableCell>
                    <TableCell>2025-05-10 09:20</TableCell>
                    <TableCell>技术方案被退回修改3次</TableCell>
                    <TableCell>刘工</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          查看详情
                        </Button>
                        <Button size="sm">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          处理异常
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">异常类型分布</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>审核超时</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2 bg-red-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>材料缺失</span>
                      <span>30%</span>
                    </div>
                    <Progress value={30} className="h-2 bg-yellow-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>多次退回</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2 bg-red-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>其他异常</span>
                      <span>10%</span>
                    </div>
                    <Progress value={10} className="h-2 bg-blue-100" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">异常处理状态</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full border-8 border-yellow-500 flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">60%</div>
                      <div className="text-xs text-gray-500">处理率</div>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold">8</div>
                      <div className="text-xs text-gray-500">待处理</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">12</div>
                      <div className="text-xs text-gray-500">已处理</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">异常处理时效</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col justify-center h-full">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">平均响应时间</span>
                      <span className="font-semibold">4.5小时</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">平均处理时间</span>
                      <span className="font-semibold">2.3天</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">超时处理比例</span>
                      <span className="font-semibold text-red-600">15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-between mt-4">
            <div className="text-sm text-gray-500">
              显示 1-{projects.length} 共 {projects.length} 条记录
            </div>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" disabled>
                上一页
              </Button>
              <Button variant="outline" size="sm" className="bg-gray-100">
                1
              </Button>
              <Button variant="outline" size="sm">
                下一页
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function QualityAssessment() {
  // Mock data for charts
  const doughnutData = {
    labels: ["优", "良", "中", "差"],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: ["#4ade80", "#60a5fa", "#facc15", "#f87171"],
        borderWidth: 0,
      },
    ],
  }

  const barData = {
    labels: ["张三", "李四", "王五", "赵六", "钱七"],
    datasets: [
      {
        label: "审核准确性",
        data: [95, 88, 92, 85, 90],
        backgroundColor: "#60a5fa",
      },
      {
        label: "审核效率",
        data: [85, 92, 78, 90, 82],
        backgroundColor: "#4ade80",
      },
    ],
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  }

  // Mock data for auditors
  const auditors = [
    {
      id: 1,
      name: "张三",
      department: "技术部",
      projectCount: 45,
      correctCount: 43,
      avgDuration: "1.5小时",
      accuracy: "95%",
    },
    {
      id: 2,
      name: "李四",
      department: "财务部",
      projectCount: 38,
      correctCount: 33,
      avgDuration: "2小时",
      accuracy: "88%",
    },
    {
      id: 3,
      name: "王五",
      department: "法务部",
      projectCount: 42,
      correctCount: 39,
      avgDuration: "1.8小时",
      accuracy: "92%",
    },
    {
      id: 4,
      name: "赵六",
      department: "运营部",
      projectCount: 35,
      correctCount: 30,
      avgDuration: "2.2小时",
      accuracy: "85%",
    },
    {
      id: 5,
      name: "钱七",
      department: "市场部",
      projectCount: 40,
      correctCount: 36,
      avgDuration: "1.7小时",
      accuracy: "90%",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">审核质量评估</h2>
        <div className="flex space-x-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">本周</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季度</SelectItem>
              <SelectItem value="year">本年度</SelectItem>
            </SelectContent>
          </Select>
          <Button>导出数据</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>整体审核质量评分</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="w-48 h-48">
                <Doughnut data={doughnutData} />
              </div>
              <div className="mt-4 text-center">
                <div className="text-3xl font-bold">85分</div>
                <div className="text-sm text-gray-500">总体评分</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 w-full">
                <div className="text-center">
                  <div className="text-xl font-semibold">92%</div>
                  <div className="text-sm text-gray-500">准确率</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold">1.8小时</div>
                  <div className="text-sm text-gray-500">平均审核时长</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>审核人员绩效对比</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar data={barData} options={barOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>审核人员评估详情</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>审核人员</TableHead>
                <TableHead>所属部门</TableHead>
                <TableHead>审核项目数</TableHead>
                <TableHead>正确审核数</TableHead>
                <TableHead>平均审核时长</TableHead>
                <TableHead>准确率</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditors.map((auditor) => (
                <TableRow key={auditor.id}>
                  <TableCell className="font-medium">{auditor.name}</TableCell>
                  <TableCell>{auditor.department}</TableCell>
                  <TableCell>{auditor.projectCount}</TableCell>
                  <TableCell>{auditor.correctCount}</TableCell>
                  <TableCell>{auditor.avgDuration}</TableCell>
                  <TableCell>{auditor.accuracy}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          详细分析
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>审核人员详细分析 - {auditor.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <Card>
                              <CardContent className="pt-6">
                                <div className="text-center">
                                  <div className="text-3xl font-bold">{auditor.accuracy}</div>
                                  <div className="text-sm text-gray-500">准确率</div>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="pt-6">
                                <div className="text-center">
                                  <div className="text-3xl font-bold">{auditor.avgDuration}</div>
                                  <div className="text-sm text-gray-500">平均审核时长</div>
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="pt-6">
                                <div className="text-center">
                                  <div className="text-3xl font-bold">{auditor.projectCount}</div>
                                  <div className="text-sm text-gray-500">审核项目数</div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">近期审核案例</h3>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>项目名称</TableHead>
                                  <TableHead>审核结果</TableHead>
                                  <TableHead>审核时长</TableHead>
                                  <TableHead>评估结果</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>城市基础设施改造项目</TableCell>
                                  <TableCell>通过</TableCell>
                                  <TableCell>1.2小时</TableCell>
                                  <TableCell>
                                    <Badge className="bg-green-500">正确</Badge>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>智慧城市数据中心建设</TableCell>
                                  <TableCell>通过</TableCell>
                                  <TableCell>2.5小时</TableCell>
                                  <TableCell>
                                    <Badge className="bg-green-500">正确</Badge>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>公共卫生服务中心扩建</TableCell>
                                  <TableCell>退回修改</TableCell>
                                  <TableCell>1.8小时</TableCell>
                                  <TableCell>
                                    <Badge className="bg-red-500">错误</Badge>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function ViolationWarning() {
  // Mock data for violation warnings
  const warnings = [
    {
      id: 1,
      project: "城市基础设施改造项目",
      type: "材料造假",
      description: "提交的工程经验证明材料与实际情况不符",
      time: "2025-05-15 10:30",
      priority: "high",
    },
    {
      id: 2,
      project: "智慧城市数据中心建设",
      type: "预算异常",
      description: "项目预算明显高于同类项目平均水平",
      time: "2025-05-14 16:45",
      priority: "medium",
    },
    {
      id: 3,
      project: "公共卫生服务中心扩建",
      type: "资质不符",
      description: "申报单位资质等级与项目要求不符",
      time: "2025-05-13 09:20",
      priority: "high",
    },
    {
      id: 4,
      project: "城市绿化带改造工程",
      type: "重复申报",
      description: "项目内容与去年已批准项目高度重合",
      time: "2025-05-12 14:10",
      priority: "low",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">违规行为预警</h2>
        <div className="flex space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="违规类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="fake">材料造假</SelectItem>
              <SelectItem value="budget">预算异常</SelectItem>
              <SelectItem value="qualification">资质不符</SelectItem>
              <SelectItem value="duplicate">重复申报</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="搜索预警..." className="pl-8 w-64" />
          </div>
        </div>
      </div>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>预警通知</AlertTitle>
        <AlertDescription>系统检测到4个潜在违规行为，请及时处理。</AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {warnings.map((warning) => (
          <Card key={warning.id} className="overflow-hidden">
            <div
              className={`h-2 ${
                warning.priority === "high"
                  ? "bg-red-500"
                  : warning.priority === "medium"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
              }`}
            ></div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{warning.project}</h3>
                <Badge
                  className={`${
                    warning.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : warning.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {warning.priority === "high" ? "紧急" : warning.priority === "medium" ? "重要" : "一般"}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="font-medium mr-2">违规类型:</span>
                  <span>{warning.type}</span>
                </div>
                <div className="flex items-start text-sm">
                  <span className="font-medium mr-2">可疑行为:</span>
                  <span>{warning.description}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{warning.time}</span>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      查看详情
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>违规行为详情</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">基本信息</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">项目名称:</span>
                            <span>{warning.project}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">违规类型:</span>
                            <span>{warning.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">发现时间:</span>
                            <span>{warning.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">优先级:</span>
                            <span>
                              {warning.priority === "high" ? "紧急" : warning.priority === "medium" ? "重要" : "一般"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">违规详情</h3>
                        <p className="text-sm">{warning.description}</p>
                        <p className="text-sm mt-2">
                          系统通过对比历史数据和规则库，发现该项目存在异常情况，建议进行人工核查。
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">相关证据</h3>
                        <div className="p-3 bg-gray-50 rounded-md text-sm">
                          <p>1. 申报材料中第3页工程经验与实际查询结果不符</p>
                          <p>2. 系统检测到相似材料在其他项目中出现过</p>
                          <p>3. 资质证书编号与官方数据库记录不一致</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button>启动调查</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
