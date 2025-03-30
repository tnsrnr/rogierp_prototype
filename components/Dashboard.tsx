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