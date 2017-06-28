define(['./initJqgrid','./thresholdData'],function(initJqgrid,thrData) {

	 //top10品牌-固定值 
	var top10Brands = [{"brand":""},{"brand":"苹果"},{"brand":"步步高"},{"brand":"OPPO"},{"brand":"小米"},{"brand":"三星"},{"brand":"华为"},
	                   {"brand":"荣耀"},{"brand":"金立"},{"brand":"诺基亚"},{"brand":"魅族"}];
	//品牌列表
	function getBrands(){
	
		var postData = {
			  SrvId : 'networkOptimizeRsService.queryTerminalBrandInfo',
			  params : JSON.stringify({
				})
		};
		$.ajax({
			type : 'POST',
			url : eastcom.baseURL + '/rest/commonList',
			async : false,
			data : postData,
			dataType : "json",
			success : function(data) {
				if (data.success == "true" && data.data.success && data.data.data.resultCode == "0") {
					var result = data.data.data.json;
					if(result.length > 0){
						
						for(var i = top10Brands.length - 1; i >= 0; i--){
							result.unshift(top10Brands[i]);
						}
						var listTemp = [];
						for(var j = 0,lenj = result.length; j < lenj; j++){
							var value = result[j].brand;
							listTemp.push({value:value,text:value});
						}
						JSCombobox.init('tm_type_select', listTemp, {
							width : 130
						});
						if(common_brand){
							mainConfig.brand = common_brand;
							$("#tm_type_select_combobox").val(common_brand).trigger("change");
							$("#tm_type_select").val(common_brand).trigger("change");;
						/*	common_brand = "";*/
							getModels();
						}
					}
				} else {
					eastcom.showMsg("danger", "终端品牌查询失败");
				}
			}
		});
	}
	
	//型号列表
	function getModels(){
	
		var postData = {
			  SrvId : 'networkOptimizeRsService.queryTerminalModelInfo',
			  params : JSON.stringify({
				  brand : mainConfig.brand
			  })
		};
		$.ajax({
			type : 'POST',
			url : eastcom.baseURL + '/rest/commonList',
			async : false,
			data : postData,
			dataType : "json",
			success : function(data) {
				if (data.success == "true" && data.data.success && data.data.data.resultCode == "0") {
					var result = data.data.data.json;
					if(result.length > 0){
						var listTemp = [];
						if(mainConfig.brand == ""){
							listTemp.push({value:"",text:""})
						}
						for(var j = 0,lenj = result.length; j < lenj; j++){
							var value = result[j].model;
							listTemp.push({value:value,text:value});
						}
						JSCombobox.init('tm_mode_select', listTemp, {
							width : 150
						});
						if(common_model){
							$("#tm_mode_select_combobox").val(common_model).trigger("change");
							$("#tm_mode_select").val(common_model).trigger("change");
							/*common_model = "";*/
						}
					}
				} else {
					eastcom.showMsg("danger", "终端型号查询失败");
				}
			}
		});
	}
	
	//获取终端基础信息
	function getTmBaseInfo(){
	  mainConfig.brand = $("#tm_type_select").val();
	  mainConfig.tm_model = $("#tm_mode_select").val();
	  if(mainConfig.isDrill == true){
		  mainConfig.timeId = common_timeId.substring(0,4)+common_timeId.substring(4,6);;
		  mainConfig.brand = common_brand;
		  mainConfig.tm_model = common_model;
	  }
	  mainConfig.isDrill = false
	  var postData = {
			SrvId : 'tmRadar360EIARsService.getTmBaseInfo',
			params : JSON.stringify({
				timeId : mainConfig.timeId,
				tmBrand : mainConfig.brand,
				tmModel : mainConfig.tm_model,
				phoneTac : mainConfig.phone_tac
			})
		};
		$.ajax({
			type : 'POST',
			url : eastcom.baseURL + '/rest/commonList',
			data : postData,
			dataType : "json",
			success : function(data) {
				if (data.success == "true" && data.data.success && data.data.data.resultCode == "0") {
					var data = data.data.data.list;
					if(data.length > 0){
						var result = data[0];
						$("span[name='tm_brand']").text(isNull(result.terminal_brand));
						$("span[name='tm_name']").text(isNull(result.name));
						$("span[name='tm_model']").text(isNull(result.terminal_model));
						$("span[name='cc_net']").text(isNull(result.cc_net));
						$("span[name='operating_system']").text(isNull(result.system_version));
						$("span[name='new_edition']").text(isNull(result.latest_version));
						$("span[name='net_type']").text(isNull(result.tm_net));
						$("span[name='voice_solution']").text(isNull(result.voice_solution));
						$("span[name='cp_model']").text(isNull(result.cp_model));
						$("span[name='cp_supplier']").text(isNull(result.cp_brand));
						$("span[name='terminal_ca']").text(isNull(result.ca));
						$("span[name='hd_video_call']").text(isNull(result.hd_video));
						$("span[name='terminal_net']").text(isNull(result.terminal_net));
						$("span[name='main_version']").text(isNull(result.major_version));
						
						//用户数分析
						$("#tac_info").attr("name",isNull(result.tac));
						$("#tel_usrt_div").text(isNull(result.tel_usrt));
						$("#usrt_rank_div").text(isNull(result.usrt_rank));
						
						$("#net_usrt_div").text(isNull(result.net_usrt));
						$("#activerate_4g_div").text(isNull(result.activerate_4g)+"%");
						
						$("#complaint_score_div").text(isNull(result.complaint_score));
						$("#complaint_rank_div").text(isNull(result.complaint_rank));
						
						$("#value_score_div").text(isNull(result.value_score));
						$("#value_rank_div").text(isNull(result.value_rank));
						
						$("#quality_score_div").text(isNull(result.quality_score));
						$("#quality_rank_div").text(isNull(result.quality_rank));
						
						//业务指标分析-芯片一致性
						$("#chip_name_span").text(isNull(result.cp_model));
						mainConfig.ap_model = result.cp_model;
						
						mainConfig.brand = result.terminal_brand;
						mainConfig.tm_model = result.terminal_model;
						$("#main_tm_brand_span").text(mainConfig.brand);
						$("#main_tm_model_span").text(mainConfig.tm_model);
						
						$("#tac_tm_brand_span").text(mainConfig.brand);
						$("#tac_tm_model_span").text(mainConfig.tm_model);
						
						//业务指标分析-版本差异性
						$("#version_tm_brand").text(mainConfig.brand);
						$("#version_tm_model").text(mainConfig.tm_model);
						
						//业务指标分析-网络适配性
						$("#net_adap_tm_brand").text(mainConfig.brand);
						$("#net_adap_tm_model").text(mainConfig.tm_model);
						
						eastcom.syncIframeHeight();
					}else{
						isNullTmBaseInfo();
					}
				
				} else {
					isNullTmBaseInfo();
				}
			}
		});
		
	}
	//“基础“信息查询出现的数据为空
	function isNullTmBaseInfo(){
		$("span[name='tm_brand']").text("");
		$("span[name='tm_name']").text("");
		$("span[name='tm_model']").text("");
		$("span[name='cc_net']").text("");
		$("span[name='operating_system']").text("");
		$("span[name='new_edition']").text("");
		$("span[name='net_type']").text("");
		$("span[name='voice_solution']").text("");
		$("span[name='cp_model']").text("");
		$("span[name='cp_supplier']").text("");
		$("span[name='terminal_ca']").text("");
		$("span[name='hd_video_call']").text("");
		$("span[name='terminal_net']").text("");
		$("span[name='main_version']").text("");
		
		//用户数分析
		$("#tac_info").attr("name","");
		$("#tel_usrt_div").text("");
		$("#usrt_rank_div").text("");
		
		$("#net_usrt_div").text("");
		$("#activerate_4g_div").text("");
		
		$("#complaint_score_div").text("");
		$("#complaint_rank_div").text("");
		
		$("#value_score_div").text("");
		$("#value_rank_div").text("");
		
		$("#quality_score_div").text("");
		$("#quality_rank_div").text("");
		
		//业务指标分析-芯片一致性
		$("#chip_name_span").text("");
		mainConfig.ap_model = "";
		
		//业务指标分析-版本差异性
		$("#version_tm_brand").text("");
		$("#version_tm_model").text("");
		
		//业务指标分析-网络适配性
		$("#net_adap_tm_brand").text("");
		$("#net_adap_tm_model").text("");
	}
	
	
	//获取终端版本分析信息
	function getTmVersionAnalysis(){
		var gridObj = $('#main_version_grid');
		gridObj.parent().mask('正在加载数据, 请稍后...');
		var postData = {
				SrvId : 'tmRadar360EIARsService.getTmVersionAnalysis',
				params : JSON.stringify({
					timeId : mainConfig.timeId,
					tmBrand : mainConfig.brand,
					tmModel : mainConfig.tm_model,
					phoneTac : mainConfig.phone_tac
				})
		};
		$.ajax({
			type : 'POST',
			url : eastcom.baseURL + '/rest/commonList',
			data : postData,
			dataType : "json",
			success : function(data) {
				if (data.success == "true" && data.data.success && data.data.data.resultCode == "0") {
					var result = data.data.data.list;
					$('#main_version_grid').jqGrid("clearGridData");
					$('#main_version_grid').jqGrid("setGridParam",{
						url : eastcom.baseURL + "/tmRadar360EIAController/getTmVersionAnalysis",
						mtype:'post',
						datatype : 'local',
						data : result
					}).trigger("reloadGrid");
					$('#main_version_grid').jqGrid('jqGridResize');
				} else {
					eastcom.showMsg("danger", "版本分析类别查询失败");
				}
			},
			complete : function(){
				gridObj.parent().unmask();
			}
		});
		
	}
	
	//获取终端基础信息
	function getTacInfo(){
		var gridObj = $('#tac_info_grid');
		gridObj.parent().mask('正在加载数据, 请稍后...');
		var postData = {
				SrvId : 'tmRadar360EIARsService.getTacInfo',
				params : JSON.stringify({
					timeId : mainConfig.timeId,
					phoneTac : mainConfig.tac_number
				})
		};
		$.ajax({
			type : 'POST',
			url : eastcom.baseURL + '/rest/commonList',
			data : postData,
			dataType : "json",
			success : function(data) {
				if (data.success == "true" && data.data.success && data.data.data.resultCode == "0") {
					var result = data.data.data.list;
						$('#tac_info_grid').jqGrid("clearGridData");
						$('#tac_info_grid').jqGrid("setGridParam",{
							url : eastcom.baseURL + "/tmRadar360EIAController/getTacInfo",
							mtype:'post',
							datatype : 'local',
							data : result,
							postData : {
								time_id : mainConfig.timeId,
					            phone_tac : mainConfig.tac_number
							}
						}).trigger("reloadGrid");
						$('#tac_info_grid').jqGrid('jqGridResize');
				} else {
					eastcom.showMsg("danger", "TAC信息查询失败");
				}
			},
			complete : function(){
				gridObj.parent().unmask();
			}
		});
	  
	}
	
    //价值指标->语音业务
	var vKeys1 = ["single_time","single_timerate","single_mou"];
	//语音业务指标对应的分数字段
	var vKeys2 = {"single_time":"single_timescore","single_timerate":"timerate_score","single_mou":"mou_score"};
	var vName = {"single_time":"单终端4G驻网时长","single_timerate":"终端4G驻网时长占比","single_mou":"单终端主叫MOU值"};
	var vUnit = {"single_time":"ms","single_timerate":"%","single_mou":""};
	//价值指标->数据业务
	var dKeys1 = ["single_flow","single_flowrate","video_4g","browse_4g","communicate_4g","download_4g","arpu","activerate_4g","active"];
	var dKeys2 = {"single_flow":"flow_score","single_flowrate":"flowrate_score","video_4g":"video_score",
			      "browse_4g":"browse_score","communicate_4g":"communicate_score","download_4g":"download_score",
			      "arpu":"arpu_score","activerate_4g":"activerate_score","active":"active_score"};
	var dName = {"single_flow":"单终端4G流量","single_flowrate":"终端4G流量占比","video_4g":"单终端4G视频业务产生总流量",
			    "browse_4g":"单终端4G浏览业务产生总流量","communicate_4g":"单终端4G即时通信业务产生总流量","download_4g":"单终端4g下载业务产生总流量",
			    "arpu":"单终端ARPU值","activerate_4g":"4G活跃用户数占比","active":"4G活跃用户数"};
	var dUnit = {"single_flow":"GB","single_flowrate":"%","video_4g":"GB",
		    "browse_4g":"GB","communicate_4g":"GB","download_4g":"GB",
		    "arpu":"","activerate_4g":"%","active":""};
	//价值指标->短彩业务
	var cKeys1 = ["sms_mo","mms_mo"];
	var cKeys2 = {"sms_mo":"sms_score","mms_mo":"mms_score"};
	var cName = {"sms_mo":"单终端短信MO数","mms_mo":"单终端彩信MO数"};
	var cUnit = {"sms_mo":"","mms_mo":""};
	
	//获取价值指标
	function getValueIndexs(){
		$("#mask_grid_div").mask('正在加载数据, 请稍后...');
		mainConfig.timeId = formattime($("#timeField_month").val());
		mainConfig.brand = $("#tm_type_select").val();
		mainConfig.tm_model = $("#tm_mode_select").val();
		var postData = {
				SrvId : 'tmRadar360EIARsService.getValueIndexs',
				params : JSON.stringify({
					timeId : mainConfig.timeId,
					tmBrand : mainConfig.brand,
					tmModel : mainConfig.tm_model,
					phoneTac : mainConfig.phone_tac
				})
		};
		$.ajax({
			type : 'POST',
			url : eastcom.baseURL + '/rest/commonList',
			data : postData,
			dataType : "json",
			success : function(data) {
				if (data.success == "true" && data.data.success && data.data.data.resultCode == "0") {
					var result = data.data.data.list[0];
					var data = [];
					if(mainConfig.business_type == "lang_business_span"){
						for(var i = 0; i < vKeys1.length; i++){
							 /*if(result[vKeys1[i]] != "" && result[vKeys2[vKeys1[i]]] !="" && typeof(result[vKeys1[i]]) != "undefined" && typeof(result[vKeys2[vKeys1[i]]]) != "undefined"){*/
								 data.push({"index_name":vName[vKeys1[i]],"index_value":(result[vKeys1[i]]+vUnit[vKeys1[i]]),"index_score":result[vKeys2[vKeys1[i]]]});
							/* }*/
						 }
					}else if(mainConfig.business_type == "data_business_span"){
						for(var i = 0; i < dKeys1.length; i++){
							if(result[dKeys1[i]] || data[result[dKeys2[dKeys1[i]]]]){
								 data.push({"index_name":dName[dKeys1[i]],"index_value":(result[dKeys1[i]]==""?"":(result[dKeys1[i]]+dUnit[dKeys1[i]])),"index_score":result[dKeys2[dKeys1[i]]]});
						    }
						}
						
					}else if(mainConfig.business_type == "short_color_business_span"){
						 for(var i = 0; i < cKeys1.length; i++){
						     if(result[cKeys1[i]] || data[result[cKeys2[cKeys1[i]]]]){
						    	data.push({"index_name":cName[cKeys1[i]],"index_value":(result[cKeys1[i]]+cUnit[cKeys1[i]]),"index_score":result[cKeys2[cKeys1[i]]]});
							 }
						 }
					}
					//console.log(data);
				    $('#value_index_grid').jqGrid("clearGridData");
					$('#value_index_grid').jqGrid("setGridParam",{
						url : eastcom.baseURL + "/tmRadar360EIAController/getTmVersionAnalysis",
						mtype:'post',
						datatype : 'local',
						data : data
					}).trigger("reloadGrid");
					$('#value_index_grid').jqGrid('jqGridResize');
				} else {
					eastcom.showMsg("danger", "价值指标信息查询失败");
				}
			},
			complete : function(){
				$("#mask_grid_div").unmask();
			}
		});
		
	}
	
	var vKeys1_c = ["calling_all","calling_wan","calling_repeat","voice_all","voice_wan","voice_repeat"];
	var vKeys2_c = {"calling_all":"calling_allscore","calling_wan":"calling_wanscore","calling_repeat":"calling_repeatscore",
			"voice_all":"voice_allscore","voice_wan":"voice_wanscore","voice_repeat":"voice_repeatscore"};
	var vName_c = {"calling_all":"语音主叫终端投诉次数","calling_wan":"语音主叫万投比","calling_repeat":"语音主叫重复投诉用户比例",
			"voice_all":"语音被叫终端投诉次数","voice_wan":"语音被叫万投比","voice_repeat":"语音被叫重复投诉用户比例"};
	var vUnit_c = {"calling_all":"","calling_wan":"","calling_repeat":"%",
			"voice_all":"","voice_wan":"","voice_repeat":"%"};
	
	var dKeys1_c = ["all_4g","wan_4g","repeat_4g","all_2g","wan_2g","repeat_2g","all_sjyw","wan_sjyw","repeat_sjyw"];
	var dKeys2_c = {"all_4g":"all4g_score","wan_4g":"wan4g_score","repeat_4g":"repeat4g_score",
			      "all_2g":"all2g_score","wan_2g":"wan2g_score","repeat_2g":"repeat2g_score",
			      "all_sjyw":"allsjyw_score","wan_sjyw":"wansjyw_score","repeat_sjyw":"repeatsjyw_score"};
	var dName_c = {"all_4g":"4G数据业务终端投诉次数","wan_4g":"4G数据业务万投比","repeat_4g":"4G数据业务重复投诉用户比例",
			    "all_2g":"2G数据业务终端投诉次数","wan_2g":"2G数据业务万投比","repeat_2g":"2G数据业务重复投诉用户比例",
			    "all_sjyw":"数据业务终端投诉次数","wan_sjyw":"数据业务万终端用户投诉次数","repeat_sjyw":"数据业务重复投诉用户比例"};
	var dUnit_c = {"all_4g":"","wan_4g":"","repeat_4g":"%",
		    "all_2g":"","wan_2g":"","repeat_2g":"%",
		    "all_sjyw":"","wan_sjyw":"","repeat_sjyw":"%"};
	
	var cKeys1_c = ["send_all","send_wan","send_repeat","sms_all","sms_wan","sms_repeat"];
	var cKeys2_c = {"send_all":"send_allscore","send_wan":"send_wanscore","send_repeat":"send_repeatscore",
			"sms_all":"sms_allscore","sms_wan":"sms_wanscore","sms_repeat":"sms_repeatscore"};
	var cName_c = {"send_all":"短信发送终端投诉次数","send_wan":"短信发送万投比","send_repeat":"短信发送重复投诉用户比例",
			"sms_all":"短信接收终端投诉次数","sms_wan":"短信接收万投比","sms_repeat":"短信接收重复投诉用户比例"};
	var cUnit_c = {"send_all":"","send_wan":"","send_repeat":"%",
			"sms_all":"","sms_wan":"","sms_repeat":"%"};
	//获取投诉指标信息
	function getComplainIndexs(){
		$("#mask_grid_div").mask('正在加载数据, 请稍后...');
		mainConfig.timeId = formattime($("#timeField_month").val());
		mainConfig.brand = $("#tm_type_select").val();
		mainConfig.tm_model = $("#tm_mode_select").val();
		var postData = {
				SrvId : 'tmRadar360EIARsService.getComplainIndexs',
				params : JSON.stringify({
					timeId : mainConfig.timeId,
					tmBrand : mainConfig.brand,
					tmModel : mainConfig.tm_model,
					phoneTac : mainConfig.phone_tac
				})
		};
		$.ajax({
			type : 'POST',
			url : eastcom.baseURL + '/rest/commonList',
			data : postData,
			dataType : "json",
			success : function(data) {
				if (data.success == "true" && data.data.success && data.data.data.resultCode == "0") {
					var result = data.data.data.list[0];
					var data = [];
					if(mainConfig.business_type == "lang_business_span"){
						 for(var i = 0; i < vKeys1_c.length; i++){
							 /*if(result[vKeys1_c[i]] != "" && result[vKeys2_c[vKeys1[i]]] !="" && typeof(result[vKeys1_c[i]]) != "undefined" && typeof(result[vKeys2_c[vKeys1_c[i]]]) != "undefined"){*/
								 data.push({"index_name":vName_c[vKeys1_c[i]],"index_value":(result[vKeys1_c[i]]+vUnit_c[vKeys1_c[i]]),"index_score":result[vKeys2_c[vKeys1_c[i]]]});
							/* }*/
						 }
					}else if(mainConfig.business_type == "data_business_span"){
						 for(var i = 0; i < dKeys1_c.length; i++){
							/* if(result[dKeys1_c[i]] != "" && result[dKeys2_c[dKeys1_c[i]]] !="" && typeof(result[dKeys1_c[i]]) != "undefined" && typeof(result[dKeys2_c[dKeys1_c[i]]]) != "undefined"){*/
								 data.push({"index_name":dName_c[dKeys1_c[i]],"index_value":(result[dKeys1_c[i]]+dUnit_c[dKeys1_c[i]]),"index_score":result[dKeys2_c[dKeys1_c[i]]]});
							 /*}*/
						 }
					}else if(mainConfig.business_type == "short_color_business_span"){
						 for(var i = 0; i < cKeys1_c.length; i++){
							/* if(result[cKeys1_c[i]] != "" && result[cKeys2_c[cKeys1_c[i]]] !="" && typeof(result[cKeys1_c[i]]) != "undefined" && typeof(result[cKeys2_c[cKeys1_c[i]]]) != "undefined"){*/
								 data.push({"index_name":cName_c[cKeys1_c[i]],"index_value":(result[cKeys1_c[i]]+cUnit_c[cKeys1_c[i]]),"index_score":result[cKeys2_c[cKeys1_c[i]]]});
							/* }*/
						 }
					}
					//console.log(data);
				    $('#value_index_grid').jqGrid("clearGridData");
					$('#value_index_grid').jqGrid("setGridParam",{
						url : eastcom.baseURL + "/tmRadar360EIAController/getTmVersionAnalysis",
						mtype:'post',
						datatype : 'local',
						data : data
					}).trigger("reloadGrid");
					$('#value_index_grid').jqGrid('jqGridResize');
				} else {
					eastcom.showMsg("danger", "投诉指标信息查询失败");
				}
			},
			complete : function(){
				$("#mask_grid_div").unmask();
			}
		});
		
	}
	
	//获取业务指标分析-质量指标
	function getChipConsis(){
		var postData = {
				SrvId : 'tmRadar360EIARsService.getQuailtyIndexs',
				params : JSON.stringify({
					timeId : mainConfig.timeId,
					tmBrand : mainConfig.brand,
					tmModel : mainConfig.tm_model,
					apModel : mainConfig.ap_model,
					gridTabId : "chip_consis",
					isJqgrid : "isJqgrid",
					indexKey : mainConfig.indexName,
					phoneTac : mainConfig.phone_tac
				})
		};
	
		var gridObj = $('#chip_consis_grid');
		gridObj.jqGrid("clearGridData");
		gridObj.jqGrid("setGridParam", {
			url : eastcom.baseURL + "/rest/commonPage",
			mtype : 'post',
			datatype : 'json',
			postData : postData,
			page : 1
		}).trigger("reloadGrid");
		gridObj.jqGrid('jqGridResize');
	}
	
	//获取业务指标分析-质量指标
	function getVersionDiff(){
		var postData = {
				SrvId : 'tmRadar360EIARsService.getQuailtyIndexs',
				params : JSON.stringify({
					timeId : mainConfig.timeId,
					tmBrand : mainConfig.brand,
					tmModel : mainConfig.tm_model,
					apModel : mainConfig.ap_model,
					gridTabId : "version_diff",
					isJqgrid : "isJqgrid",
					indexKey : mainConfig.indexName,
					phoneTac : mainConfig.phone_tac
				})
		};
	
		var gridObj = $('#version_diff_grid');
		gridObj.jqGrid("clearGridData");
		gridObj.jqGrid("setGridParam", {
			url : eastcom.baseURL + "/rest/commonPage",
			mtype : 'post',
			datatype : 'json',
			postData : postData,
			page : 1
		}).trigger("reloadGrid");
		gridObj.jqGrid('jqGridResize');
	}
	
	//获取业务指标分析-质量指标
	function getNetAdap(){
		var postData = {
				SrvId : 'tmRadar360EIARsService.getQuailtyIndexs',
				params : JSON.stringify({
					timeId : mainConfig.timeId,
					tmBrand : mainConfig.brand,
					tmModel : mainConfig.tm_model,
					apModel : mainConfig.ap_model,
					gridTabId : "net_adap",
					isJqgrid : "isJqgrid",
					indexKey : mainConfig.indexName,
					phoneTac : mainConfig.phone_tac
				})
		};
		var gridObj = $('#net_adap_grid');
		gridObj.jqGrid("clearGridData");
		gridObj.jqGrid("setGridParam", {
			url : eastcom.baseURL + "/rest/commonPage",
			mtype : 'post',
			datatype : 'json',
			postData : postData,
			page : 1,  
			loadComplete: function (data) {
				if(data.data != null && data.success == "true"){
					var result = data.data.elements[0];
					$("#net_adap_max").text(isNull(result.index_max));
					$("#net_adap_min").text(isNull(result.index_min));
					$("#net_adap_variance").text(isNull(result.index_var));
				}else{
					$("#net_adap_max").text("");
					$("#net_adap_min").text("");
					$("#net_adap_variance").text("");
				}
			}
		}).trigger("reloadGrid");
		gridObj.jqGrid('jqGridResize');
	}
	
	//网络适配性-指标下钻-查看组网情况
	function getNetSituation(areaName){
		mainConfig.timeId = formattime($("#timeField_month").val());
		mainConfig.brand = $("#tm_type_select").val();
		mainConfig.tm_model = $("#tm_mode_select").val();
		var postData = {
				SrvId : 'tmRadar360EIARsService.getNetSituation',
				params : JSON.stringify({
					timeId : mainConfig.timeId,
					areaName : areaName,
					tmBrand : mainConfig.brand,
					tmModel : mainConfig.tm_model,
					indexKey : mainConfig.indexName
				})
		};
		
		$.ajax({
			type : 'POST',
			url : eastcom.baseURL + '/rest/commonList',
			data : postData,
			dataType : "json",
			success : function(data) {
				if (data.success == "true" && data.data.success && data.data.data.resultCode == "0") {
					var result = data.data.data.list;
				    $('#net_situation_grid').jqGrid("clearGridData");
					$('#net_situation_grid').jqGrid("setGridParam",{
						mtype:'post',
						datatype : 'local',
						data : result
					}).trigger("reloadGrid");
					$('#net_situation_grid').jqGrid('jqGridResize');
				} else {
					eastcom.showMsg("danger", "网络适配性-指标下钻-查看组网情况查询失败");
				}
			}
		});
		
	}
	
	function getThreshold(){
		var postData = {
		    SrvId : 'thresholdConfigRsService.getExistIndexs',
		};
			
		$.ajax({
			type : 'POST',
			url : eastcom.baseURL + '/rest/commonList',
			async : false,
			data : postData,
			dataType : "json",
			success : function(data) {
				if (data.success == "true" && data.data.success && data.data.data.resultCode == "0") {
					var result = data.data.data.list;
					mainConfig.thresholdArr = result;
				} else {
					mainConfig.thresholdArr = [];
						eastcom.showMsg("danger", "所有告警阀值配置查询失败");
				}
			}
		});
	}

	
	//判断是否存在
	function isNull(index){
		if(index != null && index != "undefined"){
			return index;
		}else{
			return "";
		}
	}
	
	function init(){
			
	}
	
	function initQuery(){
		
		//业务指标分析-版本差异性
		$("#version_tm_brand").text(mainConfig.brand);
		$("#version_tm_model").text(mainConfig.tm_model);
		//业务指标分析-网络适配性
		$("#net_adap_tm_brand").text(mainConfig.brand);
		$("#net_adap_tm_model").text(mainConfig.tm_model);
		getThreshold();
		getTmBaseInfo();
	}
	
	return{
		init : init,
		initQuery : initQuery,
		getBrands : getBrands,
		getModels : getModels,
		getTmBaseInfo : getTmBaseInfo,
		getTacInfo : getTacInfo,
		getTmVersionAnalysis :getTmVersionAnalysis,
		getValueIndexs : getValueIndexs,
		getComplainIndexs : getComplainIndexs,
		getNetSituation : getNetSituation,
		getChipConsis : getChipConsis,
		getVersionDiff : getVersionDiff,
		getNetAdap : getNetAdap,
		getThreshold : getThreshold
	};
});
