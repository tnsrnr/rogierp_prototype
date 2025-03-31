"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Save,
  Plus,
  Minus
} from "lucide-react";

interface InventoryAdjustment {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  location: string;
  currentQuantity: number;
  adjustQuantity: number;
  unit: string;
  reason: string;
  adjustmentType: '증가' | '감소';
  status: '대기' | '승인' | '반려';
  requestDate: string;
  approver?: string;
  remark?: string;
}

export default function InventoryAdjustmentPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // 더미 재고 조정 데이터
  const adjustments: InventoryAdjustment[] = [
    { 
      id: "ADJ-001", 
      productCode: "ITEM-001", 
      productName: "스마트폰", 
      category: "전자기기",
      location: "A-01-01",
      currentQuantity: 100,
      adjustQuantity: 5,
      unit: "EA",
      reason: "재고실사 차이",
      adjustmentType: '증가',
      status: '대기',
      requestDate: "2024-03-20",
      remark: "실사 결과 반영"
    },
    { 
      id: "ADJ-002", 
      productCode: "ITEM-002", 
      productName: "노트북", 
      category: "전자기기",
      location: "B-02-01",
      currentQuantity: 50,
      adjustQuantity: 2,
      unit: "EA",
      reason: "파손",
      adjustmentType: '감소',
      status: '승인',
      requestDate: "2024-03-21",
      approver: "김승인",
      remark: "운반 중 파손"
    },
    { 
      id: "ADJ-003", 
      productCode: "ITEM-003", 
      productName: "블루투스 이어폰", 
      category: "전자기기",
      location: "C-03-01",
      currentQuantity: 200,
      adjustQuantity: 3,
      unit: "EA",
      reason: "수량 오류",
      adjustmentType: '감소',
      status: '반려',
      requestDate: "2024-03-22",
      approver: "이반려",
      remark: "사유 불충분"
    }
  ];

  // 재고 조정 필터링
  const filteredAdjustments = adjustments.filter(item => {
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
  const statusCounts = adjustments.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 상태 텍스트 및 스타일
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "대기":
        return "bg-blue-100 text-blue-800";
      case "승인":
        return "bg-green-100 text-green-800";
      case "반려":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 조정 유형 스타일
  const getAdjustmentStyle = (type: string) => {
    switch (type) {
      case "증가":
        return "text-green-600";
      case "감소":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const handleNewAdjustment = () => {
    // TODO: 새로운 재고 조정 등록 모달 열기
    console.log("새로운 재고 조정 등록");
  };

  const handleSave = () => {
    // TODO: API 호출하여 데이터 저장
    console.log("저장");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">재고 조정</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewAdjustment}>
            <Plus className="h-4 w-4 mr-2" />
            신규 등록
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            저장
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">총 조정</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adjustments.length}건</div>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">승인</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts['승인'] || 0}건</div>
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
              <option value="승인">승인</option>
              <option value="반려">반려</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* 재고 조정 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>재고 조정 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">조정번호</th>
                    <th className="py-3 px-4 text-left font-medium">품목코드</th>
                    <th className="py-3 px-4 text-left font-medium">품목명</th>
                    <th className="py-3 px-4 text-left font-medium">카테고리</th>
                    <th className="py-3 px-4 text-left font-medium">위치</th>
                    <th className="py-3 px-4 text-right font-medium">현재수량</th>
                    <th className="py-3 px-4 text-right font-medium">조정수량</th>
                    <th className="py-3 px-4 text-center font-medium">단위</th>
                    <th className="py-3 px-4 text-center font-medium">조정유형</th>
                    <th className="py-3 px-4 text-left font-medium">사유</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">요청일자</th>
                    <th className="py-3 px-4 text-left font-medium">승인자</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdjustments.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{item.id}</td>
                      <td className="py-3 px-4">{item.productCode}</td>
                      <td className="py-3 px-4 font-medium">{item.productName}</td>
                      <td className="py-3 px-4">{item.category}</td>
                      <td className="py-3 px-4">{item.location}</td>
                      <td className="py-3 px-4 text-right">{item.currentQuantity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={getAdjustmentStyle(item.adjustmentType)}>
                          {item.adjustmentType === '증가' ? '+' : '-'}
                          {item.adjustQuantity.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{item.unit}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-medium ${getAdjustmentStyle(item.adjustmentType)}`}>
                          {item.adjustmentType === '증가' ? (
                            <Plus className="inline h-4 w-4" />
                          ) : (
                            <Minus className="inline h-4 w-4" />
                          )}
                          {item.adjustmentType}
                        </span>
                      </td>
                      <td className="py-3 px-4">{item.reason}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{item.requestDate}</td>
                      <td className="py-3 px-4">{item.approver || "-"}</td>
                      <td className="py-3 px-4">{item.remark || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredAdjustments.length === 0 && (
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
