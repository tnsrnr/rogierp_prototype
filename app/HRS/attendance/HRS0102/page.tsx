"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Download, 
  Filter, 
  Printer, 
  AlertCircle,
  Check,
  CalendarIcon
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AttendanceException {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  position: string;
  date: string;
  exceptionType: "지각" | "조퇴" | "결근";
  reason: string;
  status: "승인대기" | "승인" | "반려";
  approver?: string;
  requestDate: string;
  approvedDate?: string;
}

export default function AttendanceExceptionPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  
  // 오늘 날짜 문자열 (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];
  
  // 더미 지각/조퇴/결근 데이터
  const exceptionRequests: AttendanceException[] = [
    { 
      id: "EXC-20230601-001", 
      employeeId: "EMP002", 
      name: "김철수", 
      department: "마케팅팀", 
      position: "대리", 
      date: today,
      exceptionType: "지각",
      reason: "대중교통 지연으로 인한 지각",
      status: "승인",
      approver: "이영희",
      requestDate: "2023-06-01",
      approvedDate: "2023-06-01"
    },
    { 
      id: "EXC-20230601-002", 
      employeeId: "EMP003", 
      name: "이영희", 
      department: "인사팀", 
      position: "부장", 
      date: today,
      exceptionType: "조퇴",
      reason: "병원 진료 예약",
      status: "승인",
      approver: "박민수",
      requestDate: "2023-06-01",
      approvedDate: "2023-06-01"
    },
    { 
      id: "EXC-20230601-003", 
      employeeId: "EMP004", 
      name: "박민수", 
      department: "영업팀", 
      position: "사원", 
      date: today,
      exceptionType: "결근",
      reason: "감기 증상으로 인한 병가",
      status: "승인대기",
      requestDate: "2023-06-01"
    },
    { 
      id: "EXC-20230601-004", 
      employeeId: "EMP009", 
      name: "윤지영", 
      department: "마케팅팀", 
      position: "사원", 
      date: today,
      exceptionType: "지각",
      reason: "개인 사정",
      status: "반려",
      approver: "이영희",
      requestDate: "2023-06-01",
      approvedDate: "2023-06-01"
    },
    { 
      id: "EXC-20230601-005", 
      employeeId: "EMP010", 
      name: "최현우", 
      department: "개발팀", 
      position: "사원", 
      date: today,
      exceptionType: "결근",
      reason: "가족 경조사",
      status: "승인대기",
      requestDate: "2023-06-01"
    }
  ];

  // 타입별, 상태별 건수 계산
  const countByType = exceptionRequests.reduce((acc, req) => {
    acc[req.exceptionType] = (acc[req.exceptionType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const countByStatus = exceptionRequests.reduce((acc, req) => {
    acc[req.status] = (acc[req.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalRequests = exceptionRequests.length;
  const lateCount = countByType["지각"] || 0;
  const earlyLeaveCount = countByType["조퇴"] || 0;
  const absentCount = countByType["결근"] || 0;
  
  const pendingCount = countByStatus["승인대기"] || 0;
  const approvedCount = countByStatus["승인"] || 0;
  const rejectedCount = countByStatus["반려"] || 0;

  // 검색 및 필터링
  const filteredRequests = exceptionRequests.filter(req => {
    // 예외 유형 필터링
    if (selectedType !== "all" && req.exceptionType !== selectedType) {
      return false;
    }
    
    // 상태 필터링
    if (selectedStatus !== "all" && req.status !== selectedStatus) {
      return false;
    }
    
    // 검색어 필터링
    return (
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 날짜 포맷 함수
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">지각/조퇴/결근 처리</h1>
        <div className="flex gap-2">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                달력 보기
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date);
                    setIsCalendarOpen(false);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            필터
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            내보내기
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            인쇄
          </Button>
        </div>
      </div>

      {/* 날짜 선택 */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const prevDay = new Date(selectedDate);
              prevDay.setDate(prevDay.getDate() - 1);
              setSelectedDate(prevDay);
            }}
          >
            이전 날짜
          </Button>
          <div className="text-lg font-medium px-3">
            {formatDate(selectedDate)}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const nextDay = new Date(selectedDate);
              nextDay.setDate(nextDay.getDate() + 1);
              setSelectedDate(nextDay);
            }}
          >
            다음 날짜
          </Button>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setSelectedDate(new Date())}
        >
          오늘
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">전체 요청</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">지각</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{lateCount}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">조퇴</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{earlyLeaveCount}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">결근</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{absentCount}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">승인대기</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pendingCount}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">처리완료</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedCount + rejectedCount}건</div>
          </CardContent>
        </Card>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="이름, 사번, 부서, 사유 검색..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <Button 
              variant={selectedType === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedType("all")}
            >
              전체 유형
            </Button>
            <Button 
              variant={selectedType === "지각" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedType("지각")}
            >
              지각
            </Button>
            <Button 
              variant={selectedType === "조퇴" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedType("조퇴")}
            >
              조퇴
            </Button>
            <Button 
              variant={selectedType === "결근" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedType("결근")}
            >
              결근
            </Button>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={selectedStatus === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedStatus("all")}
            >
              전체 상태
            </Button>
            <Button 
              variant={selectedStatus === "승인대기" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedStatus("승인대기")}
            >
              승인대기
            </Button>
            <Button 
              variant={selectedStatus === "승인" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedStatus("승인")}
            >
              승인
            </Button>
            <Button 
              variant={selectedStatus === "반려" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedStatus("반려")}
            >
              반려
            </Button>
          </div>
        </div>
      </div>

      {/* 예외 요청 처리 테이블 */}
      <div className="border rounded-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted border-b">
                <th className="py-3 px-4 text-left font-medium">신청번호</th>
                <th className="py-3 px-4 text-left font-medium">사번</th>
                <th className="py-3 px-4 text-left font-medium">이름</th>
                <th className="py-3 px-4 text-left font-medium">부서</th>
                <th className="py-3 px-4 text-left font-medium">예외유형</th>
                <th className="py-3 px-4 text-left font-medium">날짜</th>
                <th className="py-3 px-4 text-left font-medium">사유</th>
                <th className="py-3 px-4 text-left font-medium">상태</th>
                <th className="py-3 px-4 text-center font-medium">액션</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">{req.id}</td>
                  <td className="py-3 px-4">{req.employeeId}</td>
                  <td className="py-3 px-4 font-medium">{req.name}</td>
                  <td className="py-3 px-4">{req.department}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      req.exceptionType === "지각" || req.exceptionType === "조퇴" ? "bg-amber-100 text-amber-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {req.exceptionType}
                    </span>
                  </td>
                  <td className="py-3 px-4">{req.date}</td>
                  <td className="py-3 px-4 max-w-xs truncate">{req.reason}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      req.status === "승인" ? "bg-green-100 text-green-800" :
                      req.status === "승인대기" ? "bg-blue-100 text-blue-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      {req.status === "승인대기" ? (
                        <>
                          <Button variant="outline" size="sm" className="h-8 text-green-600 border-green-600">
                            <Check className="mr-1 h-4 w-4" />
                            승인
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 text-red-600 border-red-600">
                            <AlertCircle className="mr-1 h-4 w-4" />
                            반려
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm">
                          상세보기
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredRequests.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      {/* 새 예외 처리 신청 카드 */}
      <Card>
        <CardHeader>
          <CardTitle>새 예외 처리 신청</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">직원 검색</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="이름 또는 사번으로 검색" 
                    className="pl-8" 
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">예외 유형</label>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">지각</Button>
                  <Button variant="outline" className="flex-1">조퇴</Button>
                  <Button variant="outline" className="flex-1">결근</Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">날짜</label>
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">사유</label>
                <Textarea placeholder="사유를 입력하세요" className="min-h-[120px]" />
              </div>
              <div className="flex justify-end">
                <Button>신청하기</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 