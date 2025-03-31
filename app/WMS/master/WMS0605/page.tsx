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
  MapPin,
  Package,
  Boxes,
  Scale
} from "lucide-react";

interface Area {
  id: string;
  code: string;
  name: string;
  warehouseCode: string;
  warehouseName: string;
  type: '일반' | '파이팅' | '보관' | '피킹';
  totalCapacity: number;
  usedCapacity: number;
  status: '사용' | '중지';
  createDate: string;
  createBy: string;
  remark?: string;
}

export default function AreaManagementPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // 더미 구역 데이터
  const areas: Area[] = [
    { 
      id: "AREA-001", 
      code: "A-001",
      name: "A구역", 
      warehouseCode: "WH-001",
      warehouseName: "본사 창고",
      type: "일반",
      totalCapacity: 1000,
      usedCapacity: 750,
      status: '사용',
      createDate: "2024-03-20",
      createBy: "관리자",
      remark: "일반 보관 구역"
    },
    { 
      id: "AREA-002", 
      code: "A-002",
      name: "B구역", 
      warehouseCode: "WH-001",
      warehouseName: "본사 창고",
      type: "파이팅",
      totalCapacity: 500,
      usedCapacity: 300,
      status: '사용',
      createDate: "2024-03-20",
      createBy: "관리자",
      remark: "파이팅 작업 구역"
    },
    { 
      id: "AREA-003", 
      code: "A-003",
      name: "C구역", 
      warehouseCode: "WH-002",
      warehouseName: "물류센터",
      type: "보관",
      totalCapacity: 2000,
      usedCapacity: 1800,
      status: '사용',
      createDate: "2024-03-20",
      createBy: "관리자",
      remark: "장기 보관 구역"
    },
    { 
      id: "AREA-004", 
      code: "A-004",
      name: "D구역", 
      warehouseCode: "WH-002",
      warehouseName: "물류센터",
      type: "피킹",
      totalCapacity: 800,
      usedCapacity: 600,
      status: '중지',
      createDate: "2024-03-20",
      createBy: "관리자",
      remark: "피킹 작업 구역"
    }
  ];

  // 구역 필터링
  const filteredAreas = areas.filter(area => {
    // 창고 필터링
    if (selectedWarehouse !== "all" && area.warehouseCode !== selectedWarehouse) {
      return false;
    }
    
    // 구역 유형 필터링
    if (selectedType !== "all" && area.type !== selectedType) {
      return false;
    }
    
    // 상태 필터링
    if (selectedStatus !== "all" && area.status !== selectedStatus) {
      return false;
    }
    
    // 검색어 필터링
    return (
      area.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.warehouseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 상태별 건수
  const statusCounts = areas.reduce((acc, area) => {
    acc[area.status] = (acc[area.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 구역 유형별 건수
  const typeCounts = areas.reduce((acc, area) => {
    acc[area.type] = (acc[area.type] || 0) + 1;
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

  // 구역 유형 아이콘
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "일반":
        return <Package className="h-4 w-4" />;
      case "파이팅":
        return <Boxes className="h-4 w-4" />;
      case "보관":
        return <MapPin className="h-4 w-4" />;
      case "피킹":
        return <Scale className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const handleNewArea = () => {
    // TODO: 새로운 구역 등록 모달 열기
    console.log("새로운 구역 등록");
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
        <h1 className="text-2xl font-bold">구역 관리</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewArea}>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">총 구역</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{areas.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">일반</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{typeCounts['일반'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">파이팅</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{typeCounts['파이팅'] || 0}건</div>
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
                placeholder="구역코드, 구역명, 창고명 검색..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-3 py-2 border rounded-md"
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
            >
              <option value="all">모든 창고</option>
              <option value="WH-001">본사 창고</option>
              <option value="WH-002">물류센터</option>
              <option value="WH-003">임시 보관소</option>
            </select>
            <select 
              className="px-3 py-2 border rounded-md"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">모든 유형</option>
              <option value="일반">일반</option>
              <option value="파이팅">파이팅</option>
              <option value="보관">보관</option>
              <option value="피킹">피킹</option>
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

      {/* 구역 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>구역 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">구역코드</th>
                    <th className="py-3 px-4 text-left font-medium">구역명</th>
                    <th className="py-3 px-4 text-left font-medium">창고</th>
                    <th className="py-3 px-4 text-left font-medium">유형</th>
                    <th className="py-3 px-4 text-right font-medium">총 용량</th>
                    <th className="py-3 px-4 text-right font-medium">사용 용량</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">등록일자</th>
                    <th className="py-3 px-4 text-left font-medium">등록자</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAreas.map((area) => (
                    <tr key={area.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{area.code}</td>
                      <td className="py-3 px-4 font-medium">{area.name}</td>
                      <td className="py-3 px-4">{area.warehouseName}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(area.type)}
                          <span>{area.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">{area.totalCapacity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{area.usedCapacity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(area.status)}`}>
                          {area.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{area.createDate}</td>
                      <td className="py-3 px-4">{area.createBy}</td>
                      <td className="py-3 px-4">{area.remark || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredAreas.length === 0 && (
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