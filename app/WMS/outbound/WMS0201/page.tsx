"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus,
  Save,
  Trash2,
  Calendar,
  Search
} from "lucide-react";

interface OutboundItem {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  customer: string;
  quantity: number;
  unit: string;
  outboundDate: string;
  location?: string;
  remark?: string;
}

export default function OutboundOrderPage() {
  const [items, setItems] = useState<OutboundItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const addNewItem = () => {
    const newItem: OutboundItem = {
      id: `OUT-${items.length + 1}`,
      productCode: "",
      productName: "",
      category: "",
      customer: "",
      quantity: 0,
      unit: "EA",
      outboundDate: new Date().toISOString().split('T')[0],
      remark: ""
    };
    setItems([...items, newItem]);
  };

  const updateItem = (index: number, field: keyof OutboundItem, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    setItems(updatedItems);
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSave = () => {
    // TODO: API 호출하여 데이터 저장
    console.log("저장할 데이터:", items);
  };

  const handleSearch = () => {
    // TODO: API 호출하여 상품 검색
    console.log("검색어:", searchTerm);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">출고 주문 등록</h1>
        <div className="flex gap-2">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            저장
          </Button>
        </div>
      </div>

      {/* 상품 검색 */}
      <Card>
        <CardHeader>
          <CardTitle>상품 검색</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="품목 코드 또는 품목명으로 검색..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              검색
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 출고 상품 목록 */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>출고 상품</CardTitle>
            <Button variant="outline" size="sm" onClick={addNewItem}>
              <Plus className="mr-2 h-4 w-4" />
              상품 추가
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <label className="text-sm font-medium">품목 코드</label>
                  <Input
                    value={item.productCode}
                    onChange={(e) => updateItem(index, "productCode", e.target.value)}
                    placeholder="품목 코드 입력"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">품목명</label>
                  <Input
                    value={item.productName}
                    onChange={(e) => updateItem(index, "productName", e.target.value)}
                    placeholder="품목명 입력"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">카테고리</label>
                  <Input
                    value={item.category}
                    onChange={(e) => updateItem(index, "category", e.target.value)}
                    placeholder="카테고리 입력"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">고객사</label>
                  <Input
                    value={item.customer}
                    onChange={(e) => updateItem(index, "customer", e.target.value)}
                    placeholder="고객사 입력"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">수량</label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                    placeholder="수량 입력"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">단위</label>
                  <Input
                    value={item.unit}
                    onChange={(e) => updateItem(index, "unit", e.target.value)}
                    placeholder="단위 입력"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">출고일자</label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={item.outboundDate}
                      onChange={(e) => updateItem(index, "outboundDate", e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">적치위치</label>
                  <Input
                    value={item.location}
                    onChange={(e) => updateItem(index, "location", e.target.value)}
                    placeholder="적치위치 입력"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">비고</label>
                  <Input
                    value={item.remark}
                    onChange={(e) => updateItem(index, "remark", e.target.value)}
                    placeholder="비고 입력"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeItem(index)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    삭제
                  </Button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                등록된 출고 상품이 없습니다.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
