define(['./thresholdData'],function(thrData){
	var indexNames = {"vl_conn_succrate":"VoLTE注册成功率","esrvccrate_rate":"eSRVCC切换成功率",
			         "http_dlpage_rate":"页面下载速率","gsm_mms_mt_succrate":"2G彩信接受成功率","ser_succrate":"业务请求成功率"}
    //终端版本分析
	function initMainVersionGrid(){
		var main_version_name = ['终端版本','用户数','占比(%)'];
		
		var main_version_model = [{name:'system_version',index:'system_version', width:90,align:"center",sortable:true,
		      formatter : function(value, options, rowObject) {
		    	 var page =  $('#main_version_grid').getGridParam('page'); 
		    	  if(page == 1 && (options.rowId == "1" || options.rowId == "2" || options.rowId == "3")){
		    		  return '<font name="version_row" version="'+value+'" style="text-decoration:underline;color:#0085D0;cursor: pointer;">'+value+'</font>';
		    	  }else{
		    		  return value; 
		    	  }
		      }
	    },{name:'user_count',index:'user_count', width:90, align:"center",sortable:true
	    },{name:'cnt_tate',index:'cnt_tate', width:90, align:"center",sortable:true 
	    }];
		_initGrid("main_version",main_version_name,main_version_model,330,10);
	}
	
	//TAC信息查看
	function initTacInfoGrid(){
		var main_version_name = ['TAC','用户数'];
		
		var main_version_model = [{name:'imei_tac',index:'imei_tac', width:90,align:"center",sortable:true
	    },{name:'usercnt',index:'usercnt', width:90, align:"center",sortable:true
	    }];
		_initGrid("tac_info",main_version_name,main_version_model,330,10);
	}
	
	//价值指标
	function initValueIndexGrid(){
		var main_version_name = ['指标名','指标值','测评得分'];
		
		var main_version_model = [{name:'index_name',index:'index_name', width:90,align:"center",sortable:true
	    },{name:'index_value',index:'index_value', width:90, align:"center",sortable:true
	    },{name:'index_score',index:'index_score', width:90, align:"center",sortable:true 
	    }];
		_initGrid("value_index",main_version_name,main_version_model,390,10);
	}
	
	//芯片一致性
	function initChipConsisGrid(){
		var title_name = ['终端品牌','终端型号','用户数'];
		var index_model = [{name:'terminal_brand',index:'terminal_brand', width:90,align:"center",sortable:true
	        },{name:'terminal_model',index:'terminal_model', width:90, align:"center",sortable:true
	        },{name:'user_count',index:'user_count', width:90, align:"center",sortable:true 
	    }]
		var indexKey = mainConfig.indexName
		console.log("indexKey = "+indexKey);
		if(indexKey != ""){
			var indexName = "";
			if (mainConfig.business_type == "lang_business_span") {
		 	     indexName = thrData.showIndexCn("voiceCallSer");
		 	     title_name.push(indexName[mainConfig.indexName]);
				 index_model.push({name:mainConfig.indexName,index:mainConfig.indexName, width:90, align:"center",sortable:true});
			} else if(mainConfig.business_type == "data_business_span"){
				 indexName = thrData.showIndexCn("dataSer");
				 title_name.push(indexName[mainConfig.indexName]);
				 index_model.push({name:mainConfig.indexName,index:mainConfig.indexName, width:90, align:"center",sortable:true});
			} else if(mainConfig.business_type == "short_color_business_span"){
				 indexName = thrData.showIndexCn("smsSer");
				 title_name.push(indexName[mainConfig.indexName]);
				 index_model.push({name:mainConfig.indexName,index:mainConfig.indexName, width:90, align:"center",sortable:true});
			} else if(mainConfig.business_type == "base_business_span"){
				 indexName = thrData.showIndexCn("basicSer");
				 title_name.push(indexName[mainConfig.indexName]);
				 index_model.push({name:mainConfig.indexName,index:mainConfig.indexName, width:90, align:"center",sortable:true});
			}
		}
		
		_initGrid("chip_consis",title_name,index_model,340,10);
	}
	
	//版本差异性
	function initVersionDiffGrid(){
		var title_name = ['SV','终端版本','用户数'];
		var index_model = [{name:'sv',index:'sv', width:90,align:"center",sortable:true
	        },{name:'version',index:'version', width:90, align:"center",sortable:true
	        },{name:'user_count',index:'user_count', width:90, align:"center",sortable:true 
	    }]
		if(mainConfig.indexName != ""){
			var indexName = "";
			if (mainConfig.business_type == "lang_business_span") {
		 	      indexName = thrData.showIndexCn("voiceCallSer");
		 	     title_name.push(indexName[mainConfig.indexName]);
				 index_model.push({name:mainConfig.indexName,index:mainConfig.indexName, width:90, align:"center",sortable:true});
			} else if(mainConfig.business_type == "data_business_span"){
				  indexName = thrData.showIndexCn("dataSer");
				  title_name.push(indexName[mainConfig.indexName]);
				  index_model.push({name:mainConfig.indexName,index:mainConfig.indexName, width:90, align:"center",sortable:true});
			} else if(mainConfig.business_type == "short_color_business_span"){
				  indexName = thrData.showIndexCn("smsSer");
				  title_name.push(indexName[mainConfig.indexName]);
					 index_model.push({name:mainConfig.indexName,index:mainConfig.indexName, width:90, align:"center",sortable:true});
			} else if(mainConfig.business_type == "base_business_span"){
				 indexName = thrData.showIndexCn("basicSer");
				 title_name.push(indexName[mainConfig.indexName]);
				 index_model.push({name:mainConfig.indexName,index:mainConfig.indexName, width:90, align:"center",sortable:true});
			}
			
		}
		
		_initGrid("version_diff",title_name,index_model,340,10);
	}
	
	//网络适配性
	function initNetAdapGrid(){
		var title_name = ['地市','HSS/EPC<br>核心网','MSC/MGW<br>核心网','LTE<br>无线设备商','GSM<br>无线设备商','用户数','最小值','最大值'];
		var index_model = [{name:'area_name',index:'area_name', width:90,align:"center",sortable:true
	        },{name:'hss_core_vendor',index:'hss_core_vendor', width:90, align:"center",sortable:true
	        },{name:'msc_core_vendor',index:'msc_core_vendor', width:90, align:"center",sortable:true 
	        },{name:'lte_wl_vendor',index:'lte_wl_vendor', width:90, align:"center",sortable:true 
	        },{name:'gsm_wl_vendor',index:'gsm_wl_vendor', width:90, align:"center",sortable:true 
	        },{name:'user_count',index:'user_count', width:90, align:"center",sortable:true 
	        },{name:'index_min',index:'index_min', width:90, align:"center",sortable:true,hidden:true
	       },{name:'index_max',index:'index_max', width:90, align:"center",sortable:true,hidden:true
	    }]
		if(mainConfig.indexName != ""){
			var indexName = "";
			if (mainConfig.business_type == "lang_business_span") {
		 	      indexName = thrData.showIndexCn("voiceCallSer");
			} else if(mainConfig.business_type == "data_business_span"){
				  indexName = thrData.showIndexCn("dataSer");
			} else if(mainConfig.business_type == "short_color_business_span"){
				  indexName = thrData.showIndexCn("smsSer");
			} else if(mainConfig.business_type == "base_business_span"){
				 indexName = thrData.showIndexCn("basicSer");
				 
			}
			title_name.push(indexName[mainConfig.indexName]);
			index_model.push({name:mainConfig.indexName,index:mainConfig.indexName, width:90, align:"center",sortable:true,
				 formatter : function(value, options, rowObject) {
					 return '<font area_name="'+rowObject.area_name+'" style="text-decoration:underline;color:#0085D0;cursor: pointer;">'+value+'</font>';
			     }
			});
			
		}
		_initGrid2("net_adap",title_name,index_model,320,13);
	}
	
	function initNetSituation(){
		var colName = ["设备商"]
		var colModel = [{name:'wl_vender',index:'wl_vender', width:90,align:"center",sortable:true}]
		if(mainConfig.indexName != ""){
			var indexName = "";
			if (mainConfig.business_type == "lang_business_span") {
		 	      indexName = thrData.showIndexCn("voiceCallSer");
			} else if(mainConfig.business_type == "data_business_span"){
				  indexName = thrData.showIndexCn("dataSer");
			} else if(mainConfig.business_type == "short_color_business_span"){
				  indexName = thrData.showIndexCn("smsSer");
			} else if(mainConfig.business_type == "base_business_span"){
				 indexName = thrData.showIndexCn("basicSer");
			}
			colName.push(indexName[mainConfig.indexName]);
		 	colModel.push({name:mainConfig.indexName,index:mainConfig.indexName, width:90, align:"center",sortable:true});
			
		}
		_initGrid("net_situation",colName,colModel,240,10);
	}
	
	//初始化grid的方法
	function _initGrid(gridType,colNames,colModel,height,rownum){
		$.jgrid.gridUnload("#"+gridType+"_grid");
		var me = this;
		$("#"+gridType+"_grid").jqGrid({
            height: height,
            rowNum : rownum,
            scrollOffset :0,
            datatype: "local",
            colNames:colNames,
            colModel:colModel,
            autowidth : false,
            shrinkToFit : false,  //水平滚动条	
            autoScroll: true,
            pager: "#"+gridType+"_gridPager"
        });
	}
	
	//初始化grid的方法
	function _initGrid2(gridType,colNames,colModel,height,rownum){
		$.jgrid.gridUnload("#"+gridType+"_grid");
		var me = this;
		$("#"+gridType+"_grid").jqGrid({
            height: height,
            rowNum : rownum,
            scrollOffset :0,
            datatype: "local",
            colNames:colNames,
            colModel:colModel,
            autowidth : false,
            shrinkToFit : false,  //水平滚动条	
            autoScroll: true,
            pager: "#"+gridType+"_gridPager",
            gridComplete: function () {
                var ids = $("#"+gridType+"_grid").getDataIDs();
                for (var i = 0; i < ids.length; i++) {
                    var rowData = $("#"+gridType+"_grid").getRowData(ids[i]);
                    var title= $("#"+gridType+"_grid").find('tr[id="'+ids[i]+'"]').find("td").last().attr("aria-describedby","net_adap_grid_"+mainConfig.indexName).attr("title");
                   // console.log(title);
                    if (title == rowData.index_min) {
                    	$("#"+gridType+"_grid").find('tr[id="'+ids[i]+'"]').find("td").last().addClass("jqgrid_td_bg_red");
                    }else if(title == rowData.index_max){
                    	$("#"+gridType+"_grid").find('tr[id="'+ids[i]+'"]').find("td").last().addClass("jqgrid_td_bg_greed");
                    }
                }

            }
        });
	}
	
	return {
		initMainVersionGrid:initMainVersionGrid,
		initTacInfoGrid:initTacInfoGrid,
		initValueIndexGrid:initValueIndexGrid,
		initChipConsisGrid:initChipConsisGrid,
		initVersionDiffGrid:initVersionDiffGrid,
		initNetAdapGrid:initNetAdapGrid,
		initNetSituation:initNetSituation
	}
});