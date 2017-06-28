package com.boco.colony.test.rpcdemo.rsservice;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.boco.colony.test.rpcdemo.util.Global;

import net.sf.json.JSONObject;

/**
 * Created by jiangyi on 2017/5/26.
 */
@RestController
@RequestMapping("/poc")
public class RsController {

	@RequestMapping(value = "/queryDate")
	public void queryDate(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
		String time_id = request.getParameter("time_id");
		String phone = request.getParameter("phone");
		try {
			// RestTemplate restTemplate = new RestTemplate();
			//
			// HttpHeaders headers = new HttpHeaders();
			// headers.add("AppID", Global.APP_ID);
			// HttpEntity<String> entity = new HttpEntity<String>("", headers);
			//
			// String r1 = restTemplate.postForObject(
			// Global.API_GATE_WAY_ADDRESS + "/poc/queryTmBase?time_id=" +
			// time_id + "&phone=" + phone, null,
			// String.class, entity);
			// String r2 = restTemplate.postForObject(
			// Global.API_GATE_WAY_ADDRESS + "/poc/queryTmUser?time_id=" +
			// time_id + "&phone=" + phone, null,
			// String.class, entity);
			// String r3 = restTemplate.postForObject(
			// Global.API_GATE_WAY_ADDRESS + "/poc/queryTmVoiceIndex?time_id=" +
			// time_id + "&phone=" + phone, null,
			// String.class, entity);
			// String r4 = restTemplate.postForObject(
			// Global.API_GATE_WAY_ADDRESS + "/poc/queryTmDataIndex?time_id=" +
			// time_id + "&phone=" + phone, null,
			// String.class, entity);

//			time_id = "201703010000";
			
			String r1 = post(
					Global.API_GATE_WAY_ADDRESS + "/boco-poc-radar1" + "/poc/queryTmBase?time_id=" + time_id + "&phone=" + phone);
			String r2 = post(
					Global.API_GATE_WAY_ADDRESS + "/boco-poc-radar1" + "/poc/queryTmUser?time_id=" + time_id + "&phone=" + phone);
			String r3 = post(
					Global.API_GATE_WAY_ADDRESS + "/boco-poc-radar2" + "/poc/queryTmVoiceIndex?time_id=" + time_id + "&phone=" + phone);
			String r4 = post(
					Global.API_GATE_WAY_ADDRESS + "/boco-poc-radar2" + "/poc/queryTmDataIndex?time_id=" + time_id + "&phone=" + phone);

			/**********************************************************************************/

			System.err.println(r1);
			System.err.println(r2);
			System.err.println(r3);
			System.err.println(r4);
			List<JSONObject> list = new ArrayList<JSONObject>();
			JSONObject json1 = JSONObject.fromObject(r1.substring(1, r1.length() - 1));
			list.add(json1);
			JSONObject json2 = JSONObject.fromObject(r2.substring(1, r2.length() - 1));
			list.add(json2);
			JSONObject json3 = JSONObject.fromObject(r3.substring(1, r3.length() - 1));
			list.add(json3);
			JSONObject json4 = JSONObject.fromObject(r4.substring(1, r4.length() - 1));
			list.add(json4);

			response.setHeader("Access-Control-Allow-Origin", "*");// 跨域请求
			response.setContentType("application/json;charset=UTF-8");//// 防止数据传递乱码
			PrintWriter out = response.getWriter();
			out.print(list);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String post(String url) {
		HttpClient client = HttpClientBuilder.create().build();
		HttpPost post = new HttpPost(url);
		post.addHeader("AppID", Global.APP_ID);

		HttpResponse responseTmp = null;
		try {
			responseTmp = client.execute(post);
		} catch (Exception e) {
			e.printStackTrace();
		}

		String r = null;
		try {
			r = EntityUtils.toString(responseTmp.getEntity(), "utf-8");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return r;
	}

}
