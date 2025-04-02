"use client";

import { useState, useEffect, useRef } from "react";
import Grid from "@toast-ui/react-grid";
import "tui-grid/dist/tui-grid.css";

interface TaskData {
  id: number;
  title: string;
  start: string;
  dueDate: string;
  progress: number;
  status: string;
  [key: string]: any;
}

export default function SortableGrid() {
  const gridRef = useRef<Grid>(null);
  const [data] = useState<TaskData[]>([
    {
      id: 1,
      title: "프로젝트 기획",
      start: "2024-03-01",
      dueDate: "2024-03-15",
      progress: 30,
      status: "진행중"
    },
    {
      id: 2,
      title: "디자인 작업",
      start: "2024-03-15",
      dueDate: "2024-03-30",
      progress: 0,
      status: "대기"
    },
    {
      id: 3,
      title: "개발 작업",
      start: "2024-03-30",
      dueDate: "2024-04-15",
      progress: 0,
      status: "대기"
    },
    {
      id: 4,
      title: "테스트",
      start: "2024-04-15",
      dueDate: "2024-04-30",
      progress: 0,
      status: "대기"
    }
  ]);

  const columns = [
    {
      name: "id",
      header: "ID",
      width: 60,
      align: "center" as const,
      sortable: true
    },
    {
      name: "title",
      header: "제목",
      width: 200,
      sortable: true
    },
    {
      name: "start",
      header: "시작일",
      width: 100,
      sortable: true
    },
    {
      name: "dueDate",
      header: "마감일",
      width: 100,
      sortable: true
    },
    {
      name: "progress",
      header: "진행률",
      width: 100,
      align: "center" as const,
      sortable: true,
      renderer: {
        type: "text",
        customRenderer: {
          type: "text",
          render: (props: any) => {
            return `${props.value}%`;
          }
        }
      }
    },
    {
      name: "status",
      header: "상태",
      width: 100,
      align: "center" as const,
      sortable: true
    }
  ];

  useEffect(() => {
    const grid = gridRef.current;
    return () => {
      if (grid) {
        try {
          const instance = grid.getInstance();
          if (instance) {
            instance.destroy();
          }
        } catch (error) {
          console.error("Grid cleanup error:", error);
        }
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">정렬 가능한 그리드</h1>
      <div className="border rounded-lg">
        <Grid
          ref={gridRef}
          data={data}
          columns={columns}
          rowHeight={40}
          bodyHeight={400}
          rowHeaders={["rowNum"]}
          usageStatistics={false}
        />
      </div>
    </div>
  );
} 