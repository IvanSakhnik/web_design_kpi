<?php
	if(isset($_GET['type'])){
		switch($_GET['type']){
			case 'create':
					if($_GET['file']){
						$file=$_GET['file'];
						file_put_contents('files/'.$file,'');
						echo "{type:'success',text:'created file ".$file."'}";
					}else{
						file_put_contents('files/1.txt','Перший текстовий файл.');
						file_put_contents('files/2.txt','Другий текстовий файл.');
						file_put_contents('files/3.txt','Третій текстовий файл.');
						file_put_contents('files/test.txt','Тестовий текстовий файл.');
						echo "{type:'success',text:'created 3 files'}";
					}
				break;
			case 'remove':
					error_reporting(E_NONE);
					if(!isset($_GET['file']))
						die("({type:'error',text:'filename is not setted'})");
					$file=$_GET['file'];
					if(unlink('files/'.$file)){
						die("({type:'success',text:'deleted file ".$file."'})");
					}else{
						die("({type:'error',text:'can not delete file ".$file."'})");
					}
				break;
			case 'edit':
					if(!isset($_GET['file']) || !strlen($_GET['file']) || !isset($_GET['content']))
						die("({type:'error',text:'filename or content is not setted'})");
					$file=$_GET['file'];
					file_put_contents('files/'.$file,$_GET['content']);
					die("({type:'success',text:'edited file ".$file."'})");
				break;
			case 'get':
					if(!isset($_GET['file']))
						die("({type:'error',text:'filename is not setted'})");
					die(file_get_contents('files/'.$_GET['file']));
				break;
			case 'list':
					$list=array();
					if($files=scandir('files')){
						foreach($files as $file){
							if($file!='.' && $file!='..'){
								$list[]="'".$file."'";
							}
						}
						die("({type:'success',files:[".join(',',$list)."]})");
					}else{
						die("({type:'error',text:'can not read folder'})");
					}
				break;
			default:
					die("({type:'error',text:'unknown type'})");
				break;
		}
	}else{
		die("({type:'error',text:'type is not setted'})");
	}