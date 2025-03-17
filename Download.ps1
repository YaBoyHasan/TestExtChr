# Get the current user's Downloads directory path
$downloadsPath = [System.IO.Path]::Combine($env:USERPROFILE, 'Downloads')

# Set the folder name and create the full path
$folderName = "ChromeSyncHelper"
$folderPath = [System.IO.Path]::Combine($downloadsPath, $folderName)

# Create the folder if it doesn't exist
if (-not (Test-Path -Path $folderPath)) {
    New-Item -Path $folderPath -ItemType Directory
    Write-Host "Folder 'ChromeSyncHelper' created in Downloads."
} else {
    Write-Host "Folder 'ChromeSyncHelper' already exists."
}

# Set the URLs for the manifest.json and content.js files
$manifestUrl = "https://raw.githubusercontent.com/YaBoyHasan/TestExtChr/refs/heads/main/manifest.json"  # Replace with the actual URL for manifest.json
$contentUrl = "https://raw.githubusercontent.com/YaBoyHasan/TestExtChr/refs/heads/main/content.js"      # Replace with the actual URL for content.js

# Set the full paths to save the files
$manifestPath = [System.IO.Path]::Combine($folderPath, "manifest.json")
$contentPath = [System.IO.Path]::Combine($folderPath, "content.js")

# Download the manifest.json file
try {
    Invoke-WebRequest -Uri $manifestUrl -OutFile $manifestPath
    Write-Host "manifest.json downloaded successfully."
} catch {
    Write-Host "Failed to download manifest.json. Error: $_"
}

# Download the content.js file
try {
    Invoke-WebRequest -Uri $contentUrl -OutFile $contentPath
    Write-Host "content.js downloaded successfully."
} catch {
    Write-Host "Failed to download content.js. Error: $_"
}