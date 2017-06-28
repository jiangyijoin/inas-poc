package com.boco.colony.test.rpcdemo.rsservice;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import net.sf.json.JSONObject;



/**
 * Created by jiangyi on 2017/5/26.
 */
@RestController
@RequestMapping("/poc")
public class RsController {

	@Autowired
	private DiscoveryClient discoveryClient;
	
	@RequestMapping(value="/queryDate")
	public void queryDate(HttpSession session, HttpServletRequest request,
			HttpServletResponse response){
		
		String time_id = request.getParameter("time_id");
		String phone = request.getParameter("phone");
		try {
//			List<ServiceInstance> list1 = this.discoveryClient.getInstances("eureka-client1");
//			String url1 = null;
//			if (list1.size() > 0) {
//				url1 = list1.get(0).getUri().toString();
//			}
//			List<ServiceInstance> list2 = this.discoveryClient.getInstances("eureka-client2");
//			String url2 = null;
//			if (list2.size() > 0) {
//				url2 = list2.get(0).getUri().toString();
//			}
			String url1 = "http://20.26.33.122:32601";
			String url2 = "http://20.26.33.122:32602";
			RestTemplate restTemplate = new RestTemplate();
			String r1 = restTemplate.postForObject(url1+"/poc/queryTmBase?time_id="+time_id+"&phone="+phone, null, String.class);
			String r2 = restTemplate.postForObject(url1+"/poc/queryTmUser?time_id="+time_id+"&phone="+phone, null, String.class);
			System.err.println(r1);
			System.err.println(r2);
			String r3 = restTemplate.postForObject(url2+"/poc/queryTmVoiceIndex?time_id="+time_id+"&phone="+phone, null, String.class);
			String r4 = restTemplate.postForObject(url2+"/poc/queryTmDataIndex?time_id="+time_id+"&phone="+phone, null, String.class);
			System.err.println(r3);
			System.err.println(r4);
			List list = new ArrayList();
			JSONObject json1 = JSONObject.fromObject(r1.substring(1,r1.length()-1));
			list.add(json1);
			JSONObject json2 = JSONObject.fromObject(r2.substring(1,r2.length()-1));
			list.add(json2);
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
		}
	}
	
    
}
