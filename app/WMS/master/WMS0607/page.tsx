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
  Package,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen
} from "lucide-react";

interface Category {
  id: string;
  code: string;
  name: string;
  parentCode: string | null;
  level: number;
  sortOrder: number;
  status: '사용' | '중지';
  createDate: string;
  createBy: string;
  remark?: string;
}

export default function CategoryManagementPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  
  // 더미 카테고리 데이터
  const categories: Category[] = [
    { 
      id: "CAT-001", 
      code: "01",
      name: "전자제품", 
      parentCode: null,
      level: 1,
      sortOrder: 1,
      status: '사용',
      createDate: "2024-03-20",
      createBy: "관리자",
      remark: "전자제품 카테고리"
    },
    { 
      id: "CAT-002", 
      code: "01-01",
      name: "스마트폰", 
      parentCode: "01",
      level: 2,
      sortOrder: 1,
      status: '사용',
      createDate: "2024-03-20",
      createBy: "관리자",
      remark: "스마트폰 카테고리"
    },
    { 
      id: "CAT-003", 
      code: "01-02",
      name: "태블릿", 
      parentCode: "01",
      level: 2,
      sortOrder: 2,
      status: '사용',
      createDate: "2024-03-20",
      createBy: "관리자",
      remark: "태블릿 카테고리"
    },
    { 
      id: "CAT-004", 
      code: "02",
      name: "의류", 
      parentCode: null,
      level: 1,
      sortOrder: 2,
      status: '사용',
      createDate: "2024-03-20",
      createBy: "관리자",
      remark: "의류 카테고리"
    },
    { 
      id: "CAT-005", 
      code: "02-01",
      name: "남성의류", 
      parentCode: "02",
      level: 2,
      sortOrder: 1,
      status: '사용',
      createDate: "2024-03-20",
      createBy: "관리자",
      remark: "남성의류 카테고리"
    },
    { 
      id: "CAT-006", 
      code: "02-02",
      name: "여성의류", 
      parentCode: "02",
      level: 2,
      sortOrder: 2,
      status: '중지',
      createDate: "2024-03-20",
      createBy: "관리자",
      remark: "여성의류 카테고리"
    }
  ];

  // 카테고리 필터링
  const filteredCategories = categories.filter(category => {
    // 상태 필터링
    if (selectedStatus !== "all" && category.status !== selectedStatus) {
      return false;
    }
    
    // 검색어 필터링
    return (
      category.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 상태별 건수
  const statusCounts = categories.reduce((acc, category) => {
    acc[category.status] = (acc[category.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 레벨별 건수
  const levelCounts = categories.reduce((acc, category) => {
    acc[category.level] = (acc[category.level] || 0) + 1;
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

  // 카테고리 확장/축소 토글
  const toggleCategory = (code: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(code)) {
      newExpanded.delete(code);
    } else {
      newExpanded.add(code);
    }
    setExpandedCategories(newExpanded);
  };

  // 카테고리 트리 렌더링
  const renderCategoryTree = (parentCode: string | null = null, level: number = 0) => {
    return filteredCategories
      .filter(category => category.parentCode === parentCode)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(category => {
        const hasChildren = filteredCategories.some(c => c.parentCode === category.code);
        const isExpanded = expandedCategories.has(category.code);
        
        return (
          <div key={category.id}>
            <div 
              className={`flex items-center gap-2 py-2 px-4 hover:bg-muted/50 cursor-pointer ${
                level > 0 ? `ml-${level * 4}` : ''
              }`}
              onClick={() => hasChildren && toggleCategory(category.code)}
            >
              {hasChildren ? (
                isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )
              ) : (
                <div className="w-4" />
              )}
              {isExpanded ? (
                <FolderOpen className="h-4 w-4 text-blue-500" />
              ) : (
                <Folder className="h-4 w-4 text-blue-500" />
              )}
              <span className="font-medium">{category.name}</span>
              <span className="text-sm text-muted-foreground">({category.code})</span>
              <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(category.status)}`}>
                {category.status}
              </span>
            </div>
            {isExpanded && hasChildren && renderCategoryTree(category.code, level + 1)}
          </div>
        );
      });
  };

  const handleNewCategory = () => {
    // TODO: 새로운 카테고리 등록 모달 열기
    console.log("새로운 카테고리 등록");
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
        <h1 className="text-2xl font-bold">품목분류</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewCategory}>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">총 카테고리</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">대분류</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{levelCounts[1] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">중분류</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{levelCounts[2] || 0}건</div>
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
                placeholder="카테고리코드, 카테고리명 검색..."
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

      {/* 카테고리 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>카테고리 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">카테고리코드</th>
                    <th className="py-3 px-4 text-left font-medium">카테고리명</th>
                    <th className="py-3 px-4 text-left font-medium">상위카테고리</th>
                    <th className="py-3 px-4 text-center font-medium">레벨</th>
                    <th className="py-3 px-4 text-center font-medium">정렬순서</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-center font-medium">등록일자</th>
                    <th className="py-3 px-4 text-left font-medium">등록자</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category) => (
                    <tr key={category.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span>{category.code}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{category.name}</td>
                      <td className="py-3 px-4">
                        {category.parentCode ? 
                          categories.find(c => c.code === category.parentCode)?.name || "-" 
                          : "-"}
                      </td>
                      <td className="py-3 px-4 text-center">{category.level}</td>
                      <td className="py-3 px-4 text-center">{category.sortOrder}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(category.status)}`}>
                          {category.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">{category.createDate}</td>
                      <td className="py-3 px-4">{category.createBy}</td>
                      <td className="py-3 px-4">{category.remark || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredCategories.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 카테고리 트리 뷰 */}
      <Card>
        <CardHeader>
          <CardTitle>카테고리 트리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            {renderCategoryTree()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 