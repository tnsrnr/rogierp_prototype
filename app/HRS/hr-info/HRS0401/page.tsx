"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter, Printer, Search, UserPlus } from "lucide-react";

export default function EmployeeManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // 더미 직원 데이터
  const employees = [
    { id: "EMP001", name: "홍길동", department: "개발팀", position: "과장", joinDate: "2020-03-15", status: "재직", email: "hong@example.com", phone: "010-1234-5678" },
    { id: "EMP002", name: "김철수", department: "마케팅팀", position: "대리", joinDate: "2019-06-22", status: "재직", email: "kim@example.com", phone: "010-2345-6789" },
    { id: "EMP003", name: "이영희", department: "인사팀", position: "부장", joinDate: "2015-01-05", status: "재직", email: "lee@example.com", phone: "010-3456-7890" },
    { id: "EMP004", name: "박민수", department: "영업팀", position: "사원", joinDate: "2022-07-11", status: "재직", email: "park@example.com", phone: "010-4567-8901" },
    { id: "EMP005", name: "정수연", department: "개발팀", position: "대리", joinDate: "2021-04-30", status: "재직", email: "jung@example.com", phone: "010-5678-9012" },
    { id: "EMP006", name: "송미란", department: "회계팀", position: "과장", joinDate: "2018-09-20", status: "휴직", email: "song@example.com", phone: "010-6789-0123" },
    { id: "EMP007", name: "최지수", department: "회계팀", position: "대리", joinDate: "2020-11-16", status: "재직", email: "choi@example.com", phone: "010-7890-1234" },
    { id: "EMP008", name: "한승우", department: "개발팀", position: "차장", joinDate: "2017-02-28", status: "재직", email: "han@example.com", phone: "010-8901-2345" },
  ];

  // 검색 필터링된 직원 목록
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">직원 정보 관리</h1>
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
          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            직원 등록
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">총 인원</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8명</div>
            <p className="text-xs text-muted-foreground">전체 직원 수</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">재직 중</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7명</div>
            <p className="text-xs text-muted-foreground">87.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">휴직 중</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1명</div>
            <p className="text-xs text-muted-foreground">12.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">개발팀</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3명</div>
            <p className="text-xs text-muted-foreground">37.5%</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>직원 목록</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="이름, 사번, 부서 검색..."
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
                  <th className="border px-4 py-2 text-left">입사일</th>
                  <th className="border px-4 py-2 text-left">이메일</th>
                  <th className="border px-4 py-2 text-left">연락처</th>
                  <th className="border px-4 py-2 text-left">상태</th>
                  <th className="border px-4 py-2 text-left">조치</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-muted/50">
                    <td className="border px-4 py-2">{employee.id}</td>
                    <td className="border px-4 py-2">{employee.name}</td>
                    <td className="border px-4 py-2">{employee.department}</td>
                    <td className="border px-4 py-2">{employee.position}</td>
                    <td className="border px-4 py-2">{employee.joinDate}</td>
                    <td className="border px-4 py-2">{employee.email}</td>
                    <td className="border px-4 py-2">{employee.phone}</td>
                    <td className="border px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        employee.status === "재직" ? "bg-green-100 text-green-800" : 
                        employee.status === "휴직" ? "bg-amber-100 text-amber-800" : 
                        "bg-red-100 text-red-800"
                      }`}>
                        {employee.status}
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
            총 <strong>{filteredEmployees.length}</strong>명의 직원이 표시됨
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