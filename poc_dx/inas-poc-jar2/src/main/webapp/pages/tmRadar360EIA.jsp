<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
	<meta>
	<title>测试页面</title>
	<link rel="stylesheet" type="text/css" href="../static/styles/style.css" />
	<script src="../scripts/plugins/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
</head>

<body style="">
	<!-- 上  -->
	<div class="screen_row" style="border-bottom: 1px solid #dfdfdf;">
	
		<input id="timeField_month" class="Wdate TimeFiled fl"
			style="width:200px;" onclick="WdatePicker({dateFmt : 'yyyy-MM',maxDate:'%y-%M'})" />
			
		<div  class="top-distance fl">
			<div style="margin-top: 6px;" class="fl">用户号码:</div>
			<input type="text" id="phone_id" class="text-distance fl"/>
		</div>
		
		<input type="button" class="btn btn-primary" value="查 询"
			style="margin-left: 40px;" id="doQuery" />
		<div class="clear"></div>
	</div>
	
	<!-- 中 -->
	<div class="con_homebox">
		<div class="con_homebox_title">
			<h5 class="fl">
				<i class="fa fa-info-circle ecom_icons"></i>基础信息
			</h5>
			<div class="clear"></div>
		</div>
		<div class="con_list" style="padding: 10px 15px;">
			<table class="tm-info" id="userInfo_div" style="width: 100%">
				<tr> 
				    <td rowspan="4" align="center" valign="middle" id="tm_phone_logo_td">
				    <img class="phone-logo-div" src="${ctx}/static/images/product/special/tqe/tmRadar360EIA/phone_logo.png" alt="" />
				    </td>
					<td><span>品牌:</span><span class="text-distance" name="tm_brand"></span></td>
					<td><span>名称:</span><span class="text-distance" name="tm_name"></span></td>
					<td><span>型号:</span><span class="text-distance" name="tm_model"></span></td>
					<td><span>移动制式:</span><span class="text-distance" name="cc_net"></span></td> 
				</tr>
				<tr width="20%">
				   
					<td><span>操作系统:</span><span class="text-distance" name="operating_system"></span></td>
					<td><span>最新版本:</span><span class="text-distance" name="new_edition"></span></td>
					<td><span>网络类型:</span><span class="text-distance" name="net_type"></span></td>
					<td><span>语音方案:</span><span class="text-distance" name="voice_solution"></span></td>
				</tr>
				<tr>
				   
					<td><span>CP型号:</span><span class="text-distance" name="cp_model"></span></td>
					<td><span>CP供应商:</span><span class="text-distance" name="cp_supplier"></span></td>
					<td><span>载波聚合功能:</span><span class="text-distance" name="terminal_ca"></span></td>
					<td><span>高清视频通话:</span><span class="text-distance" name="hd_video_call"></span></td>
				</tr>
				<tr>
			     	<td colspan="2"><span>网络制式:</span><span class="text-distance" name="terminal_net" style="font-size: 10px;"></span></td>
					<td colspan="2">
					   <span>主要版本:</span>
					   <span class="text-distance" name="main_version" style="text-decoration:underline;color:#0085D0;cursor: pointer;"></span>
					</td>
				</tr>
			</table>
		</div>
	</div>
	
	
	<div class="con_homebox">
		<div class="con_homebox_title" style="border-bottom: 0px;">
			<h5 class="fl">
				<i class="fa fa-line-chart ecom_icons"></i>业务指标分析
			</h5>
			<div class="clear"></div>
		</div>
		<div class="con_list" style="border-top: 1px solid #e8e8e8;">
			<div style="width: 100%; margin-top: 20px;">
				<div class="index_type_div fl" id="index_type_tab_div">
					<font style="margin-left: 30px;">指标类型：</font> 
					<span id="quality_index_span" class="m_l_list_sub"
						style="margin-left: 5px;">质量指标</span> 
						<span id="value_index_span">价值指标</span>
					<span id="complaint_index_span">投诉指标</span>
				</div>

				<div class="index_type_div fl" id="business_type_tab_div">
					<font style="margin-left: 80px;">业务类型：</font>
					<span id="lang_business_span" class="m_l_list_sub" style="margin-left: 5px;">语音业务</span>
					<span id="data_business_span">数据业务</span>
					<span id="short_color_business_span">短彩业务</span>
					<span id="base_business_span">基础业务</span>
				</div>
			</div>
		</div>
	</div>
	
	<div class="con_homebox fl" style="width:39%">
		<div class="con_homebox_title">
			<h5 class="fl">
				<i class="fa fa-users ecom_icons"></i>用户数分析
			</h5>
			<div class="clear"></div>
		</div>
		<div class="con_list" style="padding: 5px 20px 20px 20px">
		    
			<div class="performance-indicator" style="overflow:hidden;">
				<div class="per-indicator-box indicator-box1 fl">
					<div class="per-indicator-box-top ">
						<span>通信用户数</span>
						<div id="tel_usrt_div"></div>
					</div>
					
					<div class="per-indicator-box-bottom">
						<span>全网用户数排名</span>
						<div id="usrt_rank_div"></div>
					</div>
				</div>
				<div class="per-indicator-box indicator-box2 fl" style="margin-left:30px">
					<div class="per-indicator-box-top ">
						<span>上网用户数</span>
						<div id="net_usrt_div"></div>
					</div>
					
					<div class="per-indicator-box-bottom">
						<span>4G活跃用户占比</span>
						<div id="activerate_4g_div"></div>
					</div>
				</div>
				
				<div class="clear"></div>
			</div>
		</div>
	</div>
	
</body>
</html>