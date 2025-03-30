"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter, Printer, Calendar, Search, Mail } from "lucide-react";

export default function PayslipViewPage() {
  const [year, setYear] = useState<string>("2023");
  const [month, setMonth] = useState<string>("06");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // 더미 직원 데이터
  const employees = [
    { id: "EMP001", name: "홍길동", department: "개발팀", position: "과장" },
    { id: "EMP002", name: "김철수", department: "마케팅팀", position: "대리" },
    { id: "EMP003", name: "이영희", department: "인사팀", position: "부장" },
    { id: "EMP004", name: "박민수", department: "영업팀", position: "사원" },
    { id: "EMP005", name: "정수연", department: "개발팀", position: "대리" },
    { id: "EMP006", name: "송미란", department: "회계팀", position: "과장" },
    { id: "EMP007", name: "최지수", department: "회계팀", position: "대리" },
    { id: "EMP008", name: "한승우", department: "개발팀", position: "차장" },
  ];

  // 더미 급여 내역 데이터
  const payslipData = {
    employee: {
      id: "EMP001",
      name: "홍길동",
      department: "개발팀",
      position: "과장",
      joinDate: "2020-03-15",
      bankAccount: "국민은행 123-45-6789",
      paymentDate: "2023-06-25"
    },
    income: [
      { name: "기본급", amount: 3500000 },
      { name: "초과근무수당", amount: 250000 },
      { name: "식대", amount: 200000 },
      { name: "교통비", amount: 100000 }
    ],
    deduction: [
      { name: "소득세", amount: 150000 },
      { name: "국민연금", amount: 120000 },
      { name: "건강보험", amount: 90000 },
      { name: "고용보험", amount: 40000 },
      { name: "장기요양보험", amount: 30000 }
    ]
  };

  // 검색 필터링
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // 급여 합계 계산
  const totalIncome = payslipData.income.reduce((sum, item) => sum + item.amount, 0);
  const totalDeduction = payslipData.deduction.reduce((sum, item) => sum + item.amount, 0);
  const netPay = totalIncome - totalDeduction;
  
  // 숫자 포맷팅 함수
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">급여 명세서 조회</h1>
        <div className="flex gap-2">
          <div className="flex items-center border rounded-md">
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
          <div className="flex items-center border rounded-md">
            <select 
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="px-3 py-1 rounded-md focus:outline-none"
            >
              <option value="01">1월</option>
              <option value="02">2월</option>
              <option value="03">3월</option>
              <option value="04">4월</option>
              <option value="05">5월</option>
              <option value="06">6월</option>
              <option value="07">7월</option>
              <option value="08">8월</option>
              <option value="09">9월</option>
              <option value="10">10월</option>
              <option value="11">11월</option>
              <option value="12">12월</option>
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
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            이메일 전송
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 직원 선택 및 검색 */}
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <div className="flex flex-col gap-4">
                <CardTitle>직원 목록</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="이름, 사번, 부서 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-4 py-2 text-sm rounded-md border w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-y-auto max-h-96">
                <ul className="space-y-2">
                  {filteredEmployees.map((employee) => (
                    <li key={employee.id}>
                      <Button
                        variant={selectedEmployee === employee.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedEmployee(employee.id)}
                      >
                        <div className="text-left">
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-xs text-muted-foreground">{employee.department} / {employee.position}</div>
                        </div>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 급여 명세서 */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{year}년 {month}월 급여 명세서</CardTitle>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 직원 정보 */}
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted px-4 py-2 font-medium">직원 정보</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">사번</p>
                      <p className="font-medium">{payslipData.employee.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">이름</p>
                      <p className="font-medium">{payslipData.employee.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">부서/직급</p>
                      <p className="font-medium">{payslipData.employee.department} / {payslipData.employee.position}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">입사일</p>
                      <p className="font-medium">{payslipData.employee.joinDate}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">계좌정보</p>
                      <p className="font-medium">{payslipData.employee.bankAccount}</p>
                    </div>
                    <div className="md:col-span-3">
                      <p className="text-sm text-muted-foreground">지급일</p>
                      <p className="font-medium">{payslipData.employee.paymentDate}</p>
                    </div>
                  </div>
                </div>

                {/* 급여 내역 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 지급 내역 */}
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-muted px-4 py-2 font-medium">지급 내역</div>
                    <div className="p-4">
                      <table className="w-full">
                        <tbody>
                          {payslipData.income.map((item, index) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="py-2">{item.name}</td>
                              <td className="py-2 text-right">{formatNumber(item.amount)}원</td>
                            </tr>
                          ))}
                          <tr className="bg-primary/5 font-semibold">
                            <td className="py-2">지급 합계</td>
                            <td className="py-2 text-right">{formatNumber(totalIncome)}원</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 공제 내역 */}
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-muted px-4 py-2 font-medium">공제 내역</div>
                    <div className="p-4">
                      <table className="w-full">
                        <tbody>
                          {payslipData.deduction.map((item, index) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="py-2">{item.name}</td>
                              <td className="py-2 text-right">{formatNumber(item.amount)}원</td>
                            </tr>
                          ))}
                          <tr className="bg-primary/5 font-semibold">
                            <td className="py-2">공제 합계</td>
                            <td className="py-2 text-right">{formatNumber(totalDeduction)}원</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* 실 지급액 */}
                <div className="border rounded-md overflow-hidden bg-primary/10">
                  <div className="p-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold">실 지급액</h3>
                    <p className="text-xl font-bold">{formatNumber(netPay)}원</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                PDF 다운로드
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                인쇄하기
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 