"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Check, Search, Filter, Download, Eye, FileText, Calendar, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Doughnut, Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

interface FundSupervisionProps {
  activePage: string
}

export default function FundSupervision({ activePage }: FundSupervisionProps) {
  const renderContent = () => {
    switch (activePage) {
      case "budget-execution":
        return <BudgetExecution />
      case "expenditure-compliance":
        return <ExpenditureCompliance />
      case "fund-security":
        return <FundSecurity />
      default:
        return <BudgetExecution />
    }
  }

  return <div>{renderContent()}</div>
}

function BudgetExecution() {
  // Mock data for budget execution
  const budgetData = {
    totalBudget: "¥12,000,000.00",
    usedBudget: "¥7,050,000.00",
    remainingBudget: "¥4,950,000.00",
    executionRate: 58.75,
  }

  // Mock data for budget categories
  const budgetCategories = [
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
        data: [15, 28, 36, 48, 58.75],
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
        <h2 className="text-2xl font-bold">预算执行监管</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{budgetData.totalBudget}</div>
              <div className="text-sm text-gray-500">总预算</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{budgetData.usedBudget}</div>
              <div className="text-sm text-gray-500">已使用</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{budgetData.remainingBudget}</div>
              <div className="text-sm text-gray-500">剩余预算</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{budgetData.executionRate}%</div>
              <div className="text-sm text-gray-500">预算执行率</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">预算概览</TabsTrigger>
          <TabsTrigger value="details">预算明细</TabsTrigger>
          <TabsTrigger value="analysis">执行分析</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>预算执行趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line data={lineData} options={lineOptions} />
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>预算执行看板</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">预算执行率</span>
                    <span>{budgetData.executionRate}%</span>
                  </div>
                  <div className="pt-2">
                    <Progress value={budgetData.executionRate} className="h-2" />
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <h3 className="text-sm font-medium mb-2">执行状态</h3>
                    <div className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm">预算执行正常</p>
                        <p className="text-xs text-gray-500 mt-1">当前执行进度符合项目计划</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-md">
                    <h3 className="text-sm font-medium mb-2">预警提示</h3>
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm">管理费用支出较低</p>
                        <p className="text-xs text-gray-500 mt-1">当前执行率仅为40%，低于平均水平</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>预算分类执行情况</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-medium mb-4">预算类别分布</h3>
                  <div className="h-64">
                    <Doughnut
                      data={{
                        labels: budgetCategories.map((cat) => cat.category),
                        datasets: [
                          {
                            data: budgetCategories.map((cat) => Number.parseInt(cat.budget.replace(/[^\d]/g, ""))),
                            backgroundColor: [
                              "rgba(54, 162, 235, 0.5)",
                              "rgba(75, 192, 192, 0.5)",
                              "rgba(255, 206, 86, 0.5)",
                              "rgba(255, 99, 132, 0.5)",
                              "rgba(153, 102, 255, 0.5)",
                            ],
                            borderWidth: 1,
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium mb-4">预算执行情况</h3>
                  <div className="space-y-4">
                    {budgetCategories.map((category, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{category.category}</span>
                          <span>{category.percentage}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={category.percentage} className="h-2 flex-1" />
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {category.actual}/{category.budget}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>预算明细表</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>预算项目</TableHead>
                    <TableHead>预算金额</TableHead>
                    <TableHead>已使用金额</TableHead>
                    <TableHead>剩余金额</TableHead>
                    <TableHead>执行率</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgetCategories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{category.category}</TableCell>
                      <TableCell>{category.budget}</TableCell>
                      <TableCell>{category.actual}</TableCell>
                      <TableCell>
                        {`¥${(
                          Number.parseInt(category.budget.replace(/[^\d]/g, "")) -
                            Number.parseInt(category.actual.replace(/[^\d]/g, ""))
                        ).toLocaleString()}.00`}
                      </TableCell>
                      <TableCell>{category.percentage}%</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            category.percentage > 80
                              ? "bg-green-100 text-green-800"
                              : category.percentage > 50
                                ? "bg-blue-100 text-blue-800"
                                : category.percentage < 30
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }
                        >
                          {category.percentage > 80
                            ? "良好"
                            : category.percentage > 50
                              ? "正常"
                              : category.percentage < 30
                                ? "滞后"
                                : "正常"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          查看详情
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analysis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>预算执行偏差分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Bar
                    data={{
                      labels: budgetCategories.map((cat) => cat.category),
                      datasets: [
                        {
                          label: "计划执行率",
                          data: [70, 65, 60, 55, 50],
                          backgroundColor: "rgba(54, 162, 235, 0.5)",
                        },
                        {
                          label: "实际执行率",
                          data: budgetCategories.map((cat) => cat.percentage),
                          backgroundColor: "rgba(75, 192, 192, 0.5)",
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
            <Card>
              <CardHeader>
                <CardTitle>执行效率分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">资金使用效率</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">预算执行均衡性</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "72%" }}></div>
                      </div>
                      <span className="text-sm font-medium">72%</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">预算调整频率</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                      </div>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <h3 className="text-sm font-medium mb-2">分析结论</h3>
                    <p className="text-sm text-gray-600">
                      预算执行整体情况良好，资金使用效率较高。但管理费用支出较低，建议关注并加快相关工作进度。预算调整频率较低，表明预算编制较为合理。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ExpenditureCompliance() {
  // Mock data for expenditure records
  const expenditureRecords = [
    {
      id: 1,
      project: "城市基础设施改造项目",
      date: "2025-05-15",
      type: "材料采购",
      amount: "¥1,500,000.00",
      approver: "张经理",
      status: "合规",
    },
    {
      id: 2,
      project: "智慧城市数据中心建设",
      date: "2025-05-14",
      type: "设备采购",
      amount: "¥800,000.00",
      approver: "李经理",
      status: "合规",
    },
    {
      id: 3,
      project: "公共卫生服务中心扩建",
      date: "2025-05-13",
      type: "咨询服务",
      amount: "¥300,000.00",
      approver: "王主任",
      status: "待审核",
    },
    {
      id: 4,
      project: "城市绿化带改造工程",
      date: "2025-05-12",
      type: "人工费用",
      amount: "¥500,000.00",
      approver: "赵经理",
      status: "不合规",
      issue: "超出预算限额",
    },
  ]

  // Mock data for compliance rules
  const complianceRules = [
    {
      id: 1,
      name: "单笔支出审批流程",
      description: "金额超过50万元的支出需经过部门经理、财务总监和主管领导三级审批",
      category: "审批流程",
      status: "有效",
    },
    {
      id: 2,
      name: "预算控制规则",
      description: "各项支出不得超出年度预算的110%，超出部分需专项申请",
      category: "预算管理",
      status: "有效",
    },
    {
      id: 3,
      name: "供应商管理规定",
      description: "采购金额超过100万元需至少比较三家供应商报价",
      category: "采购管理",
      status: "有效",
    },
    {
      id: 4,
      name: "发票管理规定",
      description: "所有支出必须有合法有效的发票或收据，且发票信息必须完整准确",
      category: "票据管理",
      status: "有效",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">收支合规性监管</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="搜索记录..." className="pl-8 w-64" />
          </div>
          <Button>生成合规报告</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">92%</div>
              <div className="text-sm text-gray-500">合规率</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">156</div>
              <div className="text-sm text-gray-500">本月交易数</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">12</div>
              <div className="text-sm text-gray-500">不合规交易</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">8</div>
              <div className="text-sm text-gray-500">待审核交易</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="records" className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">交易记录</TabsTrigger>
          <TabsTrigger value="rules">合规规则</TabsTrigger>
          <TabsTrigger value="analysis">合规分析</TabsTrigger>
        </TabsList>
        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>收支交易记录</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>项目名称</TableHead>
                    <TableHead>交易日期</TableHead>
                    <TableHead>交易类型</TableHead>
                    <TableHead>金额</TableHead>
                    <TableHead>审批人</TableHead>
                    <TableHead>合规状态</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenditureRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.project}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.amount}</TableCell>
                      <TableCell>{record.approver}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            record.status === "合规"
                              ? "bg-green-100 text-green-800"
                              : record.status === "待审核"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              查看详情
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>交易详情</DialogTitle>
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
                                      <span className="text-gray-500">交易日期:</span>
                                      <span>{record.date}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">交易类型:</span>
                                      <span>{record.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">金额:</span>
                                      <span>{record.amount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">审批人:</span>
                                      <span>{record.approver}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2">合规检查</h3>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">合规状态:</span>
                                      <span
                                        className={
                                          record.status === "合规"
                                            ? "text-green-600"
                                            : record.status === "待审核"
                                              ? "text-yellow-600"
                                              : "text-red-600"
                                        }
                                      >
                                        {record.status}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">检查时间:</span>
                                      <span>{record.date} 14:30</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">检查人员:</span>
                                      <span>系统自动检查</span>
                                    </div>
                                    {record.status === "不合规" && (
                                      <div className="flex justify-between">
                                        <span className="text-gray-500">不合规原因:</span>
                                        <span className="text-red-600">{record.issue}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">合规检查详情</h3>
                                <div className="space-y-2">
                                  <div className="p-3 bg-gray-50 rounded-md">
                                    <div className="flex items-center">
                                      <div
                                        className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                                          record.status === "合规" || record.status === "待审核"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                      >
                                        {record.status === "合规" || record.status === "待审核" ? (
                                          <Check className="h-3 w-3" />
                                        ) : (
                                          <AlertTriangle className="h-3 w-3" />
                                        )}
                                      </div>
                                      <span className="text-sm font-medium">预算控制检查</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 ml-7">
                                      {record.status === "不合规" && record.issue === "超出预算限额"
                                        ? "该支出超出年度预算限额，需要专项申请"
                                        : "支出金额在预算范围内"}
                                    </p>
                                  </div>
                                  <div className="p-3 bg-gray-50 rounded-md">
                                    <div className="flex items-center">
                                      <div className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-2">
                                        <Check className="h-3 w-3" />
                                      </div>
                                      <span className="text-sm font-medium">审批流程检查</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 ml-7">
                                      审批流程符合规定，已完成所有必要审批
                                    </p>
                                  </div>
                                  <div className="p-3 bg-gray-50 rounded-md">
                                    <div className="flex items-center">
                                      <div className="w-5 h-5 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-2">
                                        <Check className="h-3 w-3" />
                                      </div>
                                      <span className="text-sm font-medium">票据合规检查</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 ml-7">发票信息完整，符合票据管理规定</p>
                                  </div>
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
                              {record.status === "待审核" && (
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline">标记为不合规</Button>
                                  <Button>标记为合规</Button>
                                </div>
                              )}
                              {record.status === "不合规" && (
                                <div className="flex justify-end space-x-2">
                                  <Button>处理异常</Button>
                                </div>
                              )}
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
        </TabsContent>
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>合规规则库</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>规则名称</TableHead>
                    <TableHead>规则描述</TableHead>
                    <TableHead>规则类别</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>{rule.description}</TableCell>
                      <TableCell>{rule.category}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{rule.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          查看详情
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="mt-4 flex justify-end">
            <Button>添加新规则</Button>
          </div>
        </TabsContent>
        <TabsContent value="analysis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>合规问题分布</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Doughnut
                    data={{
                      labels: ["预算超支", "审批流程不完整", "票据不合规", "供应商选择不当", "其他问题"],
                      datasets: [
                        {
                          data: [45, 25, 15, 10, 5],
                          backgroundColor: [
                            "rgba(255, 99, 132, 0.5)",
                            "rgba(54, 162, 235, 0.5)",
                            "rgba(255, 206, 86, 0.5)",
                            "rgba(75, 192, 192, 0.5)",
                            "rgba(153, 102, 255, 0.5)",
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>合规趋势分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Line
                    data={{
                      labels: ["1月", "2月", "3月", "4月", "5月"],
                      datasets: [
                        {
                          label: "合规率",
                          data: [85, 87, 90, 88, 92],
                          borderColor: "rgba(75, 192, 192, 1)",
                          backgroundColor: "rgba(75, 192, 192, 0.2)",
                          tension: 0.3,
                        },
                        {
                          label: "不合规交易数",
                          data: [18, 15, 12, 14, 12],
                          borderColor: "rgba(255, 99, 132, 1)",
                          backgroundColor: "rgba(255, 99, 132, 0.2)",
                          tension: 0.3,
                        },
                      ],
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>合规风险评估</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-md">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">整体合规风险较低</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        当前系统合规率为92%，高于行业平均水平，整体合规风险较低。
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-md">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-yellow-800">预算控制风险提示</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        预算超支问题占不合规问题的45%，建议加强预算控制和监督，避免超预算支出。
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-md">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800">合规改进建议</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        1. 加强预算执行监控，建立预算预警机制；
                        <br />
                        2. 完善审批流程，确保所有支出经过必要审批；
                        <br />
                        3. 定期开展合规培训，提高相关人员合规意识。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function FundSecurity() {
  // Mock data for security metrics
  const securityMetrics = {
    riskScore: 15,
    abnormalTransactions: 3,
    securityLevel: "安全",
    lastScan: "2025-05-20 08:30",
  }

  // Mock data for risk alerts
  const riskAlerts = [
    {
      id: 1,
      type: "异常交易",
      description: "检测到短时间内多笔大额资金转出",
      time: "2025-05-18 14:30",
      level: "高",
      status: "已处理",
    },
    {
      id: 2,
      type: "权限异常",
      description: "非授权人员尝试访问资金管理系统",
      time: "2025-05-17 09:45",
      level: "高",
      status: "已处理",
    },
    {
      id: 3,
      type: "系统漏洞",
      description: "资金管理系统存在安全漏洞",
      time: "2025-05-15 16:20",
      level: "中",
      status: "处理中",
    },
  ]

  // Mock data for security checks
  const securityChecks = [
    {
      id: 1,
      name: "资金账户安全检查",
      lastCheck: "2025-05-20",
      result: "正常",
      frequency: "每日",
    },
    {
      id: 2,
      name: "交易行为异常检测",
      lastCheck: "2025-05-20",
      result: "正常",
      frequency: "实时",
    },
    {
      id: 3,
      name: "权限管理审计",
      lastCheck: "2025-05-15",
      result: "正常",
      frequency: "每周",
    },
    {
      id: 4,
      name: "系统安全漏洞扫描",
      lastCheck: "2025-05-10",
      result: "发现风险",
      frequency: "每月",
      issue: "发现2个中危漏洞",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">资金安全监管</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-1" />
            安全检查
          </Button>
          <Button>生成安全报告</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{securityMetrics.riskScore}</div>
              <div className="text-sm text-gray-500">风险评分</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{securityMetrics.abnormalTransactions}</div>
              <div className="text-sm text-gray-500">异常交易</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{securityMetrics.securityLevel}</div>
              <div className="text-sm text-gray-500">安全等级</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{securityMetrics.lastScan.split(" ")[0]}</div>
              <div className="text-sm text-gray-500">最近检查</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>资金安全风险监测</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">整体风险评估</h3>
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
              </div>
              <div className="h-64">
                <Line
                  data={{
                    labels: ["1月", "2月", "3月", "4月", "5月"],
                    datasets: [
                      {
                        label: "风险评分",
                        data: [25, 22, 18, 20, 15],
                        borderColor: "rgba(255, 99, 132, 1)",
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        tension: 0.3,
                      },
                      {
                        label: "异常交易数",
                        data: [8, 6, 5, 4, 3],
                        borderColor: "rgba(54, 162, 235, 1)",
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        tension: 0.3,
                      },
                    ],
                  }}
                />
              </div>
              <div className="p-3 bg-green-50 rounded-md">
                <div className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">资金安全状况良好</p>
                    <p className="text-xs text-gray-500 mt-1">
                      当前风险评分为15分，处于安全范围内。近期风险评分呈下降趋势，异常交易数量减少，资金安全状况持续改善。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>风险预警</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 ${
                    alert.level === "高" ? "bg-red-50" : alert.level === "中" ? "bg-yellow-50" : "bg-blue-50"
                  } rounded-md`}
                >
                  <div className="flex items-start">
                    <AlertTriangle
                      className={`h-4 w-4 ${
                        alert.level === "高"
                          ? "text-red-500"
                          : alert.level === "中"
                            ? "text-yellow-500"
                            : "text-blue-500"
                      } mt-0.5 mr-2 flex-shrink-0`}
                    />
                    <div>
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium">{alert.type}</p>
                        <Badge
                          className={
                            alert.status === "已处理" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{alert.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                查看全部预警
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>安全检查记录</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>检查项目</TableHead>
                <TableHead>最近检查时间</TableHead>
                <TableHead>检查结果</TableHead>
                <TableHead>检查频率</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {securityChecks.map((check) => (
                <TableRow key={check.id}>
                  <TableCell className="font-medium">{check.name}</TableCell>
                  <TableCell>{check.lastCheck}</TableCell>
                  <TableCell>
                    <Badge
                      className={check.result === "正常" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {check.result}
                    </Badge>
                  </TableCell>
                  <TableCell>{check.frequency}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          查看详情
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>安全检查详情 - {check.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-semibold mb-2">基本信息</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">检查项目:</span>
                                  <span>{check.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">最近检查时间:</span>
                                  <span>{check.lastCheck}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">检查结果:</span>
                                  <span>{check.result}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">检查频率:</span>
                                  <span>{check.frequency}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2">检查详情</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">检查人员:</span>
                                  <span>系统自动检查</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">检查方式:</span>
                                  <span>自动化扫描</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">下次检查时间:</span>
                                  <span>
                                    {check.frequency === "每日"
                                      ? "2025-05-21"
                                      : check.frequency === "每周"
                                        ? "2025-05-22"
                                        : "2025-06-10"}
                                  </span>
                                </div>
                                {check.issue && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">发现问题:</span>
                                    <span className="text-red-600">{check.issue}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">检查内容</h3>
                            <div className="p-3 bg-gray-50 rounded-md text-sm">
                              <p>
                                {check.name === "资金账户安全检查"
                                  ? "检查资金账户的访问权限、操作日志和异常交易记录，确保资金账户安全。"
                                  : check.name === "交易行为异常检测"
                                    ? "通过AI算法分析交易行为模式，识别可能的异常交易行为。"
                                    : check.name === "权限管理审计"
                                      ? "审计系统用户权限设置，确保权限分配合理，无越权操作风险。"
                                      : "扫描系统潜在安全漏洞，及时发现并修复安全隐患。"}
                              </p>
                            </div>
                          </div>
                          {check.result !== "正常" && (
                            <div>
                              <h3 className="font-semibold mb-2">处理措施</h3>
                              <Textarea
                                placeholder="请输入处理措施..."
                                defaultValue="已安排技术团队修复发现的安全漏洞，预计3个工作日内完成修复。"
                              />
                              <div className="mt-2">
                                <label className="text-sm font-medium">责任人</label>
                                <Input placeholder="请输入责任人..." defaultValue="张工" />
                              </div>
                              <div className="mt-2">
                                <label className="text-sm font-medium">完成时间</label>
                                <Input type="date" defaultValue="2025-05-23" />
                              </div>
                            </div>
                          )}
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline">导出检查报告</Button>
                            {check.result !== "正常" && <Button>提交处理措施</Button>}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm" className="ml-2">
                      立即检查
                    </Button>
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
            <CardTitle>安全防护措施</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium mb-2">多因素认证</h3>
                <p className="text-sm text-gray-600">已为所有资金管理系统用户启用多因素认证，提高账户安全性。</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">覆盖率</span>
                  <span className="text-xs font-medium">100%</span>
                </div>
                <Progress value={100} className="h-1 mt-1" />
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium mb-2">交易监控系统</h3>
                <p className="text-sm text-gray-600">实时监控所有资金交易，自动识别异常交易行为并发出预警。</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">运行状态</span>
                  <Badge className="bg-green-100 text-green-800">正常</Badge>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium mb-2">权限分级管理</h3>
                <p className="text-sm text-gray-600">
                  实施严格的权限分级管理，确保资金操作权限合理分配，防止越权操作。
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">最近审计</span>
                  <span className="text-xs font-medium">2025-05-15</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium mb-2">数据加密存储</h3>
                <p className="text-sm text-gray-600">所有资金数据采用高强度加密存储，防止数据泄露风险。</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">加密强度</span>
                  <span className="text-xs font-medium">AES-256</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>安全培训与演练</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium">资金安全意识培训</h3>
                  <Badge className="bg-green-100 text-green-800">已完成</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">为所有财务人员开展资金安全意识培训，提高安全防范意识。</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">培训时间</span>
                  <span className="text-xs font-medium">2025-04-15</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium">资金安全应急演练</h3>
                  <Badge className="bg-green-100 text-green-800">已完成</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">组织开展资金安全应急演练，提高应对资金安全事件的能力。</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">演练时间</span>
                  <span className="text-xs font-medium">2025-04-25</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium">安全操作规范培训</h3>
                  <Badge className="bg-blue-100 text-blue-800">计划中</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  计划开展资金操作安全规范培训，确保操作人员严格遵守安全规范。
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">计划时间</span>
                  <span className="text-xs font-medium">2025-06-15</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                查看培训计划
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
