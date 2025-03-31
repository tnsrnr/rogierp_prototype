"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PackageOpen, 
  PackageCheck, 
  BarChart4, 
  ArrowLeftRight, 
  Scan, 
  Database, 
  Settings, 
  FileBarChart 
} from "lucide-react";
import Link from "next/link";

export default function WMSMainPage() {
  // WMS 메뉴 구조
  const wmsModules = [
    {
      id: "inbound",
      title: "입고관리",
      description: "입고 예정, 입고 등록, 검수 및 적치 관리를 수행합니다.",
      icon: <PackageOpen className="h-8 w-8" />,
      path: "/WMS/inbound",
      items: [
        { id: "WMS0101", title: "입고 예정 등록", path: "/WMS/inbound/WMS0101" },
        { id: "WMS0102", title: "입고 등록", path: "/WMS/inbound/WMS0102" },
        { id: "WMS0103", title: "입고 검수", path: "/WMS/inbound/WMS0103" },
        { id: "WMS0104", title: "적치 지시", path: "/WMS/inbound/WMS0104" },
        { id: "WMS0105", title: "반품 입고", path: "/WMS/inbound/WMS0105" },
        { id: "WMS0106", title: "입고 내역 조회", path: "/WMS/inbound/WMS0106" }
      ]
    },
    {
      id: "outbound",
      title: "출고관리",
      description: "출고 주문, 피킹, 검수 및 출고 확정을 처리합니다.",
      icon: <PackageCheck className="h-8 w-8" />,
      path: "/WMS/outbound",
      items: [
        { id: "WMS0201", title: "출고 주문 등록", path: "/WMS/outbound/WMS0201" },
        { id: "WMS0202", title: "피킹 지시", path: "/WMS/outbound/WMS0202" },
        { id: "WMS0203", title: "피킹 확인", path: "/WMS/outbound/WMS0203" },
        { id: "WMS0204", title: "출고 검수/포장", path: "/WMS/outbound/WMS0204" },
        { id: "WMS0205", title: "출고 확정", path: "/WMS/outbound/WMS0205" },
        { id: "WMS0206", title: "출고 내역 조회", path: "/WMS/outbound/WMS0206" }
      ]
    },
    {
      id: "inventory",
      title: "재고관리",
      description: "재고 현황 조회, 실사, 조정, 로트 관리를 수행합니다.",
      icon: <BarChart4 className="h-8 w-8" />,
      path: "/WMS/inventory",
      items: [
        { id: "WMS0301", title: "재고 현황 조회", path: "/WMS/inventory/WMS0301" },
        { id: "WMS0302", title: "재고 조정", path: "/WMS/inventory/WMS0302" },
        { id: "WMS0303", title: "재고 실사", path: "/WMS/inventory/WMS0303" },
        { id: "WMS0304", title: "로트/유효기간 관리", path: "/WMS/inventory/WMS0304" },
        { id: "WMS0305", title: "시리얼번호 관리", path: "/WMS/inventory/WMS0305" }
      ]
    },
    {
      id: "stock_transfer",
      title: "재고이동",
      description: "로케이션 이동, 창고 간 이동, 피킹존 보충을 관리합니다.",
      icon: <ArrowLeftRight className="h-8 w-8" />,
      path: "/WMS/stock_transfer",
      items: [
        { id: "WMS0401", title: "로케이션 이동", path: "/WMS/stock_transfer/WMS0401" },
        { id: "WMS0402", title: "창고 간 이동", path: "/WMS/stock_transfer/WMS0402" },
        { id: "WMS0403", title: "피킹존 보충", path: "/WMS/stock_transfer/WMS0403" },
        { id: "WMS0404", title: "재고 이동 내역 조회", path: "/WMS/stock_transfer/WMS0404" }
      ]
    },
    {
      id: "barcode",
      title: "바코드",
      description: "바코드 생성 및 관리, 라벨 디자인 및 출력을 수행합니다.",
      icon: <Scan className="h-8 w-8" />,
      path: "/WMS/barcode",
      items: [
        { id: "WMS0501", title: "바코드 생성/관리", path: "/WMS/barcode/WMS0501" },
        { id: "WMS0502", title: "라벨 디자인", path: "/WMS/barcode/WMS0502" },
        { id: "WMS0503", title: "라벨 출력", path: "/WMS/barcode/WMS0503" }
      ]
    },
    {
      id: "master_data",
      title: "기초정보",
      description: "품목, 거래처, 창고, 로케이션 등의 기준 정보를 관리합니다.",
      icon: <Database className="h-8 w-8" />,
      path: "/WMS/master_data",
      items: [
        { id: "WMS0601", title: "품목 관리", path: "/WMS/master_data/WMS0601" },
        { id: "WMS0602", title: "거래처 관리", path: "/WMS/master_data/WMS0602" },
        { id: "WMS0603", title: "창고 관리", path: "/WMS/master_data/WMS0603" },
        { id: "WMS0604", title: "위치(로케이션) 관리", path: "/WMS/master_data/WMS0604" },
        { id: "WMS0605", title: "구역(존) 관리", path: "/WMS/master_data/WMS0605" },
        { id: "WMS0606", title: "단위 관리", path: "/WMS/master_data/WMS0606" },
        { id: "WMS0607", title: "품목 분류 관리", path: "/WMS/master_data/WMS0607" }
      ]
    },
    {
      id: "settings",
      title: "설정/관리",
      description: "사용자 및 권한, 시스템 설정을 관리합니다.",
      icon: <Settings className="h-8 w-8" />,
      path: "/WMS/settings",
      items: [
        { id: "WMS0701", title: "사용자 관리", path: "/WMS/settings/WMS0701" },
        { id: "WMS0702", title: "권한 관리", path: "/WMS/settings/WMS0702" },
        { id: "WMS0703", title: "시스템 환경 설정", path: "/WMS/settings/WMS0703" },
        { id: "WMS0704", title: "메뉴 설정", path: "/WMS/settings/WMS0704" },
        { id: "WMS0705", title: "항목(필드) 설정", path: "/WMS/settings/WMS0705" },
        { id: "WMS0706", title: "알림 설정", path: "/WMS/settings/WMS0706" }
      ]
    },
    {
      id: "reports_stats",
      title: "보고서 및 통계",
      description: "입출고 현황, 재고 통계, 실적 분석 보고서를 확인합니다.",
      icon: <FileBarChart className="h-8 w-8" />,
      path: "/WMS/reports_stats",
      items: [
        { id: "WMS0801", title: "입고 현황/통계", path: "/WMS/reports_stats/WMS0801" },
        { id: "WMS0802", title: "출고 현황/통계", path: "/WMS/reports_stats/WMS0802" },
        { id: "WMS0803", title: "재고 현황 보고", path: "/WMS/reports_stats/WMS0803" },
        { id: "WMS0804", title: "재고 이력 보고", path: "/WMS/reports_stats/WMS0804" },
        { id: "WMS0805", title: "재고 실사 결과", path: "/WMS/reports_stats/WMS0805" },
        { id: "WMS0806", title: "재고 회전율 분석", path: "/WMS/reports_stats/WMS0806" },
        { id: "WMS0807", title: "ABC 분류 분석", path: "/WMS/reports_stats/WMS0807" },
        { id: "WMS0808", title: "작업자별 실적 통계", path: "/WMS/reports_stats/WMS0808" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">창고 관리 시스템</h1>
        <p className="text-muted-foreground mt-2">
          입출고, 재고 관리, 바코드, 위치 관리 등 물류창고 관련 업무를 수행할 수 있습니다.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wmsModules.map((module) => (
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