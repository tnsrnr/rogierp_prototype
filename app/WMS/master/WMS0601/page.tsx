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

interface ProductMaster {
  id: string;
  code: string;
  name: string;
  category: string;
  unit: string;
  standardUnit: string;
  conversionRate: number;
  barcode: string;
  status: '사용' | '중지';
  createDate: string;
  createBy: string;
  remark?: string;
}

export default function ProductMasterPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // 더미 품목 마스터 데이터
  const products: ProductMaster[] = [
    { 
      id: "PRD-001", 
      code: "P001",
      name: "노트북", 
      category: "전자제품",
      unit: "EA",
      standardUnit: "EA",
      conversionRate: 1,
      barcode: "8801234567890",
      status: '사용',
      createDate: "2024-03-20",
      createBy: "김이동",
      remark: "고성능 노트북"
    },
    { 
      id: "PRD-002", 
      code: "P002",
      name: "마우스", 
      category: "주변기기",
      unit: "EA",
      standardUnit: "BOX",
      conversionRate: 10,
      barcode: "8801234567891",
      status: '사용',
      createDate: "2024-03-21",
      createBy: "이이동",
      remark: "무선 마우스"
    },
    { 
      id: "PRD-003", 
      code: "P003",
      name: "키보드", 
      category: "주변기기",
      unit: "EA",
      standardUnit: "BOX",
      conversionRate: 5,
      barcode: "8801234567892",
      status: '중지',
      createDate: "2024-03-22",
      createBy: "박이동",
      remark: "기계식 키보드"
    }
  ];

  // 품목 마스터 필터링
  const filteredProducts = products.filter(product => {
    // 카테고리 필터링
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }
    
    // 상태 필터링
    if (selectedStatus !== "all" && product.status !== selectedStatus) {
      return false;
    }
    
    // 검색어 필터링
    return (
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.includes(searchTerm)
    );
  });

  // 상태별 건수
  const statusCounts = products.reduce((acc, product) => {
    acc[product.status] = (acc[product.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 카테고리별 건수
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 상태 텍스트 및 스타일
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "사용":
        return "bg-green-100 text-green-800";
      case "중지":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleNewProduct = () => {
    // TODO: 새로운 품목 등록 모달 열기
    console.log("새로운 품목 등록");
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
        <h1 className="text-2xl font-bold">품목 마스터</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewProduct}>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">총 품목</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">전자제품</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{categoryCounts['전자제품'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">주변기기</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{categoryCounts['주변기기'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">사용중</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts['사용'] || 0}건</div>
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
                placeholder="품목코드, 품목명, 바코드 검색..."
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
              <option value="전자제품">전자제품</option>
              <option value="주변기기">주변기기</option>
              <option value="소모품">소모품</option>
            </select>
            <select 
              className="px-3 py-2 border rounded-md"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">모든 상태</option>
              <option value="사용">사용</option>
              <option value="중지">중지</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* 품목 마스터 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>품목 마스터 목록</CardTitle>
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
                    <th className="py-3 px-4 text-left font-medium">단위</th>
                    <th className="py-3 px-4 text-left font-medium">표준단위</th>
                    <th className="py-3 px-4 text-right font-medium">환산율</th>
                    <th className="py-3 px-4 text-left font-medium">바코드</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">등록일자</th>
                    <th className="py-3 px-4 text-left font-medium">등록자</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{product.code}</td>
                      <td className="py-3 px-4 font-medium">{product.name}</td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">{product.unit}</td>
                      <td className="py-3 px-4">{product.standardUnit}</td>
                      <td className="py-3 px-4 text-right">{product.conversionRate}</td>
                      <td className="py-3 px-4">{product.barcode}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(product.status)}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{product.createDate}</td>
                      <td className="py-3 px-4">{product.createBy}</td>
                      <td className="py-3 px-4">{product.remark || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredProducts.length === 0 && (
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