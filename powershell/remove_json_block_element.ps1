
#### Variables     

#Full Folder Path to BP/Blocks folder

#  $blockspath = "C:\Users\adam\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\minecraftWorlds\ACS6_V1.0\behavior_packs\MFV6.3_BP\blocks”
#  $blockspath = "C:\Users\adam\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\minecraftWorlds\ACS6_V1.0\behavior_packs\MrCrayFish\blocks"
$blockspath = "C:\Users\adam\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\minecraftWorlds\ACS6_V1.0\behavior_packs\MrCrayFish\blocks\MrCray"

#################

function Format-Json {
    <#
    .SYNOPSIS
        Prettifies JSON output.
        Version January 3rd 2024
        Fixes:
            - empty [] or {} or in-line arrays as per https://stackoverflow.com/a/71664664/9898643
              by Widlov (https://stackoverflow.com/users/1716283/widlov)
            - Unicode Apostrophs \u0027 as written by ConvertTo-Json are replaced with regular single quotes "'"
            - multiline empty [] or {} are converted into inline arrays or objects
    .DESCRIPTION
        Reformats a JSON string so the output looks better than what ConvertTo-Json outputs.
    .PARAMETER Json
        Required: [string] The JSON text to prettify.
    .PARAMETER Minify
        Optional: Returns the json string compressed.
    .PARAMETER Indentation
        Optional: The number of spaces (1..1024) to use for indentation. Defaults to 2.
    .PARAMETER AsArray
        Optional: If set, the output will be in the form of a string array, otherwise a single string is output.
    .EXAMPLE
        $json | ConvertTo-Json | Format-Json -Indentation 4
    .OUTPUTS
        System.String or System.String[] (the latter when parameter AsArray is set)
    #>
    [CmdletBinding(DefaultParameterSetName = 'Prettify')]
    Param(
        [Parameter(Mandatory = $true, Position = 0, ValueFromPipeline = $true)]
        [string]$Json,

        [Parameter(ParameterSetName = 'Minify')]
        [switch]$Minify,

        [Parameter(ParameterSetName = 'Prettify')]
        [ValidateRange(1, 1024)]
        [int]$Indentation = 2,

        [Parameter(ParameterSetName = 'Prettify')]
        [switch]$AsArray
    )

    if ($PSCmdlet.ParameterSetName -eq 'Minify') {
        return ($Json | ConvertFrom-Json) | ConvertTo-Json -Depth 100 -Compress
    }

    # If the input JSON text has been created with ConvertTo-Json -Compress
    # then we first need to reconvert it without compression
    if ($Json -notmatch '\r?\n') {
        $Json = ($Json | ConvertFrom-Json) | ConvertTo-Json -Depth 100
    }

    $indent = 0
    $regexUnlessQuoted = '(?=([^"]*"[^"]*")*[^"]*$)'

    $result = ($Json -split '\r?\n' | ForEach-Object {
        # If the line contains a ] or } character, 
        # we need to decrement the indentation level unless:
        #   - it is inside quotes, AND
        #   - it does not contain a [ or {
        if (($_ -match "[}\]]$regexUnlessQuoted") -and ($_ -notmatch "[\{\[]$regexUnlessQuoted")) {
            $indent = [Math]::Max($indent - $Indentation, 0)
        }

        # Replace all colon-space combinations by ": " unless it is inside quotes.
        $line = (' ' * $indent) + ($_.TrimStart() -replace ":\s+$regexUnlessQuoted", ': ')

        # If the line contains a [ or { character, 
        # we need to increment the indentation level unless:
        #   - it is inside quotes, AND
        #   - it does not contain a ] or }
        if (($_ -match "[\{\[]$regexUnlessQuoted") -and ($_ -notmatch "[}\]]$regexUnlessQuoted")) {
            $indent += $Indentation
        }

        # ConvertTo-Json returns all single-quote characters as Unicode Apostrophs \u0027
        # see: https://stackoverflow.com/a/29312389/9898643
        $line -replace '\\u0027', "'"

    # join the array with newlines and convert multiline empty [] or {} into inline arrays or objects
    }) -join [Environment]::NewLine -replace '(\[)\s+(\])', '$1$2' -replace '(\{)\s+(\})', '$1$2'

    if ($AsArray) { return ,[string[]]($result -split '\r?\n') }
    $result
}



$jsonlist = Get-ChildItem -Path $blockspath -Recurse -Filter *.json
$i = 0;
foreach ($filename in $jsonlist) {
#    $i++
#    $percent = ([math]::ceiling($i/$jsonlist.FullName.Count))#

#    Write-Progress -Activity "Processing Files" -Status "$percent % Complete:" -PercentComplete $percent
    write-host $filename.Name
    $removeStaging = Get-Content $filename.FullName -Raw  | ConvertFrom-Json

    $removeStaging.'minecraft:block' = $removeStaging.'minecraft:block' | Select-Object * -ExcludeProperty events

    $removeStaging.'minecraft:block'.components = $removeStaging.'minecraft:block'.components | Select-Object * -ExcludeProperty 'minecraft:on_placed'
    $removeStaging.'minecraft:block'.components = $removeStaging.'minecraft:block'.components | Select-Object * -ExcludeProperty 'minecraft:on_player_placing'
    $removeStaging.'minecraft:block'.components = $removeStaging.'minecraft:block'.components | Select-Object * -ExcludeProperty 'minecraft:queued_ticking'
    $removeStaging.'minecraft:block'.components = $removeStaging.'minecraft:block'.components | Select-Object * -ExcludeProperty 'minecraft:creative_category'

    $removeStaging | ConvertTo-Json -depth 100 | Format-Json | Set-Content $filename.FullName
}