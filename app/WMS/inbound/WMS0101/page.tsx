"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Calendar, 
  Save, 
  FileText, 
  Download, 
  Printer,
  PackageOpen
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InboundExpectedItem {
  id: string;
  productCode: string;
  productName: string;
  quantity: number;
  unit: string;
  expectedDate: string;
  supplierCode: string;
  supplierName: string;
  orderNumber?: string;
  remark?: string;
  status: '예정' | '부분입고' | '입고완료' | '취소';
}

export default function InboundExpectedRegisterPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("expected");
  
  // 더미 입고 예정 내역 데이터
  const [inboundExpectedList, setInboundExpectedList] = useState<InboundExpectedItem[]>([
    { 
      id: "IB-EXP-20230601-001", 
      productCode: "ITEM-001", 
      productName: "스마트폰", 
      quantity: 100, 
      unit: "EA", 
      expectedDate: "2023-06-05", 
      supplierCode: "SUP-001", 
      supplierName: "전자기기 공급사", 
      orderNumber: "PO-0023",
      status: '예정'
    },
    { 
      id: "IB-EXP-20230601-002", 
      productCode: "ITEM-002", 
      productName: "노트북", 
      quantity: 50, 
      unit: "EA", 
      expectedDate: "2023-06-05", 
      supplierCode: "SUP-001", 
      supplierName: "전자기기 공급사", 
      orderNumber: "PO-0023",
      status: '예정'
    },
    { 
      id: "IB-EXP-20230602-001", 
      productCode: "ITEM-003", 
      productName: "블루투스 이어폰", 
      quantity: 200, 
      unit: "EA", 
      expectedDate: "2023-06-07", 
      supplierCode: "SUP-001", 
      supplierName: "전자기기 공급사", 
      orderNumber: "PO-0024",
      status: '예정'
    },
    { 
      id: "IB-EXP-20230603-001", 
      productCode: "ITEM-101", 
      productName: "사무용 의자", 
      quantity: 30, 
      unit: "EA", 
      expectedDate: "2023-06-08", 
      supplierCode: "SUP-002", 
      supplierName: "사무용품 공급사", 
      orderNumber: "PO-0025",
      status: '부분입고'
    },
    { 
      id: "IB-EXP-20230604-001", 
      productCode: "ITEM-201", 
      productName: "헤드셋", 
      quantity: 70, 
      unit: "EA", 
      expectedDate: "2023-06-10", 
      supplierCode: "SUP-003", 
      supplierName: "주변기기 공급사", 
      orderNumber: "PO-0026",
      status: '예정',
      remark: "납품 일정 확인 필요"
    }
  ]);

  // 입고 예정 내역 필터링
  const filteredItems = inboundExpectedList.filter(item => 
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.orderNumber && item.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 상태별 건수
  const statusCounts = inboundExpectedList.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 새 입고 예정 등록 폼 상태
  const [newInbound, setNewInbound] = useState({
    productCode: "",
    productName: "",
    quantity: 0,
    unit: "EA",
    expectedDate: "",
    supplierCode: "",
    supplierName: "",
    orderNumber: "",
    remark: ""
  });

  // 입력 필드 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewInbound(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 입고 예정 등록 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 구현에서는 API 호출로 대체
    const newId = `IB-EXP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    const newItem: InboundExpectedItem = {
      id: newId,
      productCode: newInbound.productCode,
      productName: newInbound.productName,
      quantity: Number(newInbound.quantity),
      unit: newInbound.unit,
      expectedDate: newInbound.expectedDate,
      supplierCode: newInbound.supplierCode,
      supplierName: newInbound.supplierName,
      orderNumber: newInbound.orderNumber,
      remark: newInbound.remark,
      status: '예정'
    };
    
    setInboundExpectedList(prev => [...prev, newItem]);
    
    // 폼 초기화
    setNewInbound({
      productCode: "",
      productName: "",
      quantity: 0,
      unit: "EA",
      expectedDate: "",
      supplierCode: "",
      supplierName: "",
      orderNumber: "",
      remark: ""
    });
    
    // 탭 이동
    setActiveTab("expected");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">입고 예정 등록</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            엑셀 가져오기
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            내보내기
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            인쇄
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">전체</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inboundExpectedList.length}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">예정</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statusCounts['예정'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">부분입고</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{statusCounts['부분입고'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">입고완료</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts['입고완료'] || 0}건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">취소</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{statusCounts['취소'] || 0}건</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="expected">입고 예정 목록</TabsTrigger>
          <TabsTrigger value="register">신규 등록</TabsTrigger>
        </TabsList>
        
        <TabsContent value="expected" className="space-y-4">
          {/* 검색 */}
          <div className="flex gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="품목, 공급사, 주문번호 검색..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Button variant="outline" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                일자 선택
              </Button>
            </div>
          </div>
          
          {/* 입고 예정 목록 테이블 */}
          <div className="border rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b">
                    <th className="py-3 px-4 text-left font-medium">예정번호</th>
                    <th className="py-3 px-4 text-left font-medium">품목코드</th>
                    <th className="py-3 px-4 text-left font-medium">품목명</th>
                    <th className="py-3 px-4 text-right font-medium">수량</th>
                    <th className="py-3 px-4 text-center font-medium">단위</th>
                    <th className="py-3 px-4 text-center font-medium">예정일</th>
                    <th className="py-3 px-4 text-left font-medium">공급사</th>
                    <th className="py-3 px-4 text-left font-medium">주문번호</th>
                    <th className="py-3 px-4 text-center font-medium">상태</th>
                    <th className="py-3 px-4 text-left font-medium">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{item.id}</td>
                      <td className="py-3 px-4">{item.productCode}</td>
                      <td className="py-3 px-4 font-medium">{item.productName}</td>
                      <td className="py-3 px-4 text-right">{item.quantity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">{item.unit}</td>
                      <td className="py-3 px-4 text-center">{item.expectedDate}</td>
                      <td className="py-3 px-4">{item.supplierName}</td>
                      <td className="py-3 px-4">{item.orderNumber}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "예정" ? "bg-blue-100 text-blue-800" :
                          item.status === "부분입고" ? "bg-amber-100 text-amber-800" :
                          item.status === "입고완료" ? "bg-green-100 text-green-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {item.status}
                        </span>
                      </td>
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
        </TabsContent>
        
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PackageOpen className="mr-2 h-5 w-5" />
                새 입고 예정 등록
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">품목 코드*</label>
                      <div className="flex gap-2">
                        <Input 
                          name="productCode" 
                          value={newInbound.productCode} 
                          onChange={handleInputChange} 
                          required 
                        />
                        <Button type="button" variant="outline" size="sm">검색</Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">품목명*</label>
                      <Input 
                        name="productName" 
                        value={newInbound.productName} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium block mb-1">수량*</label>
                        <Input 
                          type="number" 
                          name="quantity" 
                          value={newInbound.quantity} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-1">단위*</label>
                        <Input 
                          name="unit" 
                          value={newInbound.unit} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">예정일*</label>
                      <Input 
                        type="date" 
                        name="expectedDate" 
                        value={newInbound.expectedDate} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">공급사 코드*</label>
                      <div className="flex gap-2">
                        <Input 
                          name="supplierCode" 
                          value={newInbound.supplierCode} 
                          onChange={handleInputChange} 
                          required 
                        />
                        <Button type="button" variant="outline" size="sm">검색</Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">공급사명*</label>
                      <Input 
                        name="supplierName" 
                        value={newInbound.supplierName} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">주문번호</label>
                      <Input 
                        name="orderNumber" 
                        value={newInbound.orderNumber} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">비고</label>
                      <Textarea 
                        name="remark" 
                        value={newInbound.remark} 
                        onChange={handleInputChange} 
                        className="min-h-[80px]" 
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("expected")}>
                    취소
                  </Button>
                  <Button type="submit" className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    저장
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 