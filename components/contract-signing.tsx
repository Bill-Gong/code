"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertTriangle, Calendar, Check, Download, Search, Filter, Clock, Eye } from "lucide-react"
import { Radar, Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Progress } from "@/components/ui/progress"

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

interface ContractSigningProps {
  activePage: string
}

export default function ContractSigning({ activePage }: ContractSigningProps) {
  const renderContent = () => {
    switch (activePage) {
      case "compliance-review":
        return <ComplianceReview />
      case "risk-assessment":
        return <RiskAssessment />
      case "signing-process":
        return <SigningProcess />
      default:
        return <ComplianceReview />
    }
  }

  return <div>{renderContent()}</div>
}

function ComplianceReview() {
  const [selectedContract, setSelectedContract] = useState<number | null>(1)
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for contracts
  const contracts = [
    {
      id: 1,
      name: "城市基础设施改造项目合同",
      type: "工程合同",
      party: "城市建设有限公司",
      submitTime: "2025-05-15",
      status: "reviewing",
    },
    {
      id: 2,
      name: "智慧城市数据中心建设合同",
      type: "技术服务合同",
      party: "科技信息有限公司",
      submitTime: "2025-05-14",
      status: "passed",
    },
    {
      id: 3,
      name: "公共卫生服务中心设备采购合同",
      type: "采购合同",
      party: "医疗设备有限公司",
      submitTime: "2025-05-13",
      status: "rejected",
    },
    {
      id: 4,
      name: "城市绿化带改造工程合同",
      type: "工程合同",
      party: "园林绿化有限公司",
      submitTime: "2025-05-10",
      status: "reviewing",
    },
  ]

  const filteredContracts =
    activeTab === "all"
      ? contracts
      : contracts.filter((contract) =>
          activeTab === "reviewing"
            ? contract.status === "reviewing"
            : activeTab === "passed"
              ? contract.status === "passed"
              : contract.status === "rejected",
        )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">合同合规性审查</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="搜索合同..." className="pl-8 w-64" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">全部合同</TabsTrigger>
          <TabsTrigger value="reviewing">审核中</TabsTrigger>
          <TabsTrigger value="passed">已通过</TabsTrigger>
          <TabsTrigger value="rejected">已退回</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>待审查合同</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredContracts.map((contract) => (
                <div
                  key={contract.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedContract === contract.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedContract(contract.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{contract.name}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        {contract.type} | {contract.party}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {contract.submitTime}
                      </div>
                    </div>
                    <Badge
                      className={`${
                        contract.status === "reviewing"
                          ? "bg-blue-100 text-blue-800"
                          : contract.status === "passed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {contract.status === "reviewing" ? "审核中" : contract.status === "passed" ? "已通过" : "已退回"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <CardTitle>合同审查</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {selectedContract ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="border-r p-4 h-[600px] overflow-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">合同预览</h3>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      下载
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md h-full">
                    <div className="text-center mb-4">
                      <h4 className="font-bold text-lg">城市基础设施改造项目合同</h4>
                      <p className="text-sm text-gray-500">合同编号: CT2025051501</p>
                    </div>
                    <div className="space-y-4 text-sm">
                      <p>
                        <span className="font-semibold">甲方:</span> 市政府城市管理局
                      </p>
                      <p>
                        <span className="font-semibold">乙方:</span> 城市建设有限公司
                      </p>
                      <p>
                        <span className="font-semibold">合同金额:</span> 人民币贰仟万元整 (¥20,000,000.00)
                      </p>
                      <p>
                        <span className="font-semibold">合同期限:</span> 2025年6月1日至2026年5月31日
                      </p>
                      <div>
                        <p className="font-semibold">第一条 项目概述</p>
                        <p className="ml-4">
                          本项目为城市基础设施改造工程，包括但不限于道路修缮、排水系统改造、公共设施更新等内容。
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">第二条 工程范围</p>
                        <p className="ml-4">
                          2.1 主城区东部片区道路修缮，总长度约15公里；
                          <br />
                          2.2 排水系统改造，包括雨水管网更新和污水管网分离；
                          <br />
                          2.3 公共设施更新，包括路灯、座椅、垃圾箱等设施的更换和增设。
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">第三条 付款方式</p>
                        <p className="ml-4">
                          3.1 预付款：合同签订后15个工作日内，甲方向乙方支付合同总额的30%作为预付款；
                          <br />
                          3.2 进度款：根据工程进度，分期支付进度款，每季度支付一次，每次支付合同总额的15%；
                          <br />
                          3.3 结算款：工程竣工验收合格后，支付至合同总额的95%；
                          <br />
                          3.4 质保金：余下5%作为质保金，质保期满后无质量问题一次性付清。
                        </p>
                      </div>
                      <div className="bg-yellow-50 p-2 border border-yellow-200 rounded">
                        <p className="font-semibold text-yellow-800">
                          <AlertTriangle className="h-4 w-4 inline mr-1" />
                          系统标记: 付款条件不明确
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">第四条 工期要求</p>
                        <p className="ml-4">
                          4.1 开工日期：2025年6月1日；
                          <br />
                          4.2 竣工日期：2026年5月31日；
                          <br />
                          4.3 总工期：12个月。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 h-[600px] overflow-auto">
                  <h3 className="font-semibold mb-4">审查意见</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">合规性问题</h4>
                      <div className="space-y-2">
                        <div className="flex items-start p-2 bg-yellow-50 rounded-md">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">付款条件不明确</p>
                            <p className="text-xs text-gray-500">第三条中未明确规定进度款支付的具体条件和验收标准</p>
                          </div>
                        </div>
                        <div className="flex items-start p-2 bg-red-50 rounded-md">
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">违约责任条款缺失</p>
                            <p className="text-xs text-gray-500">合同中未包含明确的违约责任条款，不符合规范要求</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">修改建议</h4>
                      <Textarea
                        placeholder="请输入修改建议..."
                        className="h-32"
                        defaultValue="1. 建议在第三条中明确进度款支付的具体条件，如'经甲方验收合格后支付'；
2. 增加违约责任条款，明确双方违约的情形和相应的违约金计算方式；
3. 建议增加争议解决条款，明确纠纷解决方式和管辖法院。"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">规则库参考</h4>
                      <div className="p-3 bg-gray-50 rounded-md text-sm">
                        <p className="font-medium">规则R-2023-105: 付款条款规范</p>
                        <p className="text-xs text-gray-500 mt-1">
                          合同中的付款条款应明确规定付款条件、付款时间、付款方式和金额，确保双方权益明确。
                        </p>
                        <Button variant="link" size="sm" className="p-0 h-auto text-xs mt-1">
                          查看完整规则
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline">退回修改</Button>
                      <Button>通过审核</Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[600px] text-gray-500">
                请从左侧选择一个合同进行审查
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>合规性审查统计</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-base font-medium mb-4">合同类型分布</h3>
              <div className="h-64">
                <Bar
                  data={{
                    labels: ["工程合同", "技术服务合同", "采购合同", "其他合同"],
                    datasets: [
                      {
                        label: "合同数量",
                        data: [12, 8, 5, 3],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium mb-4">审查结果分布</h3>
              <div className="h-64">
                <Bar
                  data={{
                    labels: ["已通过", "已退回", "审核中"],
                    datasets: [
                      {
                        label: "合同数量",
                        data: [15, 7, 6],
                        backgroundColor: [
                          "rgba(75, 192, 192, 0.5)",
                          "rgba(255, 99, 132, 0.5)",
                          "rgba(54, 162, 235, 0.5)",
                        ],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium mb-4">常见问题类型</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>付款条件不明确</span>
                    <span>35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>违约责任条款缺失</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>争议解决条款缺失</span>
                    <span>20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>质量标准不明确</span>
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
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RiskAssessment() {
  // Mock data for radar chart
  const radarData = {
    labels: ["法律风险", "经济风险", "履约风险", "信用风险", "技术风险"],
    datasets: [
      {
        label: "风险评估",
        data: [65, 40, 30, 20, 55],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  }

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  }

  const [selectedContract, setSelectedContract] = useState<number | null>(1)

  // Mock data for contracts
  const contracts = [
    {
      id: 1,
      name: "城市基础设施改造项目合同",
      type: "工程合同",
      party: "城市建设有限公司",
      submitTime: "2025-05-15",
      riskScore: 68,
      riskLevel: "中等风险",
    },
    {
      id: 2,
      name: "智慧城市数据中心建设合同",
      type: "技术服务合同",
      party: "科技信息有限公司",
      submitTime: "2025-05-14",
      riskScore: 42,
      riskLevel: "低风险",
    },
    {
      id: 3,
      name: "公共卫生服务中心设备采购合同",
      type: "采购合同",
      party: "医疗设备有限公司",
      submitTime: "2025-05-13",
      riskScore: 85,
      riskLevel: "高风险",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">合同风险评估</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="搜索合同..." className="pl-8 w-64" />
          </div>
          <Button>生成报告</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>合同列表</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {contracts.map((contract) => (
                <div
                  key={contract.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedContract === contract.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedContract(contract.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{contract.name}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        {contract.type} | {contract.party}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {contract.submitTime}
                      </div>
                    </div>
                    <Badge
                      className={`${
                        contract.riskLevel === "低风险"
                          ? "bg-green-100 text-green-800"
                          : contract.riskLevel === "中等风险"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {contract.riskLevel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>风险评估得分</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="w-full h-64">
                <Radar data={radarData} options={radarOptions} />
              </div>
              <div className="mt-4 text-center">
                <div className="text-3xl font-bold">68分</div>
                <div className="text-sm text-gray-500">总体风险评分</div>
                <Badge className="mt-2 bg-yellow-100 text-yellow-800">中等风险</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>风险详情分析</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="legal">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="legal">法律风险</TabsTrigger>
                <TabsTrigger value="economic">经济风险</TabsTrigger>
                <TabsTrigger value="performance">履约风险</TabsTrigger>
                <TabsTrigger value="credit">信用风险</TabsTrigger>
                <TabsTrigger value="technical">技术风险</TabsTrigger>
              </TabsList>
              <TabsContent value="legal" className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">法律风险评估</h3>
                  <Badge className="bg-red-100 text-red-800">高风险</Badge>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">条款漏洞</p>
                        <p className="text-xs text-gray-500">合同中缺少明确的违约责任条款，可能导致违约时难以追责</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">争议解决机制不明确</p>
                        <p className="text-xs text-gray-500">
                          合同未明确约定争议解决方式和管辖法院，可能导致纠纷解决困难
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">知识产权条款缺失</p>
                        <p className="text-xs text-gray-500">未明确约定项目成果的知识产权归属，可能引发后续纠纷</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">风险防范建议</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="suggestion1" className="mr-2" />
                      <label htmlFor="suggestion1" className="text-sm">
                        增加详细的违约责任条款，明确违约情形和违约金计算方式
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="suggestion2" className="mr-2" />
                      <label htmlFor="suggestion2" className="text-sm">
                        增加争议解决条款，明确约定纠纷解决方式和管辖法院
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="suggestion3" className="mr-2" />
                      <label htmlFor="suggestion3" className="text-sm">
                        增加知识产权条款，明确项目成果的知识产权归属
                      </label>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="economic" className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">经济风险评估</h3>
                  <Badge className="bg-yellow-100 text-yellow-800">中等风险</Badge>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">付款条件不明确</p>
                        <p className="text-xs text-gray-500">进度款支付条件不明确，可能导致付款争议</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">价格调整机制缺失</p>
                        <p className="text-xs text-gray-500">
                          合同期限较长，但缺少价格调整机制，可能因通胀等因素导致经济损失
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="performance" className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">履约风险评估</h3>
                  <Badge className="bg-green-100 text-green-800">低风险</Badge>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">工期安排合理</p>
                        <p className="text-xs text-gray-500">合同工期安排符合项目实际需求，风险较低</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="credit" className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">信用风险评估</h3>
                  <Badge className="bg-green-100 text-green-800">低风险</Badge>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">对方信用良好</p>
                        <p className="text-xs text-gray-500">合同对方近三年无不良信用记录，履约能力较强</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="technical" className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">技术风险评估</h3>
                  <Badge className="bg-yellow-100 text-yellow-800">中等风险</Badge>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">技术标准不明确</p>
                        <p className="text-xs text-gray-500">合同中对技术标准的描述不够详细，可能导致质量争议</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>风险防范措施建议</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="font-semibold mb-2">合同条款完善</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>增加详细的违约责任条款，明确违约情形和违约金计算方式</li>
                <li>增加争议解决条款，明确约定纠纷解决方式和管辖法院</li>
                <li>增加知识产权条款，明确项目成果的知识产权归属</li>
                <li>完善付款条件，明确进度款支付的具体条件和验收标准</li>
                <li>增加价格调整机制，应对长期合同中可能出现的通胀等因素</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="font-semibold mb-2">履约管理建议</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>建立定期进度报告机制，及时掌握项目进展</li>
                <li>设置关键节点验收制度，确保项目质量</li>
                <li>建立变更管理流程，规范处理合同执行过程中的变更</li>
              </ul>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button>生成风险评估报告</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>风险评估历史记录</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>合同名称</TableHead>
                <TableHead>评估时间</TableHead>
                <TableHead>评估人</TableHead>
                <TableHead>风险评分</TableHead>
                <TableHead>风险等级</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">城市基础设施改造项目合同</TableCell>
                <TableCell>2025-05-15</TableCell>
                <TableCell>张工</TableCell>
                <TableCell>68分</TableCell>
                <TableCell>
                  <Badge className="bg-yellow-100 text-yellow-800">中等风险</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    查看报告
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">智慧城市数据中心建设合同</TableCell>
                <TableCell>2025-05-14</TableCell>
                <TableCell>李工</TableCell>
                <TableCell>42分</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">低风险</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    查看报告
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">公共卫生服务中心设备采购合同</TableCell>
                <TableCell>2025-05-13</TableCell>
                <TableCell>王工</TableCell>
                <TableCell>85分</TableCell>
                <TableCell>
                  <Badge className="bg-red-100 text-red-800">高风险</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    查看报告
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

function SigningProcess() {
  // Mock data for contract signing statistics
  const signingStats = {
    today: 12,
    week: 68,
    month: 245,
    abnormalRate: "5.2%",
  }

  // Mock data for line chart
  const lineData = {
    labels: ["1月", "2月", "3月", "4月", "5月"],
    datasets: [
      {
        label: "合同签订数量",
        data: [65, 78, 52, 91, 85],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
      {
        label: "异常合同数量",
        data: [5, 7, 3, 6, 4],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
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
      },
    },
  }

  // Mock data for contracts
  const contracts = [
    {
      id: 1,
      name: "城市基础设施改造项目合同",
      parties: "市政府城市管理局 - 城市建设有限公司",
      status: "reviewing",
      currentStep: "双方审核",
      time: "2025-05-15 10:30",
    },
    {
      id: 2,
      name: "智慧城市数据中心建设合同",
      parties: "信息技术局 - 科技信息有限公司",
      status: "signing",
      currentStep: "电子签名",
      time: "2025-05-14 14:20",
    },
    {
      id: 3,
      name: "公共卫生服务中心设备采购合同",
      parties: "卫生健康委员会 - 医疗设备有限公司",
      status: "completed",
      currentStep: "签订完成",
      time: "2025-05-13 11:15",
    },
    {
      id: 4,
      name: "城市绿化带改造工程合同",
      parties: "园林绿化局 - 园林绿化有限公司",
      status: "abnormal",
      currentStep: "双方审核",
      time: "2025-05-10 16:45",
      abnormalReason: "合同条款多次修改",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">合同签订过程监管</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="搜索合同..." className="pl-8 w-64" />
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
              <div className="text-3xl font-bold">{signingStats.today}</div>
              <div className="text-sm text-gray-500">今日签订</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{signingStats.week}</div>
              <div className="text-sm text-gray-500">本周签订</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{signingStats.month}</div>
              <div className="text-sm text-gray-500">本月签订</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{signingStats.abnormalRate}</div>
              <div className="text-sm text-gray-500">异常合同占比</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>合同签订进度跟踪</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>合同名称</TableHead>
                  <TableHead>签约方</TableHead>
                  <TableHead>当前状态</TableHead>
                  <TableHead>更新时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.name}</TableCell>
                    <TableCell>{contract.parties}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          contract.status === "reviewing"
                            ? "bg-blue-100 text-blue-800"
                            : contract.status === "signing"
                              ? "bg-yellow-100 text-yellow-800"
                              : contract.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {contract.status === "reviewing"
                          ? "审核中"
                          : contract.status === "signing"
                            ? "签署中"
                            : contract.status === "completed"
                              ? "已完成"
                              : "异常"}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">{contract.currentStep}</div>
                    </TableCell>
                    <TableCell>{contract.time}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            查看详情
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>合同签订详情 - {contract.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold mb-2">基本信息</h3>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">合同名称:</span>
                                    <span>{contract.name}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">签约方:</span>
                                    <span>{contract.parties}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">当前状态:</span>
                                    <span>{contract.currentStep}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">更新时间:</span>
                                    <span>{contract.time}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">签订进度</h3>
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span>合同发起</span>
                                    <span className="text-xs text-gray-500 ml-auto">2025-05-10</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span>合同起草</span>
                                    <span className="text-xs text-gray-500 ml-auto">2025-05-12</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span>双方审核</span>
                                    <span className="text-xs text-gray-500 ml-auto">进行中</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                    <span>电子签名</span>
                                    <span className="text-xs text-gray-500 ml-auto">待处理</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                    <span>签订完成</span>
                                    <span className="text-xs text-gray-500 ml-auto">待处理</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {contract.status === "abnormal" && (
                              <div className="p-3 bg-red-50 rounded-md">
                                <h3 className="font-semibold text-red-800 mb-1">异常情况</h3>
                                <p className="text-sm">{contract.abnormalReason}</p>
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold mb-2">操作记录</h3>
                              <div className="space-y-3 max-h-40 overflow-y-auto">
                                <div className="p-3 bg-gray-50 rounded-md">
                                  <div className="flex justify-between">
                                    <span className="font-medium">张经理 (甲方)</span>
                                    <span className="text-xs text-gray-500">2025-05-12 11:30</span>
                                  </div>
                                  <p className="text-sm mt-1">提交合同初稿</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-md">
                                  <div className="flex justify-between">
                                    <span className="font-medium">李总 (乙方)</span>
                                    <span className="text-xs text-gray-500">2025-05-13 16:20</span>
                                  </div>
                                  <p className="text-sm mt-1">提出修改意见，要求调整付款条件</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-md">
                                  <div className="flex justify-between">
                                    <span className="font-medium">张经理 (甲方)</span>
                                    <span className="text-xs text-gray-500">2025-05-14 09:45</span>
                                  </div>
                                  <p className="text-sm mt-1">接受修改意见，更新合同条款</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              {contract.status === "reviewing" && <Button>提交审核意见</Button>}
                              {contract.status === "signing" && <Button>进行电子签名</Button>}
                              {contract.status === "abnormal" && <Button>处理异常</Button>}
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

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>异常情况记录</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 rounded-md">
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium">城市绿化带改造工程合同</p>
                      <span className="text-xs text-gray-500">2025-05-10</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">合同条款多次修改，已超过系统预警阈值</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-md">
                <div className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium">智慧城市数据中心建设合同</p>
                      <span className="text-xs text-gray-500">2025-05-14</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">电子签名流程延迟，已超过24小时未完成</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-md">
                <div className="flex items-start">
                  <Clock className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium">城市供水管网更新项目合同</p>
                      <span className="text-xs text-gray-500">2025-05-16</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">合同审核时间已超过预期，请及时跟进</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                查看全部异常记录
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>合同签订趋势分析</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Line data={lineData} options={lineOptions} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>合同类型分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>工程合同</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>技术服务合同</span>
                  <span>25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>采购合同</span>
                  <span>20%</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>其他合同</span>
                  <span>10%</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>签订效率分析</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">平均签订周期</span>
                <span className="font-semibold">7.5天</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">最长签订周期</span>
                <span className="font-semibold">21天</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">最短签订周期</span>
                <span className="font-semibold">2天</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">按时完成率</span>
                <span className="font-semibold">85%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>签订方式分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>电子签名</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>线下签署</span>
                  <span>30%</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>混合方式</span>
                  <span>5%</span>
                </div>
                <Progress value={5} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
