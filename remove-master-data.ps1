# master_data 폴더 삭제 스크립트
$path = "app/WMS/master_data"
if (Test-Path $path) {
    Remove-Item -Path $path -Recurse -Force
    Write-Host "Deleted $path"
} else {
    Write-Host "Directory not found: $path"
} 