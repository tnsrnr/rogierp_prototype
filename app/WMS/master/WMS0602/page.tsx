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
  Building2,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

interface VendorMaster {
  id: string;
  code: string;
  name: string;
  type: '공급업체' | '고객사' | '기타';
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  status: '사용' | '중지';
  createDate: string;
  createBy: string;
  remark?: string;
}

export default function VendorMasterPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // 더미 거래처 마스터 데이터
  const vendors: VendorMaster[] = [
    { 
      id: "VND-001", 
      code: "V001",
      name: "삼성전자", 
      type: "공급업체",
      contactPerson: "김삼성",
      phone: "02-1234-5678",
      email: "contact@samsung.com",
      address: "서울특별시 서초구",
      status: '사용',
      createDate: "2024-03-20",
      createBy: "김이동",
      remark: "주요 공급업체"
    },
    { 
      id: "VND-002", 
      code: "V002",
      name: "네이버", 
      type: "고객사",
      contactPerson: "이네이버",
      phone: "02-2345-6789",
      email: "contact@naver.com",
      address: "성남시 분당구",
      status: '사용',
      createDate: "2024-03-21",
      createBy: "이이동",
      remark: "주요 고객사"
    },
    { 
      id: "VND-003", 
      code: "V003",
      name: "카카오", 
      type: "고객사",
      contactPerson: "박카카오",
      phone: "02-3456-7890",
      email: "contact@kakao.com",
      address: "제주시 첨단로",
      status: '중지',
      createDate: "2024-03-22",
      createBy: "박이동",
      remark: "중단된 거래처"
    }
  ];

  // 거래처 마스터 필터링
  const filteredVendors = vendors.filter(vendor => {
    // 거래처 유형 필터링
    if (selectedType !== "all" && vendor.type !== selectedType) {
      return false;
    }
    
    // 상태 필터링
    if (selectedStatus !== "all" && vendor.status !== selectedStatus) {
      return false;
    }
    
    // 검색어 필터링
    return (
      vendor.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.phone.includes(searchTerm) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 상태별 건수
  const statusCounts = vendors.reduce((acc, vendor) => {
    acc[vendor.status] = (acc[vendor.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 거래처 유형별 건수
  const typeCounts = vendors.reduce((acc, vendor) => {
    acc[vendor.type] = (acc[vendor.type] || 0) + 1;
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

  const handleNewVendor = () => {
    // TODO: 새로운 거래처 등록 모달 열기
    console.log("새로운 거래처 등록");
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
        <h1 className="text-2xl font-bold">거래처 마스터</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewVendor}>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">총 거래처</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendors.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">공급업체</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{typeCounts['공급업체'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">고객사</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{typeCounts['고객사'] || 0}건</div>
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
                placeholder="거래처코드, 거래처명, 담당자, 연락처, 이메일 검색..."
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
              <option value="공급업체">공급업체</option>
              <option value="고객사">고객사</option>
              <option value="기타">기타</option>
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

      {/* 거래처 마스터 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>거래처 마스터 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">거래처코드</th>
                    <th className="py-3 px-4 text-left font-medium">거래처명</th>
                    <th className="py-3 px-4 text-left font-medium">유형</th>
                    <th className="py-3 px-4 text-left font-medium">담당자</th>
                    <th className="py-3 px-4 text-left font-medium">연락처</th>
                    <th className="py-3 px-4 text-left font-medium">이메일</th>
                    <th className="py-3 px-4 text-left font-medium">주소</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">등록일자</th>
                    <th className="py-3 px-4 text-left font-medium">등록자</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVendors.map((vendor) => (
                    <tr key={vendor.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{vendor.code}</td>
                      <td className="py-3 px-4 font-medium">{vendor.name}</td>
                      <td className="py-3 px-4">{vendor.type}</td>
                      <td className="py-3 px-4">{vendor.contactPerson}</td>
                      <td className="py-3 px-4">{vendor.phone}</td>
                      <td className="py-3 px-4">{vendor.email}</td>
                      <td className="py-3 px-4">{vendor.address}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(vendor.status)}`}>
                          {vendor.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{vendor.createDate}</td>
                      <td className="py-3 px-4">{vendor.createBy}</td>
                      <td className="py-3 px-4">{vendor.remark || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredVendors.length === 0 && (
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