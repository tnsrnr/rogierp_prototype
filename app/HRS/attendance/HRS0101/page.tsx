"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Download, 
  Filter, 
  Printer, 
  Clock,
  CalendarIcon
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AttendanceRecord {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  position: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  workingHours: string | null;
  status: "정상" | "지각" | "조퇴" | "결근" | "휴가";
  note?: string;
}

export default function AttendanceRecordPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  
  // 오늘 날짜 문자열 (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];
  
  // 더미 출퇴근 기록 데이터
  const attendanceRecords: AttendanceRecord[] = [
    { 
      id: "ATT-20230601-001", 
      employeeId: "EMP001", 
      name: "홍길동", 
      department: "개발팀", 
      position: "과장", 
      date: today,
      clockIn: "08:55:23", 
      clockOut: "18:10:05", 
      workingHours: "9:15", 
      status: "정상"
    },
    { 
      id: "ATT-20230601-002", 
      employeeId: "EMP002", 
      name: "김철수", 
      department: "마케팅팀", 
      position: "대리", 
      date: today,
      clockIn: "09:10:45", 
      clockOut: "18:05:12", 
      workingHours: "8:54", 
      status: "지각",
      note: "출근 버스 지연"
    },
    { 
      id: "ATT-20230601-003", 
      employeeId: "EMP003", 
      name: "이영희", 
      department: "인사팀", 
      position: "부장", 
      date: today,
      clockIn: "08:45:10", 
      clockOut: "17:30:22", 
      workingHours: "8:45", 
      status: "조퇴",
      note: "병원 진료"
    },
    { 
      id: "ATT-20230601-004", 
      employeeId: "EMP004", 
      name: "박민수", 
      department: "영업팀", 
      position: "사원", 
      date: today,
      clockIn: null, 
      clockOut: null, 
      workingHours: null, 
      status: "결근",
      note: "병가"
    },
    { 
      id: "ATT-20230601-005", 
      employeeId: "EMP005", 
      name: "정수연", 
      department: "개발팀", 
      position: "대리", 
      date: today,
      clockIn: null, 
      clockOut: null, 
      workingHours: null, 
      status: "휴가"
    },
    { 
      id: "ATT-20230601-006", 
      employeeId: "EMP006", 
      name: "송미란", 
      department: "회계팀", 
      position: "과장", 
      date: today,
      clockIn: "08:50:33", 
      clockOut: "18:05:44", 
      workingHours: "9:15", 
      status: "정상"
    },
    { 
      id: "ATT-20230601-007", 
      employeeId: "EMP007", 
      name: "최지수", 
      department: "회계팀", 
      position: "대리", 
      date: today,
      clockIn: "08:58:21", 
      clockOut: "18:02:10", 
      workingHours: "9:04", 
      status: "정상"
    },
    { 
      id: "ATT-20230601-008", 
      employeeId: "EMP008", 
      name: "한승우", 
      department: "개발팀", 
      position: "차장", 
      date: today,
      clockIn: "08:30:15", 
      clockOut: "18:30:05", 
      workingHours: "10:00", 
      status: "정상"
    },
  ];

  // 상태별 직원 수 계산
  const countByStatus = attendanceRecords.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalRecords = attendanceRecords.length;
  const normalCount = countByStatus["정상"] || 0;
  const lateCount = countByStatus["지각"] || 0;
  const earlyLeaveCount = countByStatus["조퇴"] || 0;
  const absentCount = countByStatus["결근"] || 0;
  const vacationCount = countByStatus["휴가"] || 0;

  // 검색 및 필터링
  const filteredRecords = attendanceRecords.filter(record => {
    // 상태 필터링
    if (selectedStatus !== "all" && record.status !== selectedStatus) {
      return false;
    }
    
    // 검색어 필터링
    return (
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.position.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-2xl font-bold">출퇴근 기록</h1>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">전체</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords}명</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">정상 출근</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{normalCount}명</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">지각</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{lateCount}명</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">조퇴</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{earlyLeaveCount}명</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">결근</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{absentCount}명</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">휴가</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{vacationCount}명</div>
          </CardContent>
        </Card>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="이름, 사번, 부서, 직급 검색..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant={selectedStatus === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedStatus("all")}
          >
            전체
          </Button>
          <Button 
            variant={selectedStatus === "정상" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedStatus("정상")}
          >
            정상 출근
          </Button>
          <Button 
            variant={selectedStatus === "지각" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedStatus("지각")}
          >
            지각
          </Button>
          <Button 
            variant={selectedStatus === "조퇴" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedStatus("조퇴")}
          >
            조퇴
          </Button>
          <Button 
            variant={selectedStatus === "결근" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedStatus("결근")}
          >
            결근
          </Button>
          <Button 
            variant={selectedStatus === "휴가" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedStatus("휴가")}
          >
            휴가
          </Button>
        </div>
      </div>

      {/* 출퇴근 기록 테이블 */}
      <div className="border rounded-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted border-b">
                <th className="py-3 px-4 text-left font-medium">사번</th>
                <th className="py-3 px-4 text-left font-medium">이름</th>
                <th className="py-3 px-4 text-left font-medium">부서</th>
                <th className="py-3 px-4 text-left font-medium">직급</th>
                <th className="py-3 px-4 text-left font-medium">출근 시간</th>
                <th className="py-3 px-4 text-left font-medium">퇴근 시간</th>
                <th className="py-3 px-4 text-left font-medium">근무 시간</th>
                <th className="py-3 px-4 text-left font-medium">상태</th>
                <th className="py-3 px-4 text-left font-medium">비고</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">{record.employeeId}</td>
                  <td className="py-3 px-4 font-medium">{record.name}</td>
                  <td className="py-3 px-4">{record.department}</td>
                  <td className="py-3 px-4">{record.position}</td>
                  <td className="py-3 px-4">
                    {record.clockIn ? (
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        {record.clockIn}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {record.clockOut ? (
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        {record.clockOut}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {record.workingHours ? (
                      <span>{record.workingHours}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === "정상" ? "bg-green-100 text-green-800" :
                      record.status === "지각" || record.status === "조퇴" ? "bg-amber-100 text-amber-800" :
                      record.status === "결근" ? "bg-red-100 text-red-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {record.note || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredRecords.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          총 {filteredRecords.length}명의 출퇴근 기록
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            이전
          </Button>
          <Button variant="outline" size="sm" className="px-3 bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            다음
          </Button>
        </div>
      </div>
    </div>
  );
} 