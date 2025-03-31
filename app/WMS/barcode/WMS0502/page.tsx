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
  Boxes,
  Scale,
  Tag
} from "lucide-react";

interface LabelTemplate {
  id: string;
  name: string;
  category: string;
  width: number;
  height: number;
  orientation: '가로' | '세로';
  elements: LabelElement[];
  createDate: string;
  createBy: string;
  remark?: string;
}

interface LabelElement {
  id: string;
  type: 'text' | 'barcode' | 'image';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
  barcodeType?: '1D' | '2D';
  barcodeFormat?: string;
}

export default function LabelDesignPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<LabelTemplate | null>(null);
  
  // 더미 라벨 템플릿 데이터
  const labelTemplates: LabelTemplate[] = [
    { 
      id: "TPL-001", 
      name: "기본 상품 라벨", 
      category: "상품",
      width: 100,
      height: 50,
      orientation: '가로',
      elements: [
        {
          id: "ELE-001",
          type: 'text',
          content: '상품명',
          x: 5,
          y: 5,
          width: 90,
          height: 10,
          fontSize: 12,
          fontFamily: 'Arial'
        },
        {
          id: "ELE-002",
          type: 'barcode',
          content: '8801234567890',
          x: 5,
          y: 20,
          width: 90,
          height: 20,
          barcodeType: '1D',
          barcodeFormat: 'CODE128'
        }
      ],
      createDate: "2024-03-20",
      createBy: "김이동",
      remark: "기본 상품 라벨 템플릿"
    },
    { 
      id: "TPL-002", 
      name: "QR코드 라벨", 
      category: "배송",
      width: 80,
      height: 80,
      orientation: '가로',
      elements: [
        {
          id: "ELE-003",
          type: 'barcode',
          content: 'DEL-20240321-001',
          x: 5,
          y: 5,
          width: 70,
          height: 70,
          barcodeType: '2D',
          barcodeFormat: 'QR'
        }
      ],
      createDate: "2024-03-21",
      createBy: "이이동",
      remark: "배송 추적용 QR코드"
    },
    { 
      id: "TPL-003", 
      name: "로고 포함 라벨", 
      category: "브랜드",
      width: 120,
      height: 60,
      orientation: '가로',
      elements: [
        {
          id: "ELE-004",
          type: 'image',
          content: 'logo.png',
          x: 5,
          y: 5,
          width: 30,
          height: 30
        },
        {
          id: "ELE-005",
          type: 'text',
          content: '회사명',
          x: 40,
          y: 5,
          width: 75,
          height: 10,
          fontSize: 14,
          fontFamily: 'Arial'
        }
      ],
      createDate: "2024-03-22",
      createBy: "박이동",
      remark: "브랜드 로고 포함"
    }
  ];

  // 라벨 템플릿 필터링
  const filteredTemplates = labelTemplates.filter(template => {
    // 카테고리 필터링
    if (selectedCategory !== "all" && template.category !== selectedCategory) {
      return false;
    }
    
    // 검색어 필터링
    return (
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 카테고리별 건수
  const categoryCounts = labelTemplates.reduce((acc, template) => {
    acc[template.category] = (acc[template.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleNewTemplate = () => {
    // TODO: 새로운 라벨 템플릿 생성 모달 열기
    console.log("새로운 라벨 템플릿 생성");
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
        <h1 className="text-2xl font-bold">라벨 디자인</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewTemplate}>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">총 템플릿</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{labelTemplates.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">상품 라벨</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{categoryCounts['상품'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">배송 라벨</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{categoryCounts['배송'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">브랜드 라벨</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{categoryCounts['브랜드'] || 0}건</div>
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
                placeholder="템플릿명, 카테고리 검색..."
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
              <option value="상품">상품 라벨</option>
              <option value="배송">배송 라벨</option>
              <option value="브랜드">브랜드 라벨</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* 라벨 템플릿 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>라벨 템플릿 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-colors ${
                  selectedTemplate?.id === template.id ? 'border-primary' : ''
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Layout className="h-4 w-4" />
                      <span>{template.width}mm x {template.height}mm ({template.orientation})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Type className="h-4 w-4" />
                      <span>{template.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Barcode className="h-4 w-4" />
                      <span>{template.elements.length}개 요소</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Settings className="h-4 w-4" />
                      <span>{template.createBy} / {template.createDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredTemplates.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              검색 결과가 없습니다.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
