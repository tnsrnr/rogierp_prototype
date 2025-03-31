"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Download,
  Printer
} from "lucide-react";

interface InventoryItem {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  location: string;
  quantity: number;
  unit: string;
  minStock: number;
  maxStock: number;
  status: '정상' | '부족' | '과다';
  lastUpdated: string;
  remark?: string;
}

export default function InventoryStatusPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // 더미 재고 데이터
  const inventoryItems: InventoryItem[] = [
    { 
      id: "INV-001", 
      productCode: "ITEM-001", 
      productName: "스마트폰", 
      category: "전자기기",
      location: "A-01-01",
      quantity: 100,
      unit: "EA",
      minStock: 50,
      maxStock: 200,
      status: '정상',
      lastUpdated: "2024-03-20",
      remark: "신규 모델"
    },
    { 
      id: "INV-002", 
      productCode: "ITEM-002", 
      productName: "노트북", 
      category: "전자기기",
      location: "B-02-01",
      quantity: 20,
      unit: "EA",
      minStock: 30,
      maxStock: 100,
      status: '부족',
      lastUpdated: "2024-03-21",
      remark: "재고 부족"
    },
    { 
      id: "INV-003", 
      productCode: "ITEM-003", 
      productName: "블루투스 이어폰", 
      category: "전자기기",
      location: "C-03-01",
      quantity: 500,
      unit: "EA",
      minStock: 100,
      maxStock: 300,
      status: '과다',
      lastUpdated: "2024-03-22",
      remark: "재고 과다"
    }
  ];

  // 재고 현황 필터링
  const filteredItems = inventoryItems.filter(item => {
    // 카테고리 필터링
    if (selectedCategory !== "all" && item.category !== selectedCategory) {
      return false;
    }
    
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
  const statusCounts = inventoryItems.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 상태 텍스트 및 스타일
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "정상":
        return "bg-green-100 text-green-800";
      case "부족":
        return "bg-red-100 text-red-800";
      case "과다":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
        <h1 className="text-2xl font-bold">재고 현황 조회</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            엑셀 다운로드
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            프린트
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">총 품목</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">재고 부족</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{statusCounts['부족'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">재고 과다</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts['과다'] || 0}건</div>
          </CardContent>
        </Card>
      </div>

      {/* 검색 및 필터 */}
      <Card>
        <CardHeader>
          <CardTitle>검색 및 필터</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">모든 카테고리</option>
                <option value="전자기기">전자기기</option>
                <option value="의류">의류</option>
                <option value="식품">식품</option>
              </select>
              <select 
                className="px-3 py-2 border rounded-md"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">모든 상태</option>
                <option value="정상">정상</option>
                <option value="부족">부족</option>
                <option value="과다">과다</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 재고 현황 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>재고 현황 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">품목코드</th>
                    <th className="py-3 px-4 text-left font-medium">품목명</th>
                    <th className="py-3 px-4 text-left font-medium">카테고리</th>
                    <th className="py-3 px-4 text-left font-medium">위치</th>
                    <th className="py-3 px-4 text-right font-medium">현재수량</th>
                    <th className="py-3 px-4 text-right font-medium">최소수량</th>
                    <th className="py-3 px-4 text-right font-medium">최대수량</th>
                    <th className="py-3 px-4 text-center font-medium">단위</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">최종수정일</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{item.productCode}</td>
                      <td className="py-3 px-4 font-medium">{item.productName}</td>
                      <td className="py-3 px-4">{item.category}</td>
                      <td className="py-3 px-4">{item.location}</td>
                      <td className="py-3 px-4 text-right">{item.quantity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{item.minStock.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{item.maxStock.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">{item.unit}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{item.lastUpdated}</td>
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
