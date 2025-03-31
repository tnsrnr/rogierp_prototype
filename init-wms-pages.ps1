# WMS 페이지 초기화 스크립트

$wmsPages = @(
    @{
        Path = "app/WMS/outbound/WMS0201/page.tsx"
        Title = "출고 주문 등록"
        Description = "출고 주문을 등록하고 관리합니다."
    },
    @{
        Path = "app/WMS/outbound/WMS0202/page.tsx"
        Title = "피킹 지시"
        Description = "출고를 위한 피킹 작업을 지시합니다."
    },
    @{
        Path = "app/WMS/reports_stats/WMS0801/page.tsx"
        Title = "입고 현황/통계"
        Description = "입고 작업의 현황과 통계를 조회합니다."
    },
    @{
        Path = "app/WMS/reports_stats/WMS0802/page.tsx"
        Title = "출고 현황/통계"
        Description = "출고 작업의 현황과 통계를 조회합니다."
    },
    @{
        Path = "app/WMS/reports_stats/WMS0803/page.tsx"
        Title = "재고 현황 보고"
        Description = "재고 현황을 조회하고 보고서를 생성합니다."
    },
    @{
        Path = "app/WMS/reports_stats/WMS0804/page.tsx"
        Title = "재고 이력 보고"
        Description = "재고 변동 이력을 조회하고 보고서를 생성합니다."
    },
    @{
        Path = "app/WMS/reports_stats/WMS0805/page.tsx"
        Title = "재고 실사 결과"
        Description = "재고 실사 결과를 조회하고 보고서를 생성합니다."
    },
    @{
        Path = "app/WMS/reports_stats/WMS0806/page.tsx"
        Title = "재고 회전율 분석"
        Description = "재고 회전율을 분석하고 보고서를 생성합니다."
    },
    @{
        Path = "app/WMS/reports_stats/WMS0807/page.tsx"
        Title = "ABC 분류 분석"
        Description = "재고의 ABC 분류 분석을 수행합니다."
    },
    @{
        Path = "app/WMS/reports_stats/WMS0808/page.tsx"
        Title = "작업자별 실적 통계"
        Description = "작업자별 실적을 분석하고 통계를 생성합니다."
    }
)

foreach ($page in $wmsPages) {
    $directory = Split-Path -Parent $page.Path
    if (-not (Test-Path $directory)) {
        New-Item -ItemType Directory -Path $directory -Force
    }

    $content = @"
"use client";

export default function $($page.Path.Split('/')[-2])Page() {
  return (
    <div>
      <h1>$($page.Title)</h1>
      <p>$($page.Description)</p>
    </div>
  );
}
"@

    Set-Content -Path $page.Path -Value $content -Force
    Write-Host "Created $($page.Path)"
} 