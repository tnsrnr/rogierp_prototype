"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format, differenceInDays } from "date-fns";
import { ko } from "date-fns/locale";
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  Clock,
  User
} from "lucide-react";

interface LeaveRequest {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  position: string;
  type: "연차" | "반차(오전)" | "반차(오후)" | "병가" | "경조사" | "기타";
  startDate: Date;
  endDate: Date;
  days: number;
  reason: string;
  status: "승인대기" | "승인" | "반려";
  approver?: string;
  requestDate: Date;
  approvedDate?: Date;
}

export default function LeaveRequestPage() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showApplyForm, setShowApplyForm] = useState<boolean>(false);
  
  // 더미 직원 데이터
  const currentEmployee = {
    id: "EMP001",
    name: "홍길동",
    department: "개발팀",
    position: "과장",
    totalLeave: 15,
    usedLeave: 5,
    remainingLeave: 10
  };
  
  // 더미 연차 신청 데이터
  const leaveRequests: LeaveRequest[] = [
    {
      id: "LV-20230601-001",
      employeeId: "EMP001",
      name: "홍길동",
      department: "개발팀",
      position: "과장",
      type: "연차",
      startDate: new Date(2023, 5, 15),
      endDate: new Date(2023, 5, 16),
      days: 2,
      reason: "개인 휴식",
      status: "승인",
      approver: "이영희",
      requestDate: new Date(2023, 5, 1),
      approvedDate: new Date(2023, 5, 2)
    },
    {
      id: "LV-20230601-002",
      employeeId: "EMP001",
      name: "홍길동",
      department: "개발팀",
      position: "과장",
      type: "반차(오후)",
      startDate: new Date(2023, 5, 20),
      endDate: new Date(2023, 5, 20),
      days: 0.5,
      reason: "병원 방문",
      status: "승인",
      approver: "이영희",
      requestDate: new Date(2023, 5, 10),
      approvedDate: new Date(2023, 5, 11)
    },
    {
      id: "LV-20230601-003",
      employeeId: "EMP001",
      name: "홍길동",
      department: "개발팀",
      position: "과장",
      type: "연차",
      startDate: new Date(2023, 6, 5),
      endDate: new Date(2023, 6, 7),
      days: 3,
      reason: "가족 여행",
      status: "승인대기",
      requestDate: new Date(2023, 5, 25)
    }
  ];

  // 상태별 연차 신청 건수 계산
  const countByStatus = leaveRequests.reduce((acc, req) => {
    acc[req.status] = (acc[req.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pendingCount = countByStatus["승인대기"] || 0;
  const approvedCount = countByStatus["승인"] || 0;
  const rejectedCount = countByStatus["반려"] || 0;

  // 검색 및 필터링
  const filteredRequests = leaveRequests.filter(req => {
    // 상태 필터링
    if (selectedStatus !== "all" && req.status !== selectedStatus) {
      return false;
    }
    
    // 검색어 필터링
    return (
      req.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      format(req.startDate, 'yyyy-MM-dd').includes(searchTerm)
    );
  });

  // 날짜 형식 포맷팅
  const formatDateString = (date: Date) => {
    return format(date, 'yyyy년 MM월 dd일 (eee)', { locale: ko });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">연차 신청</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            필터
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            내보내기
          </Button>
          <Button size="sm" onClick={() => setShowApplyForm(!showApplyForm)}>
            <Plus className="mr-2 h-4 w-4" />
            새 연차 신청
          </Button>
        </div>
      </div>

      {/* 현재 사용자 연차 정보 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">내 연차 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">이름</p>
                <p className="font-medium">{currentEmployee.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">부서/직급</p>
                <p className="font-medium">{currentEmployee.department} / {currentEmployee.position}</p>
              </div>
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-muted-foreground">총 연차</p>
                <p className="font-medium">{currentEmployee.totalLeave}일</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-muted-foreground">사용 연차</p>
                <p className="font-medium">{currentEmployee.usedLeave}일</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-muted-foreground">잔여 연차</p>
                <p className="font-medium text-blue-600">{currentEmployee.remainingLeave}일</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 연차 신청 폼 */}
      {showApplyForm && (
        <Card>
          <CardHeader>
            <CardTitle>연차 신청</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">날짜 선택</h3>
                <div className="border rounded-md p-4">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range as { from: Date; to: Date })}
                    className="rounded-md border"
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">연차 유형</label>
                  <select className="w-full border rounded-md p-2">
                    <option value="연차">연차</option>
                    <option value="반차(오전)">반차(오전)</option>
                    <option value="반차(오후)">반차(오후)</option>
                    <option value="병가">병가</option>
                    <option value="경조사">경조사</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">날짜</label>
                  <div className="text-sm">
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          <p>{formatDateString(dateRange.from)} ~ {formatDateString(dateRange.to)}</p>
                          <p className="text-blue-600 font-medium mt-1">
                            총 {differenceInDays(dateRange.to, dateRange.from) + 1}일
                          </p>
                        </>
                      ) : (
                        <p>{formatDateString(dateRange.from)}</p>
                      )
                    ) : (
                      <p className="text-muted-foreground">날짜를 선택해주세요</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">사유</label>
                  <Textarea placeholder="사유를 입력하세요" className="min-h-[120px]" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowApplyForm(false)}>취소</Button>
            <Button>신청하기</Button>
          </CardFooter>
        </Card>
      )}

      {/* 상태별 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <CardTitle className="text-sm font-medium text-muted-foreground">승인완료</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedCount}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">반려</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedCount}건</div>
          </CardContent>
        </Card>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="유형, 사유, 날짜 검색..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedStatus === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedStatus("all")}
          >
            전체
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

      {/* 연차 신청 목록 */}
      <div className="border rounded-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted border-b">
                <th className="py-3 px-4 text-left font-medium">신청번호</th>
                <th className="py-3 px-4 text-left font-medium">유형</th>
                <th className="py-3 px-4 text-left font-medium">시작일</th>
                <th className="py-3 px-4 text-left font-medium">종료일</th>
                <th className="py-3 px-4 text-left font-medium">일수</th>
                <th className="py-3 px-4 text-left font-medium">사유</th>
                <th className="py-3 px-4 text-left font-medium">신청일</th>
                <th className="py-3 px-4 text-left font-medium">상태</th>
                <th className="py-3 px-4 text-center font-medium">상세</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">{req.id}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      req.type === "연차" ? "bg-blue-100 text-blue-800" :
                      req.type.includes("반차") ? "bg-purple-100 text-purple-800" :
                      req.type === "병가" ? "bg-green-100 text-green-800" :
                      req.type === "경조사" ? "bg-amber-100 text-amber-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {req.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">{format(req.startDate, 'yyyy-MM-dd')}</td>
                  <td className="py-3 px-4">{format(req.endDate, 'yyyy-MM-dd')}</td>
                  <td className="py-3 px-4">{req.days}일</td>
                  <td className="py-3 px-4 max-w-xs truncate">{req.reason}</td>
                  <td className="py-3 px-4">{format(req.requestDate, 'yyyy-MM-dd')}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      req.status === "승인" ? "bg-green-100 text-green-800" :
                      req.status === "승인대기" ? "bg-blue-100 text-blue-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Button variant="ghost" size="sm">보기</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredRequests.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            연차 신청 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
} 