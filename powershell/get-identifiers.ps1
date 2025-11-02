$folderPath = "C:\Users\adam\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\minecraftWorlds\FoF_Bk1\behavior_packs\BnB_B\items"

function Remove-Comments {
    param([string]$text)
    return ($text -split "`n" | ForEach-Object {
        ($_ -replace '^\s*//.*$', '') -replace '(?<!http:|https:)//.*$', ''
    }) -join "`n"
}

function Find-FirstIdentifier {
    param($json, $file)
    $stack = @($json)
    while ($stack.Count -gt 0) {
        $current = $stack[0]
        $stack = $stack[1..($stack.Count - 1)]

        if ($current -is [psobject]) {
            $props = $current.PSObject.Properties
            foreach ($prop in $props) {
                if ($prop.Name -eq 'identifier') {
                    Write-Output "$($prop.Value)"
                    return  # Exit after finding the first identifier
                }
                $stack += $prop.Value
            }
        } elseif ($current -is [System.Collections.IEnumerable] -and $current -notlike [string]) {
            $stack += $current
        }
    }
}



Get-ChildItem -Path $folderPath -Recurse -Filter *.json | ForEach-Object {
    $filePath = $_.FullName
    try {
        $raw = Get-Content $filePath -Raw -Encoding UTF8
        $clean = Remove-Comments -text $raw
        $parsed = $clean | ConvertFrom-Json -ErrorAction Stop
        Find-FirstIdentifier -json $parsed -file $filePath
    } catch {
        Write-Warning "Could not parse $filePath : $_"
    }
}
