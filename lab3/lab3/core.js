$(function(){
	function set_request(selector,settings,callback){
		$(selector).click(function(){
			var rdata={};
			$.extend(rdata,settings);

			if(rdata.content && typeof(rdata.content)=='function')
				rdata.content=rdata.content();
			if(rdata.file){
				if(typeof(rdata.file)=='function'){
					console.log(rdata.file(rdata));
					rdata.file=rdata.file(rdata);
					if(!rdata.file){
						return false;
					}
				}else{
					var row_active=$(this).closest('tr').addClass('active');
					rdata.file=(row_active.length ? row_active : $('#filelist .active')).children('td:first').text();
				}
			}
			$.ajax({
				url:'../',
				type:'get',
				data:rdata,
				complete:callback
			});
		});
	};
	set_request('#create',{type:'create'},
		function(){
			$('#refresh').click();
		});
	set_request('#refresh',{type:'list'},
		function(data){
			$('#filelist tbody').empty();
			if(data.responseText && eval(data.responseText).files){
				var files=eval(data.responseText).files,
					action=(files.length ? 'addClass' : 'removeClass');
				$('#filelist')[action]('show-table');
				$('#message-no-files')[action]('hide');

				for(var i=0;i<files.length;i++){
					$('#filelist').append('<tr><td>'+files[i]+'</td><td><div class="btn-group">'
						+'<button type="button" class="btn btn-default file-view"><span class="glyphicon glyphicon-eye-open"></span></button>'
						+'<button type="button" class="btn btn-default file-edit"><span class="glyphicon glyphicon-pencil"></span></button>'
						+'<button type="button" class="btn btn-default file-delete"><span class="glyphicon glyphicon-trash"></span></button>'
						+'</div></td></tr>');
				}
				set_request('.file-view',{
					type:'get',
					file:true
				},function(data){
					$('#filename-modal').text($('#filelist .active td:first').text());
					$('#filename-content').text(data.responseText);
					$('#filename-content-editable').val(data.responseText);
					$('#main-modal').removeClass('edit').modal('show');
				});
				set_request('.file-delete',{
					type:'remove',
					file:true
				},function(data){
					$('#filelist .active').remove();
					if(!$('#filelist tbody tr').length)
						$('#refresh').click();
				});
				set_request('.file-edit',{
					type:'get',
					file:true
				},function(data){
					$('#filename-modal').text($('#filelist .active td:first').text());
					$('#filename-content').text(data.responseText);
					$('#filename-content-editable').val(data.responseText);
					$('#main-modal').addClass('edit').modal('show');
				});
			}
		})
	set_request('#save-file',{
		type:'edit',
		file:true,
		content:function(){
			return $('#filename-content-editable').val();
		}
	},function(data){
		$('#main-modal').modal('hide');
	});
	$('#main-modal').on('hide.bs.modal',function(){
		$('#filelist .active').removeClass('active');
	});
	set_request('#create-file',{
		type:'create',
		file:function(){
					var input=$('#filename-new'),
						filename=input.val().trim();
					if(filename.length){
						if(filename.indexOf('.txt')==-1)
							filename+='.txt';
						return filename;
					}else{
						input.focus();
						return false;
					}
				}
	},function(data){
		$('#refresh').click();
		$('#filename-new').val('');
	});

	$('#refresh').click();
})