"use client";

import Link from "next/link";
import { Grid, Filter, ArrowRight } from "lucide-react";

export default function GridExamples() {
  const examples = [
    {
      title: "기본 그리드",
      description: "기본적인 그리드 기능을 보여주는 예제입니다.",
      path: "/ADM/grid-examples/basic",
      icon: <Grid className="w-6 h-6" />
    },
    {
      title: "정렬 가능한 그리드",
      description: "컬럼별 정렬 기능이 있는 그리드 예제입니다.",
      path: "/ADM/grid-examples/sortable",
      icon: <ArrowRight className="w-6 h-6" />
    },
    {
      title: "필터링 가능한 그리드",
      description: "컬럼별 필터링 기능이 있는 그리드 예제입니다.",
      path: "/ADM/grid-examples/filtering",
      icon: <Filter className="w-6 h-6" />
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Toast UI Grid 예제</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {examples.map((example) => (
          <Link
            key={example.path}
            href={example.path}
            className="block p-6 bg-card rounded-lg border hover:border-primary transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                {example.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{example.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {example.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 