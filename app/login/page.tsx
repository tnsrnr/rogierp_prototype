"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // 여기서 실제 로그인 로직을 구현할 수 있습니다.
    // 예시로 ID와, Password가 admin일 때만 로그인 성공
    try {
      // API 호출을 모방한 타임아웃
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (userId === "admin" && password === "admin") {
        // 로그인 성공 - 대시보드 페이지로 이동
        router.push("/");
      } else {
        // 로그인 실패
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (_) {
      setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">ERP 시스템 로그인</CardTitle>
          <CardDescription className="text-center">
            ERP 시스템에 로그인하려면 아이디와 비밀번호를 입력하세요.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="userId">아이디</label>
              <Input
                id="userId"
                type="text"
                placeholder="아이디를 입력하세요"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">비밀번호</label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>
            {error && (
              <div className="text-sm font-medium text-red-500">{error}</div>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 