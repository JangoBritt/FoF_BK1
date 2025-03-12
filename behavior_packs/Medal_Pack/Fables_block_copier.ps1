[CmdletBinding()]
Param
    (
    [Parameter(Mandatory=$true,ValueFromPipeline=$true,HelpMessage="Unique filename prefix:")]
    [System.String]
    $searchCriteria,

    [Parameter(Mandatory=$true,ValueFromPipeline=$true,HelpMessage="Unique filename prefix:")]
    [System.String]
    $replacementString

    )
# Define the folder path and the file pattern to match


#$replacementString = "white_concrete"  # The text to replace the search criteria with

$sourceFolder = "C:\Users\adam\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\minecraftWorlds\FoF_Bk1\behavior_packs\Medal_Pack"
$destinationFolder = $sourceFolder
$filePattern = "*black_concrete*.json"  # Replace with your desired filename or pattern, e.g., "example.txt"
#$searchCriteria = "black_concrete"  # The text to find and replace


# Create the destination folder if it doesn't exist
if (-not (Test-Path -Path $destinationFolder)) {
    New-Item -ItemType Directory -Path $destinationFolder
}

# Find matching files recursively, duplicate them, and process the new filename and file content
$thisList = Get-ChildItem -Filter $filePattern -Recurse 

foreach ($thisItem in $thisList) {
    # Modify the filename
    $originalNameWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($thisItem.Name)
    $fileExtension = $thisItem.Extension
    $newFileName = $originalNameWithoutExtension -replace $searchCriteria, $replacementString
    $newFileName += $fileExtension
    $newFilePath = Join-Path -Path $thisItem.DirectoryName -ChildPath $newFileName

    # Copy the file to the new destination
    Copy-Item -Path $thisItem.FullName -Destination $newFilePath

    # Replace text within the file content
    (Get-Content -Path $newFilePath) -replace $searchCriteria, $replacementString | Set-Content -Path $newFilePath
}

Write-Host "Files have been duplicated and modified with new filenames and updated content recursively!"
