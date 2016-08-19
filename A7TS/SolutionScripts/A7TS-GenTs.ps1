function Global:A7TS-GenTs([string]$controllerFilter = "", [switch]$nobuild, [switch]$noVS)
{
	# XXX: commented out error handling, PS seems to give better errors itself without it
	# try
	# {
		$project = Get-Project
		if (-not $nobuild) { 
			Build-Project($project) 
			$DTE.ExecuteCommand("Debug.Start")
		}
		
		Write-Host 'Project:'
		$project | format-list
		
		Start-Sleep -s 5
		
        $httpclient = New-Object "System.Net.WebClient"

		$url = Get-Url($project)
		$url+= "/tsgenerator.axd" + "?controllerFilter=" + $controllerFilter;
		
        try
		{
			$ts = $httpclient.DownloadString($url)
		}
		catch [Exception]
		{
			echo 'Error occurred downloading metadata from tsgenerator.axd.'
		}

		if (-not $nobuild) { $DTE.ExecuteCommand("Debug.StopDebugging") }
		
        if (-not $ts) {
            echo "Invalid result. Cannot continue."
        } 
		elseif($ts -eq "{No Services Found}"){
            echo "No services were found."
        } 
		else {        
            foreach($fileMeta in $ts.Split([string[]]@("<--- FILE DELIMITER ---><br />"), [StringSplitOptions]"RemoveEmptyEntries")){          
                GenerateFile($fileMeta); 
            }       
        }       
        
		echo 'TS file generation completed.'				

	# }
	# catch
	# {
		# $exception = $_.Exception
		# $global:a7TSerror = $_.Exception
		# Write-Host '## A7TS-GenTs Top Level Exception Handler ##'
		# Write-Host $exception | format-list
		# Write-Host $error | format-list
	# }
}


function global:Build-Project($project)
{
    $configuration = $DTE.Solution.SolutionBuild.ActiveConfiguration.Name

    $DTE.Solution.SolutionBuild.BuildProject($configuration, $project.UniqueName, $true)

    if ($DTE.Solution.SolutionBuild.LastBuildInfo)
    {
        throw 'The project ''' + $project.Name + ''' failed to build.'
    }
}



function global:Get-Url($project)
{
	return $project.Properties.Item("WebApplication.BrowseURL").Value	
}

function global:GenerateFile($fileMeta){

        $arrFileMeta = $fileMeta.Split([string[]]@("--++--<br />"), [StringSplitOptions]"RemoveEmptyEntries")
        $fileType = $arrFileMeta[0]
        $fileName = $arrFileMeta[1]
        $fileContent = $arrFileMeta[2]
        
        echo $("FileType " + $fileType)
        echo $("FileName " + $fileName)
        
        $scriptsSrcFolder = $project.projectitems.item('Scripts').ProjectItems.Item("Src")
        $modelsFolder = $scriptsSrcFolder.ProjectItems.Item("Models")
        $servicesFolder = $scriptsSrcFolder.ProjectItems.Item("Services")
        $fileFullName = $($fileName + ".ts")
        $path = [System.Io.Path]::Combine([System.Io.Path]::GetTempPath(), $fileFullName)  
        
        echo $('Generating file ' + $fileFullName)
                      
		[System.IO.File]::WriteAllText($path,$fileContent)
                        
		try
		{
            if($fileType -eq "Model"){
                $modelsFolder.ProjectItems.Item($fileFullName).Delete()
            } else {
                $servicesFolder.ProjectItems.Item($fileFullName).Delete()
            }
        
		}
		catch [Exception]
		{}
        
        if($fileType -eq "Model"){
               $modelsFolder.ProjectItems.AddFromFileCopy($path)
            } else {
                $servicesFolder.ProjectItems.AddFromFileCopy($path)
            }

}

# TODO: Was previously a proper module, hacked everything into the global namespace to make work as a SolutionScript. Need to revisit.
#Export-ModuleMember A7TS-GenTs
