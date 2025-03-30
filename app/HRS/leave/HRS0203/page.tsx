"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter, Printer, Calculator, RotateCw } from "lucide-react";

export default function LeaveCalculationPage() {
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  
  // 더미 연차 계산 데이터
  const leaveCalculations = [
    { id: 1, employeeId: "EMP001", name: "홍길동", department: "개발팀", position: "과장", joinDate: "2020-03-15", serviceYears: 3, baseAllocation: 15, additionalDays: 0, usedDays: 3, remainingDays: 12 },
    { id: 2, employeeId: "EMP002", name: "김철수", department: "마케팅팀", position: "대리", joinDate: "2019-06-22", serviceYears: 4, baseAllocation: 15, additionalDays: 1, usedDays: 7, remainingDays: 9 },
    { id: 3, employeeId: "EMP003", name: "이영희", department: "인사팀", position: "부장", joinDate: "2015-01-05", serviceYears: 8, baseAllocation: 15, additionalDays: 4, usedDays: 12, remainingDays: 7 },
    { id: 4, employeeId: "EMP004", name: "박민수", department: "영업팀", position: "사원", joinDate: "2022-07-11", serviceYears: 1, baseAllocation: 11, additionalDays: 0, usedDays: 2, remainingDays: 9 },
    { id: 5, employeeId: "EMP005", name: "정수연", department: "개발팀", position: "대리", joinDate: "2021-04-30", serviceYears: 2, baseAllocation: 15, additionalDays: 0, usedDays: 5, remainingDays: 10 },
    { id: 6, employeeId: "EMP006", name: "송미란", department: "회계팀", position: "과장", joinDate: "2018-09-20", serviceYears: 5, baseAllocation: 15, additionalDays: 2, usedDays: 6, remainingDays: 11 },
    { id: 7, employeeId: "EMP007", name: "최지수", department: "회계팀", position: "대리", joinDate: "2020-11-16", serviceYears: 3, baseAllocation: 15, additionalDays: 0, usedDays: 8, remainingDays: 7 },
    { id: 8, employeeId: "EMP008", name: "한승우", department: "개발팀", position: "차장", joinDate: "2017-02-28", serviceYears: 6, baseAllocation: 15, additionalDays: 3, usedDays: 10, remainingDays: 8 },
  ];

  // 통계 데이터 계산
  const totalEmployees = leaveCalculations.length;
  const totalLeaveDays = leaveCalculations.reduce((sum, item) => sum + item.baseAllocation + item.additionalDays, 0);
  const usedLeaveDays = leaveCalculations.reduce((sum, item) => sum + item.usedDays, 0);
  const remainingLeaveDays = leaveCalculations.reduce((sum, item) => sum + item.remainingDays, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">연차 자동 계산</h1>
        <div className="flex gap-2">
          <div className="flex items-center border rounded-md pr-2">
            <select 
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-3 py-1 rounded-md focus:outline-none"
            >
              <option value="2023">2023년</option>
              <option value="2022">2022년</option>
              <option value="2021">2021년</option>
            </select>
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
            <Calculator className="mr-2 h-4 w-4" />
            연차 재계산
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">총 직원 수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}명</div>
            <p className="text-xs text-muted-foreground">연차 계산 대상</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">총 연차일수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeaveDays}일</div>
            <p className="text-xs text-muted-foreground">기본 + 추가 연차</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">사용 연차</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usedLeaveDays}일</div>
            <p className="text-xs text-muted-foreground">{Math.round((usedLeaveDays / totalLeaveDays) * 100)}% 사용률</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">잔여 연차</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{remainingLeaveDays}일</div>
            <p className="text-xs text-muted-foreground">{Math.round((remainingLeaveDays / totalLeaveDays) * 100)}% 잔여율</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>연차 계산 결과</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RotateCw className="mr-2 h-4 w-4" />
                최종 업데이트: {new Date().toLocaleDateString()}
              </Button>
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
                  <th className="border px-4 py-2 text-left">입사일</th>
                  <th className="border px-4 py-2 text-left">근속 연수</th>
                  <th className="border px-4 py-2 text-left">기본 연차</th>
                  <th className="border px-4 py-2 text-left">추가 연차</th>
                  <th className="border px-4 py-2 text-left">사용 연차</th>
                  <th className="border px-4 py-2 text-left">잔여 연차</th>
                  <th className="border px-4 py-2 text-left">조치</th>
                </tr>
              </thead>
              <tbody>
                {leaveCalculations.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50">
                    <td className="border px-4 py-2">{item.employeeId}</td>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.department}</td>
                    <td className="border px-4 py-2">{item.position}</td>
                    <td className="border px-4 py-2">{item.joinDate}</td>
                    <td className="border px-4 py-2">{item.serviceYears}년</td>
                    <td className="border px-4 py-2">{item.baseAllocation}일</td>
                    <td className="border px-4 py-2">{item.additionalDays}일</td>
                    <td className="border px-4 py-2">{item.usedDays}일</td>
                    <td className="border px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.remainingDays > 10 ? "bg-green-100 text-green-800" : 
                        item.remainingDays > 5 ? "bg-blue-100 text-blue-800" :
                        item.remainingDays > 0 ? "bg-amber-100 text-amber-800" : 
                        "bg-red-100 text-red-800"
                      }`}>
                        {item.remainingDays}일
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      <Button variant="ghost" size="sm">상세</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            총 <strong>{leaveCalculations.length}</strong>명의 직원 연차 정보가 표시됨
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