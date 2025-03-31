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

interface LocationMaster {
  id: string;
  code: string;
  name: string;
  warehouseCode: string;
  warehouseName: string;
  type: '일반' | '파이팅' | '보관' | '피킹';
  area: string;
  rack: string;
  level: string;
  position: string;
  capacity: number;
  usedCapacity: number;
  status: '사용' | '중지';
  createDate: string;
  createBy: string;
  remark?: string;
}

export default function LocationMasterPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // 더미 로케이션 마스터 데이터
  const locations: LocationMaster[] = [
    { 
      id: "LOC-001", 
      code: "L001",
      name: "A-01-01-01", 
      warehouseCode: "W001",
      warehouseName: "본사 창고",
      type: "일반",
      area: "A",
      rack: "01",
      level: "01",
      position: "01",
      capacity: 100,
      usedCapacity: 75,
      status: '사용',
      createDate: "2024-03-20",
      createBy: "김이동",
      remark: "일반 보관 구역"
    },
    { 
      id: "LOC-002", 
      code: "L002",
      name: "B-02-03-02", 
      warehouseCode: "W002",
      warehouseName: "물류센터",
      type: "파이팅",
      area: "B",
      rack: "02",
      level: "03",
      position: "02",
      capacity: 50,
      usedCapacity: 30,
      status: '사용',
      createDate: "2024-03-21",
      createBy: "이이동",
      remark: "파이팅 구역"
    },
    { 
      id: "LOC-003", 
      code: "L003",
      name: "C-03-02-01", 
      warehouseCode: "W003",
      warehouseName: "임시 보관소",
      type: "피킹",
      area: "C",
      rack: "03",
      level: "02",
      position: "01",
      capacity: 200,
      usedCapacity: 0,
      status: '중지',
      createDate: "2024-03-22",
      createBy: "박이동",
      remark: "피킹 구역"
    }
  ];

  // 로케이션 마스터 필터링
  const filteredLocations = locations.filter(location => {
    // 창고 필터링
    if (selectedWarehouse !== "all" && location.warehouseCode !== selectedWarehouse) {
      return false;
    }
    
    // 로케이션 유형 필터링
    if (selectedType !== "all" && location.type !== selectedType) {
      return false;
    }
    
    // 상태 필터링
    if (selectedStatus !== "all" && location.status !== selectedStatus) {
      return false;
    }
    
    // 검색어 필터링
    return (
      location.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.warehouseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.rack.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 상태별 건수
  const statusCounts = locations.reduce((acc, location) => {
    acc[location.status] = (acc[location.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 로케이션 유형별 건수
  const typeCounts = locations.reduce((acc, location) => {
    acc[location.type] = (acc[location.type] || 0) + 1;
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

  const handleNewLocation = () => {
    // TODO: 새로운 로케이션 등록 모달 열기
    console.log("새로운 로케이션 등록");
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
        <h1 className="text-2xl font-bold">로케이션 마스터</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewLocation}>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">총 로케이션</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations.length}건</div>
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
                placeholder="로케이션코드, 로케이션명, 창고명, 구역, 랙, 레벨, 포지션 검색..."
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
              <option value="W001">본사 창고</option>
              <option value="W002">물류센터</option>
              <option value="W003">임시 보관소</option>
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

      {/* 로케이션 마스터 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>로케이션 마스터 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">로케이션코드</th>
                    <th className="py-3 px-4 text-left font-medium">로케이션명</th>
                    <th className="py-3 px-4 text-left font-medium">창고</th>
                    <th className="py-3 px-4 text-left font-medium">유형</th>
                    <th className="py-3 px-4 text-left font-medium">구역</th>
                    <th className="py-3 px-4 text-left font-medium">랙</th>
                    <th className="py-3 px-4 text-left font-medium">레벨</th>
                    <th className="py-3 px-4 text-left font-medium">포지션</th>
                    <th className="py-3 px-4 text-right font-medium">총용량</th>
                    <th className="py-3 px-4 text-right font-medium">사용량</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">등록일자</th>
                    <th className="py-3 px-4 text-left font-medium">등록자</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLocations.map((location) => (
                    <tr key={location.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{location.code}</td>
                      <td className="py-3 px-4 font-medium">{location.name}</td>
                      <td className="py-3 px-4">{location.warehouseName}</td>
                      <td className="py-3 px-4">{location.type}</td>
                      <td className="py-3 px-4">{location.area}</td>
                      <td className="py-3 px-4">{location.rack}</td>
                      <td className="py-3 px-4">{location.level}</td>
                      <td className="py-3 px-4">{location.position}</td>
                      <td className="py-3 px-4 text-right">{location.capacity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{location.usedCapacity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(location.status)}`}>
                          {location.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{location.createDate}</td>
                      <td className="py-3 px-4">{location.createBy}</td>
                      <td className="py-3 px-4">{location.remark || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredLocations.length === 0 && (
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