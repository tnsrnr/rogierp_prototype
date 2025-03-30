"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter, Printer, Check, X } from "lucide-react";

export default function LeaveApprovalPage() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // 더미 연차 승인 데이터
  const leaveApprovals = [
    { id: 1, employeeId: "EMP002", name: "김철수", department: "마케팅팀", position: "대리", startDate: "2023-06-25", endDate: "2023-06-25", type: "반차", status: "대기", reason: "병원 방문", appliedDate: "2023-06-20" },
    { id: 2, employeeId: "EMP003", name: "이영희", department: "인사팀", position: "부장", startDate: "2023-07-10", endDate: "2023-07-14", type: "연차", status: "대기", reason: "여행", appliedDate: "2023-06-15" },
    { id: 3, employeeId: "EMP008", name: "한승우", department: "개발팀", position: "차장", startDate: "2023-07-21", endDate: "2023-07-21", type: "반차", status: "대기", reason: "개인 사유", appliedDate: "2023-06-30" },
    { id: 4, employeeId: "EMP001", name: "홍길동", department: "개발팀", position: "과장", startDate: "2023-06-20", endDate: "2023-06-22", type: "연차", status: "승인", reason: "개인 사유", appliedDate: "2023-06-01", approvedDate: "2023-06-05" },
    { id: 5, employeeId: "EMP004", name: "박민수", department: "영업팀", position: "사원", startDate: "2023-06-30", endDate: "2023-06-30", type: "반차", status: "승인", reason: "개인 사유", appliedDate: "2023-06-10", approvedDate: "2023-06-12" },
    { id: 6, employeeId: "EMP005", name: "정수연", department: "개발팀", position: "대리", startDate: "2023-07-05", endDate: "2023-07-05", type: "특별휴가", status: "승인", reason: "결혼기념일", appliedDate: "2023-06-25", approvedDate: "2023-06-26" },
    { id: 7, employeeId: "EMP007", name: "최지수", department: "회계팀", position: "대리", startDate: "2023-07-03", endDate: "2023-07-03", type: "반차", status: "거절", reason: "개인 사유", appliedDate: "2023-06-27", rejectedDate: "2023-06-28", rejectionReason: "업무 일정 충돌" },
  ];

  // 대기 중인 승인 요청 필터링
  const pendingApprovals = leaveApprovals.filter(item => item.status === "대기");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">연차 승인</h1>
        <div className="flex gap-2">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">대기 중</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals.length}건</div>
            <p className="text-xs text-muted-foreground">승인 필요</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">오늘 신청</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0건</div>
            <p className="text-xs text-muted-foreground">당일 신청 건수</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">이번주 연차</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5건</div>
            <p className="text-xs text-muted-foreground">이번주 예정 연차</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>연차 승인 대기 목록</CardTitle>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border px-4 py-2 text-left">사번</th>
                  <th className="border px-4 py-2 text-left">이름</th>
                  <th className="border px-4 py-2 text-left">부서</th>
                  <th className="border px-4 py-2 text-left">직급</th>
                  <th className="border px-4 py-2 text-left">신청일</th>
                  <th className="border px-4 py-2 text-left">시작일</th>
                  <th className="border px-4 py-2 text-left">종료일</th>
                  <th className="border px-4 py-2 text-left">유형</th>
                  <th className="border px-4 py-2 text-left">사유</th>
                  <th className="border px-4 py-2 text-left">상태</th>
                  <th className="border px-4 py-2 text-left">조치</th>
                </tr>
              </thead>
              <tbody>
                {leaveApprovals.map((approval) => (
                  <tr key={approval.id} className="hover:bg-muted/50">
                    <td className="border px-4 py-2">{approval.employeeId}</td>
                    <td className="border px-4 py-2">{approval.name}</td>
                    <td className="border px-4 py-2">{approval.department}</td>
                    <td className="border px-4 py-2">{approval.position}</td>
                    <td className="border px-4 py-2">{approval.appliedDate}</td>
                    <td className="border px-4 py-2">{approval.startDate}</td>
                    <td className="border px-4 py-2">{approval.endDate}</td>
                    <td className="border px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        approval.type === "연차" ? "bg-blue-100 text-blue-800" : 
                        approval.type === "반차" ? "bg-purple-100 text-purple-800" : 
                        "bg-green-100 text-green-800"
                      }`}>
                        {approval.type}
                      </span>
                    </td>
                    <td className="border px-4 py-2">{approval.reason}</td>
                    <td className="border px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        approval.status === "승인" ? "bg-green-100 text-green-800" : 
                        approval.status === "대기" ? "bg-amber-100 text-amber-800" : 
                        "bg-red-100 text-red-800"
                      }`}>
                        {approval.status}
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      {approval.status === "대기" ? (
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm" className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                            <Check className="h-4 w-4 mr-1" />
                            승인
                          </Button>
                          <Button variant="outline" size="sm" className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">
                            <X className="h-4 w-4 mr-1" />
                            거절
                          </Button>
                        </div>
                      ) : (
                        <Button variant="ghost" size="sm">상세</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            총 <strong>{leaveApprovals.length}</strong>건의 신청이 표시됨
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm">이전</Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="sm">다음</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 