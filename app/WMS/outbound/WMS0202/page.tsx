"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Package,
  CheckCircle,
  XCircle
} from "lucide-react";

interface PickingItem {
  id: string;
  orderNo: string;
  productCode: string;
  productName: string;
  category: string;
  customer: string;
  quantity: number;
  unit: string;
  location: string;
  status: '대기' | '피킹중' | '완료' | '취소';
  priority: '높음' | '중간' | '낮음';
  remark?: string;
}

export default function PickingInstructionPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  
  // 더미 피킹 지시 데이터
  const pickingItems: PickingItem[] = [
    { 
      id: "PKG-001", 
      orderNo: "ORD-001",
      productCode: "ITEM-001", 
      productName: "스마트폰", 
      category: "전자기기",
      customer: "고객사 A",
      quantity: 10,
      unit: "EA",
      location: "A-01-01",
      status: '대기',
      priority: '높음',
      remark: "긴급 출고"
    },
    { 
      id: "PKG-002", 
      orderNo: "ORD-002",
      productCode: "ITEM-002", 
      productName: "노트북", 
      category: "전자기기",
      customer: "고객사 B",
      quantity: 5,
      unit: "EA",
      location: "B-02-01",
      status: '피킹중',
      priority: '중간',
      remark: "일반 출고"
    },
    { 
      id: "PKG-003", 
      orderNo: "ORD-003",
      productCode: "ITEM-003", 
      productName: "블루투스 이어폰", 
      category: "전자기기",
      customer: "고객사 C",
      quantity: 20,
      unit: "EA",
      location: "C-03-01",
      status: '완료',
      priority: '낮음',
      remark: "일반 출고"
    }
  ];

  // 피킹 지시 필터링
  const filteredItems = pickingItems.filter(item => {
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
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.orderNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 상태별 건수
  const statusCounts = pickingItems.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 상태 텍스트 및 스타일
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "대기":
        return "bg-blue-100 text-blue-800";
      case "피킹중":
        return "bg-yellow-100 text-yellow-800";
      case "완료":
        return "bg-green-100 text-green-800";
      case "취소":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 우선순위 스타일
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "높음":
        return "text-red-600";
      case "중간":
        return "text-yellow-600";
      case "낮음":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const handlePickingStart = (id: string) => {
    // TODO: API 호출하여 피킹 시작 상태로 업데이트
    console.log("피킹 시작:", id);
  };

  const handlePickingComplete = (id: string) => {
    // TODO: API 호출하여 피킹 완료 상태로 업데이트
    console.log("피킹 완료:", id);
  };

  const handlePickingCancel = (id: string) => {
    // TODO: API 호출하여 피킹 취소 상태로 업데이트
    console.log("피킹 취소:", id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">피킹 지시</h1>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">총 지시</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pickingItems.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">대기 상태</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statusCounts['대기'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">피킹중</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts['피킹중'] || 0}건</div>
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
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="주문번호, 품목 코드, 품목명, 고객사 검색..."
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
                <option value="피킹중">피킹중</option>
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
          </div>
        </CardContent>
      </Card>

      {/* 피킹 지시 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>피킹 지시 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">주문번호</th>
                    <th className="py-3 px-4 text-left font-medium">품목코드</th>
                    <th className="py-3 px-4 text-left font-medium">품목명</th>
                    <th className="py-3 px-4 text-left font-medium">카테고리</th>
                    <th className="py-3 px-4 text-left font-medium">고객사</th>
                    <th className="py-3 px-4 text-right font-medium">수량</th>
                    <th className="py-3 px-4 text-center font-medium">단위</th>
                    <th className="py-3 px-4 text-center font-medium">위치</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">우선순위</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                    <th className="py-3 px-4 text-center font-medium">작업</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{item.orderNo}</td>
                      <td className="py-3 px-4">{item.productCode}</td>
                      <td className="py-3 px-4 font-medium">{item.productName}</td>
                      <td className="py-3 px-4">{item.category}</td>
                      <td className="py-3 px-4">{item.customer}</td>
                      <td className="py-3 px-4 text-right">{item.quantity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">{item.unit}</td>
                      <td className="py-3 px-4 text-center">{item.location}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-medium ${getPriorityStyle(item.priority)}`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">{item.remark || "-"}</td>
                      <td className="py-3 px-4 text-center">
                        {item.status === '대기' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePickingStart(item.id)}
                          >
                            <Package className="h-4 w-4 mr-2" />
                            피킹시작
                          </Button>
                        )}
                        {item.status === '피킹중' && (
                          <div className="flex gap-2 justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePickingComplete(item.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              완료
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePickingCancel(item.id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              취소
                            </Button>
                          </div>
                        )}
                      </td>
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
