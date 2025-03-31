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
  ArrowRight,
  AlertCircle
} from "lucide-react";

interface PickingZoneReplenishment {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  fromLocation: string;
  toLocation: string;
  currentQuantity: number;
  minQuantity: number;
  maxQuantity: number;
  replenishQuantity: number;
  unit: string;
  status: '대기' | '이동중' | '완료' | '취소';
  priority: '높음' | '중간' | '낮음';
  replenishDate: string;
  replenishBy?: string;
  remark?: string;
}

export default function PickingZoneReplenishmentPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  
  // 더미 피킹존 보충 데이터
  const replenishmentItems: PickingZoneReplenishment[] = [
    { 
      id: "RPL-001", 
      productCode: "ITEM-001", 
      productName: "스마트폰", 
      category: "전자기기",
      fromLocation: "A-01-01",
      toLocation: "P-01-01",
      currentQuantity: 10,
      minQuantity: 20,
      maxQuantity: 50,
      replenishQuantity: 40,
      unit: "EA",
      status: '대기',
      priority: '높음',
      replenishDate: "2024-03-20",
      remark: "피킹존 재고 부족"
    },
    { 
      id: "RPL-002", 
      productCode: "ITEM-002", 
      productName: "노트북", 
      category: "전자기기",
      fromLocation: "B-02-01",
      toLocation: "P-02-01",
      currentQuantity: 15,
      minQuantity: 10,
      maxQuantity: 30,
      replenishQuantity: 15,
      unit: "EA",
      status: '이동중',
      priority: '중간',
      replenishDate: "2024-03-21",
      replenishBy: "김이동",
      remark: "정상 보충"
    },
    { 
      id: "RPL-003", 
      productCode: "ITEM-003", 
      productName: "블루투스 이어폰", 
      category: "전자기기",
      fromLocation: "C-03-01",
      toLocation: "P-03-01",
      currentQuantity: 5,
      minQuantity: 15,
      maxQuantity: 40,
      replenishQuantity: 35,
      unit: "EA",
      status: '완료',
      priority: '높음',
      replenishDate: "2024-03-22",
      replenishBy: "이이동",
      remark: "긴급 보충"
    }
  ];

  // 피킹존 보충 필터링
  const filteredItems = replenishmentItems.filter(item => {
    // 상태 필터링
    if (selectedStatus !== "all" && item.status !== selectedStatus) {
      return false;
    }
    
    // 우선순위 필터링
    if (selectedPriority !== "all" && item.priority !== selectedPriority) {
      return false;
    }
    
    // 검색어 필터링
    return (
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fromLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.toLocation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 상태별 건수
  const statusCounts = replenishmentItems.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 우선순위별 건수
  const priorityCounts = replenishmentItems.reduce((acc, item) => {
    acc[item.priority] = (acc[item.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 상태 텍스트 및 스타일
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "대기":
        return "bg-blue-100 text-blue-800";
      case "이동중":
        return "bg-yellow-100 text-yellow-800";
      case "완료":
        return "bg-green-100 text-green-800";
      case "취소":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 우선순위 텍스트 및 스타일
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "높음":
        return "bg-red-100 text-red-800";
      case "중간":
        return "bg-yellow-100 text-yellow-800";
      case "낮음":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleNewReplenishment = () => {
    // TODO: 새로운 피킹존 보충 등록 모달 열기
    console.log("새로운 피킹존 보충 등록");
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
        <h1 className="text-2xl font-bold">피킹존 보충</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewReplenishment}>
            <Plus className="h-4 w-4 mr-2" />
            신규 등록
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
            <CardTitle className="text-sm font-medium text-muted-foreground">총 보충</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{replenishmentItems.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">대기</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statusCounts['대기'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">이동중</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts['이동중'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">완료</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts['완료'] || 0}건</div>
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
                placeholder="품목 코드, 품목명, 출발/도착 위치 검색..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-3 py-2 border rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">모든 상태</option>
              <option value="대기">대기</option>
              <option value="이동중">이동중</option>
              <option value="완료">완료</option>
              <option value="취소">취소</option>
            </select>
            <select 
              className="px-3 py-2 border rounded-md"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="all">모든 우선순위</option>
              <option value="높음">높음</option>
              <option value="중간">중간</option>
              <option value="낮음">낮음</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* 피킹존 보충 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>피킹존 보충 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">보충번호</th>
                    <th className="py-3 px-4 text-left font-medium">품목코드</th>
                    <th className="py-3 px-4 text-left font-medium">품목명</th>
                    <th className="py-3 px-4 text-left font-medium">카테고리</th>
                    <th className="py-3 px-4 text-left font-medium">출발위치</th>
                    <th className="py-3 px-4 text-center font-medium">이동</th>
                    <th className="py-3 px-4 text-left font-medium">도착위치</th>
                    <th className="py-3 px-4 text-right font-medium">현재수량</th>
                    <th className="py-3 px-4 text-right font-medium">최소수량</th>
                    <th className="py-3 px-4 text-right font-medium">최대수량</th>
                    <th className="py-3 px-4 text-right font-medium">보충수량</th>
                    <th className="py-3 px-4 text-center font-medium">단위</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">우선순위</th>
                    <th className="py-3 px-4 text-center font-medium">보충일자</th>
                    <th className="py-3 px-4 text-left font-medium">보충자</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{item.id}</td>
                      <td className="py-3 px-4">{item.productCode}</td>
                      <td className="py-3 px-4 font-medium">{item.productName}</td>
                      <td className="py-3 px-4">{item.category}</td>
                      <td className="py-3 px-4">{item.fromLocation}</td>
                      <td className="py-3 px-4 text-center">
                        <ArrowRight className="h-4 w-4 mx-auto text-muted-foreground" />
                      </td>
                      <td className="py-3 px-4">{item.toLocation}</td>
                      <td className="py-3 px-4 text-right">{item.currentQuantity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{item.minQuantity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{item.maxQuantity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{item.replenishQuantity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">{item.unit}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityStyle(item.priority)}`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{item.replenishDate}</td>
                      <td className="py-3 px-4">{item.replenishBy || "-"}</td>
                      <td className="py-3 px-4">{item.remark || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredItems.length === 0 && (
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
