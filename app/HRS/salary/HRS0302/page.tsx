"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter, Printer, Plus, DollarSign, Search } from "lucide-react";

export default function SalaryRegisterPage() {
  const [month, setMonth] = useState<string>(new Date().toISOString().split('T')[0].substring(0, 7));
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // 더미 급여 등록 데이터
  const salaryRegistrations = [
    { id: 1, employeeId: "EMP001", name: "홍길동", department: "개발팀", position: "과장", payMonth: "2023-06", basic: 3500000, overtime: 250000, allowances: 300000, deductions: 430000, netPay: 3620000, status: "확정" },
    { id: 2, employeeId: "EMP002", name: "김철수", department: "마케팅팀", position: "대리", payMonth: "2023-06", basic: 3000000, overtime: 180000, allowances: 250000, deductions: 390000, netPay: 3040000, status: "확정" },
    { id: 3, employeeId: "EMP003", name: "이영희", department: "인사팀", position: "부장", payMonth: "2023-06", basic: 5000000, overtime: 0, allowances: 500000, deductions: 680000, netPay: 4820000, status: "확정" },
    { id: 4, employeeId: "EMP004", name: "박민수", department: "영업팀", position: "사원", payMonth: "2023-06", basic: 2800000, overtime: 320000, allowances: 200000, deductions: 370000, netPay: 2950000, status: "확정" },
    { id: 5, employeeId: "EMP005", name: "정수연", department: "개발팀", position: "대리", payMonth: "2023-06", basic: 3200000, overtime: 280000, allowances: 250000, deductions: 410000, netPay: 3320000, status: "임시저장" },
    { id: 6, employeeId: "EMP006", name: "송미란", department: "회계팀", position: "과장", payMonth: "2023-06", basic: 3800000, overtime: 0, allowances: 300000, deductions: 450000, netPay: 3650000, status: "임시저장" },
    { id: 7, employeeId: "EMP007", name: "최지수", department: "회계팀", position: "대리", payMonth: "2023-06", basic: 3100000, overtime: 150000, allowances: 250000, deductions: 400000, netPay: 3100000, status: "미등록" },
    { id: 8, employeeId: "EMP008", name: "한승우", department: "개발팀", position: "차장", payMonth: "2023-06", basic: 4500000, overtime: 0, allowances: 400000, deductions: 580000, netPay: 4320000, status: "미등록" },
  ];

  // 검색 필터링
  const filteredSalaries = salaryRegistrations.filter(
    (salary) =>
      salary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salary.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salary.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // 급여 통계 계산
  const totalCount = filteredSalaries.length;
  const confirmedCount = filteredSalaries.filter(item => item.status === "확정").length;
  const draftCount = filteredSalaries.filter(item => item.status === "임시저장").length;
  const unregisteredCount = filteredSalaries.filter(item => item.status === "미등록").length;
  const totalNetPay = filteredSalaries.reduce((sum, item) => sum + item.netPay, 0);
  
  // 숫자 포맷팅 함수
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">급여 명세 등록</h1>
        <div className="flex gap-2">
          <div className="flex items-center border rounded-md pr-2">
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="px-3 py-1 rounded-md focus:outline-none"
            />
          </div>
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
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            급여 일괄 등록
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">확정 급여</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedCount}건</div>
            <p className="text-xs text-muted-foreground">전체의 {Math.round((confirmedCount / totalCount) * 100)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">임시 저장</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftCount}건</div>
            <p className="text-xs text-muted-foreground">전체의 {Math.round((draftCount / totalCount) * 100)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">미등록</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unregisteredCount}건</div>
            <p className="text-xs text-muted-foreground">전체의 {Math.round((unregisteredCount / totalCount) * 100)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">총 급여액</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalNetPay)}원</div>
            <p className="text-xs text-muted-foreground">1인당 평균 {formatNumber(Math.round(totalNetPay / totalCount))}원</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>급여 명세 목록</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="직원명, 사번, 부서 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
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
                  <th className="border px-4 py-2 text-left">지급 월</th>
                  <th className="border px-4 py-2 text-right">기본급</th>
                  <th className="border px-4 py-2 text-right">초과근무수당</th>
                  <th className="border px-4 py-2 text-right">기타 수당</th>
                  <th className="border px-4 py-2 text-right">공제액</th>
                  <th className="border px-4 py-2 text-right">실 지급액</th>
                  <th className="border px-4 py-2 text-left">상태</th>
                  <th className="border px-4 py-2 text-left">조치</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr key={salary.id} className="hover:bg-muted/50">
                    <td className="border px-4 py-2">{salary.employeeId}</td>
                    <td className="border px-4 py-2">{salary.name}</td>
                    <td className="border px-4 py-2">{salary.department}</td>
                    <td className="border px-4 py-2">{salary.position}</td>
                    <td className="border px-4 py-2">{salary.payMonth}</td>
                    <td className="border px-4 py-2 text-right">{formatNumber(salary.basic)}</td>
                    <td className="border px-4 py-2 text-right">{formatNumber(salary.overtime)}</td>
                    <td className="border px-4 py-2 text-right">{formatNumber(salary.allowances)}</td>
                    <td className="border px-4 py-2 text-right">{formatNumber(salary.deductions)}</td>
                    <td className="border px-4 py-2 text-right font-semibold">{formatNumber(salary.netPay)}</td>
                    <td className="border px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        salary.status === "확정" ? "bg-green-100 text-green-800" : 
                        salary.status === "임시저장" ? "bg-amber-100 text-amber-800" : 
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {salary.status}
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <DollarSign className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">상세</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            총 <strong>{filteredSalaries.length}</strong>건의 급여 명세가 표시됨
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