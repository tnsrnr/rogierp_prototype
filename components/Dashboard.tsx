"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    HRS: true, // 기본적으로 HRS 메뉴 펼치기
  });
  const pathname = usePathname();

  // 로그인 페이지인 경우 레이아웃을 적용하지 않음
  const isLoginPage = pathname === "/login";

  const mainMenuItems: MenuItem[] = [
    {
      id: "ADM",
      title: "시스템 관리",
      path: "/ADM",
    },
    {
      id: "COM",
      title: "공통 관리",
      path: "/COM",
    },
    {
      id: "HRS", 
      title: "인사 관리",
      path: "/HRS",
      subItems: [
        {
          id: "HRS01",
          title: "근태 관리",
          subItems: [
            { id: "HRS0101", title: "출퇴근 기록", path: "/HRS/attendance/HRS0101" },
            { id: "HRS0102", title: "지각/조퇴/결근 처리", path: "/HRS/attendance/HRS0102" }
          ]
        },
        {
          id: "HRS02",
          title: "연차 관리",
          subItems: [
            { id: "HRS0201", title: "연차 신청", path: "/HRS/leave/HRS0201" },
            { id: "HRS0202", title: "연차 승인", path: "/HRS/leave/HRS0202" },
            { id: "HRS0203", title: "연차 자동 계산", path: "/HRS/leave/HRS0203" }
          ]
        },
        {
          id: "HRS03",
          title: "급여 관리", 
          subItems: [
            { id: "HRS0301", title: "급여 항목 설정", path: "/HRS/salary/HRS0301" },
            { id: "HRS0302", title: "급여 명세 등록", path: "/HRS/salary/HRS0302" },
            { id: "HRS0303", title: "명세서 조회", path: "/HRS/salary/HRS0303" }
          ]
        },
        {
          id: "HRS04",
          title: "인사 정보 관리",
          subItems: [
            { id: "HRS0401", title: "직원 정보 관리", path: "/HRS/hr-info/HRS0401" },
            { id: "HRS0402", title: "조직도 관리", path: "/HRS/hr-info/HRS0402" },
            { id: "HRS0403", title: "증명서 발급", path: "/HRS/hr-info/HRS0403" }
          ]
        },
        {
          id: "HRS05",
          title: "통계",
          subItems: [
            { id: "HRS0501", title: "근태통계", path: "/HRS/statistics/HRS0501" },
            { id: "HRS0502", title: "연차통계", path: "/HRS/statistics/HRS0502" },
            { id: "HRS0503", title: "급여통계", path: "/HRS/statistics/HRS0503" },
            { id: "HRS0504", title: "인사통계", path: "/HRS/statistics/HRS0504" }
          ]
        }
      ]
    },
    {
      id: "JOB",
      title: "작업 관리",
      path: "/JOB",
    },
    {
      id: "ACC",
      title: "회계 관리",
      path: "/ACC",
      subItems: [
        {
          id: "ACC01",
          title: "전표 관리",
          subItems: [
            { id: "ACC0101", title: "전표 등록", path: "/ACC/voucher/ACC0101" },
            { id: "ACC0102", title: "전표 승인", path: "/ACC/voucher/ACC0102" },
            { id: "ACC0103", title: "전표 조회", path: "/ACC/voucher/ACC0103" }
          ]
        },
        {
          id: "ACC02",
          title: "결산 관리",
          subItems: [
            { id: "ACC0201", title: "월 결산", path: "/ACC/settlement/ACC0201" },
            { id: "ACC0202", title: "분기 결산", path: "/ACC/settlement/ACC0202" },
            { id: "ACC0203", title: "연간 결산", path: "/ACC/settlement/ACC0203" }
          ]
        },
        {
          id: "ACC03",
          title: "회계 보고서", 
          subItems: [
            { id: "ACC0301", title: "재무상태표", path: "/ACC/reports/ACC0301" },
            { id: "ACC0302", title: "손익계산서", path: "/ACC/reports/ACC0302" },
            { id: "ACC0303", title: "현금흐름표", path: "/ACC/reports/ACC0303" }
          ]
        },
        {
          id: "ACC04",
          title: "계정 관리",
          subItems: [
            { id: "ACC0401", title: "계정과목 관리", path: "/ACC/accounts/ACC0401" },
            { id: "ACC0402", title: "계정 그룹 설정", path: "/ACC/accounts/ACC0402" }
          ]
        },
        {
          id: "ACC05",
          title: "세금 관리",
          subItems: [
            { id: "ACC0501", title: "부가가치세 신고", path: "/ACC/tax/ACC0501" },
            { id: "ACC0502", title: "원천세 관리", path: "/ACC/tax/ACC0502" },
            { id: "ACC0503", title: "법인세 관리", path: "/ACC/tax/ACC0503" }
          ]
        }
      ]
    },
    {
      id: "FIN",
      title: "재무 관리",
      path: "/FIN",
    },
    {
      id: "VMS",
      title: "벤더 관리",
      path: "/VMS",
    },
    {
      id: "WMS",
      title: "창고 관리",
      path: "/WMS",
      subItems: [
        {
          id: "WMS01",
          title: "입고관리",
          subItems: [
            { id: "WMS0101", title: "입고 예정 등록", path: "/WMS/inbound/WMS0101" },
            { id: "WMS0102", title: "입고 등록", path: "/WMS/inbound/WMS0102" },
            { id: "WMS0103", title: "입고 검수", path: "/WMS/inbound/WMS0103" },
            { id: "WMS0104", title: "적치 지시", path: "/WMS/inbound/WMS0104" },
            { id: "WMS0105", title: "반품 입고", path: "/WMS/inbound/WMS0105" },
            { id: "WMS0106", title: "입고 내역 조회", path: "/WMS/inbound/WMS0106" }
          ]
        },
        {
          id: "WMS02",
          title: "출고관리",
          subItems: [
            { id: "WMS0201", title: "출고 주문 등록", path: "/WMS/outbound/WMS0201" },
            { id: "WMS0202", title: "피킹 지시", path: "/WMS/outbound/WMS0202" },
            { id: "WMS0203", title: "피킹 확인", path: "/WMS/outbound/WMS0203" },
            { id: "WMS0204", title: "출고 검수/포장", path: "/WMS/outbound/WMS0204" },
            { id: "WMS0205", title: "출고 확정", path: "/WMS/outbound/WMS0205" },
            { id: "WMS0206", title: "출고 내역 조회", path: "/WMS/outbound/WMS0206" }
          ]
        },
        {
          id: "WMS03",
          title: "재고관리",
          subItems: [
            { id: "WMS0301", title: "재고 현황 조회", path: "/WMS/inventory/WMS0301" },
            { id: "WMS0302", title: "재고 조정", path: "/WMS/inventory/WMS0302" },
            { id: "WMS0303", title: "재고 실사", path: "/WMS/inventory/WMS0303" },
            { id: "WMS0304", title: "로트/유효기간 관리", path: "/WMS/inventory/WMS0304" },
            { id: "WMS0305", title: "시리얼번호 관리", path: "/WMS/inventory/WMS0305" }
          ]
        },
        {
          id: "WMS04",
          title: "재고이동",
          subItems: [
            { id: "WMS0401", title: "로케이션 이동", path: "/WMS/stock_transfer/WMS0401" },
            { id: "WMS0402", title: "창고 간 이동", path: "/WMS/stock_transfer/WMS0402" },
            { id: "WMS0403", title: "피킹존 보충", path: "/WMS/stock_transfer/WMS0403" },
            { id: "WMS0404", title: "재고 이동 내역 조회", path: "/WMS/stock_transfer/WMS0404" }
          ]
        },
        {
          id: "WMS05",
          title: "바코드",
          subItems: [
            { id: "WMS0501", title: "바코드 생성/관리", path: "/WMS/barcode/WMS0501" },
            { id: "WMS0502", title: "라벨 디자인", path: "/WMS/barcode/WMS0502" },
            { id: "WMS0503", title: "라벨 출력", path: "/WMS/barcode/WMS0503" }
          ]
        },
        {
          id: "WMS06",
          title: "기초정보",
          subItems: [
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
          id: "WMS07",
          title: "설정/관리",
          subItems: [
            { id: "WMS0701", title: "사용자 관리", path: "/WMS/settings/WMS0701" },
            { id: "WMS0702", title: "권한 관리", path: "/WMS/settings/WMS0702" },
            { id: "WMS0703", title: "시스템 환경 설정", path: "/WMS/settings/WMS0703" },
            { id: "WMS0704", title: "메뉴 설정", path: "/WMS/settings/WMS0704" },
            { id: "WMS0705", title: "항목(필드) 설정", path: "/WMS/settings/WMS0705" },
            { id: "WMS0706", title: "알림 설정", path: "/WMS/settings/WMS0706" }
          ]
        },
        {
          id: "WMS08",
          title: "보고서 및 통계",
          subItems: [
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
      ]
    }
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isActive = item.path && pathname === item.path;
    const isExpanded = expandedMenus[item.id];
    const hasSubItems = item.subItems && item.subItems.length > 0;
    
    return (
      <div key={item.id} className="w-full">
        <div 
          className={`
            flex items-center px-3 py-2 mb-1 rounded-md
            ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'}
            ${level > 0 ? `ml-${level * 3}` : ''}
            cursor-pointer
          `}
          onClick={() => {
            if (hasSubItems) {
              toggleMenu(item.id);
            }
          }}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          
          {!collapsed && (
            <>
              {item.path ? (
                <Link href={item.path} className="flex-1 truncate" onClick={(e) => {
                  if (hasSubItems) {
                    e.preventDefault(); // 하위 메뉴가 있을 경우 링크 이동 방지
                    toggleMenu(item.id);
                  }
                }}>
                  {item.title}
                </Link>
              ) : (
                <span className="flex-1 truncate">{item.title}</span>
              )}
              
              {hasSubItems && (
                <span className="ml-auto">
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              )}
            </>
          )}
        </div>
        
        {!collapsed && hasSubItems && isExpanded && (
          <div className={`ml-${level + 1} pl-2 border-l border-border`}>
            {item.subItems?.map(subItem => renderMenuItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 사이드바 */}
      <aside 
        className={`
          bg-card h-full border-r flex flex-col
          ${collapsed ? 'w-16' : 'w-64'}
          transition-all duration-300 ease-in-out
        `}
      >
        {/* 로고 및 접기/펴기 버튼 */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <h1 className="text-xl font-bold">ERP 시스템</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu size={20} />
          </Button>
        </div>
        
        {/* 메뉴 항목들 */}
        <div className="flex-1 overflow-auto p-3">
          {mainMenuItems.map(item => renderMenuItem(item))}
        </div>
        
        {/* 사용자 정보 및 로그아웃 */}
        <div className="p-4 border-t">
          {!collapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User size={20} className="mr-2" />
                <span>관리자</span>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut size={20} />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" className="mx-auto">
              <LogOut size={20} />
            </Button>
          )}
        </div>
      </aside>
      
      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-auto">
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