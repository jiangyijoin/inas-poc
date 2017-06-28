<!DOCTYPE html>
<%@ page language="java" import="java.util.*" contentType="text/html;charset=UTF-8"%> 
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
	<meta>
	<title>测试页面</title>
	<link rel="stylesheet" type="text/css" href="../static/styles/style.css" />
	<script src="../scripts/plugins/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
	<script src="../scripts/plugins/jquery-1.10.2.min.js" type="text/javascript"></script>
	
	<script type="text/javascript">
		function isNull(index){
			if(index != null && index != "undefined"){
				return index;
			}else{
				return "";
			}
		}
		function queryDate(time_id,phone){
			$.ajax({
				type : "POST",
				async : true,
				url : 'http://localhost:7083/poc/queryDate', // 这是数据的请求地址
				data : {
					time_id : time_id,
					phone : phone
				},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					console.log(data);
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
					
					result = data[1];
					$("#tel_usrt_div").text(isNull(result.usercnt));
					$("#net_usrt_div").text(isNull(result.usercnt_ds));
					
					result = data[2];
					$("#csfb_mocl_succrate_id").text(isNull(result.csfb_mocl_succrate));
					$("#csfb_mtcl_succrate_id").text(isNull(result.csfb_mtcl_succrate));
					$("#vl_conn_succrate_id").text(isNull(result.vl_conn_succrate));
					$("#callingcon_rate_id").text(isNull(result.callingcon_rate));
					$("#calledcon_rate_id").text(isNull(result.calledcon_rate));
					$("#vl_vc_call_droprate_id").text(isNull(result.vl_vc_call_droprate));
					$("#esrvccrate_rate_call_id").text(isNull(result.esrvccrate_rate_call));
					$("#lte_in_vl_ratio_id").text(isNull(result.lte_in_vl_ratio));
					$("#gsm_mocl_succrate_id").text(isNull(result.gsm_mocl_succrate));
					$("#gsm_mtcl_succrate_id").text(isNull(result.gsm_mtcl_succrate));
					$("#gsm_drop_rate_id").text(isNull(result.gsm_drop_rate));
					$("#td_mocl_succrate_id").text(isNull(result.td_mocl_succrate));
					$("#td_mtcl_succrate_id").text(isNull(result.td_mtcl_succrate));
					$("#td_drop_rate_id").text(isNull(result.td_drop_rate));
					
					result = data[3];
					$("#lte_flow_ratio_id").text(isNull(result.lte_flow_ratio));
					$("#dns_succrate_id").text(isNull(result.dns_succrate));
					$("#http_ser_succrate_id").text(isNull(result.http_ser_succrate));
					$("#tcp_ack_succrate_id").text(isNull(result.tcp_ack_succrate));
				}
			});
		}
		
		//测试号码 13656521511,13710571970,13580818074,15869573525
		
		window.onload = function(){
			$("#doQuery").click(function(){
				var time_id = $("#timeField_month").val();
				time_id = time_id.replace("-","")+"010000";
				var phone = $("#phone_id").val();
				if(time_id == ""){
					alert("请输入时间");
					return; 
				}
				if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
			        alert("手机号码有误，请重填");  
			        return; 
			    } 
				queryDate(time_id,phone);
			});
		}
		
	</script>
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
				    <img class="phone-logo-div" src="../static/images/phone_logo.png" alt="" />
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
	
	<div class="con_homebox fl" style="width:100%">
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
						<span>上网用户数</span>
						<div id="net_usrt_div"></div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
	
	<div class="con_homebox fl" style="width:100%">
		<div class="con_homebox_title">
			<h5 class="fl">
				<i class="fa fa-users ecom_icons"></i>语音指标
			</h5>
			<div class="clear"></div>
		</div>
		<div class="con_list" style="padding: 5px 20px 20px 20px">
			<div class="performance-indicator" style="overflow:hidden;">
				<div class="per-indicator-box indicator-box1 fl" style="width:20%">
					<div class="per-indicator-box-top ">
						<span>CSFB主叫接通率</span>
						<div id="csfb_mocl_succrate_id"></div>
					</div>
					
					<div class="per-indicator-box-bottom">
						<span>CSFB被叫接通率</span>
						<div id="csfb_mtcl_succrate_id"></div>
					</div>
				</div>
				<div class="per-indicator-box indicator-box2 fl" style="width:20%;margin-left:30px">
					<div class="per-indicator-box-top ">
						<span>VoLTE注册成功率 </span>
						<div id="vl_conn_succrate_id"></div>
					</div>
					
					<div class="per-indicator-box-bottom">
						<span>VoLTE始呼网络接通率 </span>
						<div id="callingcon_rate_id"></div>
					</div>
				</div>
				<div class="per-indicator-box indicator-box1 fl" style="width:20%;margin-left:30px">
					<div class="per-indicator-box-top ">
						<span>VoLTE终呼接通率</span>
						<div id="calledcon_rate_id"></div>
					</div>
					
					<div class="per-indicator-box-bottom">
						<span>VoLTE掉话率 </span>
						<div id="vl_vc_call_droprate_id"></div>
					</div>
				</div>
				<div class="per-indicator-box indicator-box2 fl" style="width:20%;margin-left:30px">
					<div class="per-indicator-box-top ">
						<span>eSRVCC切换成功率_呼叫</span>
						<div id="esrvccrate_rate_call_id"></div>
					</div>
					
					<div class="per-indicator-box-bottom">
						<span>4G活跃用户4G语音时长占比</span>
						<div id="lte_in_vl_ratio_id"></div>
					</div>
				</div>
				<div class="per-indicator-box indicator-box1 fl" style="width:20%;margin-left:30px">
					<div class="per-indicator-box-top ">
						<span>2G主叫接通率</span>
						<div id="gsm_mocl_succrate_id"></div>
					</div>
					
					<div class="per-indicator-box-bottom">
						<span>2G被叫接通率</span>
						<div id="gsm_mtcl_succrate_id"></div>
					</div>
				</div>
				<div class="per-indicator-box indicator-box2 fl" style="width:20%;margin-left:30px">
					<div class="per-indicator-box-top ">
						<span>2G掉话率</span>
						<div id="gsm_drop_rate_id"></div>
					</div>
					
					<div class="per-indicator-box-bottom">
						<span>3G主叫接通率</span>
						<div id="td_mocl_succrate_id"></div>
					</div>
				</div>
				<div class="per-indicator-box indicator-box1 fl" style="width:20%;margin-left:30px">
					<div class="per-indicator-box-top ">
						<span>3G被叫接通率</span>
						<div id="td_mtcl_succrate_id"></div>
					</div>
					
					<div class="per-indicator-box-bottom">
						<span>3G掉话率</span>
						<div id="td_drop_rate_id"></div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
	
	<div class="con_homebox fl" style="width:100%">
		<div class="con_homebox_title">
			<h5 class="fl">
				<i class="fa fa-users ecom_icons"></i>数据指标
			</h5>
			<div class="clear"></div>
		</div>
		<div class="con_list" style="padding: 5px 20px 20px 20px">
			<div class="performance-indicator" style="overflow:hidden;">
				<div class="per-indicator-box indicator-box1 fl">
					<div class="per-indicator-box-top ">
						<span>4G流量分流比</span>
						<div id="lte_flow_ratio_id"></div>
					</div>
					
					<div class="per-indicator-box-bottom">
						<span>DNS查询成功率</span>
						<div id="dns_succrate_id"></div>
					</div>
				</div>
				<div class="per-indicator-box indicator-box2 fl" style="margin-left:30px">
					<div class="per-indicator-box-top ">
						<span>HTTP业务成功率</span>
						<div id="http_ser_succrate_id"></div>
					</div>
					
					<div class="per-indicator-box-bottom">
						<span>TCP二三次握手成功率</span>
						<div id="tcp_ack_succrate_id"></div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
	
</body>
</html>