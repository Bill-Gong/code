"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertTriangle, MessageSquare, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface QualityEffectivenessProps {
  activePage: string
}

export default function QualityEffectiveness({ activePage }: QualityEffectivenessProps) {
  const renderContent = () => {
    switch (activePage) {
      case "goal-achievement":
        return <GoalAchievement />
      case "indicator-assessment":
        return <IndicatorAssessment />
      case "feedback-handling":
        return <FeedbackHandling />
      default:
        return <GoalAchievement />
    }
  }

  return <div>{renderContent()}</div>
}

function GoalAchievement() {
  // Mock data for quality goals
  const qualityGoals = [
    {
      id: 1,
      indicator: "道路平整度",
      target: "≥95%",
      actual: "97%",
      achieved: true,
      project: "城市基础设施改造项目",
    },
    {
      id: 2,
      indicator: "排水系统畅通率",
      target: "100%",
      actual: "98%",
      achieved: false,
      project: "城市基础设施改造项目",
    },
    {
      id: 3,
      indicator: "系统响应时间",
      target: "≤200ms",
      actual: "180ms",
      achieved: true,
      project: "智慧城市数据中心建设",
    },
    {
      id: 4,
      indicator: "系统可用性",
      target: "≥99.9%",
      actual: "99.95%",
      achieved: true,
      project: "智慧城市数据中心建设",
    },
    {
      id: 5,
      indicator: "医疗设备合格率",
      target: "100%",
      actual: "100%",
      achieved: true,
      project: "公共卫生服务中心扩建",
    },
  ]

  // Mock data for bar chart
  const barData = {
    labels: ["道路平整度", "排水系统畅通率", "系统响应时间", "系统可用性", "医疗设备合格率"],
    datasets: [
      {
        label: "目标值",
        data: [95, 100, 200, 99.9, 100],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "实际值",
        data: [97, 98, 180, 99.95, 100],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">质量目标达成监管</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="搜索指标..." className="pl-8 w-64" />
          </div>
          <Button>生成质量报告</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>质量目标达成情况</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Bar data={barData} options={barOptions} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>质量目标与成果对比</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>质量指标</TableHead>
                <TableHead>所属项目</TableHead>
                <TableHead>目标值</TableHead>
                <TableHead>实际值</TableHead>
                <TableHead>达成状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qualityGoals.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell className="font-medium">{goal.indicator}</TableCell>
                  <TableCell>{goal.project}</TableCell>
                  <TableCell>{goal.target}</TableCell>
                  <TableCell>{goal.actual}</TableCell>
                  <TableCell>
                    <Badge className={goal.achieved ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {goal.achieved ? "已达成" : "未达成"}
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
                          <DialogTitle>质量指标详情 - {goal.indicator}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-semibold mb-2">基本信息</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">质量指标:</span>
                                  <span>{goal.indicator}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">所属项目:</span>
                                  <span>{goal.project}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">目标值:</span>
                                  <span>{goal.target}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">实际值:</span>
                                  <span>{goal.actual}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">达成状态:</span>
                                  <span>{goal.achieved ? "已达成" : "未达成"}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2">评估信息</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">评估人员:</span>
                                  <span>张工</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">评估时间:</span>
                                  <span>2025-05-15</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">评估方法:</span>
                                  <span>现场测量</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">数据来源:</span>
                                  <span>实地检测报告</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">详细说明</h3>
                            <div className="p-3 bg-gray-50 rounded-md text-sm">
                              <p>
                                {goal.achieved
                                  ? `${goal.indicator}指标已达到预期目标，实际测量值为${goal.actual}，超过目标值${goal.target}。`
                                  : `${goal.indicator}指标未达到预期目标，实际测量值为${goal.actual}，低于目标值${goal.target}。`}
                              </p>
                              {!goal.achieved && (
                                <p className="mt-2">
                                  未达成原因分析：部分区域排水管道连接处存在轻微堵塞，影响了整体畅通率。
                                </p>
                              )}
                            </div>
                          </div>
                          {!goal.achieved && (
                            <div>
                              <h3 className="font-semibold mb-2">改进措施</h3>
                              <Textarea
                                placeholder="请输入改进措施..."
                                defaultValue="1. 对排水系统进行全面检查，清理堵塞点；
2. 加强日常维护，定期清理排水管道；
3. 优化排水系统设计，增加检修口，方便后期维护。"
                              />
                              <div className="mt-2">
                                <label className="text-sm font-medium">责任人</label>
                                <Input placeholder="请输入责任人..." defaultValue="李工" />
                              </div>
                              <div className="mt-2">
                                <label className="text-sm font-medium">完成时间</label>
                                <Input type="date" defaultValue="2025-06-15" />
                              </div>
                            </div>
                          )}
                          <div className="flex justify-end space-x-2">
                            {!goal.achieved && <Button>提交改进措施</Button>}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>质量目标达成率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full border-8 border-green-500 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">80%</div>
                  <div className="text-sm text-gray-500">达成率</div>
                </div>
              </div>
              <div className="mt-6 w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span>总指标数</span>
                  <span>5</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>已达成</span>
                  <span>4</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>未达成</span>
                  <span>1</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>项目质量评级</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">城市基础设施改造项目</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <svg key={star} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                        <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-500 ml-2">4.0分</span>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">良好</Badge>
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">智慧城市数据中心建设</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">5.0分</span>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">优秀</Badge>
                </div>
              </div>
              <div className="p-4 border rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">公共卫生服务中心扩建</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">5.0分</span>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">优秀</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function IndicatorAssessment() {
  // Mock data for assessment indicators
  const indicators = [
    {
      id: 1,
      name: "道路平整度",
      dataSource: "实地测量",
      collectTime: "2025-05-15",
      status: "已审核",
      project: "城市基础设施改造项目",
    },
    {
      id: 2,
      name: "排水系统畅通率",
      dataSource: "实地测试",
      collectTime: "2025-05-14",
      status: "已审核",
      project: "城市基础设施改造项目",
    },
    {
      id: 3,
      name: "系统响应时间",
      dataSource: "系统监控",
      collectTime: "2025-05-15",
      status: "审核中",
      project: "智慧城市数据中心建设",
    },
    {
      id: 4,
      name: "系统可用性",
      dataSource: "系统日志",
      collectTime: "2025-05-15",
      status: "已审核",
      project: "智慧城市数据中心建设",
    },
    {
      id: 5,
      name: "医疗设备合格率",
      dataSource: "设备检测",
      collectTime: "2025-05-13",
      status: "异常",
      project: "公共卫生服务中心扩建",
      abnormalReason: "数据波动异常",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">成效指标评估监管</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="搜索指标..." className="pl-8 w-64" />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>成效评估数据审核</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>指标名称</TableHead>
                <TableHead>所属项目</TableHead>
                <TableHead>数据来源</TableHead>
                <TableHead>采集时间</TableHead>
                <TableHead>审核状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {indicators.map((indicator) => (
                <TableRow key={indicator.id}>
                  <TableCell className="font-medium">{indicator.name}</TableCell>
                  <TableCell>{indicator.project}</TableCell>
                  <TableCell>{indicator.dataSource}</TableCell>
                  <TableCell>{indicator.collectTime}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        indicator.status === "已审核"
                          ? "bg-green-100 text-green-800"
                          : indicator.status === "审核中"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {indicator.status}
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
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>指标评估详情 - {indicator.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold mb-2">基本信息</h3>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">指标名称:</span>
                                    <span>{indicator.name}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">所属项目:</span>
                                    <span>{indicator.project}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">数据来源:</span>
                                    <span>{indicator.dataSource}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">采集时间:</span>
                                    <span>{indicator.collectTime}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">审核状态:</span>
                                    <span>{indicator.status}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">数据详情</h3>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">采集人员:</span>
                                    <span>张工</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">采集方法:</span>
                                    <span>
                                      {indicator.dataSource === "实地测量"
                                        ? "专业设备测量"
                                        : indicator.dataSource === "系统监控"
                                          ? "自动监控记录"
                                          : "人工检测"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">数据值:</span>
                                    <span>
                                      {indicator.name === "道路平整度"
                                        ? "97%"
                                        : indicator.name === "排水系统畅通率"
                                          ? "98%"
                                          : indicator.name === "系统响应时间"
                                            ? "180ms"
                                            : indicator.name === "系统可用性"
                                              ? "99.95%"
                                              : "100%"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">历史均值:</span>
                                    <span>
                                      {indicator.name === "道路平整度"
                                        ? "95%"
                                        : indicator.name === "排水系统畅通率"
                                          ? "97%"
                                          : indicator.name === "系统响应时间"
                                            ? "210ms"
                                            : indicator.name === "系统可用性"
                                              ? "99.8%"
                                              : "98%"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {indicator.status === "异常" && (
                              <div className="p-3 bg-red-50 rounded-md">
                                <h3 className="font-semibold text-red-800 mb-1">异常情况</h3>
                                <p className="text-sm">{indicator.abnormalReason}</p>
                                <p className="text-sm mt-2">
                                  系统检测到数据波动异常，当前值与历史数据相比波动过大，建议进行人工核查。
                                </p>
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold mb-2">数据采集过程</h3>
                              <div className="p-3 bg-gray-50 rounded-md text-sm">
                                <p>
                                  {indicator.dataSource === "实地测量"
                                    ? "使用专业测量设备，在项目区域内随机选取10个点位进行测量，取平均值作为最终结果。"
                                    : indicator.dataSource === "系统监控"
                                      ? "通过系统监控工具，连续24小时监测系统响应时间，取平均值作为最终结果。"
                                      : "对所有医疗设备进行全面检测，记录合格设备数量与总数量的比值。"}
                                </p>
                              </div>
                            </div>
                            {indicator.status === "审核中" && (
                              <div>
                                <h3 className="font-semibold mb-2">审核意见</h3>
                                <Textarea placeholder="请输入审核意见..." />
                                <div className="flex justify-end space-x-2 mt-4">
                                  <Button variant="outline">退回修改</Button>
                                  <Button>通过审核</Button>
                                </div>
                              </div>
                            )}
                            {indicator.status === "异常" && (
                              <div>
                                <h3 className="font-semibold mb-2">调查结果</h3>
                                <Textarea placeholder="请输入调查结果..." />
                                <div className="flex justify-end space-x-2 mt-4">
                                  <Button>启动调查</Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      {indicator.status === "审核中" && <Button size="sm">审核</Button>}
                      {indicator.status === "异常" && (
                        <Button variant="outline" size="sm">
                          启动调查
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
            <CardTitle>数据异常监测</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-md">
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium">医疗设备合格率数据异常</p>
                      <span className="text-xs text-gray-500">2025-05-13</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">当前值100%，历史均值98%，波动超过预警阈值</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-md">
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium">系统响应时间数据波动</p>
                      <span className="text-xs text-gray-500">2025-05-15</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">当前值180ms，历史均值210ms，波动较大但在合理范围内</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>审核统计</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">总指标数</span>
                <span>5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">已审核</span>
                <span>3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">审核中</span>
                <span>1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">异常数据</span>
                <span>1</span>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>审核进度</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function FeedbackHandling() {
  // Mock data for feedback
  const feedbacks = [
    {
      id: 1,
      content: "道路施工后路面不平整，影响行车安全",
      submitter: "市民张先生",
      submitTime: "2025-05-15 10:30",
      status: "处理中",
      priority: "高",
      project: "城市基础设施改造项目",
    },
    {
      id: 2,
      content: "数据中心系统偶尔出现卡顿现象",
      submitter: "信息部李主任",
      submitTime: "2025-05-14 14:20",
      status: "已处理",
      priority: "中",
      project: "智慧城市数据中心建设",
    },
    {
      id: 3,
      content: "医疗设备使用说明不够详细，建议完善",
      submitter: "医院王医生",
      submitTime: "2025-05-13 11:15",
      status: "已处理",
      priority: "低",
      project: "公共卫生服务中心扩建",
    },
    {
      id: 4,
      content: "排水系统在大雨天气下排水不畅",
      submitter: "市民赵女士",
      submitTime: "2025-05-10 16:45",
      status: "未处理",
      priority: "高",
      project: "城市基础设施改造项目",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">反馈意见处理监管</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="搜索反馈..." className="pl-8 w-64" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">12</div>
              <div className="text-sm text-gray-500">今日反馈</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">8</div>
              <div className="text-sm text-gray-500">待处理</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">3</div>
              <div className="text-sm text-gray-500">处理中</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">85%</div>
              <div className="text-sm text-gray-500">处理率</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>反馈意见列表</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>反馈内容</TableHead>
                <TableHead>所属项目</TableHead>
                <TableHead>反馈人</TableHead>
                <TableHead>反馈时间</TableHead>
                <TableHead>优先级</TableHead>
                <TableHead>处理状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell className="font-medium max-w-xs truncate" title={feedback.content}>
                    {feedback.content}
                  </TableCell>
                  <TableCell>{feedback.project}</TableCell>
                  <TableCell>{feedback.submitter}</TableCell>
                  <TableCell>{feedback.submitTime}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        feedback.priority === "高"
                          ? "bg-red-100 text-red-800"
                          : feedback.priority === "中"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }
                    >
                      {feedback.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        feedback.status === "未处理"
                          ? "bg-red-100 text-red-800"
                          : feedback.status === "处理中"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      {feedback.status}
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
                          <DialogTitle>反馈意见详情</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-semibold mb-2">基本信息</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">所属项目:</span>
                                  <span>{feedback.project}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">反馈人:</span>
                                  <span>{feedback.submitter}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">反馈时间:</span>
                                  <span>{feedback.submitTime}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">优先级:</span>
                                  <span>{feedback.priority}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">处理状态:</span>
                                  <span>{feedback.status}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2">处理信息</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">接收时间:</span>
                                  <span>{feedback.submitTime}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">处理人:</span>
                                  <span>{feedback.status !== "未处理" ? "张工" : "-"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">处理时限:</span>
                                  <span>
                                    {feedback.priority === "高"
                                      ? "24小时内"
                                      : feedback.priority === "中"
                                        ? "48小时内"
                                        : "72小时内"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">剩余时间:</span>
                                  <span>
                                    {feedback.status === "已处理"
                                      ? "已完成"
                                      : feedback.status === "处理中"
                                        ? "12小时"
                                        : "24小时"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">反馈详情</h3>
                            <div className="p-3 bg-gray-50 rounded-md text-sm">
                              <p>{feedback.content}</p>
                              {feedback.id === 1 && (
                                <p className="mt-2">
                                  具体位置：东部片区主干道与支路交叉口，路面有明显凹凸不平现象，雨天积水严重。
                                </p>
                              )}
                            </div>
                          </div>
                          {feedback.status === "处理中" || feedback.status === "已处理" ? (
                            <div>
                              <h3 className="font-semibold mb-2">处理进展</h3>
                              <div className="space-y-3">
                                <div className="p-3 bg-gray-50 rounded-md">
                                  <div className="flex justify-between">
                                    <span className="font-medium">张工</span>
                                    <span className="text-xs text-gray-500">2025-05-15 14:30</span>
                                  </div>
                                  <p className="text-sm mt-1">
                                    已安排工作人员前往现场查看情况，初步判断是路面沉降导致的问题。
                                  </p>
                                </div>
                                {feedback.status === "已处理" && (
                                  <div className="p-3 bg-gray-50 rounded-md">
                                    <div className="flex justify-between">
                                      <span className="font-medium">李工</span>
                                      <span className="text-xs text-gray-500">2025-05-16 10:15</span>
                                    </div>
                                    <p className="text-sm mt-1">
                                      已完成路面修复工作，恢复平整度，并进行了排水系统疏通，解决了积水问题。
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h3 className="font-semibold mb-2">处理措施</h3>
                              <Textarea placeholder="请输入处理措施..." />
                              <div className="mt-2">
                                <label className="text-sm font-medium">处理人</label>
                                <Input placeholder="请输入处理人..." />
                              </div>
                            </div>
                          )}
                          <div className="flex justify-end space-x-2">
                            {feedback.status === "未处理" && <Button>分配处理</Button>}
                            {feedback.status === "处理中" && <Button>更新进展</Button>}
                            {feedback.status !== "已处理" && (
                              <Button variant="outline">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                回复反馈
                              </Button>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {feedback.status === "未处理" && <Button size="sm">处理</Button>}
                    {feedback.status === "处理中" && (
                      <Button variant="outline" size="sm">
                        催促处理
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
            <CardTitle>反馈类型分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>质量问题</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>功能建议</span>
                  <span>30%</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>使用问题</span>
                  <span>15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>其他</span>
                  <span>10%</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>处理效率分析</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">平均响应时间</span>
                <span>2.5小时</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">平均处理时间</span>
                <span>18小时</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">按时处理率</span>
                <span>92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">满意度评分</span>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                  <span className="text-sm ml-2">4.0</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
