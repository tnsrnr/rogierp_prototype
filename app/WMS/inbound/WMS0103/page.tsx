"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Check,
  X,
  AlertCircle
} from "lucide-react";

interface InboundItem {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  supplier: string;
  expectedQuantity: number;
  actualQuantity: number;
  unit: string;
  inboundDate: string;
  status: '대기' | '검수완료' | '불합격';
  remark?: string;
}

export default function InboundInspectionPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // 더미 입고 검수 데이터
  const inboundItems: InboundItem[] = [
    { 
      id: "INB-001", 
      productCode: "ITEM-001", 
      productName: "스마트폰", 
      category: "전자기기",
      supplier: "삼성전자",
      expectedQuantity: 100,
      actualQuantity: 100,
      unit: "EA",
      inboundDate: "2024-03-20",
      status: '대기',
      remark: "신규 모델 입고"
    },
    { 
      id: "INB-002", 
      productCode: "ITEM-002", 
      productName: "노트북", 
      category: "전자기기",
      supplier: "LG전자",
      expectedQuantity: 50,
      actualQuantity: 48,
      unit: "EA",
      inboundDate: "2024-03-21",
      status: '불합격',
      remark: "수량 부족"
    },
    { 
      id: "INB-003", 
      productCode: "ITEM-003", 
      productName: "블루투스 이어폰", 
      category: "전자기기",
      supplier: "애플",
      expectedQuantity: 200,
      actualQuantity: 200,
      unit: "EA",
      inboundDate: "2024-03-22",
      status: '검수완료',
      remark: "신규 제품"
    }
  ];

  // 입고 검수 필터링
  const filteredItems = inboundItems.filter(item => {
    // 상태 필터링
    if (selectedStatus !== "all" && item.status !== selectedStatus) {
      return false;
    }
    
    // 검색어 필터링
    return (
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 상태별 건수
  const statusCounts = inboundItems.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 상태 텍스트 및 스타일
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "대기":
        return "bg-blue-100 text-blue-800";
      case "검수완료":
        return "bg-green-100 text-green-800";
      case "불합격":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleInspection = (id: string, status: '검수완료' | '불합격') => {
    // TODO: API 호출하여 검수 상태 업데이트
    console.log("검수 처리:", id, status);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">입고 검수</h1>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">총 입고</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inboundItems.length}건</div>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">검수 완료</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts['검수완료'] || 0}건</div>
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
                placeholder="품목 코드, 품목명, 공급업체 검색..."
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
              <option value="검수완료">검수완료</option>
              <option value="불합격">불합격</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* 입고 검수 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>입고 검수 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">입고번호</th>
                    <th className="py-3 px-4 text-left font-medium">품목코드</th>
                    <th className="py-3 px-4 text-left font-medium">품목명</th>
                    <th className="py-3 px-4 text-left font-medium">카테고리</th>
                    <th className="py-3 px-4 text-left font-medium">공급업체</th>
                    <th className="py-3 px-4 text-right font-medium">예정수량</th>
                    <th className="py-3 px-4 text-right font-medium">실제수량</th>
                    <th className="py-3 px-4 text-center font-medium">단위</th>
                    <th className="py-3 px-4 text-center font-medium">입고일자</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                    <th className="py-3 px-4 text-center font-medium">검수</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{item.id}</td>
                      <td className="py-3 px-4">{item.productCode}</td>
                      <td className="py-3 px-4 font-medium">{item.productName}</td>
                      <td className="py-3 px-4">{item.category}</td>
                      <td className="py-3 px-4">{item.supplier}</td>
                      <td className="py-3 px-4 text-right">{item.expectedQuantity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{item.actualQuantity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">{item.unit}</td>
                      <td className="py-3 px-4 text-center">{item.inboundDate}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{item.remark || "-"}</td>
                      <td className="py-3 px-4 text-center">
                        {item.status === '대기' && (
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 hover:text-green-700"
                              onClick={() => handleInspection(item.id, '검수완료')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleInspection(item.id, '불합격')}
                            >
                              <X className="h-4 w-4" />
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