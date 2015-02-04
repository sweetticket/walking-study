<?php
// the $_POST[] array will contain the passed in filename and data
// the directory "data" is writable by the server (chmod 777)
$id = strip_tags($_POST['id']);
$cond = strip_tags($_POST['cond']);
$filepath = "../../../not_in_web/jkim/walkingdata/" . $id . "-" . $cond . ".txt";
//$filepath = "data/". $id . ".txt";
$master_file_path = "../../../not_in_web/jkim/walkingdata/MasterDataFile.txt";
//$master_file_path = "data/MasterDataFile.txt";
$data = "{\"id\":". $id . ";\"cond\":" . $cond . ";}" . serialize($_POST['filedata']);
// write the file to disk
file_put_contents($filepath, $data);
/*
$fh = fopen($filepath, 'a');
$stringData = $id . "\n";
fwrite($fh, $stringData);
fclose($fh);*/

$fh2 = fopen($master_file_path, 'a');
fwrite($fh2, $data .  "\n");
fclose($fh2);

//header("Location: https://cornell.qualtrics.com/SE/?SID=SV_0MSuJduTbHfQvzv&idnum="+$id);


/*
//$sub = isset( $_REQUEST['subject'] ) ? $_REQUEST['subject'] : 'unknown2' ;

$datetxt = date('Y-m-d-H-i');
//$rowdata = $_REQUEST['row'];
//$labels = $_REQUEST['labels'];
$fh = fopen($filename);
fwrite($fh, $data);
fclose($fh);
					
					//write to CSV file
					
					//IF MACRO.CSV DOESNT EXIST, CREATE IT AND ADD HEADERS
					
					if (!file_exists($folder_dir . "macro.csv")) {
						$file = fopen($folder_dir . "macro.csv","a");
						$headers = array("ID,Date,Time Elapsed,Errors," . $labels);
						$apos = array("'");
						
						foreach ($apos as $line)
						{
							fputcsv($file,explode(',',$line));
						}						
						
						foreach ($headers as $line)
						{
							fputcsv($file,explode(',',$line));
						}
						
						
						fclose($file);
					}
					
					$info = array($sub . "," . $datetxt . "," . $timeelapsed . "," . $totalerrors . "," . $rowdata);
					$file = fopen($folder_dir . "macro.csv","a");
					
					foreach ($info as $line)
					{
						fputcsv($file,explode(',',$line));
					}
	
					fclose($file); */
?>