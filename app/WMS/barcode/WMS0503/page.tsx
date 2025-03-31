"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Save,
  Plus,
  Download,
  Printer,
  Package,
  Boxes,
  Scale,
  Tag
} from "lucide-react";

interface LabelPrintJob {
  id: string;
  templateId: string;
  templateName: string;
  category: string;
  printCount: number;
  status: '대기' | '출력중' | '완료' | '실패';
  printDate: string;
  printBy: string;
  remark?: string;
}

export default function LabelPrintPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  
  // 더미 라벨 출력 데이터
  const printJobs: LabelPrintJob[] = [
    { 
      id: "PRT-001", 
      templateId: "TPL-001",
      templateName: "기본 상품 라벨", 
      category: "상품",
      printCount: 100,
      status: '완료',
      printDate: "2024-03-20",
      printBy: "김이동",
      remark: "신규 상품 입고"
    },
    { 
      id: "PRT-002", 
      templateId: "TPL-002",
      templateName: "QR코드 라벨", 
      category: "배송",
      printCount: 50,
      status: '출력중',
      printDate: "2024-03-21",
      printBy: "이이동",
      remark: "배송 라벨 출력"
    },
    { 
      id: "PRT-003", 
      templateId: "TPL-003",
      templateName: "로고 포함 라벨", 
      category: "브랜드",
      printCount: 200,
      status: '대기',
      printDate: "2024-03-22",
      printBy: "박이동",
      remark: "브랜드 라벨 출력"
    }
  ];

  // 라벨 출력 필터링
  const filteredJobs = printJobs.filter(job => {
    // 카테고리 필터링
    if (selectedCategory !== "all" && job.category !== selectedCategory) {
      return false;
    }
    
    // 상태 필터링
    if (selectedStatus !== "all" && job.status !== selectedStatus) {
      return false;
    }
    
    // 기간 필터링
    if (startDate && job.printDate < startDate) {
      return false;
    }
    if (endDate && job.printDate > endDate) {
      return false;
    }
    
    // 검색어 필터링
    return (
      job.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 상태별 건수
  const statusCounts = printJobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 카테고리별 건수
  const categoryCounts = printJobs.reduce((acc, job) => {
    acc[job.category] = (acc[job.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 상태 텍스트 및 스타일
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "완료":
        return "bg-green-100 text-green-800";
      case "출력중":
        return "bg-blue-100 text-blue-800";
      case "대기":
        return "bg-yellow-100 text-yellow-800";
      case "실패":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleNewPrint = () => {
    // TODO: 새로운 라벨 출력 모달 열기
    console.log("새로운 라벨 출력");
  };

  const handleSave = () => {
    // TODO: API 호출하여 데이터 저장
    console.log("저장");
  };

  const handleExport = () => {
    // TODO: API 호출하여 엑셀 다운로드
    console.log("엑셀 다운로드");
  };

  const handlePrint = () => {
    // TODO: API 호출하여 프린트
    console.log("프린트");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">라벨 출력</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewPrint}>
            <Plus className="h-4 w-4 mr-2" />
            신규 출력
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            저장
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            엑셀
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            프린트
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">총 출력</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{printJobs.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">상품 라벨</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{categoryCounts['상품'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">배송 라벨</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{categoryCounts['배송'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">출력중</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts['출력중'] || 0}건</div>
          </CardContent>
        </Card>
      </div>

      {/* 검색 및 필터 */}
      <Card>
        <CardHeader>
          <CardTitle>검색 및 필터</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="템플릿명, 카테고리 검색..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-3 py-2 border rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">모든 카테고리</option>
              <option value="상품">상품 라벨</option>
              <option value="배송">배송 라벨</option>
              <option value="브랜드">브랜드 라벨</option>
            </select>
            <select 
              className="px-3 py-2 border rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">모든 상태</option>
              <option value="대기">대기</option>
              <option value="출력중">출력중</option>
              <option value="완료">완료</option>
              <option value="실패">실패</option>
            </select>
            <Input
              type="date"
              className="px-3 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              type="date"
              className="px-3 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* 라벨 출력 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>라벨 출력 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">출력번호</th>
                    <th className="py-3 px-4 text-left font-medium">템플릿명</th>
                    <th className="py-3 px-4 text-left font-medium">카테고리</th>
                    <th className="py-3 px-4 text-right font-medium">출력수량</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">출력일자</th>
                    <th className="py-3 px-4 text-left font-medium">출력자</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{job.id}</td>
                      <td className="py-3 px-4 font-medium">{job.templateName}</td>
                      <td className="py-3 px-4">{job.category}</td>
                      <td className="py-3 px-4 text-right">{job.printCount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{job.printDate}</td>
                      <td className="py-3 px-4">{job.printBy}</td>
                      <td className="py-3 px-4">{job.remark || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredJobs.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
