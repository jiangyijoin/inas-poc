define(['./query','./initJqgrid','./thresholdData'],function(query,initJqgrid,thrData) {
	
	//初始化
	function init(){
		query.getThreshold();
		var date = new Date();
		date.setDate(date.getMonth() - 3);
		var dateStart = date.format('yyyy-MM');
		$("#timeField_month").val(dateStart);
		
		JSCombobox.init('tm_type_select', [], {
			width : 130
		});
		JSCombobox.init('tm_mode_select', [], {
			width : 150
		});
		query.getBrands();
		query.getModels();
		//其他页面钻取
		if(common_timeId != "" && common_brand != "" && common_model != "" 
			&& common_timeId != null && common_brand != null && common_model != null){
			var time1 = common_timeId.substring(0,4) + "-" + common_timeId.substring(4,6);
			$("#timeField_month").val(time1);
		    mainConfig.isDrill = true;
		    query.getTmBaseInfo();
		    getIndexs();
		}
		
		mainConfig.timeId = formattime($("#timeField_month").val());
		mainConfig.tm_type = $("#tm_type_select").val();
		mainConfig.brand = $("#tm_type_select").val();
		mainConfig.tm_model = $("#tm_mode_select").val();
		mainConfig.phone_tac = $("#phone_tac_input").val();
		
		$("#main_tm_brand_span").text(mainConfig.brand);
		$("#main_tm_model_span").text(mainConfig.tm_model);
		
		$("#tac_tm_brand_span").text(mainConfig.brand);
		$("#tac_tm_model_span").text(mainConfig.tm_model);
		
		initEvent();
		initJqgrid.initMainVersionGrid();
		initJqgrid.initTacInfoGrid();
		initJqgrid.initChipConsisGrid();
		$("#chip_consis_grid").setGridWidth($(window).width()*0.75);
		
	}
	//初始化事件
	function initEvent(){
		
		//选择品牌
		$("#brand_input").blur(function(){  
			 var brand =  $(this).val();
			 mainConfig.brand = brand;
		}); 
		
		$("#tm_type_select").change(function(){
			mainConfig.brand = $(this).val();
			query.getModels();
		});
		//时间失去焦点的时候查询前用户数前1oo的终端
		$("#timeField_month").blur(function(){
			 mainConfig.timeId = formattime($(this).val());
		});
		
		$("#loop_return").on("click",function(){
			if(mainConfig.isNumberTac == "false"){
				mainConfig.isNumberTac = "true";
				$("#tm_brand_div").hide();
				$("#tm_model_div").hide();
				$("#number_tac_div").show();
				$("#loop_return").attr("title","切换为终端信息查询模式");
			}else{
				mainConfig.isNumberTac = "false";
				$("#phone_tac_input").val("");
				$("#tm_brand_div").show();
				$("#tm_model_div").show();
				$("#number_tac_div").hide();
				$("#loop_return").attr("title","切换为用户号码或TAC号查询模式");
			}
		});
		//主要版本点击事件
		$("span[name='main_version']").on("click",function(){
			$("#main_version_modal_div").modal({keyboard:false,show:true});
			initJqgrid.initMainVersionGrid();
			$("#main_version_grid").setGridWidth(580);
			query.getTmVersionAnalysis();

		});
		
		//tac信息点击事件
		$("#tac_info").on("click",function(){
			$("#tac_info_modal_div").modal({keyboard:false,show:true});
			var tac = $(this).attr("name");
			mainConfig.tac_number = tac;
			$("#tac_tm_brand_span").text(mainConfig.tm_type);
			$("#tac_tm_model_span").text(mainConfig.tm_mode);
			$("#tac_info_grid").setGridWidth(580);
			query.getTacInfo();
			
		});
		
		//tac信息点击事件
		$("#more_info_div").on("click",function(){
			var url = ctx+"/pages/tqe/zj/basicInformation/infoViewAndManage.jsp?timeId='" + mainConfig.timeId + "010000'&brand='" + mainConfig.tm_type + 
			"'&model='" + mainConfig.tm_model + "'";
			eastcom.openPostWindow(url,'','信息查看&维护');
		});
		
		$("font[name='version_row']").live("click",function(){
			var version = $(this).attr("version");
			var url = ctx+"/pages/tqe/zj/basicInformation/infoViewAndManage.jsp?timeId='" + mainConfig.timeId + "010000'&brand='" + mainConfig.tm_type + 
			"'&model='" + mainConfig.tm_model + "'&version='" + version + "'";
			eastcom.openPostWindow(url,'','信息查看&维护');
		});
		//告警阀值配置
		$("#indexInfo_div").on("click",function(){
			var url = ctx+"/pages/tqe/zj/basicInformation/alarmThresholdConfig.jsp";
			eastcom.openPostWindow(url,'','告警阀值配置');
		});
		
		//"指标类型"--点击事件
		!$('#index_type_tab_div') || (function() {
			$('#index_type_tab_div').delegate('span', 'click', function() {
				if (!$(this).hasClass("m_l_list_sub")) {
					$.each($(this).siblings(), function() {
						$(this).removeClass('m_l_list_sub');
					});
					$(this).addClass('m_l_list_sub');
					var tab_id = $(this).attr("id");
					//console.log(tab_id);
					mainConfig.index_type = tab_id;
					if(tab_id == 'quality_index_span'){
						$("#indexInfo_div").show();
						$("#value_index_grid_div").hide()
						$("#index_type_grid_div").show()
						$("#base_business_span").show()
						showIndexTypeHtml(mainConfig.business_type);
						$("#chip_consis_grid").setGridWidth($(window).width()*0.75);
					}else{
						$("#indexInfo_div").hide();
						$("#value_index_grid_div").show()
						$("#index_type_grid_div").hide()
						$("#base_business_span").hide()
						initJqgrid.initValueIndexGrid();
						if(mainConfig.brand){
							if(tab_id == 'value_index_span'){
								query.getValueIndexs();
							}else{
								query.getComplainIndexs();
							}
						}
					}
					eastcom.syncIframeHeight();
				}
				
			});
		})();
		//"业务类型"---点击事件
		!$('#business_type_tab_div') || (function() {
			$('#business_type_tab_div').delegate('span', 'click', function() {
				if (!$(this).hasClass("m_l_list_sub")) {
					$.each($(this).siblings(), function() {
						$(this).removeClass('m_l_list_sub');
					});
					$(this).addClass('m_l_list_sub');
					var tab_id = $(this).attr("id");
					//console.log(tab_id);
					mainConfig.business_type = tab_id;
					if(mainConfig.index_type == "quality_index_span"){
						$("#value_index_grid_div").hide()
						$("#index_type_grid_div").show()
						showIndexTypeHtml(tab_id);
						mainConfig.indexName="";
						initJqgrid.initChipConsisGrid();
						initJqgrid.initVersionDiffGrid();
						initJqgrid.initNetAdapGrid();
						$("#chip_consis_grid").setGridWidth($(window).width()*0.75);
						$("#baseIndexTab>ul>li").removeClass('hover');
						$("li[name='chip_consis']").addClass('hover');
						$(".con_list[name='baseIndexTab']").addClass('hide');
						$("#chip_consis_div").removeClass('hide');
					}else{
						$("#value_index_grid_div").show()
						$("#index_type_grid_div").hide()
						initJqgrid.initValueIndexGrid();
						if(mainConfig.index_type == "value_index_span"){
							query.getValueIndexs();
						}else{
							query.getComplainIndexs();
						}
					}
				}
				
			});
		})();
		
		//点击查询按钮事件
		$("#doQuery").on("click",function(){
			mainConfig.timeId = formattime($("#timeField_month").val());
			mainConfig.tm_type = $("#tm_type_select").val();
			mainConfig.brand = $("#tm_type_select").val();
			mainConfig.tm_model = $("#tm_mode_select").val();
			mainConfig.phone_tac = $("#phone_tac_input").val();
			
			if(mainConfig.isNumberTac == "false" && !mainConfig.brand){
				return confirm('请输入终端品牌');
			}else if(mainConfig.isNumberTac == "true" && !mainConfig.phone_tac){
				return confirm('用户号码或TAC号');
			}else{
				$("#main_tm_brand_span").text(mainConfig.tm_type);
				$("#main_tm_model_span").text(mainConfig.tm_model);
				
				$("#tac_tm_brand_span").text(mainConfig.tm_type);
				$("#tac_tm_model_span").text(mainConfig.tm_model);
				getIndexs();
				mainConfig.indexName = "";
				query.initQuery();
				initJqgrid.initChipConsisGrid("chip_consis");
				$("#chip_consis_grid").setGridWidth($(window).width()*0.75);
			}
			eastcom.syncIframeHeight();
		});
		
		//切换芯片一致性/版本差异性/网络适配性
		$('.con_menu li').on('click',function(){
			var parent = $(this).parent().parent().attr('id');
			$('#'+parent+' li').removeClass('hover');
			$(this).addClass('hover');
			$('.con_list[name='+parent+']').addClass('hide');
			var id = $(this).attr('name');
			$('#'+id+"_div").removeClass('hide');
			if (id == "chip_consis") {
				$("#chip_consis_grid").setGridWidth($(window).width()*0.75);
			} else if(id == "version_diff"){
				$("#version_diff_grid").setGridWidth($(window).width()*0.75);
			} else if(id == "net_adap"){
				$("#net_adap_grid").setGridWidth($(window).width()*0.75);
			} 
		});
		//业务指标分析，左侧的框点击事件
		$("#index_type_ul > li").live("click",function(){
			 var index_name = $(this).attr("name");
			 mainConfig.indexName = index_name;
			 initJqgrid.initChipConsisGrid();
			 initJqgrid.initVersionDiffGrid();
			 initJqgrid.initNetAdapGrid();
			 $("#chip_consis_grid").setGridWidth($(window).width()*0.75);
			 $("#version_diff_grid").setGridWidth($(window).width()*0.75);
			 $("#net_adap_grid").setGridWidth($(window).width()*0.75);
			 query.getChipConsis();
			 query.getVersionDiff();
			 query.getNetAdap();
			 eastcom.syncIframeHeight();
		});
		
		$("#net_adap_grid tr td:last-child").find("font").live("click",function(){
        	var area_name = $(this).attr("area_name");
        	$("#net_situation_modal_div").modal({keyboard:false,show:true});
        	$("#net_area_name").html(area_name);
        	initJqgrid.initNetSituation();
        	$("#net_situation_grid").setGridWidth(580);
        	query.getNetSituation(area_name);
        })
	}
	
	/**
	 * 显示某个指标类型的HTML
	 * @param tab_id 业务类型tab ID
	 */
	function showIndexTypeHtml(tab_id){
 	    $("#index_type_ul").html("");
 	   // console.log(data);
 	    if (tab_id == "lang_business_span") {
 	   	    $("#chip_consis_grid").setGridWidth($(window).width()*0.75);
 	      	showIndexHmtl("voiceCallSer");
		} else if(tab_id == "data_business_span"){
			showIndexHmtl("dataSer");
		} else if(tab_id == "short_color_business_span"){
			showIndexHmtl("smsSer");
		} else if(tab_id == "base_business_span"){
			showIndexHmtl("basicSer");
		}
	}
	
	function showIndexHmtl(type){
		var html = ''
		var thr = mainConfig.thresholdArr;
	 	var data = mainConfig.quailty_data;
	 	var indenSc = thrData.getIndexSc(type);
		var indenCn = thrData.showIndexCn(type);
		var unix = thrData.getIndexUnit(type);
		for(var i = 0; i < thr.length; i++){
	    	var kpi = thr[i].kpi;
	    	if(thr[i].business == type){
	    		//console.log(kpi+" data[kpi] = "+data[kpi] +"   kpi.value_1 = "+kpi.value_1 );
	    		if(data[kpi] != "" && data[indenSc[kpi]] !="" && typeof(data[kpi]) != "undefined" && typeof(data[indenSc[kpi]]) != "undefined"){
	    			if(thr[i].expression == ">" && data[kpi] > Number(thr[i].value_1) ){
		    			html += appendHtml(indenCn[kpi],isNull(data[kpi])+unix[kpi],
		 	    				isNull(data[indenSc[kpi]]),kpi,"float: left;");
		    		}else if(thr[i].expression == "<" && data[kpi] < Number(thr[i].value_1) ){
		    			html += appendHtml(indenCn[kpi],isNull(data[kpi])+unix[kpi],
		 	    				isNull(data[indenSc[kpi]]),kpi,"float: left;");
		    		}else if(thr[i].expression == "=" && data[kpi] == Number(thr[i].value_1)){
		    			html += appendHtml(indenCn[kpi],isNull(data[kpi])+unix[kpi],
		 	    				isNull(data[indenSc[kpi]]),kpi,"float: left;");
		    		}else if(thr[i].expression == "><" && data[kpi] > Number(thr[i].value_1) && data[kpi] < Number(thr[i].value_2)){
		    			html += appendHtml(indenCn[kpi],isNull(data[kpi])+unix[kpi],
		 	    				isNull(data[indenSc[kpi]]),kpi,"float: left;");
		    		}
	    		}
	    	}
	    }
		
		$("#index_type_ul").html(html);	
	}
	/**
	 * 组装指标类型HTML
	 * @param indexName 指标名称
	 * @param indexValue 指标值
	 * @param test_socre 测试分数
	 * @param fl 向右
	 */
	function appendHtml(indexName, indexValue, test_socre, index_name,fl){
		var startHtml = '<li name="'+index_name+'" style="cursor:pointer;margin-left: 20px; margin-top: 20px;'+fl+'">'
	           +'<div class="fl">'
	           +'<img class="index_left_img" src="'+ctx+'/static/images/product/special/tqe/tmRadar360EIA/index_left_logo.png"/>'
	           +'</div>'
	           +'<div class="fl" style="margin-left: 10px;"><div class="indexs_box_text_div">';
		var endHtml = '</div><img class="index_box_div" src="'+ctx+'/static/images/product/special/tqe/tmRadar360EIA/index_box.png"/></div></li>';
		
		var	centerHtml = '<div class="index_text_div">'+indexName+'</div> '
 	    		+ '<div class="index_num_div">'+indexValue+'</div> '
 	    		+ '<div class="test_socre_num_div">'+test_socre+'</div> '
 	    		+ '<span class="test_socre_text_div">测评得分</span>'
 	    return (startHtml+centerHtml+endHtml);
	}
	
	
	//获取业务指标分析-质量指标-左边指标显示
	function getIndexs(){
		if(mainConfig.isDrill == true){
			mainConfig.timeId = common_timeId.substring(0,4)+common_timeId.substring(4,6);;
			mainConfig.brand = common_brand;
			mainConfig.tm_model = common_model;
		}
		mainConfig.isDrill = false
		var postData = {
				SrvId : 'tmRadar360EIARsService.getQuailtyIndexs',
				params : JSON.stringify({
					timeId : mainConfig.timeId,
					tmBrand : mainConfig.brand,
					tmModel : mainConfig.tm_model,
					apModel : mainConfig.ap_model,
					isJqgrid : "false",
					indexKey : mainConfig.indexName,
					phoneTac : mainConfig.phone_tac
				})
		};
		$('#chip_consis_grid').jqGrid("clearGridData");
		$.ajax({
			type : 'POST',
			url : eastcom.baseURL + '/rest/commonList',
			data : postData,
			dataType : "json",
			success : function(data) {
				if (data.data != null && data.success == "true") {
					var data = data.data.data.json.elements;
					var result = data[0];
					mainConfig.quailty_data = result;	
					showIndexHmtl("voiceCallSer");
				}
			}
		});
		
	}
	
	/**
	 * 时间格式化
	 */
	function formattime (time) {
		return time.replace(/[^\d]/g, '');
	}
	
	//判断是否存在
	function isNull(index){
		if(index != null && index != "undefined"){
			return index;
		}else{
			return "";
		}
	}

	return {
		init:init
	};
});