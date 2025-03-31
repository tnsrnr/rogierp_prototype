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

interface Unit {
  id: string;
  code: string;
  name: string;
  baseUnit: string;
  conversionRate: number;
  status: '사용' | '중지';
  createDate: string;
  createBy: string;
  remark?: string;
}

export default function UnitManagementPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // 더미 단위 데이터
  const units: Unit[] = [
    { 
      id: "UNIT-001", 
      code: "EA",
      name: "개", 
      baseUnit: "EA",
      conversionRate: 1,
      status: '사용',
      createDate: "2024-03-20",
      createBy: "관리자",
      remark: "기본 단위"
    },
    { 
      id: "UNIT-002", 
      code: "BOX",
      name: "박스", 
      baseUnit: "EA",
      conversionRate: 12,
      status: '사용',
      createDate: "2024-03-20",
      createBy: "관리자",
      remark: "1박스 = 12개"
    },
    { 
      id: "UNIT-003", 
      code: "CASE",
      name: "케이스", 
      baseUnit: "BOX",
      conversionRate: 6,
      status: '사용',
      createDate: "2024-03-20",
      createBy: "관리자",
      remark: "1케이스 = 6박스"
    },
    { 
      id: "UNIT-004", 
      code: "PALLET",
      name: "팔레트", 
      baseUnit: "CASE",
      conversionRate: 4,
      status: '중지',
      createDate: "2024-03-20",
      createBy: "관리자",
      remark: "1팔레트 = 4케이스"
    }
  ];

  // 단위 필터링
  const filteredUnits = units.filter(unit => {
    // 상태 필터링
    if (selectedStatus !== "all" && unit.status !== selectedStatus) {
      return false;
    }
    
    // 검색어 필터링
    return (
      unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 상태별 건수
  const statusCounts = units.reduce((acc, unit) => {
    acc[unit.status] = (acc[unit.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 기본 단위 수
  const baseUnitCount = units.filter(unit => unit.baseUnit === unit.code).length;

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

  // 단위 변환 계산
  const calculateConversion = (unit: Unit) => {
    if (unit.baseUnit === unit.code) return "기본 단위";
    
    const baseUnit = units.find(u => u.code === unit.baseUnit);
    if (!baseUnit) return "변환 불가";
    
    let rate = unit.conversionRate;
    let currentUnit = unit.baseUnit;
    
    while (currentUnit !== "EA") {
      const parentUnit = units.find(u => u.code === currentUnit);
      if (!parentUnit) return "변환 불가";
      rate *= parentUnit.conversionRate;
      currentUnit = parentUnit.baseUnit;
    }
    
    return `1${unit.code} = ${rate}EA`;
  };

  const handleNewUnit = () => {
    // TODO: 새로운 단위 등록 모달 열기
    console.log("새로운 단위 등록");
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
        <h1 className="text-2xl font-bold">단위 관리</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewUnit}>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">총 단위</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{units.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">기본 단위</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{baseUnitCount}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">파생 단위</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{units.length - baseUnitCount}건</div>
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
                placeholder="단위코드, 단위명 검색..."
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
              <option value="사용">사용</option>
              <option value="중지">중지</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* 단위 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>단위 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">단위코드</th>
                    <th className="py-3 px-4 text-left font-medium">단위명</th>
                    <th className="py-3 px-4 text-left font-medium">기준단위</th>
                    <th className="py-3 px-4 text-right font-medium">환산율</th>
                    <th className="py-3 px-4 text-center font-medium">기본단위 환산</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">등록일자</th>
                    <th className="py-3 px-4 text-left font-medium">등록자</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUnits.map((unit) => (
                    <tr key={unit.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span>{unit.code}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{unit.name}</td>
                      <td className="py-3 px-4">{unit.baseUnit}</td>
                      <td className="py-3 px-4 text-right">{unit.conversionRate}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span>1{unit.code}</span>
                          <ArrowRight className="h-4 w-4" />
                          <span>{calculateConversion(unit)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(unit.status)}`}>
                          {unit.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{unit.createDate}</td>
                      <td className="py-3 px-4">{unit.createBy}</td>
                      <td className="py-3 px-4">{unit.remark || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredUnits.length === 0 && (
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