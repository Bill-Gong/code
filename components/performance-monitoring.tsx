"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertTriangle, Calendar, Check, Download, FileText, Search, Filter, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement)

interface PerformanceMonitoringProps {
  activePage: string
}

export default function PerformanceMonitoring({ activePage }: PerformanceMonitoringProps) {
  const renderContent = () => {
    switch (activePage) {
      case "progress-compliance":
        return <ProgressCompliance />
      case "quality-compliance":
        return <QualityCompliance />
      case "fund-usage":
        return <FundUsage />
      default:
        return <ProgressCompliance />
    }
  }

  return <div>{renderContent()}</div>
}

function ProgressCompliance() {
  // Mock data for projects
  const projects = [
    {
      id: 1,
      name: "城市基础设施改造项目",
      organization: "城市建设局",
      startDate: "2025-01-15",
      endDate: "2025-12-31",
      tasks: [
        { id: 1, name: "前期调研", start: "2025-01-15", end: "2025-02-28", planProgress: 100, actualProgress: 100 },
        { id: 2, name: "方案设计", start: "2025-03-01", end: "2025-04-15", planProgress: 100, actualProgress: 90 },
        { id: 3, name: "施工准备", start: "2025-04-16", end: "2025-05-31", planProgress: 80, actualProgress: 60 },
        { id: 4, name: "主体施工", start: "2025-06-01", end: "2025-10-31", planProgress: 30, actualProgress: 20 },
        { id: 5, name: "验收交付", start: "2025-11-01", end: "2025-12-31", planProgress: 0, actualProgress: 0 },
      ],
      status: "warning", // normal, warning, danger
    },
    {
      id: 2,
      name: "智慧城市数据中心建设",
      organization: "信息技术局",
      startDate: "2025-02-01",
      endDate: "2025-11-30",
      tasks: [
        { id: 1, name: "需求分析", start: "2025-02-01", end: "2025-03-15", planProgress: 100, actualProgress: 100 },
        { id: 2, name: "系统设计", start: "2025-03-16", end: "2025-05-15", planProgress: 100, actualProgress: 100 },
        { id: 3, name: "开发实施", start: "2025-05-16", end: "2025-09-30", planProgress: 60, actualProgress: 65 },
        { id: 4, name: "测试验收", start: "2025-10-01", end: "2025-11-30", planProgress: 0, actualProgress: 0 },
      ],
      status: "normal",
    },
  ]

  const [selectedProject, setSelectedProject] = useState(projects[0])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">进度合规性监管</h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>项目列表</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedProject.id === project.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{project.name}</h3>
                      <div className="text-sm text-gray-500 mt-1">{project.organization}</div>
                      <div className="text-sm text-gray-500 mt-1 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {project.startDate} 至 {project.endDate}
                      </div>
                    </div>
                    <Badge
                      className={`${
                        project.status === "normal"
                          ? "bg-green-100 text-green-800"
                          : project.status === "warning"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {project.status === "normal" ? "正常" : project.status === "warning" ? "警告" : "严重"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>进度对比</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              导出甘特图
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{selectedProject.name}</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
                      <span className="text-xs">计划进度</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
                      <span className="text-xs">实际进度</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {selectedProject.tasks.map((task) => (
                    <div key={task.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{task.name}</span>
                        <span className="text-gray-500">
                          {task.start} 至 {task.end}
                        </span>
                      </div>
                      <div className="relative h-8">
                        <div className="absolute inset-0 bg-blue-100 rounded-md">
                          <div
                            className="h-full bg-blue-500 rounded-md"
                            style={{ width: `${task.planProgress}%` }}
                          ></div>
                        </div>
                        <div
                          className={`absolute inset-0 bg-green-500 rounded-md opacity-70`}
                          style={{
                            width: `${task.actualProgress}%`,
                            height: "50%",
                            top: "25%",
                          }}
                        ></div>
                        {task.actualProgress < task.planProgress && task.planProgress > 0 && (
                          <div className="absolute right-0 top-0 h-full flex items-center">
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                              滞后 {task.planProgress - task.actualProgress}%
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">偏差分析</h3>
                {selectedProject.status !== "normal" ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 rounded-md">
                      <div className="flex items-start">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">施工准备阶段进度滞后</p>
                          <p className="text-xs text-gray-500 mt-1">计划进度: 80%, 实际进度: 60%, 偏差: 20%</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <h4 className="text-sm font-medium mb-1">滞后原因分析</h4>
                      <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                        <li>材料采购延迟，部分关键材料尚未到位</li>
                        <li>施工许可证办理流程耗时超出预期</li>
                        <li>现场准备工作受天气影响进展缓慢</li>
                      </ul>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">处理偏差</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>进度偏差处理</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">处理措施</label>
                            <Input
                              placeholder="请输入处理措施..."
                              defaultValue="加快材料采购流程，协调相关部门加速许可证办理"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">责任人</label>
                            <Input placeholder="请输入责任人..." defaultValue="张工" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">预计完成时间</label>
                            <Input type="date" defaultValue="2025-06-10" />
                          </div>
                          <Button className="w-full">提交</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <div className="p-3 bg-green-50 rounded-md">
                    <div className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">项目进度正常</p>
                        <p className="text-xs text-gray-500 mt-1">当前项目各阶段进度符合或优于计划要求</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>项目进度统计</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar
                data={{
                  labels: [
                    "城市基础设施改造项目",
                    "智慧城市数据中心建设",
                    "公共卫生服务中心扩建",
                    "城市绿化带改造工程",
                  ],
                  datasets: [
                    {
                      label: "计划进度",
                      data: [65, 70, 45, 85],
                      backgroundColor: "rgba(54, 162, 235, 0.5)",
                    },
                    {
                      label: "实际进度",
                      data: [55, 72, 40, 80],
                      backgroundColor: "rgba(75, 192, 192, 0.5)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>进度偏差趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Line
                data={{
                  labels: ["1月", "2月", "3月", "4月", "5月"],
                  datasets: [
                    {
                      label: "平均进度偏差率",
                      data: [2, 5, 8, 12, 10],
                      borderColor: "rgba(255, 99, 132, 1)",
                      backgroundColor: "rgba(255, 99, 132, 0.2)",
                      tension: 0.3,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => value + "%",
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>进度异常项目列表</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>项目名称</TableHead>
                <TableHead>责任单位</TableHead>
                <TableHead>计划进度</TableHead>
                <TableHead>实际进度</TableHead>
                <TableHead>偏差率</TableHead>
                <TableHead>异常原因</TableHead>
                <TableHead>处理状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">城市基础设施改造项目</TableCell>
                <TableCell>城市建设局</TableCell>
                <TableCell>65%</TableCell>
                <TableCell>55%</TableCell>
                <TableCell className="text-red-600">-10%</TableCell>
                <TableCell>材料采购延迟</TableCell>
                <TableCell>
                  <Badge className="bg-yellow-100 text-yellow-800">处理中</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    查看详情
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">公共卫生服务中心扩建</TableCell>
                <TableCell>卫生健康委员会</TableCell>
                <TableCell>45%</TableCell>
                <TableCell>40%</TableCell>
                <TableCell className="text-red-600">-5%</TableCell>
                <TableCell>人力资源不足</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">已处理</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    查看详情
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function QualityCompliance() {
  // Mock data for quality checks
  const qualityChecks = [
    {
      id: 1,
      project: "城市基础设施改造项目",
      checkTime: "2025-05-15 10:30",
      inspector: "张工",
      standard: "市政工程质量标准 GB50500-2013",
      result: "合格",
      issues: [],
    },
    {
      id: 2,
      project: "智慧城市数据中心建设",
      checkTime: "2025-05-14 14:20",
      inspector: "李工",
      standard: "信息系统工程监理规范 GB/T 19668-2017",
      result: "不合格",
      issues: ["服务器机房温控系统不达标", "备份系统测试未通过"],
    },
    {
      id: 3,
      project: "公共卫生服务中心扩建",
      checkTime: "2025-05-13 11:15",
      inspector: "王工",
      standard: "医疗建筑工程质量验收规范 GB 51212-2016",
      result: "合格",
      issues: [],
    },
    {
      id: 4,
      project: "城市绿化带改造工程",
      checkTime: "2025-05-10 16:45",
      inspector: "赵工",
      standard: "园林绿化工程施工及验收规范 CJJ/T 82-2012",
      result: "不合格",
      issues: ["灌溉系统安装不规范", "部分植物种植深度不符合要求"],
    },
  ]

  // Mock data for bar chart
  const barData = {
    labels: ["1月", "2月", "3月", "4月", "5月"],
    datasets: [
      {
        label: "质量检查次数",
        data: [45, 52, 38, 65, 48],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "不合格次数",
        data: [5, 7, 3, 8, 6],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
      },
    },
  }

  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">质量合规性监管</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="搜索检查记录..." className="pl-8 w-64" />
          </div>
          <Button>生成质量报告</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">156</div>
              <div className="text-sm text-gray-500">本月检查次数</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">22</div>
              <div className="text-sm text-gray-500">不合格次数</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">85.9%</div>
              <div className="text-sm text-gray-500">合格率</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">18</div>
              <div className="text-sm text-gray-500">待整改项</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>质量检查统计</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Bar data={barData} options={barOptions} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">全部检查</TabsTrigger>
          <TabsTrigger value="qualified">合格检查</TabsTrigger>
          <TabsTrigger value="unqualified">不合格检查</TabsTrigger>
          <TabsTrigger value="rectification">整改跟踪</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>质量检查记录</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>项目名称</TableHead>
                <TableHead>检查时间</TableHead>
                <TableHead>检查人员</TableHead>
                <TableHead>检查标准</TableHead>
                <TableHead>检查结果</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qualityChecks
                .filter((check) => {
                  if (activeTab === "all") return true
                  if (activeTab === "qualified") return check.result === "合格"
                  if (activeTab === "unqualified") return check.result === "不合格"
                  if (activeTab === "rectification") return check.result === "不合格"
                  return true
                })
                .map((check) => (
                  <TableRow key={check.id}>
                    <TableCell className="font-medium">{check.project}</TableCell>
                    <TableCell>{check.checkTime}</TableCell>
                    <TableCell>{check.inspector}</TableCell>
                    <TableCell className="max-w-xs truncate" title={check.standard}>
                      {check.standard}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={check.result === "合格" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {check.result}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              查看详情
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>质量检查详情</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="font-semibold mb-2">基本信息</h3>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">项目名称:</span>
                                      <span>{check.project}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">检查时间:</span>
                                      <span>{check.checkTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">检查人员:</span>
                                      <span>{check.inspector}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">检查标准:</span>
                                      <span>{check.standard}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">检查结果:</span>
                                      <span>{check.result}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2">检查项目</h3>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center">
                                      <Check className="h-4 w-4 text-green-500 mr-2" />
                                      <span>材料质量检查</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Check className="h-4 w-4 text-green-500 mr-2" />
                                      <span>施工工艺检查</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Check className="h-4 w-4 text-green-500 mr-2" />
                                      <span>安全措施检查</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Check className="h-4 w-4 text-green-500 mr-2" />
                                      <span>环保措施检查</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {check.issues.length > 0 && (
                                <div>
                                  <h3 className="font-semibold mb-2">问题描述</h3>
                                  <div className="p-3 bg-red-50 rounded-md">
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                      {check.issues.map((issue, index) => (
                                        <li key={index}>{issue}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                              {check.result === "不合格" && (
                                <div>
                                  <h3 className="font-semibold mb-2">整改要求</h3>
                                  <div className="p-3 bg-gray-50 rounded-md text-sm">
                                    <p>1. 立即停止相关工作，进行整改</p>
                                    <p>2. 提交整改方案，经审核通过后实施</p>
                                    <p>3. 整改完成后，重新申请质量检查</p>
                                    <p>4. 整改期限：7个工作日内</p>
                                  </div>
                                </div>
                              )}
                              {check.result === "不合格" && (
                                <div>
                                  <h3 className="font-semibold mb-2">整改进展</h3>
                                  <Textarea placeholder="请输入整改进展..." className="h-24" />
                                  <div className="flex justify-end space-x-2 mt-2">
                                    <Button variant="outline">上传整改照片</Button>
                                    <Button>提交整改进展</Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        {check.result === "不合格" && (
                          <Button variant="outline" size="sm">
                            整改跟踪
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>常见质量问题分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>材料质量不达标</span>
                  <span>35%</span>
                </div>
                <Progress value={35} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>施工工艺不规范</span>
                  <span>25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>设备安装不合格</span>
                  <span>20%</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>验收标准不达标</span>
                  <span>15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>其他问题</span>
                  <span>5%</span>
                </div>
                <Progress value={5} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>整改完成情况</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">75%</div>
                  <div className="text-xs text-gray-500">完成率</div>
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold">18</div>
                  <div className="text-xs text-gray-500">待整改</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">54</div>
                  <div className="text-xs text-gray-500">已整改</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function FundUsage() {
  // Mock data for fund records
  const fundRecords = [
    {
      id: 1,
      project: "城市基础设施改造项目",
      date: "2025-05-15",
      type: "支出",
      amount: "¥1,500,000.00",
      purpose: "材料采购",
      approver: "张经理",
      status: "已审批",
    },
    {
      id: 2,
      project: "智慧城市数据中心建设",
      date: "2025-05-14",
      type: "支出",
      amount: "¥800,000.00",
      purpose: "设备采购",
      approver: "李经理",
      status: "已审批",
    },
    {
      id: 3,
      project: "公共卫生服务中心扩建",
      date: "2025-05-13",
      type: "收入",
      amount: "¥3,000,000.00",
      purpose: "项目拨款",
      approver: "王主任",
      status: "已审批",
    },
    {
      id: 4,
      project: "城市绿化带改造工程",
      date: "2025-05-12",
      type: "支出",
      amount: "¥500,000.00",
      purpose: "人工费用",
      approver: "赵经理",
      status: "审批中",
    },
  ]

  // Mock data for budget comparison
  const budgetComparison = [
    {
      category: "材料费",
      budget: "¥5,000,000.00",
      actual: "¥3,200,000.00",
      percentage: 64,
    },
    {
      category: "人工费",
      budget: "¥3,000,000.00",
      actual: "¥1,800,000.00",
      percentage: 60,
    },
    {
      category: "设备费",
      budget: "¥2,500,000.00",
      actual: "¥1,500,000.00",
      percentage: 60,
    },
    {
      category: "管理费",
      budget: "¥1,000,000.00",
      actual: "¥400,000.00",
      percentage: 40,
    },
    {
      category: "其他费用",
      budget: "¥500,000.00",
      actual: "¥150,000.00",
      percentage: 30,
    },
  ]

  // Mock data for line chart
  const lineData = {
    labels: ["1月", "2月", "3月", "4月", "5月"],
    datasets: [
      {
        label: "预算执行率",
        data: [15, 28, 36, 48, 57],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
    ],
  }

  const lineOptions = {
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
        ticks: {
          callback: (value: number) => value + "%",
        },
      },
    },
  }

  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">资金使用监管</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="搜索记录..." className="pl-8 w-64" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">¥12,000,000</div>
              <div className="text-sm text-gray-500">总预算</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">¥7,050,000</div>
              <div className="text-sm text-gray-500">已使用</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">¥4,950,000</div>
              <div className="text-sm text-gray-500">剩余预算</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">58.75%</div>
              <div className="text-sm text-gray-500">预算执行率</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>预算执行趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar
                data={{
                  labels: lineData.labels,
                  datasets: [
                    {
                      label: "预算执行率",
                      data: lineData.datasets[0].data,
                      backgroundColor: "rgba(54, 162, 235, 0.5)",
                    },
                  ],
                }}
                options={{
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
                      ticks: {
                        callback: (value) => value + "%",
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>预算执行情况</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">总预算</span>
                <span>¥12,000,000.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">已使用</span>
                <span>¥7,050,000.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">剩余预算</span>
                <span>¥4,950,000.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">预算执行率</span>
                <span>58.75%</span>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>执行进度</span>
                  <span>58.75%</span>
                </div>
                <Progress value={58.75} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>预算与实际支出对比</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>费用类别</TableHead>
                <TableHead>预算金额</TableHead>
                <TableHead>实际支出</TableHead>
                <TableHead>执行率</TableHead>
                <TableHead>执行进度</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetComparison.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell>{item.budget}</TableCell>
                  <TableCell>{item.actual}</TableCell>
                  <TableCell>{item.percentage}%</TableCell>
                  <TableCell>
                    <div className="w-full max-w-xs">
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">全部记录</TabsTrigger>
          <TabsTrigger value="income">收入记录</TabsTrigger>
          <TabsTrigger value="expense">支出记录</TabsTrigger>
          <TabsTrigger value="pending">待审批</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>经费收支明细</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="选择项目" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部项目</SelectItem>
                  <SelectItem value="1">城市基础设施改造项目</SelectItem>
                  <SelectItem value="2">智慧城市数据中心建设</SelectItem>
                  <SelectItem value="3">公共卫生服务中心扩建</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Input type="number" placeholder="最小金额" className="w-32" />
              <span className="flex items-center">-</span>
              <Input type="number" placeholder="最大金额" className="w-32" />
              <Button variant="outline" size="sm">
                筛选
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>项目名称</TableHead>
                <TableHead>日期</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>金额</TableHead>
                <TableHead>用途</TableHead>
                <TableHead>审批人</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fundRecords
                .filter((record) => {
                  if (activeTab === "all") return true
                  if (activeTab === "income") return record.type === "收入"
                  if (activeTab === "expense") return record.type === "支出"
                  if (activeTab === "pending") return record.status === "审批中"
                  return true
                })
                .map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.project}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      <Badge
                        className={record.type === "收入" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                      >
                        {record.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.amount}</TableCell>
                    <TableCell>{record.purpose}</TableCell>
                    <TableCell>{record.approver}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          record.status === "已审批" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            查看详情
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>经费记录详情</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold mb-2">基本信息</h3>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">项目名称:</span>
                                    <span>{record.project}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">日期:</span>
                                    <span>{record.date}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">类型:</span>
                                    <span>{record.type}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">金额:</span>
                                    <span>{record.amount}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">用途:</span>
                                    <span>{record.purpose}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">审批信息</h3>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">申请人:</span>
                                    <span>张三</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">申请时间:</span>
                                    <span>2025-05-10 09:30</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">审批人:</span>
                                    <span>{record.approver}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">审批时间:</span>
                                    <span>2025-05-12 14:20</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">审批状态:</span>
                                    <span>{record.status}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2">详细说明</h3>
                              <div className="p-3 bg-gray-50 rounded-md text-sm">
                                <p>
                                  {record.type === "支出"
                                    ? `用于${record.project}的${record.purpose}，包括设备采购、安装和调试等费用。`
                                    : `${record.project}的项目拨款，用于支持项目顺利实施。`}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2">相关附件</h3>
                              <div className="p-3 bg-gray-50 rounded-md">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <FileText className="h-4 w-4 mr-2" />
                                    <span className="text-sm">发票凭证.pdf</span>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    下载
                                  </Button>
                                </div>
                              </div>
                            </div>
                            {record.status === "审批中" && (
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">退回</Button>
                                <Button>审批通过</Button>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      {record.status === "审批中" && (
                        <Button size="sm" className="ml-2">
                          审批
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>资金使用异常预警</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-md">
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">智慧城市数据中心建设</p>
                    <p className="text-xs text-gray-500 mt-1">设备采购支出超出预算20%，请及时关注</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-md">
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">城市基础设施改造项目</p>
                    <p className="text-xs text-gray-500 mt-1">材料费用支出进度缓慢，仅完成预算的40%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>资金使用效率分析</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">资金周转率</span>
                <span className="font-semibold">2.5次/月</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">资金使用效率</span>
                <span className="font-semibold">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">资金闲置率</span>
                <span className="font-semibold">15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">预算执行偏差率</span>
                <span className="font-semibold">±8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
