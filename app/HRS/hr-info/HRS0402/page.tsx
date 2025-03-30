"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  Printer, 
  Edit,
  Mail,
  Phone,
  Building,
  UserCircle,
  Briefcase,
  GraduationCap,
  Award,
  CreditCard,
  HeartPulse,
  ShieldCheck
} from "lucide-react";

export default function EmployeeDetailPage() {
  const [activeTab, setActiveTab] = useState<string>("기본정보");
  
  // 더미 직원 상세 데이터
  const employeeData = {
    id: "EMP001",
    name: "홍길동",
    profileImage: "https://i.pravatar.cc/300",
    department: "개발팀",
    position: "과장",
    email: "hong@example.com",
    phone: "010-1234-5678",
    joinDate: "2020-03-15",
    status: "재직",
    address: "서울특별시 강남구 테헤란로 123",
    birthDate: "1988-05-15",
    emergencyContact: "홍부모 (010-8765-4321)",
    
    // 인사 정보
    hrInfo: {
      employeeNumber: "2020-0315",
      employeeType: "정규직",
      contractPeriod: "무기한",
      workHours: "09:00 - 18:00",
      division: "기술본부",
      team: "프론트엔드팀",
      reportTo: "김팀장 (팀장)",
      location: "서울 본사",
      extension: "1234"
    },
    
    // 급여 정보
    paymentInfo: {
      bankName: "국민은행",
      accountNumber: "123-45-6789-01",
      accountHolder: "홍길동",
      basicSalary: 4500000,
      lastPaymentDate: "2023-05-25"
    },
    
    // 학력 정보
    education: [
      {
        school: "서울대학교",
        degree: "학사",
        major: "컴퓨터공학",
        period: "2007-03 ~ 2011-02"
      },
      {
        school: "서울과학기술고등학교",
        degree: "고등학교",
        major: "이과",
        period: "2004-03 ~ 2007-02"
      }
    ],
    
    // 경력 정보
    career: [
      {
        company: "ABC 기술",
        position: "주니어 개발자",
        period: "2011-03 ~ 2015-02",
        description: "프론트엔드 개발 및 유지보수"
      },
      {
        company: "XYZ 소프트웨어",
        position: "선임 개발자",
        period: "2015-03 ~ 2020-02",
        description: "React 기반 웹 애플리케이션 개발"
      }
    ],
    
    // 자격증 정보
    certifications: [
      {
        name: "정보처리기사",
        issuer: "한국산업인력공단",
        acquiredDate: "2011-05-20"
      },
      {
        name: "AWS 공인 솔루션스 아키텍트",
        issuer: "Amazon Web Services",
        acquiredDate: "2018-11-05"
      }
    ],
    
    // 복지혜택 정보
    benefits: {
      insurance: ["국민연금", "건강보험", "고용보험", "산재보험"],
      additionalBenefits: ["단체상해보험", "치과보험"],
      stockOptions: "스톡옵션 5000주 (부여일: 2021-03-15)"
    }
  };

  // 숫자 포맷팅 함수
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button onClick={() => window.history.back()} className="text-blue-600 hover:underline">
            ← 목록으로 돌아가기
          </button>
          <h1 className="text-2xl font-bold ml-4">직원 상세 정보</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            내보내기
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            인쇄
          </Button>
          <Button size="sm">
            <Edit className="mr-2 h-4 w-4" />
            정보 수정
          </Button>
        </div>
      </div>

      {/* 직원 기본 정보 카드 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="shrink-0">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                <img 
                  src={employeeData.profileImage} 
                  alt={employeeData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">이름</p>
                  <p className="text-lg font-semibold">{employeeData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">사번</p>
                  <p className="font-medium">{employeeData.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">부서/직급</p>
                  <p className="font-medium">{employeeData.department} / {employeeData.position}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">이메일</p>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1 text-muted-foreground" />
                    <p className="font-medium">{employeeData.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">연락처</p>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                    <p className="font-medium">{employeeData.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">입사일</p>
                  <p className="font-medium">{employeeData.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">상태</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    employeeData.status === "재직" ? "bg-green-100 text-green-800" :
                    employeeData.status === "휴직" ? "bg-amber-100 text-amber-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {employeeData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 탭 컨텐츠 */}
      <Tabs defaultValue="기본정보" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-7 w-full">
          <TabsTrigger value="기본정보">기본정보</TabsTrigger>
          <TabsTrigger value="인사정보">인사정보</TabsTrigger>
          <TabsTrigger value="급여정보">급여정보</TabsTrigger>
          <TabsTrigger value="학력/경력">학력/경력</TabsTrigger>
          <TabsTrigger value="자격증">자격증</TabsTrigger>
          <TabsTrigger value="혜택정보">혜택정보</TabsTrigger>
          <TabsTrigger value="평가정보">평가정보</TabsTrigger>
        </TabsList>
        
        {/* 기본정보 탭 */}
        <TabsContent value="기본정보" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCircle className="mr-2 h-5 w-5" />
                개인 기본정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">생년월일</p>
                    <p className="font-medium">{employeeData.birthDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">주소</p>
                    <p className="font-medium">{employeeData.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">긴급 연락처</p>
                    <p className="font-medium">{employeeData.emergencyContact}</p>
                  </div>
                </div>
                <div>
                  {/* 추가 정보가 필요하면 여기에 배치 */}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 인사정보 탭 */}
        <TabsContent value="인사정보" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                인사 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">사원번호</p>
                    <p className="font-medium">{employeeData.hrInfo.employeeNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">고용 형태</p>
                    <p className="font-medium">{employeeData.hrInfo.employeeType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">계약 기간</p>
                    <p className="font-medium">{employeeData.hrInfo.contractPeriod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">근무 시간</p>
                    <p className="font-medium">{employeeData.hrInfo.workHours}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">소속 본부</p>
                    <p className="font-medium">{employeeData.hrInfo.division}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">소속 팀</p>
                    <p className="font-medium">{employeeData.hrInfo.team}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">보고 대상</p>
                    <p className="font-medium">{employeeData.hrInfo.reportTo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">근무지</p>
                    <p className="font-medium">{employeeData.hrInfo.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">내선 번호</p>
                    <p className="font-medium">{employeeData.hrInfo.extension}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 급여정보 탭 */}
        <TabsContent value="급여정보" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                급여 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">기본급</p>
                    <p className="font-medium">{formatNumber(employeeData.paymentInfo.basicSalary)}원</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">마지막 급여 지급일</p>
                    <p className="font-medium">{employeeData.paymentInfo.lastPaymentDate}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">계좌 은행</p>
                    <p className="font-medium">{employeeData.paymentInfo.bankName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">계좌 번호</p>
                    <p className="font-medium">{employeeData.paymentInfo.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">예금주</p>
                    <p className="font-medium">{employeeData.paymentInfo.accountHolder}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                급여 내역 조회
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* 학력/경력 탭 */}
        <TabsContent value="학력/경력" className="mt-4">
          <div className="grid grid-cols-1 gap-6">
            {/* 학력 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  학력 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                {employeeData.education.map((edu, index) => (
                  <div key={index} className="mb-4 last:mb-0 p-4 border rounded-md">
                    <div className="flex justify-between">
                      <div className="font-medium">{edu.school}</div>
                      <div className="text-sm text-muted-foreground">{edu.period}</div>
                    </div>
                    <div className="mt-1 text-sm">
                      {edu.degree} - {edu.major}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* 경력 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  경력 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                {employeeData.career.map((career, index) => (
                  <div key={index} className="mb-4 last:mb-0 p-4 border rounded-md">
                    <div className="flex justify-between">
                      <div className="font-medium">{career.company}</div>
                      <div className="text-sm text-muted-foreground">{career.period}</div>
                    </div>
                    <div className="mt-1 text-sm font-medium">
                      {career.position}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {career.description}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* 자격증 탭 */}
        <TabsContent value="자격증" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                자격증
              </CardTitle>
            </CardHeader>
            <CardContent>
              {employeeData.certifications.map((cert, index) => (
                <div key={index} className="mb-4 last:mb-0 p-4 border rounded-md">
                  <div className="flex justify-between">
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-sm text-muted-foreground">취득일: {cert.acquiredDate}</div>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    발행처: {cert.issuer}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                자격증 추가
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* 혜택정보 탭 */}
        <TabsContent value="혜택정보" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HeartPulse className="mr-2 h-5 w-5" />
                복지 혜택
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">4대보험</h3>
                  <div className="space-y-1">
                    {employeeData.benefits.insurance.map((ins, index) => (
                      <div key={index} className="flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />
                        <span>{ins}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="font-medium mt-4 mb-2">추가 보험</h3>
                  <div className="space-y-1">
                    {employeeData.benefits.additionalBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">스톡 옵션</h3>
                  <div className="p-3 border rounded-md">
                    {employeeData.benefits.stockOptions}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 평가정보 탭 */}
        <TabsContent value="평가정보" className="mt-4">
          <Card className="min-h-[200px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>평가 정보가 아직 입력되지 않았습니다.</p>
              <Button variant="outline" className="mt-4">
                평가 정보 추가
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 