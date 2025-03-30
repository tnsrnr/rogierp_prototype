"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart4, Users, Calendar, CreditCard, Clock, ClipboardCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">환영합니다, 관리자님!</h1>
      <p className="text-muted-foreground">ERP 시스템 대시보드에서 주요 정보를 확인하세요.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 직원 현황 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">직원 현황</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">47명</div>
            <p className="text-sm text-muted-foreground mt-1">
              지난달 대비 2명 증가
            </p>
            <Button variant="ghost" size="sm" className="mt-4 w-full justify-start px-2">
              자세히 보기
            </Button>
          </CardContent>
        </Card>

        {/* 출근 현황 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">오늘 출근 현황</CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42명 / 47명</div>
            <p className="text-sm text-muted-foreground mt-1">
              휴가 3명, 결근 2명
            </p>
            <Button variant="ghost" size="sm" className="mt-4 w-full justify-start px-2">
              자세히 보기
            </Button>
          </CardContent>
        </Card>

        {/* 결재 대기 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">결재 대기</CardTitle>
            <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5건</div>
            <p className="text-sm text-muted-foreground mt-1">
              연차 신청 3건, 지출 결의 2건
            </p>
            <Button variant="ghost" size="sm" className="mt-4 w-full justify-start px-2">
              자세히 보기
            </Button>
          </CardContent>
        </Card>

        {/* 이번달 연차 사용 현황 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">이번달 연차 사용</CardTitle>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">28일</div>
            <p className="text-sm text-muted-foreground mt-1">
              전체 연차의 12% 사용
            </p>
            <Button variant="ghost" size="sm" className="mt-4 w-full justify-start px-2">
              자세히 보기
            </Button>
          </CardContent>
        </Card>

        {/* 이번달 급여 지출 현황 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">이번달 급여 지출</CardTitle>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1억 5,600만원</div>
            <p className="text-sm text-muted-foreground mt-1">
              지난달 대비 3% 증가
            </p>
            <Button variant="ghost" size="sm" className="mt-4 w-full justify-start px-2">
              자세히 보기
            </Button>
          </CardContent>
        </Card>

        {/* 인사 현황 추이 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">인사 현황 추이</CardTitle>
            <BarChart4 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center h-20">
              <div className="h-full w-8 bg-primary/10 rounded-sm relative">
                <div className="absolute bottom-0 w-full bg-primary rounded-sm" style={{ height: '60%' }}></div>
              </div>
              <div className="h-full w-8 bg-primary/10 rounded-sm relative">
                <div className="absolute bottom-0 w-full bg-primary rounded-sm" style={{ height: '75%' }}></div>
              </div>
              <div className="h-full w-8 bg-primary/10 rounded-sm relative">
                <div className="absolute bottom-0 w-full bg-primary rounded-sm" style={{ height: '65%' }}></div>
              </div>
              <div className="h-full w-8 bg-primary/10 rounded-sm relative">
                <div className="absolute bottom-0 w-full bg-primary rounded-sm" style={{ height: '80%' }}></div>
              </div>
              <div className="h-full w-8 bg-primary/10 rounded-sm relative">
                <div className="absolute bottom-0 w-full bg-primary rounded-sm" style={{ height: '85%' }}></div>
              </div>
              <div className="h-full w-8 bg-primary/10 rounded-sm relative">
                <div className="absolute bottom-0 w-full bg-primary rounded-sm" style={{ height: '90%' }}></div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="mt-4 w-full justify-start px-2">
              자세히 보기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
