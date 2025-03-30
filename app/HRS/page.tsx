"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, CreditCard, Clock, FileText } from "lucide-react";
import Link from "next/link";

export default function HRSMainPage() {
  // HRS 메뉴 구조
  const hrsModules = [
    {
      id: "attendance",
      title: "근태 관리",
      description: "직원들의 출퇴근 및 근태 상태를 관리합니다.",
      icon: <Clock className="h-8 w-8" />,
      path: "/HRS/근태관리",
      items: [
        { id: "HRS0101", title: "출퇴근 기록", path: "/HRS/근태관리/HRS0101" },
        { id: "HRS0102", title: "지각/조퇴/결근 처리", path: "/HRS/근태관리/HRS0102" }
      ]
    },
    {
      id: "leave",
      title: "연차 관리",
      description: "직원들의 연차 신청 및 승인을 관리합니다.",
      icon: <Calendar className="h-8 w-8" />,
      path: "/HRS/연차관리",
      items: [
        { id: "HRS0201", title: "연차 신청", path: "/HRS/연차관리/HRS0201" },
        { id: "HRS0202", title: "연차 승인", path: "/HRS/연차관리/HRS0202" },
        { id: "HRS0203", title: "연차 자동 계산", path: "/HRS/연차관리/HRS0203" }
      ]
    },
    {
      id: "salary",
      title: "급여 관리",
      description: "직원 급여 항목 설정 및 급여 지급을 관리합니다.",
      icon: <CreditCard className="h-8 w-8" />,
      path: "/HRS/급여관리",
      items: [
        { id: "HRS0301", title: "급여 항목 설정", path: "/HRS/급여관리/HRS0301" },
        { id: "HRS0302", title: "급여 명세 등록", path: "/HRS/급여관리/HRS0302" },
        { id: "HRS0303", title: "명세서 조회", path: "/HRS/급여관리/HRS0303" }
      ]
    },
    {
      id: "personnel",
      title: "인사 정보 관리",
      description: "직원 정보, 조직도, 증명서 발급을 관리합니다.",
      icon: <Users className="h-8 w-8" />,
      path: "/HRS/인사정보관리",
      items: [
        { id: "HRS0401", title: "직원 정보 관리", path: "/HRS/인사정보관리/HRS0401" },
        { id: "HRS0402", title: "조직도 관리", path: "/HRS/인사정보관리/HRS0402" },
        { id: "HRS0403", title: "증명서 발급", path: "/HRS/인사정보관리/HRS0403" }
      ]
    },
    {
      id: "statistics",
      title: "통계",
      description: "근태, 연차, 급여, 인사 관련 통계를 확인합니다.",
      icon: <FileText className="h-8 w-8" />,
      path: "/HRS/통계",
      items: [
        { id: "HRS0501", title: "근태통계", path: "/HRS/통계/HRS0501" },
        { id: "HRS0502", title: "연차통계", path: "/HRS/통계/HRS0502" },
        { id: "HRS0503", title: "급여통계", path: "/HRS/통계/HRS0503" },
        { id: "HRS0504", title: "인사통계", path: "/HRS/통계/HRS0504" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">인사 관리 시스템</h1>
        <p className="text-muted-foreground mt-2">
          직원 관리, 근태, 연차, 급여 관리 등 인사 관련 업무를 수행할 수 있습니다.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hrsModules.map((module) => (
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