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
  Barcode
} from "lucide-react";

interface BarcodeItem {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  barcodeType: '1D' | '2D';
  barcodeFormat: string;
  barcodeData: string;
  quantity: number;
  unit: string;
  status: '사용' | '미사용' | '폐기';
  createDate: string;
  createBy: string;
  remark?: string;
}

export default function BarcodeManagementPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // 더미 바코드 데이터
  const barcodeItems: BarcodeItem[] = [
    { 
      id: "BC-001", 
      productCode: "ITEM-001", 
      productName: "스마트폰", 
      category: "전자기기",
      barcodeType: '1D',
      barcodeFormat: "CODE128",
      barcodeData: "8801234567890",
      quantity: 100,
      unit: "EA",
      status: '사용',
      createDate: "2024-03-20",
      createBy: "김이동",
      remark: "신규 생성"
    },
    { 
      id: "BC-002", 
      productCode: "ITEM-002", 
      productName: "노트북", 
      category: "전자기기",
      barcodeType: '2D',
      barcodeFormat: "QR",
      barcodeData: "ITEM-002-20240321",
      quantity: 50,
      unit: "EA",
      status: '미사용',
      createDate: "2024-03-21",
      createBy: "이이동",
      remark: "대량 생성"
    },
    { 
      id: "BC-003", 
      productCode: "ITEM-003", 
      productName: "블루투스 이어폰", 
      category: "전자기기",
      barcodeType: '1D',
      barcodeFormat: "CODE39",
      barcodeData: "ITEM-003-001",
      quantity: 200,
      unit: "EA",
      status: '폐기',
      createDate: "2024-03-22",
      createBy: "박이동",
      remark: "오류 수정"
    }
  ];

  // 바코드 필터링
  const filteredItems = barcodeItems.filter(item => {
    // 바코드 유형 필터링
    if (selectedType !== "all" && item.barcodeType !== selectedType) {
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
      item.barcodeData.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 상태별 건수
  const statusCounts = barcodeItems.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 바코드 유형별 건수
  const typeCounts = barcodeItems.reduce((acc, item) => {
    acc[item.barcodeType] = (acc[item.barcodeType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 상태 텍스트 및 스타일
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "사용":
        return "bg-green-100 text-green-800";
      case "미사용":
        return "bg-blue-100 text-blue-800";
      case "폐기":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 바코드 유형 텍스트 및 스타일
  const getTypeStyle = (type: string) => {
    switch (type) {
      case "1D":
        return "bg-purple-100 text-purple-800";
      case "2D":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleNewBarcode = () => {
    // TODO: 새로운 바코드 생성 모달 열기
    console.log("새로운 바코드 생성");
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
        <h1 className="text-2xl font-bold">바코드 생성/관리</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewBarcode}>
            <Plus className="h-4 w-4 mr-2" />
            신규 생성
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
            <CardTitle className="text-sm font-medium text-muted-foreground">총 바코드</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{barcodeItems.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">1D 바코드</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{typeCounts['1D'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">2D 바코드</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{typeCounts['2D'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">미사용</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statusCounts['미사용'] || 0}건</div>
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
                placeholder="품목 코드, 품목명, 바코드 데이터 검색..."
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
              <option value="all">모든 바코드 유형</option>
              <option value="1D">1D 바코드</option>
              <option value="2D">2D 바코드</option>
            </select>
            <select 
              className="px-3 py-2 border rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">모든 상태</option>
              <option value="사용">사용</option>
              <option value="미사용">미사용</option>
              <option value="폐기">폐기</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* 바코드 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>바코드 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">바코드번호</th>
                    <th className="py-3 px-4 text-left font-medium">품목코드</th>
                    <th className="py-3 px-4 text-left font-medium">품목명</th>
                    <th className="py-3 px-4 text-left font-medium">카테고리</th>
                    <th className="py-3 px-4 text-center font-medium">바코드유형</th>
                    <th className="py-3 px-4 text-center font-medium">바코드포맷</th>
                    <th className="py-3 px-4 text-left font-medium">바코드데이터</th>
                    <th className="py-3 px-4 text-right font-medium">수량</th>
                    <th className="py-3 px-4 text-center font-medium">단위</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">생성일자</th>
                    <th className="py-3 px-4 text-left font-medium">생성자</th>
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
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeStyle(item.barcodeType)}`}>
                          {item.barcodeType}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{item.barcodeFormat}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Barcode className="h-4 w-4 text-muted-foreground" />
                          {item.barcodeData}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">{item.quantity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">{item.unit}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{item.createDate}</td>
                      <td className="py-3 px-4">{item.createBy}</td>
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
