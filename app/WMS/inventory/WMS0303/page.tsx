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
  Printer
} from "lucide-react";

interface InventoryCount {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  location: string;
  systemQuantity: number;
  actualQuantity: number;
  unit: string;
  difference: number;
  status: '대기' | '실사완료' | '조정완료' | '취소';
  countDate: string;
  counter?: string;
  remark?: string;
}

export default function InventoryCountPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // 더미 재고 실사 데이터
  const countItems: InventoryCount[] = [
    { 
      id: "CNT-001", 
      productCode: "ITEM-001", 
      productName: "스마트폰", 
      category: "전자기기",
      location: "A-01-01",
      systemQuantity: 100,
      actualQuantity: 98,
      unit: "EA",
      difference: -2,
      status: '대기',
      countDate: "2024-03-20",
      remark: "분실"
    },
    { 
      id: "CNT-002", 
      productCode: "ITEM-002", 
      productName: "노트북", 
      category: "전자기기",
      location: "B-02-01",
      systemQuantity: 50,
      actualQuantity: 50,
      unit: "EA",
      difference: 0,
      status: '실사완료',
      countDate: "2024-03-21",
      counter: "김실사",
      remark: "정상"
    },
    { 
      id: "CNT-003", 
      productCode: "ITEM-003", 
      productName: "블루투스 이어폰", 
      category: "전자기기",
      location: "C-03-01",
      systemQuantity: 200,
      actualQuantity: 205,
      unit: "EA",
      difference: 5,
      status: '조정완료',
      countDate: "2024-03-22",
      counter: "이실사",
      remark: "오입고"
    }
  ];

  // 재고 실사 필터링
  const filteredItems = countItems.filter(item => {
    // 상태 필터링
    if (selectedStatus !== "all" && item.status !== selectedStatus) {
      return false;
    }
    
    // 검색어 필터링
    return (
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 상태별 건수
  const statusCounts = countItems.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 상태 텍스트 및 스타일
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "대기":
        return "bg-blue-100 text-blue-800";
      case "실사완료":
        return "bg-yellow-100 text-yellow-800";
      case "조정완료":
        return "bg-green-100 text-green-800";
      case "취소":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 차이 수량 스타일
  const getDifferenceStyle = (difference: number) => {
    if (difference > 0) {
      return "text-green-600";
    } else if (difference < 0) {
      return "text-red-600";
    }
    return "text-gray-600";
  };

  const handleNewCount = () => {
    // TODO: 새로운 재고 실사 등록 모달 열기
    console.log("새로운 재고 실사 등록");
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
        <h1 className="text-2xl font-bold">재고 실사</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewCount}>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">총 실사</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countItems.length}건</div>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">실사완료</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts['실사완료'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">조정완료</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts['조정완료'] || 0}건</div>
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
                placeholder="품목 코드, 품목명, 위치 검색..."
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
              <option value="실사완료">실사완료</option>
              <option value="조정완료">조정완료</option>
              <option value="취소">취소</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* 재고 실사 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>재고 실사 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">실사번호</th>
                    <th className="py-3 px-4 text-left font-medium">품목코드</th>
                    <th className="py-3 px-4 text-left font-medium">품목명</th>
                    <th className="py-3 px-4 text-left font-medium">카테고리</th>
                    <th className="py-3 px-4 text-left font-medium">위치</th>
                    <th className="py-3 px-4 text-right font-medium">시스템수량</th>
                    <th className="py-3 px-4 text-right font-medium">실제수량</th>
                    <th className="py-3 px-4 text-right font-medium">차이</th>
                    <th className="py-3 px-4 text-center font-medium">단위</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">실사일자</th>
                    <th className="py-3 px-4 text-left font-medium">실사자</th>
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
                      <td className="py-3 px-4">{item.location}</td>
                      <td className="py-3 px-4 text-right">{item.systemQuantity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{item.actualQuantity.toLocaleString()}</td>
                      <td className={`py-3 px-4 text-right ${getDifferenceStyle(item.difference)}`}>
                        {item.difference > 0 ? '+' : ''}{item.difference.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">{item.unit}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{item.countDate}</td>
                      <td className="py-3 px-4">{item.counter || "-"}</td>
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
