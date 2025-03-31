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

interface SerialItem {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  location: string;
  serialNo: string;
  lotNo: string;
  status: '입고' | '출고' | '반품' | '폐기';
  inboundDate: string;
  outboundDate?: string;
  customer?: string;
  remark?: string;
}

export default function SerialManagementPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // 더미 시리얼 데이터
  const serialItems: SerialItem[] = [
    { 
      id: "SER-001", 
      productCode: "ITEM-001", 
      productName: "스마트폰", 
      category: "전자기기",
      location: "A-01-01",
      serialNo: "SN202403200001",
      lotNo: "L2024032001",
      status: '입고',
      inboundDate: "2024-03-20",
      remark: "신규 입고"
    },
    { 
      id: "SER-002", 
      productCode: "ITEM-002", 
      productName: "노트북", 
      category: "전자기기",
      location: "B-02-01",
      serialNo: "SN202403200002",
      lotNo: "L2024032002",
      status: '출고',
      inboundDate: "2024-03-19",
      outboundDate: "2024-03-21",
      customer: "고객사 A",
      remark: "정상 출고"
    },
    { 
      id: "SER-003", 
      productCode: "ITEM-003", 
      productName: "블루투스 이어폰", 
      category: "전자기기",
      location: "C-03-01",
      serialNo: "SN202403200003",
      lotNo: "L2024032003",
      status: '반품',
      inboundDate: "2024-03-18",
      outboundDate: "2024-03-20",
      customer: "고객사 B",
      remark: "불량 반품"
    }
  ];

  // 시리얼 필터링
  const filteredItems = serialItems.filter(item => {
    // 상태 필터링
    if (selectedStatus !== "all" && item.status !== selectedStatus) {
      return false;
    }
    
    // 검색어 필터링
    return (
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lotNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 상태별 건수
  const statusCounts = serialItems.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 상태 텍스트 및 스타일
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "입고":
        return "bg-blue-100 text-blue-800";
      case "출고":
        return "bg-green-100 text-green-800";
      case "반품":
        return "bg-yellow-100 text-yellow-800";
      case "폐기":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleNewSerial = () => {
    // TODO: 새로운 시리얼 등록 모달 열기
    console.log("새로운 시리얼 등록");
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
        <h1 className="text-2xl font-bold">시리얼번호 관리</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewSerial}>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">총 시리얼</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serialItems.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">입고</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statusCounts['입고'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">출고</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts['출고'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">반품</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts['반품'] || 0}건</div>
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
                placeholder="품목 코드, 품목명, 시리얼번호, 로트번호 검색..."
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
              <option value="입고">입고</option>
              <option value="출고">출고</option>
              <option value="반품">반품</option>
              <option value="폐기">폐기</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* 시리얼 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>시리얼 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">시리얼번호</th>
                    <th className="py-3 px-4 text-left font-medium">품목코드</th>
                    <th className="py-3 px-4 text-left font-medium">품목명</th>
                    <th className="py-3 px-4 text-left font-medium">카테고리</th>
                    <th className="py-3 px-4 text-left font-medium">위치</th>
                    <th className="py-3 px-4 text-left font-medium">로트번호</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">입고일자</th>
                    <th className="py-3 px-4 text-center font-medium">출고일자</th>
                    <th className="py-3 px-4 text-left font-medium">고객사</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{item.serialNo}</td>
                      <td className="py-3 px-4">{item.productCode}</td>
                      <td className="py-3 px-4 font-medium">{item.productName}</td>
                      <td className="py-3 px-4">{item.category}</td>
                      <td className="py-3 px-4">{item.location}</td>
                      <td className="py-3 px-4">{item.lotNo}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{item.inboundDate}</td>
                      <td className="py-3 px-4 text-center">{item.outboundDate || "-"}</td>
                      <td className="py-3 px-4">{item.customer || "-"}</td>
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
