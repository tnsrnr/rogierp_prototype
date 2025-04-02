"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu, LogOut, User, Grid, Database, Edit, Settings, ArrowRight, Filter, LayoutDashboard, FileText, Users, Calendar, BarChart3, Warehouse, Building2, Receipt, PiggyBank, Truck, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  title: string;
  path?: string;
  icon?: React.ReactNode;
  subItems?: MenuItem[];
}

interface DashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const pathname = usePathname();

  // 로그인 페이지인 경우 레이아웃을 적용하지 않음
  const isLoginPage = pathname === "/login";

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const mainMenuItems: MenuItem[] = [
    {
      id: "dashboard",
      title: "대시보드",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      id: "ADM",
      title: "시스템 관리",
      icon: <Settings className="h-5 w-5" />,
      subItems: [
        {
          id: "ADM01",
          title: "Toast UI Grid 예제",
          subItems: [
            {
              id: "ADM0101",
              title: "기본 그리드",
              path: "/ADM/grid-examples/basic",
              icon: <Grid className="w-5 h-5" />
            },
            {
              id: "ADM0102",
              title: "정렬 가능한 그리드",
              path: "/ADM/grid-examples/sortable",
              icon: <ArrowRight className="w-5 h-5" />
            },
            {
              id: "ADM0103",
              title: "필터링 가능한 그리드",
              path: "/ADM/grid-examples/filtering",
              icon: <Filter className="w-5 h-5" />
            }
          ]
        }
      ]
    },
    {
      id: "COM",
      title: "공통 관리",
      path: "/COM",
      icon: <Database className="h-5 w-5" />
    },
    {
      id: "HRS",
      title: "인사 관리",
      icon: <Users className="h-5 w-5" />,
      subItems: [
        {
          id: "HRS01",
          title: "근태 관리",
          subItems: [
            { id: "HRS0101", title: "출퇴근 기록", path: "/HRS/attendance/HRS0101", icon: <Calendar className="w-5 h-5" /> },
            { id: "HRS0102", title: "지각/조퇴/결근 처리", path: "/HRS/attendance/HRS0102", icon: <Edit className="w-5 h-5" /> }
          ]
        },
        {
          id: "HRS02",
          title: "연차 관리",
          subItems: [
            { id: "HRS0201", title: "연차 신청", path: "/HRS/leave/HRS0201", icon: <Calendar className="w-5 h-5" /> },
            { id: "HRS0202", title: "연차 승인", path: "/HRS/leave/HRS0202", icon: <Edit className="w-5 h-5" /> },
            { id: "HRS0203", title: "연차 자동 계산", path: "/HRS/leave/HRS0203", icon: <BarChart3 className="w-5 h-5" /> }
          ]
        },
        {
          id: "HRS03",
          title: "급여 관리",
          subItems: [
            { id: "HRS0301", title: "급여 항목 설정", path: "/HRS/salary/HRS0301", icon: <Settings className="w-5 h-5" /> },
            { id: "HRS0302", title: "급여 명세 등록", path: "/HRS/salary/HRS0302", icon: <Edit className="w-5 h-5" /> },
            { id: "HRS0303", title: "명세서 조회", path: "/HRS/salary/HRS0303", icon: <FileText className="w-5 h-5" /> }
          ]
        },
        {
          id: "HRS04",
          title: "인사 정보 관리",
          subItems: [
            { id: "HRS0401", title: "직원 정보 관리", path: "/HRS/hr-info/HRS0401", icon: <Users className="w-5 h-5" /> },
            { id: "HRS0402", title: "조직도 관리", path: "/HRS/hr-info/HRS0402", icon: <Building2 className="w-5 h-5" /> },
            { id: "HRS0403", title: "증명서 발급", path: "/HRS/hr-info/HRS0403", icon: <FileText className="w-5 h-5" /> }
          ]
        },
        {
          id: "HRS05",
          title: "통계",
          subItems: [
            { id: "HRS0501", title: "근태통계", path: "/HRS/statistics/HRS0501", icon: <BarChart3 className="w-5 h-5" /> },
            { id: "HRS0502", title: "연차통계", path: "/HRS/statistics/HRS0502", icon: <BarChart3 className="w-5 h-5" /> },
            { id: "HRS0503", title: "급여통계", path: "/HRS/statistics/HRS0503", icon: <BarChart3 className="w-5 h-5" /> },
            { id: "HRS0504", title: "인사통계", path: "/HRS/statistics/HRS0504", icon: <BarChart3 className="w-5 h-5" /> }
          ]
        }
      ]
    },
    {
      id: "JOB",
      title: "작업 관리",
      path: "/JOB",
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: "ACC",
      title: "회계 관리",
      icon: <Receipt className="h-5 w-5" />,
      subItems: [
        {
          id: "ACC01",
          title: "전표 관리",
          subItems: [
            { id: "ACC0101", title: "전표 등록", path: "/ACC/voucher/ACC0101", icon: <Edit className="w-5 h-5" /> },
            { id: "ACC0102", title: "전표 승인", path: "/ACC/voucher/ACC0102", icon: <Edit className="w-5 h-5" /> },
            { id: "ACC0103", title: "전표 조회", path: "/ACC/voucher/ACC0103", icon: <FileText className="w-5 h-5" /> }
          ]
        },
        {
          id: "ACC02",
          title: "결산 관리",
          subItems: [
            { id: "ACC0201", title: "월 결산", path: "/ACC/settlement/ACC0201", icon: <BarChart3 className="w-5 h-5" /> },
            { id: "ACC0202", title: "분기 결산", path: "/ACC/settlement/ACC0202", icon: <BarChart3 className="w-5 h-5" /> },
            { id: "ACC0203", title: "연간 결산", path: "/ACC/settlement/ACC0203", icon: <BarChart3 className="w-5 h-5" /> }
          ]
        },
        {
          id: "ACC03",
          title: "회계 보고서",
          subItems: [
            { id: "ACC0301", title: "재무상태표", path: "/ACC/reports/ACC0301", icon: <FileText className="w-5 h-5" /> },
            { id: "ACC0302", title: "손익계산서", path: "/ACC/reports/ACC0302", icon: <FileText className="w-5 h-5" /> },
            { id: "ACC0303", title: "현금흐름표", path: "/ACC/reports/ACC0303", icon: <FileText className="w-5 h-5" /> }
          ]
        },
        {
          id: "ACC04",
          title: "계정 관리",
          subItems: [
            { id: "ACC0401", title: "계정과목 관리", path: "/ACC/accounts/ACC0401", icon: <Settings className="w-5 h-5" /> },
            { id: "ACC0402", title: "계정 그룹 설정", path: "/ACC/accounts/ACC0402", icon: <Settings className="w-5 h-5" /> }
          ]
        },
        {
          id: "ACC05",
          title: "세금 관리",
          subItems: [
            { id: "ACC0501", title: "부가가치세 신고", path: "/ACC/tax/ACC0501", icon: <Receipt className="w-5 h-5" /> },
            { id: "ACC0502", title: "원천세 관리", path: "/ACC/tax/ACC0502", icon: <Receipt className="w-5 h-5" /> },
            { id: "ACC0503", title: "법인세 관리", path: "/ACC/tax/ACC0503", icon: <Receipt className="w-5 h-5" /> }
          ]
        }
      ]
    },
    {
      id: "FIN",
      title: "재무 관리",
      path: "/FIN",
      icon: <PiggyBank className="h-5 w-5" />
    },
    {
      id: "VMS",
      title: "벤더 관리",
      path: "/VMS",
      icon: <Truck className="h-5 w-5" />
    },
    {
      id: "WMS",
      title: "창고 관리",
      icon: <Warehouse className="h-5 w-5" />,
      subItems: [
        {
          id: "WMS01",
          title: "입고관리",
          subItems: [
            { id: "WMS0101", title: "입고 예정 등록", path: "/WMS/inbound/WMS0101", icon: <Package className="w-5 h-5" /> },
            { id: "WMS0102", title: "입고 등록", path: "/WMS/inbound/WMS0102", icon: <Package className="w-5 h-5" /> },
            { id: "WMS0103", title: "입고 검수", path: "/WMS/inbound/WMS0103", icon: <Edit className="w-5 h-5" /> },
            { id: "WMS0104", title: "적치 지시", path: "/WMS/inbound/WMS0104", icon: <Edit className="w-5 h-5" /> },
            { id: "WMS0105", title: "반품 입고", path: "/WMS/inbound/WMS0105", icon: <Package className="w-5 h-5" /> },
            { id: "WMS0106", title: "입고 내역 조회", path: "/WMS/inbound/WMS0106", icon: <FileText className="w-5 h-5" /> }
          ]
        },
        {
          id: "WMS02",
          title: "출고관리",
          subItems: [
            { id: "WMS0201", title: "출고 주문 등록", path: "/WMS/outbound/WMS0201", icon: <Package className="w-5 h-5" /> },
            { id: "WMS0202", title: "피킹 지시", path: "/WMS/outbound/WMS0202", icon: <Edit className="w-5 h-5" /> },
            { id: "WMS0203", title: "피킹 확인", path: "/WMS/outbound/WMS0203", icon: <Edit className="w-5 h-5" /> },
            { id: "WMS0204", title: "출고 검수/포장", path: "/WMS/outbound/WMS0204", icon: <Edit className="w-5 h-5" /> },
            { id: "WMS0205", title: "출고 확정", path: "/WMS/outbound/WMS0205", icon: <Edit className="w-5 h-5" /> },
            { id: "WMS0206", title: "출고 내역 조회", path: "/WMS/outbound/WMS0206", icon: <FileText className="w-5 h-5" /> }
          ]
        },
        {
          id: "WMS03",
          title: "재고관리",
          subItems: [
            { id: "WMS0301", title: "재고 현황 조회", path: "/WMS/inventory/WMS0301", icon: <Database className="w-5 h-5" /> },
            { id: "WMS0302", title: "재고 조정", path: "/WMS/inventory/WMS0302", icon: <Edit className="w-5 h-5" /> },
            { id: "WMS0303", title: "재고 실사", path: "/WMS/inventory/WMS0303", icon: <Edit className="w-5 h-5" /> },
            { id: "WMS0304", title: "로트/유효기간 관리", path: "/WMS/inventory/WMS0304", icon: <Calendar className="w-5 h-5" /> },
            { id: "WMS0305", title: "시리얼번호 관리", path: "/WMS/inventory/WMS0305", icon: <Edit className="w-5 h-5" /> }
          ]
        },
        {
          id: "WMS04",
          title: "재고이동",
          subItems: [
            { id: "WMS0401", title: "로케이션 이동", path: "/WMS/stock_transfer/WMS0401", icon: <Package className="w-5 h-5" /> },
            { id: "WMS0402", title: "창고 간 이동", path: "/WMS/stock_transfer/WMS0402", icon: <Package className="w-5 h-5" /> },
            { id: "WMS0403", title: "피킹존 보충", path: "/WMS/stock_transfer/WMS0403", icon: <Package className="w-5 h-5" /> },
            { id: "WMS0404", title: "재고 이동 내역 조회", path: "/WMS/stock_transfer/WMS0404", icon: <FileText className="w-5 h-5" /> }
          ]
        },
        {
          id: "WMS05",
          title: "바코드",
          subItems: [
            { id: "WMS0501", title: "바코드 생성/관리", path: "/WMS/barcode/WMS0501", icon: <Edit className="w-5 h-5" /> },
            { id: "WMS0502", title: "라벨 디자인", path: "/WMS/barcode/WMS0502", icon: <Edit className="w-5 h-5" /> },
            { id: "WMS0503", title: "라벨 출력", path: "/WMS/barcode/WMS0503", icon: <FileText className="w-5 h-5" /> }
          ]
        },
        {
          id: "WMS06",
          title: "기초정보",
          subItems: [
            { id: "WMS0601", title: "품목 관리", path: "/WMS/master_data/WMS0601", icon: <Database className="w-5 h-5" /> },
            { id: "WMS0602", title: "거래처 관리", path: "/WMS/master_data/WMS0602", icon: <Users className="w-5 h-5" /> },
            { id: "WMS0603", title: "창고 관리", path: "/WMS/master_data/WMS0603", icon: <Warehouse className="w-5 h-5" /> },
            { id: "WMS0604", title: "위치(로케이션) 관리", path: "/WMS/master_data/WMS0604", icon: <Edit className="w-5 h-5" /> },
            { id: "WMS0605", title: "구역(존) 관리", path: "/WMS/master_data/WMS0605", icon: <Edit className="w-5 h-5" /> },
            { id: "WMS0606", title: "단위 관리", path: "/WMS/master_data/WMS0606", icon: <Settings className="w-5 h-5" /> },
            { id: "WMS0607", title: "품목 분류 관리", path: "/WMS/master_data/WMS0607", icon: <Database className="w-5 h-5" /> }
          ]
        },
        {
          id: "WMS07",
          title: "설정/관리",
          subItems: [
            { id: "WMS0701", title: "사용자 관리", path: "/WMS/settings/WMS0701", icon: <Users className="w-5 h-5" /> },
            { id: "WMS0702", title: "권한 관리", path: "/WMS/settings/WMS0702", icon: <Settings className="w-5 h-5" /> },
            { id: "WMS0703", title: "시스템 환경 설정", path: "/WMS/settings/WMS0703", icon: <Settings className="w-5 h-5" /> },
            { id: "WMS0704", title: "메뉴 설정", path: "/WMS/settings/WMS0704", icon: <Settings className="w-5 h-5" /> },
            { id: "WMS0705", title: "항목(필드) 설정", path: "/WMS/settings/WMS0705", icon: <Settings className="w-5 h-5" /> },
            { id: "WMS0706", title: "알림 설정", path: "/WMS/settings/WMS0706", icon: <Settings className="w-5 h-5" /> }
          ]
        },
        {
          id: "WMS08",
          title: "보고서 및 통계",
          subItems: [
            { id: "WMS0801", title: "입고 현황/통계", path: "/WMS/reports_stats/WMS0801", icon: <BarChart3 className="w-5 h-5" /> },
            { id: "WMS0802", title: "출고 현황/통계", path: "/WMS/reports_stats/WMS0802", icon: <BarChart3 className="w-5 h-5" /> },
            { id: "WMS0803", title: "재고 현황 보고", path: "/WMS/reports_stats/WMS0803", icon: <FileText className="w-5 h-5" /> },
            { id: "WMS0804", title: "재고 이력 보고", path: "/WMS/reports_stats/WMS0804", icon: <FileText className="w-5 h-5" /> },
            { id: "WMS0805", title: "재고 실사 결과", path: "/WMS/reports_stats/WMS0805", icon: <FileText className="w-5 h-5" /> },
            { id: "WMS0806", title: "재고 회전율 분석", path: "/WMS/reports_stats/WMS0806", icon: <BarChart3 className="w-5 h-5" /> },
            { id: "WMS0807", title: "ABC 분류 분석", path: "/WMS/reports_stats/WMS0807", icon: <BarChart3 className="w-5 h-5" /> },
            { id: "WMS0808", title: "작업자별 실적 통계", path: "/WMS/reports_stats/WMS0808", icon: <BarChart3 className="w-5 h-5" /> }
          ]
        }
      ]
    }
  ];

  const renderMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.path;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedMenus.includes(item.id);

    return (
      <div key={item.id}>
        {item.path ? (
          <Link
            href={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.icon}
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        ) : (
          <button
            onClick={() => toggleMenu(item.id)}
            className={cn(
              "flex items-center gap-3 w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.icon}
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.title}</span>
                {hasSubItems && (
                  isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                )}
              </>
            )}
          </button>
        )}

        {hasSubItems && isExpanded && !isCollapsed && (
          <div className="ml-4 mt-2 space-y-1">
            {item.subItems?.map(subItem => renderMenuItem(subItem))}
          </div>
        )}
      </div>
    );
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-background">
      <aside className={cn(
        "flex flex-col border-r bg-card transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}>
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && <h1 className="text-lg font-semibold">ERP 시스템</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {mainMenuItems.map(renderMenuItem)}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-4 py-2">
            <User className="h-5 w-5" />
            {!isCollapsed && <span className="text-sm">사용자 정보</span>}
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 mt-2"
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>로그아웃</span>}
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <header className="bg-card p-4 border-b shadow-sm">
          <h1 className="text-xl font-bold">ERP 관리 시스템</h1>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 