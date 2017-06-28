package com.boco.colony.test.rpcdemo.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.boco.colony.test.rpcdemo.service.PocService;
import com.boco.colony.test.rpcdemo.util.Global;

import net.sf.json.JSONObject;

/**
 * Created by jiangyi on 2017/5/26.
 */
@RestController
@RequestMapping("/poc")
public class RsController {
	private static Log log = LogFactory.getFactory().getInstance(RsController.class);

	@Autowired
	private PocService pocService;

	@RequestMapping(value = "/queryTm")
	public void hello(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
		String sessionID = request.getHeader("SessionID");
		String time_id = request.getParameter("time_id");
		String phone = request.getParameter("phone");
		List<JSONObject> list = pocService.queryTm(time_id, phone);
		log.info("SessionID[" + sessionID + "]:ready to query tm,time id[" + time_id + "" + "]phone[" + phone + "]");
		try {
			response.setHeader("Access-Control-Allow-Origin", "*");// 跨域请求
			response.setContentType("application/json;charset=UTF-8");//// 防止数据传递乱码
			PrintWriter out = response.getWriter();
			out.print(list);
			out.flush();
			out.close();
		} catch (IOException e) {
			log.info("SessionID[" + sessionID + "]:query tm error", e);
			e.printStackTrace();
		}
		log.info("SessionID[" + sessionID + "]:query tm success");
	}

	@RequestMapping(value = "/queryTmBase")
	public void queryTmBase(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
		String sessionID = request.getHeader("SessionID");
		String time_id = request.getParameter("time_id");
		String phone = request.getParameter("phone");
		log.info("SessionID[" + sessionID + "]:ready to query tm base,time id[" + time_id + "" + "]phone[" + phone
				+ "]");

		// RestTemplate restTemplate = new RestTemplate();
		// HttpHeaders headers = new HttpHeaders();
		// headers.add("SessionID", sessionID);
		// headers.add("ServiceID", Global.SERVICE_NAME);
		// HttpEntity<String> entity = new HttpEntity<String>("", headers);
		// log.info("SessionID[" + sessionID + "]:post url\n" +
		// Global.API_GATE_WAY_ADDRESS + "/poc/queryTm?time_id="
		// + time_id + "&phone=" + phone);
		// String r = null;
		// try {
		// r = restTemplate.postForObject(
		// Global.API_GATE_WAY_ADDRESS + "/poc/queryTm?time_id=" + time_id +
		// "&phone=" + phone, null,
		// String.class, entity);
		// } catch (Exception e) {
		// log.error("request error", e);
		// }
		String url = Global.API_GATE_WAY_ADDRESS + "/poc/queryTm?time_id=" + time_id + "&phone=" + phone;
		log.info("SessionID[" + sessionID + "]: ready to call ,url[" + url + "]");
		HttpClient client = HttpClientBuilder.create().build();
		HttpPost post = new HttpPost(url);
		post.addHeader("SessionID", sessionID);
		post.addHeader("ServiceID", Global.SERVICE_NAME);

		HttpResponse responseTmp = null;
		try {
			responseTmp = client.execute(post);
		} catch (Exception e) {
			log.error("SessionID[" + sessionID + "]:request error", e);
		}

		String r = null;
		try {
			r = EntityUtils.toString(responseTmp.getEntity(), "utf-8");
		} catch (Exception e) {
			log.error("SessionID[" + sessionID + "]:get response error", e);
		}
		/**********************************************************************************/
		log.info("SessionID[" + sessionID + "]:query tm res\n[" + r + "]");
		try {
			JSONObject json = JSONObject.fromObject(r.substring(1, r.length() - 1));
			String tac = json.getString("tac");
			List<JSONObject> list = pocService.queryTmBase(tac);
			response.setHeader("Access-Control-Allow-Origin", "*");// 跨域请求
			response.setContentType("application/json;charset=UTF-8");//// 防止数据传递乱码
			PrintWriter out = response.getWriter();
			out.print(list);
			out.flush();
			out.close();
		} catch (IOException e) {
			log.info("SessionID[" + sessionID + "]:query tm base error", e);
			e.printStackTrace();
		}
		log.info("SessionID[" + sessionID + "]:query tm base success");
	}

	@RequestMapping(value = "/queryTmUser")
	public void queryTmUser(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
		String sessionID = request.getHeader("SessionID");
		String time_id = request.getParameter("time_id");
		String phone = request.getParameter("phone");
		log.info("SessionID[" + sessionID + "]:ready to query tm user,time id[" + time_id + "" + "]phone[" + phone
				+ "]");

		// RestTemplate restTemplate = new RestTemplate();
		// HttpHeaders headers = new HttpHeaders();
		// headers.add("SessionID", sessionID);
		// headers.add("ServiceID", Global.SERVICE_NAME);
		// HttpEntity<String> entity = new HttpEntity<String>("", headers);
		// String r = restTemplate.postForObject(
		// Global.API_GATE_WAY_ADDRESS + "/poc/queryTmBase?time_id=" + time_id +
		// "&phone=" + phone, null,
		// String.class, entity);

		String url = Global.API_GATE_WAY_ADDRESS + "/poc/queryTmBase?time_id=" + time_id + "&phone=" + phone;
		log.info("SessionID[" + sessionID + "]: ready to call ,url[" + url + "]");
		HttpClient client = HttpClientBuilder.create().build();
		HttpPost post = new HttpPost(url);
		post.addHeader("SessionID", sessionID);
		post.addHeader("ServiceID", Global.SERVICE_NAME);

		HttpResponse responseTmp = null;
		try {
			responseTmp = client.execute(post);
		} catch (Exception e) {
			log.error("SessionID[" + sessionID + "]:request error", e);
		}

		String r = null;
		try {
			r = EntityUtils.toString(responseTmp.getEntity(), "utf-8");
		} catch (Exception e) {
			log.error("SessionID[" + sessionID + "]:get response error", e);
		}
		/**********************************************************************************/

		log.info("SessionID[" + sessionID + "]:query tm base res\n[" + r + "]");
		try {
			JSONObject json = JSONObject.fromObject(r.substring(1, r.length() - 1));
			String brand = json.getString("terminal_brand");
			String model = json.getString("terminal_model");
			List<JSONObject> list = pocService.queryTmUser(time_id, brand, model);
			response.setHeader("Access-Control-Allow-Origin", "*");// 跨域请求
			response.setContentType("application/json;charset=UTF-8");//// 防止数据传递乱码
			PrintWriter out = response.getWriter();
			out.print(list);
			out.flush();
			out.close();
		} catch (IOException e) {
			log.info("SessionID[" + sessionID + "]:query tm user error", e);
			e.printStackTrace();
		}
		log.info("SessionID[" + sessionID + "]:query tm user success");
	}

	@RequestMapping(value = "/check")
	public void queryTmDataIndex() {

	}

}
