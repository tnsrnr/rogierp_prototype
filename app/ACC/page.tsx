"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calculator, PieChart, Landmark, Receipt } from "lucide-react";
import Link from "next/link";

export default function ACCMainPage() {
  // ACC 메뉴 구조
  const accModules = [
    {
      id: "voucher",
      title: "전표 관리",
      description: "회계 전표의 등록, 승인 및 조회를 관리합니다.",
      icon: <Receipt className="h-8 w-8" />,
      path: "/ACC/voucher",
      items: [
        { id: "ACC0101", title: "전표 등록", path: "/ACC/voucher/ACC0101" },
        { id: "ACC0102", title: "전표 승인", path: "/ACC/voucher/ACC0102" },
        { id: "ACC0103", title: "전표 조회", path: "/ACC/voucher/ACC0103" }
      ]
    },
    {
      id: "settlement",
      title: "결산 관리",
      description: "월별, 분기별, 연간 결산 작업을 수행합니다.",
      icon: <Calculator className="h-8 w-8" />,
      path: "/ACC/settlement",
      items: [
        { id: "ACC0201", title: "월 결산", path: "/ACC/settlement/ACC0201" },
        { id: "ACC0202", title: "분기 결산", path: "/ACC/settlement/ACC0202" },
        { id: "ACC0203", title: "연간 결산", path: "/ACC/settlement/ACC0203" }
      ]
    },
    {
      id: "reports",
      title: "회계 보고서",
      description: "재무상태표, 손익계산서, 현금흐름표 등의 보고서를 확인합니다.",
      icon: <FileText className="h-8 w-8" />,
      path: "/ACC/reports",
      items: [
        { id: "ACC0301", title: "재무상태표", path: "/ACC/reports/ACC0301" },
        { id: "ACC0302", title: "손익계산서", path: "/ACC/reports/ACC0302" },
        { id: "ACC0303", title: "현금흐름표", path: "/ACC/reports/ACC0303" }
      ]
    },
    {
      id: "accounts",
      title: "계정 관리",
      description: "회계 계정과목과 계정 그룹을 설정합니다.",
      icon: <PieChart className="h-8 w-8" />,
      path: "/ACC/accounts",
      items: [
        { id: "ACC0401", title: "계정과목 관리", path: "/ACC/accounts/ACC0401" },
        { id: "ACC0402", title: "계정 그룹 설정", path: "/ACC/accounts/ACC0402" }
      ]
    },
    {
      id: "tax",
      title: "세금 관리",
      description: "부가가치세, 원천세, 법인세 등의 세금 관리 및 신고를 수행합니다.",
      icon: <Landmark className="h-8 w-8" />,
      path: "/ACC/tax",
      items: [
        { id: "ACC0501", title: "부가가치세 신고", path: "/ACC/tax/ACC0501" },
        { id: "ACC0502", title: "원천세 관리", path: "/ACC/tax/ACC0502" },
        { id: "ACC0503", title: "법인세 관리", path: "/ACC/tax/ACC0503" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">회계 관리 시스템</h1>
        <p className="text-muted-foreground mt-2">
          전표 관리, 결산 처리, 회계 보고서 생성, 세금 관리 등 회계 업무를 수행할 수 있습니다.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accModules.map((module) => (
          <Card key={module.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-2 bg-primary/5 rounded-md">
                {module.icon}
              </div>
              <div>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription className="mt-1">
                  {module.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {module.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between hover:bg-muted/20 p-2 rounded-md">
                    <span>{item.title}</span>
                    <Link href={item.path}>
                      <Button variant="ghost" size="sm">이동</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 