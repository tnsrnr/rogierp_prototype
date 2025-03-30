"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Save, 
  PlusCircle, 
  MinusCircle
} from "lucide-react";

interface SalaryItem {
  id: string;
  name: string;
  type: "지급" | "공제";
  category: "기본" | "고정" | "변동" | "세금" | "사회보험" | "기타";
  amount: number | null;
  rate: number | null;
  taxable: boolean;
  description: string;
  isActive: boolean;
}

export default function SalaryItemsPage() {
  const [activeTab, setActiveTab] = useState<string>("지급");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  
  // 더미 급여 항목 데이터
  const [salaryItems, setSalaryItems] = useState<SalaryItem[]>([
    { 
      id: "SI001", 
      name: "기본급", 
      type: "지급", 
      category: "기본", 
      amount: null, 
      rate: null, 
      taxable: true, 
      description: "근로계약에 명시된 기본 급여", 
      isActive: true 
    },
    { 
      id: "SI002", 
      name: "직책수당", 
      type: "지급", 
      category: "고정", 
      amount: 200000, 
      rate: null, 
      taxable: true, 
      description: "직책에 따른 추가 수당", 
      isActive: true 
    },
    { 
      id: "SI003", 
      name: "식대", 
      type: "지급", 
      category: "고정", 
      amount: 100000, 
      rate: null, 
      taxable: false, 
      description: "식비 지원", 
      isActive: true 
    },
    { 
      id: "SI004", 
      name: "교통비", 
      type: "지급", 
      category: "고정", 
      amount: 50000, 
      rate: null, 
      taxable: false, 
      description: "출퇴근 교통비 지원", 
      isActive: true 
    },
    { 
      id: "SI005", 
      name: "초과근무수당", 
      type: "지급", 
      category: "변동", 
      amount: null, 
      rate: null, 
      taxable: true, 
      description: "연장근로에 대한 수당", 
      isActive: true 
    },
    { 
      id: "SI006", 
      name: "성과급", 
      type: "지급", 
      category: "변동", 
      amount: null, 
      rate: null, 
      taxable: true, 
      description: "성과에 따른 보너스", 
      isActive: true 
    },
    { 
      id: "SI007", 
      name: "소득세", 
      type: "공제", 
      category: "세금", 
      amount: null, 
      rate: null, 
      taxable: false, 
      description: "소득에 대한 세금", 
      isActive: true 
    },
    { 
      id: "SI008", 
      name: "지방소득세", 
      type: "공제", 
      category: "세금", 
      amount: null, 
      rate: 10, 
      taxable: false, 
      description: "소득세의 10%", 
      isActive: true 
    },
    { 
      id: "SI009", 
      name: "국민연금", 
      type: "공제", 
      category: "사회보험", 
      amount: null, 
      rate: 4.5, 
      taxable: false, 
      description: "국민연금 기여금", 
      isActive: true 
    },
    { 
      id: "SI010", 
      name: "건강보험", 
      type: "공제", 
      category: "사회보험", 
      amount: null, 
      rate: 3.545, 
      taxable: false, 
      description: "건강보험료", 
      isActive: true 
    },
    { 
      id: "SI011", 
      name: "장기요양보험", 
      type: "공제", 
      category: "사회보험", 
      amount: null, 
      rate: 12.27, 
      taxable: false, 
      description: "건강보험료의 12.27%", 
      isActive: true 
    },
    { 
      id: "SI012", 
      name: "고용보험", 
      type: "공제", 
      category: "사회보험", 
      amount: null, 
      rate: 0.9, 
      taxable: false, 
      description: "고용보험료", 
      isActive: true 
    }
  ]);

  // 필터링된 급여 항목
  const filteredItems = salaryItems.filter(item => item.type === activeTab);

  // 유형별 개수
  const incomeCount = salaryItems.filter(item => item.type === "지급").length;
  const deductionCount = salaryItems.filter(item => item.type === "공제").length;

  // 항목 추가
  const addNewItem = () => {
    const newItem: SalaryItem = {
      id: `SI${String(salaryItems.length + 1).padStart(3, '0')}`,
      name: "",
      type: activeTab as "지급" | "공제",
      category: "기타",
      amount: null,
      rate: null,
      taxable: activeTab === "지급",
      description: "",
      isActive: true
    };
    
    setSalaryItems([...salaryItems, newItem]);
    setEditingItemId(newItem.id);
  };

  // 항목 수정 상태 전환
  const toggleEditing = (id: string) => {
    setEditingItemId(editingItemId === id ? null : id);
  };

  // 항목 삭제
  const deleteItem = (id: string) => {
    setSalaryItems(salaryItems.filter(item => item.id !== id));
  };

  // 항목 수정
  const updateItem = (id: string, updatedFields: Partial<SalaryItem>) => {
    setSalaryItems(
      salaryItems.map(item => 
        item.id === id ? { ...item, ...updatedFields } : item
      )
    );
  };

  // 숫자 포맷팅
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">급여 항목 설정</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            저장
          </Button>
        </div>
      </div>

      {/* 급여 항목 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">총 급여 항목</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salaryItems.length}개</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">지급 항목</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{incomeCount}개</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">공제 항목</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{deductionCount}개</div>
          </CardContent>
        </Card>
      </div>

      {/* 급여 항목 탭 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>급여 항목 관리</CardTitle>
            <Button onClick={addNewItem} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              새 항목 추가
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="지급" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="지급" className="flex items-center">
                <PlusCircle className="mr-2 h-4 w-4 text-green-600" />
                지급 항목 ({incomeCount})
              </TabsTrigger>
              <TabsTrigger value="공제" className="flex items-center">
                <MinusCircle className="mr-2 h-4 w-4 text-red-600" />
                공제 항목 ({deductionCount})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="지급" className="mt-4">
              <div className="border rounded-md">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted border-b">
                      <th className="py-3 px-4 text-left font-medium">항목명</th>
                      <th className="py-3 px-4 text-left font-medium">분류</th>
                      <th className="py-3 px-4 text-left font-medium">금액/비율</th>
                      <th className="py-3 px-4 text-left font-medium">과세여부</th>
                      <th className="py-3 px-4 text-left font-medium">설명</th>
                      <th className="py-3 px-4 text-center font-medium">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          {editingItemId === item.id ? (
                            <Input 
                              value={item.name}
                              onChange={(e) => updateItem(item.id, { name: e.target.value })}
                              className="h-8"
                            />
                          ) : (
                            <div className="font-medium">{item.name}</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingItemId === item.id ? (
                            <select 
                              value={item.category}
                              onChange={(e) => updateItem(item.id, { category: e.target.value as SalaryItem["category"] })}
                              className="w-full border rounded px-2 py-1"
                            >
                              <option value="기본">기본</option>
                              <option value="고정">고정</option>
                              <option value="변동">변동</option>
                              <option value="기타">기타</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.category === "기본" ? "bg-blue-100 text-blue-800" :
                              item.category === "고정" ? "bg-green-100 text-green-800" :
                              item.category === "변동" ? "bg-amber-100 text-amber-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {item.category}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingItemId === item.id ? (
                            <div className="flex gap-2">
                              <Input 
                                type="number"
                                placeholder="금액"
                                value={item.amount !== null ? item.amount : ''}
                                onChange={(e) => updateItem(item.id, { amount: e.target.value ? Number(e.target.value) : null })}
                                className="h-8 w-24"
                              />
                              <Input 
                                type="number"
                                placeholder="비율 (%)"
                                value={item.rate !== null ? item.rate : ''}
                                onChange={(e) => updateItem(item.id, { rate: e.target.value ? Number(e.target.value) : null })}
                                className="h-8 w-24"
                              />
                            </div>
                          ) : (
                            <div>
                              {item.amount !== null && <div>{formatNumber(item.amount)}원</div>}
                              {item.rate !== null && <div>{item.rate}%</div>}
                              {item.amount === null && item.rate === null && <div className="text-muted-foreground">변동</div>}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingItemId === item.id ? (
                            <select 
                              value={item.taxable ? "true" : "false"}
                              onChange={(e) => updateItem(item.id, { taxable: e.target.value === "true" })}
                              className="w-full border rounded px-2 py-1"
                            >
                              <option value="true">과세</option>
                              <option value="false">비과세</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.taxable ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                            }`}>
                              {item.taxable ? "과세" : "비과세"}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingItemId === item.id ? (
                            <Input 
                              value={item.description}
                              onChange={(e) => updateItem(item.id, { description: e.target.value })}
                              className="h-8"
                            />
                          ) : (
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleEditing(item.id)}
                            >
                              {editingItemId === item.id ? "저장" : "수정"}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500"
                              onClick={() => deleteItem(item.id)}
                            >
                              삭제
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredItems.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-muted-foreground">
                          지급 항목이 없습니다. 새 항목을 추가해주세요.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="공제" className="mt-4">
              <div className="border rounded-md">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted border-b">
                      <th className="py-3 px-4 text-left font-medium">항목명</th>
                      <th className="py-3 px-4 text-left font-medium">분류</th>
                      <th className="py-3 px-4 text-left font-medium">금액/비율</th>
                      <th className="py-3 px-4 text-left font-medium">과세여부</th>
                      <th className="py-3 px-4 text-left font-medium">설명</th>
                      <th className="py-3 px-4 text-center font-medium">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          {editingItemId === item.id ? (
                            <Input 
                              value={item.name}
                              onChange={(e) => updateItem(item.id, { name: e.target.value })}
                              className="h-8"
                            />
                          ) : (
                            <div className="font-medium">{item.name}</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingItemId === item.id ? (
                            <select 
                              value={item.category}
                              onChange={(e) => updateItem(item.id, { category: e.target.value as SalaryItem["category"] })}
                              className="w-full border rounded px-2 py-1"
                            >
                              <option value="세금">세금</option>
                              <option value="사회보험">사회보험</option>
                              <option value="기타">기타</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.category === "세금" ? "bg-red-100 text-red-800" :
                              item.category === "사회보험" ? "bg-blue-100 text-blue-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {item.category}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingItemId === item.id ? (
                            <div className="flex gap-2">
                              <Input 
                                type="number"
                                placeholder="금액"
                                value={item.amount !== null ? item.amount : ''}
                                onChange={(e) => updateItem(item.id, { amount: e.target.value ? Number(e.target.value) : null })}
                                className="h-8 w-24"
                              />
                              <Input 
                                type="number"
                                placeholder="비율 (%)"
                                value={item.rate !== null ? item.rate : ''}
                                onChange={(e) => updateItem(item.id, { rate: e.target.value ? Number(e.target.value) : null })}
                                className="h-8 w-24"
                              />
                            </div>
                          ) : (
                            <div>
                              {item.amount !== null && <div>{formatNumber(item.amount)}원</div>}
                              {item.rate !== null && <div>{item.rate}%</div>}
                              {item.amount === null && item.rate === null && <div className="text-muted-foreground">변동</div>}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingItemId === item.id ? (
                            <select 
                              value={item.taxable ? "true" : "false"}
                              onChange={(e) => updateItem(item.id, { taxable: e.target.value === "true" })}
                              className="w-full border rounded px-2 py-1"
                            >
                              <option value="true">과세</option>
                              <option value="false">비과세</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.taxable ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                            }`}>
                              {item.taxable ? "과세" : "비과세"}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editingItemId === item.id ? (
                            <Input 
                              value={item.description}
                              onChange={(e) => updateItem(item.id, { description: e.target.value })}
                              className="h-8"
                            />
                          ) : (
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleEditing(item.id)}
                            >
                              {editingItemId === item.id ? "저장" : "수정"}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500"
                              onClick={() => deleteItem(item.id)}
                            >
                              삭제
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredItems.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-muted-foreground">
                          공제 항목이 없습니다. 새 항목을 추가해주세요.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 