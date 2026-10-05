$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$readmePath = Join-Path $repoRoot 'README.md'
$readme = Get-Content -Raw -LiteralPath $readmePath

$courses = @(
    @{ Slug = 'n8n-ai-mastery'; Url = 'https://cursos.asllanmaciel.com.br/curso/n8n-ai-mastery' },
    @{ Slug = 'supabase-pro'; Url = 'https://cursos.asllanmaciel.com.br/curso/supabase-pro' },
    @{ Slug = 'wpan'; Url = 'https://cursos.asllanmaciel.com.br/curso/wpan' },
    @{ Slug = 'primeiro-cliente'; Url = 'https://cursos.asllanmaciel.com.br/cursos/kit-freela/' }
)

foreach ($course in $courses) {
    $assetRef = "./assets/courses/$($course.Slug)-card.svg"
    $assetPath = Join-Path $repoRoot ($assetRef -replace '^\./', '')

    if (-not (Test-Path -LiteralPath $assetPath)) {
        throw "Missing course card: $assetRef"
    }
    if (-not $readme.Contains($assetRef)) {
        throw "README does not reference course card: $assetRef"
    }
    if (-not $readme.Contains($course.Url)) {
        throw "README does not link course: $($course.Url)"
    }
}

if ($readme -match 'assets/courses/[^"'']+-card\.png') {
    throw 'README still references a generated raster course card'
}

if (-not $readme.Contains('Explorar todos os cursos, formações e labs')) {
    throw 'README is missing the complete-catalog call to action'
}

Write-Output 'PROFILE_COURSES_OK=4'
