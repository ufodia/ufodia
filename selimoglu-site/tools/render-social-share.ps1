param([string]$OutputDirectory = (Join-Path $PSScriptRoot '..\assets'))
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$OutputDirectory = [IO.Path]::GetFullPath($OutputDirectory)
$markPath = Join-Path $OutputDirectory 'foundry-mark-v2.svg'
[xml]$markXml = Get-Content -LiteralPath $markPath -Raw
$sourcePath = [string]$markXml.svg.path.d
$expectedPath = 'M58 16H30L17 29V39L45 49H51V53L46 58H22V66H50L63 53V43L35 33H29V29L34 24H58Z'
if ($sourcePath -ne $expectedPath) { throw 'The source mark changed; review its export geometry before rendering.' }
$svg = @"
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title description">
<title id="title">Selimoglu Idea Foundry — Ideas take shape.</title>
<desc id="description">Software experiments. Practical tools. New possibilities. selimoglu.org</desc>
<rect width="1200" height="630" fill="#101c2c"/>
<path d="M74 497H1126" fill="none" stroke="#f3f0e8" stroke-opacity=".22"/>
<svg x="70" y="58" width="88" height="88" viewBox="0 0 80 80">
<rect x=".5" y=".5" width="79" height="79" rx="15.5" fill="#121c31" stroke="#f3f0e8" stroke-opacity=".2"/>
<path d="$sourcePath" fill="#f3f0e8"/>
<rect x="60" y="8" width="10" height="10" rx="1" fill="#d6ec69"/>
</svg>
<text x="184" y="108" fill="#f3f0e8" font-family="Georgia, serif" font-size="58">Selimoglu</text>
<text x="188" y="138" fill="#d6ee79" font-family="Arial, sans-serif" font-weight="700" font-size="15" letter-spacing="4">IDEA FOUNDRY</text>
<text x="70" y="333" fill="#f3f0e8" font-family="Georgia, serif" font-size="78" letter-spacing="-2.6">Ideas take shape.</text>
<text x="74" y="396" fill="#c9d0d8" font-family="Arial, sans-serif" font-size="23">Software experiments. Practical tools. New possibilities.</text>
<g fill="none" stroke="#f3f0e8" stroke-opacity=".12">
<path d="M904 199V437M965 199V437M1026 199V437M1087 199V437M1148 199V437M904 199H1148M904 260H1148M904 321H1148M904 382H1148M904 437H1148"/>
</g>
<path d="M930 247L1040 207L1122 260L1012 301Z" fill="#f3f0e8" fill-opacity=".06" stroke="#f3f0e8" stroke-opacity=".45"/>
<path d="M930 247V351L1012 405V301Z" fill="#f3f0e8" fill-opacity=".035" stroke="#f3f0e8" stroke-opacity=".35"/>
<path d="M1012 301L1122 260V365L1012 405Z" fill="#d6ee79"/>
<path d="M1012 301L1080 278V381L1012 405Z" fill="#101c2c" fill-opacity=".12"/>
<rect x="903" y="192" width="13" height="13" rx="1" fill="#d6ee79"/>
<text x="74" y="561" fill="#f3f0e8" font-family="Arial, sans-serif" font-weight="700" font-size="23">selimoglu.org</text>
<path d="M1082 552H1125M1112 539L1125 552L1112 565" fill="none" stroke="#d6ee79" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
"@
[IO.File]::WriteAllText((Join-Path $OutputDirectory 'social-share-v1.svg'), $svg, [Text.UTF8Encoding]::new($false))
function Color([string]$hex,[int]$alpha=255) { [Drawing.Color]::FromArgb($alpha,[Convert]::ToInt32($hex.Substring(1,2),16),[Convert]::ToInt32($hex.Substring(3,2),16),[Convert]::ToInt32($hex.Substring(5,2),16)) }
function Brush([string]$hex,[int]$alpha=255) { [Drawing.SolidBrush]::new((Color $hex $alpha)) }
function Pen([string]$hex,[single]$width=1,[int]$alpha=255) { [Drawing.Pen]::new((Color $hex $alpha),$width) }
function Polygon($graphics,$coordinates,$fill,$outline=$null) {
    [Drawing.PointF[]]$points = for($i=0;$i -lt $coordinates.Count;$i+=2) { [Drawing.PointF]::new($coordinates[$i],$coordinates[$i+1]) }
    if($fill) {$graphics.FillPolygon($fill,$points)}
    if($outline) {$graphics.DrawPolygon($outline,$points)}
}
function RoundedRectangle($graphics,$brush,$pen,[single]$x,[single]$y,[single]$w,[single]$h,[single]$r) {
    $p=[Drawing.Drawing2D.GraphicsPath]::new(); $d=$r*2
    $p.AddArc($x,$y,$d,$d,180,90); $p.AddArc($x+$w-$d,$y,$d,$d,270,90); $p.AddArc($x+$w-$d,$y+$h-$d,$d,$d,0,90); $p.AddArc($x,$y+$h-$d,$d,$d,90,90); $p.CloseFigure()
    if($brush) {$graphics.FillPath($brush,$p)}; if($pen) {$graphics.DrawPath($pen,$p)}; $p.Dispose()
}
function Draw-Mark($g,[single]$x,[single]$y,[single]$size) {
    $state=$g.Save(); $g.TranslateTransform($x,$y); $g.ScaleTransform($size/80,$size/80)
    RoundedRectangle $g (Brush '#121c31') (Pen '#f3f0e8' 1 51) .5 .5 79 79 15.5
    Polygon $g @(58,16,30,16,17,29,17,39,45,49,51,49,51,53,46,58,22,58,22,66,50,66,63,53,63,43,35,33,29,33,29,29,34,24,58,24) (Brush '#f3f0e8')
    RoundedRectangle $g (Brush '#d6ec69') $null 60 8 10 10 1
    $g.Restore($state)
}
function Text($g,[string]$text,[string]$family,[single]$size,[string]$hex,[single]$x,[single]$y,[bool]$bold=$false) {
    $style=if($bold){[Drawing.FontStyle]::Bold}else{[Drawing.FontStyle]::Regular}
    $font=[Drawing.Font]::new($family,$size,$style,[Drawing.GraphicsUnit]::Pixel)
    $format=[Drawing.StringFormat]::GenericTypographic
    $g.DrawString($text,$font,(Brush $hex),[Drawing.PointF]::new($x,$y),$format); $font.Dispose()
}
function New-Canvas([int]$width,[int]$height) {
    $b=[Drawing.Bitmap]::new($width,$height,[Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g=[Drawing.Graphics]::FromImage($b); $g.SmoothingMode='AntiAlias'; $g.PixelOffsetMode='HighQuality'; $g.TextRenderingHint='AntiAliasGridFit'
    return @($b,$g)
}
$canvas=New-Canvas 1200 630; $bitmap=$canvas[0]; $g=$canvas[1]
$g.Clear((Color '#101c2c'))
$g.DrawLine((Pen '#f3f0e8' 1 56),74,497,1126,497)
Draw-Mark $g 70 58 88
Text $g 'Selimoglu' 'Georgia' 58 '#f3f0e8' 184 52
$label='IDEA FOUNDRY'; $position=188
foreach($character in $label.ToCharArray()) { Text $g ([string]$character) 'Arial' 15 '#d6ee79' $position 121 $true; $position += if($character -eq ' '){9}else{13.5} }
Text $g 'Ideas take shape.' 'Georgia' 78 '#f3f0e8' 70 248
Text $g 'Software experiments. Practical tools. New possibilities.' 'Arial' 23 '#c9d0d8' 74 374
$gridPen=Pen '#f3f0e8' 1 31
foreach($x in @(904,965,1026,1087,1148)) {$g.DrawLine($gridPen,$x,199,$x,437)}
foreach($y in @(199,260,321,382,437)) {$g.DrawLine($gridPen,904,$y,1148,$y)}
Polygon $g @(930,247,1040,207,1122,260,1012,301) (Brush '#f3f0e8' 15) (Pen '#f3f0e8' 1 115)
Polygon $g @(930,247,930,351,1012,405,1012,301) (Brush '#f3f0e8' 9) (Pen '#f3f0e8' 1 89)
Polygon $g @(1012,301,1122,260,1122,365,1012,405) (Brush '#d6ee79')
Polygon $g @(1012,301,1080,278,1080,381,1012,405) (Brush '#101c2c' 31)
RoundedRectangle $g (Brush '#d6ee79') $null 903 192 13 13 1
Text $g 'selimoglu.org' 'Arial' 23 '#f3f0e8' 74 536 $true
$arrowPen=Pen '#d6ee79' 2; $g.DrawLine($arrowPen,1082,552,1125,552); $g.DrawLine($arrowPen,1112,539,1125,552); $g.DrawLine($arrowPen,1125,552,1112,565)
$bitmap.Save((Join-Path $OutputDirectory 'social-share-v1.png'),[Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bitmap.Dispose()
$icon=New-Canvas 512 512; $iconBitmap=$icon[0]; $iconGraphics=$icon[1]
$iconGraphics.Clear([Drawing.Color]::Transparent); Draw-Mark $iconGraphics 0 0 512
$iconBitmap.Save((Join-Path $OutputDirectory 'foundry-mark-v2-512.png'),[Drawing.Imaging.ImageFormat]::Png)
$iconGraphics.Dispose(); $iconBitmap.Dispose()
Get-Item -LiteralPath (Join-Path $OutputDirectory 'social-share-v1.svg'),(Join-Path $OutputDirectory 'social-share-v1.png'),(Join-Path $OutputDirectory 'foundry-mark-v2-512.png') | Select-Object Name,Length
