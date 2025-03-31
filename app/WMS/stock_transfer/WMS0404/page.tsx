"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Download,
  Printer,
  ArrowRight
} from "lucide-react";

interface StockTransferHistory {
  id: string;
  transferType: '로케이션' | '창고' | '피킹존';
  productCode: string;
  productName: string;
  category: string;
  fromWarehouse: string;
  fromLocation: string;
  toWarehouse: string;
  toLocation: string;
  quantity: number;
  unit: string;
  status: '완료' | '취소';
  transferDate: string;
  transferBy: string;
  remark?: string;
}

export default function StockTransferHistoryPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  
  // 더미 재고 이동 내역 데이터
  const historyItems: StockTransferHistory[] = [
    { 
      id: "HST-001", 
      transferType: '로케이션',
      productCode: "ITEM-001", 
      productName: "스마트폰", 
      category: "전자기기",
      fromWarehouse: "본사창고",
      fromLocation: "A-01-01",
      toWarehouse: "본사창고",
      toLocation: "A-01-02",
      quantity: 50,
      unit: "EA",
      status: '완료',
      transferDate: "2024-03-20",
      transferBy: "김이동",
      remark: "보관 위치 변경"
    },
    { 
      id: "HST-002", 
      transferType: '창고',
      productCode: "ITEM-002", 
      productName: "노트북", 
      category: "전자기기",
      fromWarehouse: "지점창고",
      fromLocation: "B-02-01",
      toWarehouse: "본사창고",
      toLocation: "A-02-01",
      quantity: 20,
      unit: "EA",
      status: '완료',
      transferDate: "2024-03-21",
      transferBy: "이이동",
      remark: "본사 창고 이동"
    },
    { 
      id: "HST-003", 
      transferType: '피킹존',
      productCode: "ITEM-003", 
      productName: "블루투스 이어폰", 
      category: "전자기기",
      fromWarehouse: "본사창고",
      fromLocation: "A-03-01",
      toWarehouse: "본사창고",
      toLocation: "P-03-01",
      quantity: 100,
      unit: "EA",
      status: '완료',
      transferDate: "2024-03-22",
      transferBy: "박이동",
      remark: "피킹존 보충"
    }
  ];

  // 재고 이동 내역 필터링
  const filteredItems = historyItems.filter(item => {
    // 이동 유형 필터링
    if (selectedType !== "all" && item.transferType !== selectedType) {
      return false;
    }
    
    // 기간 필터링
    if (startDate && item.transferDate < startDate) {
      return false;
    }
    if (endDate && item.transferDate > endDate) {
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

  // 이동 유형별 건수
  const typeCounts = historyItems.reduce((acc, item) => {
    acc[item.transferType] = (acc[item.transferType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 이동 유형 텍스트 및 스타일
  const getTypeStyle = (type: string) => {
    switch (type) {
      case "로케이션":
        return "bg-blue-100 text-blue-800";
      case "창고":
        return "bg-green-100 text-green-800";
      case "피킹존":
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
        <h1 className="text-2xl font-bold">재고 이동 내역 조회</h1>
        <div className="flex gap-2">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">총 이동</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{historyItems.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">로케이션 이동</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{typeCounts['로케이션'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">창고 이동</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{typeCounts['창고'] || 0}건</div>
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
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">모든 이동 유형</option>
              <option value="로케이션">로케이션 이동</option>
              <option value="창고">창고 이동</option>
              <option value="피킹존">피킹존 이동</option>
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

      {/* 재고 이동 내역 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>재고 이동 내역 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">이동번호</th>
                    <th className="py-3 px-4 text-left font-medium">이동유형</th>
                    <th className="py-3 px-4 text-left font-medium">품목코드</th>
                    <th className="py-3 px-4 text-left font-medium">품목명</th>
                    <th className="py-3 px-4 text-left font-medium">카테고리</th>
                    <th className="py-3 px-4 text-left font-medium">출발창고</th>
                    <th className="py-3 px-4 text-left font-medium">출발위치</th>
                    <th className="py-3 px-4 text-center font-medium">이동</th>
                    <th className="py-3 px-4 text-left font-medium">도착창고</th>
                    <th className="py-3 px-4 text-left font-medium">도착위치</th>
                    <th className="py-3 px-4 text-right font-medium">수량</th>
                    <th className="py-3 px-4 text-center font-medium">단위</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">이동일자</th>
                    <th className="py-3 px-4 text-left font-medium">이동자</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{item.id}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeStyle(item.transferType)}`}>
                          {item.transferType}
                        </span>
                      </td>
                      <td className="py-3 px-4">{item.productCode}</td>
                      <td className="py-3 px-4 font-medium">{item.productName}</td>
                      <td className="py-3 px-4">{item.category}</td>
                      <td className="py-3 px-4">{item.fromWarehouse}</td>
                      <td className="py-3 px-4">{item.fromLocation}</td>
                      <td className="py-3 px-4 text-center">
                        <ArrowRight className="h-4 w-4 mx-auto text-muted-foreground" />
                      </td>
                      <td className="py-3 px-4">{item.toWarehouse}</td>
                      <td className="py-3 px-4">{item.toLocation}</td>
                      <td className="py-3 px-4 text-right">{item.quantity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">{item.unit}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === '완료' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{item.transferDate}</td>
                      <td className="py-3 px-4">{item.transferBy}</td>
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
