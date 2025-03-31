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
  Warehouse,
  MapPin,
  Users,
  Phone
} from "lucide-react";

interface WarehouseMaster {
  id: string;
  code: string;
  name: string;
  type: '자체창고' | '외부창고' | '임시창고';
  address: string;
  manager: string;
  phone: string;
  capacity: number;
  usedCapacity: number;
  status: '사용' | '중지';
  createDate: string;
  createBy: string;
  remark?: string;
}

export default function WarehouseMasterPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // 더미 창고 마스터 데이터
  const warehouses: WarehouseMaster[] = [
    { 
      id: "WH-001", 
      code: "W001",
      name: "본사 창고", 
      type: "자체창고",
      address: "서울특별시 서초구",
      manager: "김창고",
      phone: "02-1234-5678",
      capacity: 1000,
      usedCapacity: 750,
      status: '사용',
      createDate: "2024-03-20",
      createBy: "김이동",
      remark: "본사 메인 창고"
    },
    { 
      id: "WH-002", 
      code: "W002",
      name: "물류센터", 
      type: "외부창고",
      address: "경기도 성남시",
      manager: "이물류",
      phone: "02-2345-6789",
      capacity: 2000,
      usedCapacity: 1500,
      status: '사용',
      createDate: "2024-03-21",
      createBy: "이이동",
      remark: "대형 물류센터"
    },
    { 
      id: "WH-003", 
      code: "W003",
      name: "임시 보관소", 
      type: "임시창고",
      address: "인천시 연수구",
      manager: "박임시",
      phone: "02-3456-7890",
      capacity: 500,
      usedCapacity: 0,
      status: '중지',
      createDate: "2024-03-22",
      createBy: "박이동",
      remark: "임시 보관용"
    }
  ];

  // 창고 마스터 필터링
  const filteredWarehouses = warehouses.filter(warehouse => {
    // 창고 유형 필터링
    if (selectedType !== "all" && warehouse.type !== selectedType) {
      return false;
    }
    
    // 상태 필터링
    if (selectedStatus !== "all" && warehouse.status !== selectedStatus) {
      return false;
    }
    
    // 검색어 필터링
    return (
      warehouse.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.phone.includes(searchTerm) ||
      warehouse.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 상태별 건수
  const statusCounts = warehouses.reduce((acc, warehouse) => {
    acc[warehouse.status] = (acc[warehouse.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 창고 유형별 건수
  const typeCounts = warehouses.reduce((acc, warehouse) => {
    acc[warehouse.type] = (acc[warehouse.type] || 0) + 1;
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

  const handleNewWarehouse = () => {
    // TODO: 새로운 창고 등록 모달 열기
    console.log("새로운 창고 등록");
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
        <h1 className="text-2xl font-bold">창고 마스터</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewWarehouse}>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">총 창고</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warehouses.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">자체창고</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{typeCounts['자체창고'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">외부창고</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{typeCounts['외부창고'] || 0}건</div>
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
                placeholder="창고코드, 창고명, 담당자, 연락처, 주소 검색..."
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
              <option value="all">모든 유형</option>
              <option value="자체창고">자체창고</option>
              <option value="외부창고">외부창고</option>
              <option value="임시창고">임시창고</option>
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

      {/* 창고 마스터 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>창고 마스터 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">창고코드</th>
                    <th className="py-3 px-4 text-left font-medium">창고명</th>
                    <th className="py-3 px-4 text-left font-medium">유형</th>
                    <th className="py-3 px-4 text-left font-medium">담당자</th>
                    <th className="py-3 px-4 text-left font-medium">연락처</th>
                    <th className="py-3 px-4 text-left font-medium">주소</th>
                    <th className="py-3 px-4 text-right font-medium">총용량</th>
                    <th className="py-3 px-4 text-right font-medium">사용량</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">등록일자</th>
                    <th className="py-3 px-4 text-left font-medium">등록자</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWarehouses.map((warehouse) => (
                    <tr key={warehouse.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{warehouse.code}</td>
                      <td className="py-3 px-4 font-medium">{warehouse.name}</td>
                      <td className="py-3 px-4">{warehouse.type}</td>
                      <td className="py-3 px-4">{warehouse.manager}</td>
                      <td className="py-3 px-4">{warehouse.phone}</td>
                      <td className="py-3 px-4">{warehouse.address}</td>
                      <td className="py-3 px-4 text-right">{warehouse.capacity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{warehouse.usedCapacity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(warehouse.status)}`}>
                          {warehouse.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{warehouse.createDate}</td>
                      <td className="py-3 px-4">{warehouse.createBy}</td>
                      <td className="py-3 px-4">{warehouse.remark || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredWarehouses.length === 0 && (
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