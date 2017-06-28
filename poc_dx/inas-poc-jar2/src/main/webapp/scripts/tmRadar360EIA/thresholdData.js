define(function() {

	var businessTypeMap = {"voiceCallSer":"语音通话业务","dataSer":"数据业务","smsSer":"短彩业务","basicSer":"基础业务"};
	var expressionMap = {">":"大于","<" : "小于","=":"等于","><":"区间"};
	
	/*  ---------------------          基础业务       ---------------------------*/
	//基础指标英文名称
	var basicSerEn = ["attach_succrate","tau_succrate","paging_succrate","ser_succrate","s1_swh_succrate","x2_swh_succrate"];
	
	//基础指标中文名称
	var basicSerCh = {"attach_succrate" : "★Attach成功率","tau_succrate":"★TAU成功率","paging_succrate":"★寻呼成功率",
			"ser_succrate":"业务请求成功率","s1_swh_succrate":"S1接口切换成功率","x2_swh_succrate":"X2接口切换成功率"};
	
	//基础指标分数
	var basicSerSc = {"attach_succrate":"attach_succrate_sc","tau_succrate":"tau_succrate_sc","paging_succrate":"paging_succrate_sc"
		,"ser_succrate":"ser_succrate_sc","s1_swh_succrate":"s1_swh_succrate_sc","x2_swh_succrate":"x2_swh_succrate_sc"};
	
	//基础指标单位
	var basicSerUnit = {"attach_succrate":"%","tau_succrate":"%","paging_succrate":"%",
			"ser_succrate":"%","s1_swh_succrate":"%","x2_swh_succrate":"%"};
	
	/*  ---------------------          语音业务       ---------------------------*/
	//语音业务指标英文名称
	var voiceCallSerEn = ["combeps_attach_succrate","combeps_tau_succrate","csfb_mocl_succrate",
	                      "csfb_mofb_succrate","csfb_mtcl_succrate","csfb_mtfb_succrate",
	                      "sgs_paging_succrate","vl_conn_succrate","vl_imspdn_conn_succrate",
	                      "callingcon_rate","vl_imspe_pdp_succrate","vl_imspe_pdp_upd_succrate",
	                      "calledcon_rate","vl_call_succrate","vl_vc_call_droprate",
	                      "esrvccrate_rate","esrvccrate_rate_call","lte_in_vl_ratio",
	                      "esrvcc_delay","mosmtthree_ratio_ul","mosmtthree_ratio_dl",
	                      "gsm_mocl_succrate","gsm_mtcl_succrate","gsm_drop_rate",
	                      "td_mocl_succrate","td_mtcl_succrate","td_drop_rate",
	                      "mocl_succrate","mtcl_succrate","call_drop_rate"];
	//语音业务指标中文名称
	var voiceCallSerCh = {"combeps_attach_succrate":"联合Attach请求成功率","combeps_tau_succrate":"联合TAU请求成功率","csfb_mocl_succrate":"★CSFB主叫接通率",
			"csfb_mofb_succrate":"CSFB主叫回落成功率","csfb_mtcl_succrate":"★CSFB被叫接通率","csfb_mtfb_succrate":"CSFB被叫回落成功率",
			"sgs_paging_succrate":"SGs寻呼成功率","vl_conn_succrate":"★VoLTE注册成功率","vl_imspdn_conn_succrate":"IMS网络PDN连接建立成功率",
			"callingcon_rate":"★VoLTE始呼网络接通率","vl_imspe_pdp_succrate":"VoLTE专用承载建立成功率","vl_imspe_pdp_upd_succrate":"VoLTE专用承载更新成功率",
			"calledcon_rate":"★VoLTE终呼接通率","vl_call_succrate":"VoLTE寻呼成功率","vl_vc_call_droprate":"★VoLTE掉话率",
			"esrvccrate_rate":"eSRVCC切换成功率","esrvccrate_rate_call":"★eSRVCC切换成功率_呼叫","lte_in_vl_ratio":"4G活跃用户4G语音时长占比",
			"esrvcc_delay":"SRVCC切换平均时延","mosmtthree_ratio_ul":"VoLTE上行语音MOS质差占比","mosmtthree_ratio_dl":"VoLTE下行语音MOS质差占比",
			"gsm_mocl_succrate":"★2G主叫接通率","gsm_mtcl_succrate":"★2G被叫接通率","gsm_drop_rate":"★2G掉话率",
			"td_mocl_succrate":"★3G主叫接通率","td_mtcl_succrate":"★3G被叫接通率","td_drop_rate":"★3G掉话率",
			"mocl_succrate":"★主叫接通率","mtcl_succrate":"★被叫接通率","call_drop_rate":"★语音掉话率"};
	
	//语音业务指标分数
	var voiceCallSerSc = {"combeps_attach_succrate":"combeps_attach_succrate_sc","combeps_tau_succrate":"combeps_tau_succrate_sc","csfb_mocl_succrate":"csfb_mocl_succrate_sc",
			"csfb_mofb_succrate":"csfb_mofb_succrate_sc","csfb_mtcl_succrate":"csfb_mtcl_succrate_sc","csfb_mtfb_succrate":"csfb_mtfb_succrate_sc",
			"sgs_paging_succrate":"sgs_paging_succrate_sc","vl_conn_succrate":"vl_conn_succrate_sc","vl_imspdn_conn_succrate":"vl_imspdn_conn_succrate_sc",
			"callingcon_rate":"callingcon_rate_sc","vl_imspe_pdp_succrate":"vl_imspe_pdp_succrate_sc","vl_imspe_pdp_upd_succrate":"vl_imspe_pdp_upd_succrate_sc",
			"calledcon_rate":"calledcon_rate_sc","vl_call_succrate":"vl_call_succrate_sc","vl_vc_call_droprate":"vl_vc_call_droprate_sc",
			"esrvccrate_rate":"esrvccrate_rate_sc","esrvccrate_rate_call":"esrvccrate_rate_call_sc","lte_in_vl_ratio":"lte_in_vl_ratio_sc",
			"esrvcc_delay":"esrvcc_delay_sc","mosmtthree_ratio_ul":"mosmtthree_ratio_ul_sc","mosmtthree_ratio_dl":"mosmtthree_ratio_dl_sc",
			"gsm_mocl_succrate":"gsm_mocl_succrate_sc","gsm_mtcl_succrate":"gsm_mtcl_succrate_sc","gsm_drop_rate":"gsm_drop_rate_sc",
			"td_mocl_succrate":"td_mocl_succrate_sc","td_mtcl_succrate":"td_mtcl_succrate_sc","td_drop_rate":"td_drop_rate_sc",
			"mocl_succrate":"mocl_succrate_sc","mtcl_succrate":"mtcl_succrate_sc","call_drop_rate":"call_drop_rate_sc"};
	
	//语音业务指标单位
	var voiceCallSerUnit = {"combeps_attach_succrate":"%","combeps_tau_succrate":"%","csfb_mocl_succrate":"%",
			"csfb_mofb_succrate":"%","csfb_mtcl_succrate":"%","csfb_mtfb_succrate":"%",
			"sgs_paging_succrate":"%","vl_conn_succrate":"%","vl_imspdn_conn_succrate":"%",
			"callingcon_rate":"%","vl_imspe_pdp_succrate":"%","vl_imspe_pdp_upd_succrate":"%",
			"calledcon_rate":"%","vl_call_succrate":"%","vl_vc_call_droprate":"%",
			"esrvccrate_rate":"%","esrvccrate_rate_call":"%","lte_in_vl_ratio":"%",
			"esrvcc_delay":"","mosmtthree_ratio_ul":"%","mosmtthree_ratio_dl":"%",
			"gsm_mocl_succrate":"%","gsm_mtcl_succrate":"%","gsm_drop_rate":"%",
			"td_mocl_succrate":"%","td_mtcl_succrate":"%","td_drop_rate":"%",
			"mocl_succrate":"%","mtcl_succrate":"%","call_drop_rate":"%"};
	
	
	/*  ---------------------          数据业务       ---------------------------*/
	//数据业务指标英文名称
	var dataSerEn = ["http_display_succrate","http_dlpage_rate","rtsp_succrate","rtsp_dl_rate",
	                 "lte_flow_ratio","dns_succrate","dns_req_delay","tcp_estab_succrate",
	                 "tcp_estab_delay","http_ser_succrate","http_resp_delay","http_dl_speedrate",
	                 "tcp_ack_succrate"];
	
	//数据业务指标中文名称
	var dataSerCh = {"http_display_succrate":"页面显示成功率","http_dlpage_rate":"页面下载速率","rtsp_succrate":"视频播放成功率","rtsp_dl_rate":"视频下载速率",
			"lte_flow_ratio":"★4G流量分流比","dns_succrate":"★DNS查询成功率","dns_req_delay":"DNS查询时延","tcp_estab_succrate":"TCP建立成功率",
			"tcp_estab_delay":"TCP响应时延","http_ser_succrate":"★HTTP业务成功率","http_resp_delay":"HTTP响应时延","http_dl_speedrate":"HTTP下载速率",
			"tcp_ack_succrate":"★TCP二、三次握手成功率"};
	
	//数据业务指标分数
	var dataSerSc = {"http_display_succrate":"http_display_succrate_sc","http_dlpage_rate":"http_dlpage_rate_sc","rtsp_succrate":"rtsp_succrate_sc","rtsp_dl_rate":"rtsp_dl_rate_sc",
			"lte_flow_ratio":"lte_flow_ratio_sc","dns_succrate":"dns_succrate_sc","dns_req_delay":"dns_req_delay_sc","tcp_estab_succrate":"tcp_estab_succrate_sc",
			"tcp_estab_delay":"tcp_estab_delay_sc","http_ser_succrate":"http_ser_succrate_sc","http_resp_delay":"http_resp_delay_sc","http_dl_speedrate":"http_dl_speedrate_sc",
			"tcp_ack_succrate":"tcp_ack_succrate_sc"};
	
	//数据业务指标单位
	var dataSerUnit = {"http_display_succrate":"%","http_dlpage_rate":"kbps","rtsp_succrate":"%","rtsp_dl_rate":"kbps",
			"lte_flow_ratio":"%","dns_succrate":"%","dns_req_delay":"ms","tcp_estab_succrate":"%",
			"tcp_estab_delay":"ms","http_ser_succrate":"%","http_resp_delay":"ms","http_dl_speedrate":"kbps",
			"tcp_ack_succrate":"%"};
	
	/*  ---------------------          短彩业务       ---------------------------*/
	//短彩业务指标英文名称
	var smsSerEn = ["sms_mo_succrate","sms_mt_succrate","mms_mo_succrate","mms_mt_succrate",
	                "vl_smss_rate","vl_smsr_rate","gsm_sms_mo_succrate","gsm_sms_mt_succrate",
	                "gsm_mms_mo_succrate","gsm_mms_mt_succrate","td_sms_mo_succrate","td_sms_mt_succrate",
	                "td_mms_mo_succrate","td_mms_mt_succrate",
	                "tot_sms_mo_succrate","tot_sms_mt_succrate","tot_mms_mo_succrate","tot_mms_mt_succrate"];
	
	//短彩业务指标中文名称
	var smsSerCh = {"sms_mo_succrate":"★4G短信发送成功率","sms_mt_succrate":"★4G短信接收成功率","mms_mo_succrate":"★4G彩信发送成功率","mms_mt_succrate":"4G彩信接收成功率",
			"vl_smss_rate":"★VoLTE短信发送成功率","vl_smsr_rate":"★VoLTE短信接收成功率","gsm_sms_mo_succrate":"★2G短信发送成功率","mms_mt_succrate":"★2G短信接受成功率",
			"gsm_mms_mo_succrate":"★2G彩信发送成功率","gsm_mms_mt_succrate":"★2G彩信接受成功率","td_sms_mo_succrate":"★3G短信发送成功率","td_sms_mt_succrate":"★3G短信接受成功率",
			"td_mms_mo_succrate":"★3G彩信发送成功率","td_mms_mt_succrate":"★3G彩信接收成功率",
			"tot_sms_mo_succrate":"★短信发送成功率","tot_sms_mt_succrate":"★短信接收成功率","tot_mms_mo_succrate":"★彩信发送成功率","tot_mms_mt_succrate":"★彩信接收成功率"};
	
	//短彩业务指标分数
	var smsSerSc = {"sms_mo_succrate":"sms_mo_succrate_sc","sms_mt_succrate":"sms_mt_succrate_sc","mms_mo_succrate":"mms_mo_succrate_sc","mms_mt_succrate":"mms_mt_succrate_sc",
			"vl_smss_rate":"vl_smss_rate_sc","vl_smsr_rate":"vl_smsr_rate_sc","gsm_sms_mo_succrate":"gsm_sms_mo_succrate_sc","gsm_sms_mt_succrate":"gsm_sms_mt_succrate_sc",
			"gsm_mms_mo_succrate":"gsm_mms_mo_succrate_sc","gsm_mms_mt_succrate":"gsm_mms_mt_succrate_sc","td_sms_mo_succrate":"td_sms_mo_succrate_sc","td_sms_mt_succrate":"td_sms_mt_succrate_sc",
			"td_mms_mo_succrate":"td_mms_mo_succrate_sc","td_mms_mt_succrate":"td_mms_mt_succrate_sc",
			"tot_sms_mo_succrate":"tot_sms_mo_succrate_sc","tot_sms_mt_succrate":"tot_sms_mt_succrate_sc","tot_mms_mo_succrate":"tot_mms_mo_succrate_sc","tot_mms_mt_succrate":"tot_mms_mt_succrate_sc"};
	
	//短彩业务指标单位
	var smsSerUnit = {"sms_mo_succrate":"%","sms_mt_succrate":"%","mms_mo_succrate":"%","mms_mt_succrate":"%",
			"vl_smss_rate":"%","vl_smsr_rate":"%","gsm_sms_mo_succrate":"%","gsm_sms_mt_succrate":"%",
			"gsm_mms_mo_succrate":"%","gsm_mms_mt_succrate":"%","td_sms_mo_succrate":"%","td_sms_mt_succrate":"%",
			"td_mms_mo_succrate":"%","td_mms_mt_succrate":"%",
			"tot_sms_mo_succrate":"%","tot_sms_mt_succrate":"%","tot_mms_mo_succrate":"%","tot_mms_mt_succrate":"%"};
	
	//显示指标中文
	function showIndexCn(type){
		if(type == "basicSer"){
			return basicSerCh;
		}else if(type == "voiceCallSer"){
			return voiceCallSerCh;
		}else if(type == "dataSer"){
			return dataSerCh;
		}else {
			return smsSerCh;
		}
	};
	
	//显示指标中文
	function getIndexEn(type){
		if(type == "basicSer"){
			return basicSerEn;
		}else if(type == "voiceCallSer"){
			return voiceCallSerEn;
		}else if(type == "dataSer"){
			return dataSerEn;
		}else {
			return smsSerEn;
		}
	};
	
	//显示指标中文
	function getIndexSc(type){
		if(type == "basicSer"){
			return basicSerSc;
		}else if(type == "voiceCallSer"){
			return voiceCallSerSc;
		}else if(type == "dataSer"){
			return dataSerSc;
		}else {
			return smsSerSc;
		}
	};
	
	//显示指标中文
	function getIndexUnit(type){
		if(type == "basicSer"){
			return basicSerUnit;
		}else if(type == "voiceCallSer"){
			return voiceCallSerUnit;
		}else if(type == "dataSer"){
			return dataSerUnit;
		}else {
			return smsSerUnit;
		}
	};
	return{
		showIndexCn : showIndexCn,
		businessTypeMap : businessTypeMap,
		expressionMap : expressionMap,
		getIndexSc : getIndexSc,
		getIndexUnit : getIndexUnit
	};
});
