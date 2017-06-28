package com.eastcom_sw.poc.rsservice;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.eastcom_sw.frm.sign.Client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.eastcom_sw.frm.sign.Request;
import com.eastcom_sw.frm.sign.Response;
import com.eastcom_sw.frm.sign.constant.Constants;
import com.eastcom_sw.frm.sign.constant.ContentType;
import com.eastcom_sw.frm.sign.constant.HttpHeader;
import com.eastcom_sw.frm.sign.enums.Method;

import net.sf.json.JSONObject;

/**
 * Created by jiangyi on 2017/5/26.
 */
@RestController
@RequestMapping("/poc")
public class RsController {

    @Value("${pocserver}")
    private String pocserver;
    
    @Value("${appKey}")
    private String appKey;
    
    @Value("${appSecret}")
    private String appSecret;
    
    @Value("${pathBase}")
    private String pathBase;
    
    private final static List<String> CUSTOM_HEADERS_TO_SIGN_PREFIX = new ArrayList<String>();
    
	@RequestMapping(value="/queryDate")
	public void queryDate(HttpSession session, HttpServletRequest request,
			HttpServletResponse response){
		String time_id = request.getParameter("time_id");
		String phone = request.getParameter("phone");
		try {
			List list = new ArrayList();
			RestTemplate restTemplate = new RestTemplate();
			
			Map<String, String> headers = new HashMap<String, String>();
	        headers.put(HttpHeader.HTTP_HEADER_ACCEPT, "application/json");
	        headers.put(HttpHeader.HTTP_HEADER_CONTENT_TYPE, ContentType.CONTENT_TYPE_TEXT);
	        CUSTOM_HEADERS_TO_SIGN_PREFIX.clear();
	        Request request1 = new Request(Method.POST_STRING,  pocserver, pathBase+"/poc/queryTmBase", appKey, appSecret, Constants.DEFAULT_TIMEOUT);
	        request1.setHeaders(headers);
	        request1.setSignHeaderPrefixList(CUSTOM_HEADERS_TO_SIGN_PREFIX);
	        Map<String, String> querys = new HashMap<String, String>();
	        querys.put("time_id", time_id);
	        querys.put("phone", phone);
	        request1.setQuerys(querys);
	        Response response1 = Client.execute(request1);
			String body = response1.getBody();
			System.err.println(body);
			JSONObject json1 = JSONObject.fromObject(body.substring(1,body.length()-1));
			list.add(json1);
			
			HttpHeaders  headers1 = new HttpHeaders();
			headers1.set("X-Key", appKey);
	        HttpEntity<String> requestEntity = new HttpEntity<String>("abc", headers1);
	        String r2 = restTemplate.postForObject(pocserver + pathBase + "/poc/queryTmUser?time_id="+time_id+"&phone="+phone, requestEntity,String.class);
	        System.err.println(r2);
	        JSONObject json2 = JSONObject.fromObject(r2.substring(1,r2.length()-1));
	        list.add(json2);
	        String r3 = restTemplate.postForObject(pocserver + pathBase + "/poc/queryTmVoiceIndex?time_id="+time_id+"&phone="+phone, requestEntity,String.class);
	        String r4 = restTemplate.postForObject(pocserver + pathBase + "/poc/queryTmDataIndex?time_id="+time_id+"&phone="+phone, requestEntity,String.class);
			System.err.println(r3);
			System.err.println(r4);
			JSONObject json3 = JSONObject.fromObject(r3.substring(1,r3.length()-1));
			list.add(json3);
			JSONObject json4 = JSONObject.fromObject(r4.substring(1,r4.length()-1));
			list.add(json4);
			
			response.setHeader("Access-Control-Allow-Origin", "*");//跨域请求
			response.setContentType("application/json;charset=UTF-8");////防止数据传递乱码
			PrintWriter out = response.getWriter();
			out.print(list);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
    
}
