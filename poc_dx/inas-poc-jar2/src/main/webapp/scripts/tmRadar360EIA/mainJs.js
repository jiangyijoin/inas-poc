var mainConfig = {
	timeId : '',
	brand : '',                       //终端品牌参数
	tm_model : '',                      //终端型号参数
	phone_tac : '',                     //用户号码或TAC号参数
	index_type : 'quality_index_span',  //指标类型参数
	business_type : 'lang_business_span',//业务类型参数
	quailty_data : {},                  //质量指标数据
	isNumberTac : "false",  //用来判断是不是TAC或手机号码查询
	indexType : "",
	indexName : "",
	ap_model : "",   //终端芯片类型参数
	tac_number : "",      //TAC信息钻取弹出框的TAC参数
	thresholdArr : [],    //getThreshold方法查询出的阀值数据
	isDrill : false      //是不是从其他页面钻取
};


define(['./initCss','./initJqgrid','./query'],function(initCss,initJqgrid,query){
	
	initCss.init();
	/*query.init();*/
	eastcom.syncIframeHeight();
	
});
