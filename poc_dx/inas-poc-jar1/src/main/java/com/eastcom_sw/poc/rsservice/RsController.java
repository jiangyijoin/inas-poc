package com.eastcom_sw.poc.rsservice;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.eastcom_sw.poc.service.PocService;
import com.jcraft.jsch.Logger;

import net.sf.json.JSONObject;

/**
 * Created by jiangyi on 2017/5/26.
 */
@RestController
@RequestMapping("/poc")
public class RsController {
    @Autowired
    private PocService pocService;
    
    @Value("${pocserver}")
    private String pocserver;

    private static Log log = LogFactory.getFactory().getInstance(RsController.class);
    
	@RequestMapping(value="/queryTm")
	public void hello(HttpSession session, HttpServletRequest request,
			HttpServletResponse response){
		log.info("queryTm------start");
		String time_id = request.getParameter("time_id");
		String phone = request.getParameter("phone");
		List<JSONObject> list  = pocService.queryTm(time_id, phone);
		try {
			response.setHeader("Access-Control-Allow-Origin", "*");//跨域请求
			response.setContentType("application/json;charset=UTF-8");////防止数据传递乱码
			PrintWriter out = response.getWriter();
			out.print(list);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			log.info("queryTm------end");
		}
	}
	
	@RequestMapping(value="/queryTmBase")
	public void queryTmBase(HttpSession session, HttpServletRequest request,
			HttpServletResponse response){
		log.info("queryTmBase------start");
		String time_id = request.getParameter("time_id");
		String phone = request.getParameter("phone");
		RestTemplate restTemplate = new RestTemplate();
		String r = restTemplate.postForObject(pocserver+"/poc/queryTm?time_id="+time_id+"&phone="+phone, null, String.class);
		try {
			JSONObject json = JSONObject.fromObject(r.substring(1,r.length()-1));
			String tac = json.getString("tac");
			List<JSONObject> list  = pocService.queryTmBase(tac);
			response.setHeader("Access-Control-Allow-Origin", "*");//跨域请求
			response.setContentType("application/json;charset=UTF-8");////防止数据传递乱码
			PrintWriter out = response.getWriter();
			out.print(list);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			log.info("queryTmBase------end");
		}
	}
	
	@RequestMapping(value="/queryTmUser")
	public void queryTmUser(HttpSession session, HttpServletRequest request,
			HttpServletResponse response){
		log.info("queryTmUser------start");
		String time_id = request.getParameter("time_id");
		String phone = request.getParameter("phone");
		RestTemplate restTemplate = new RestTemplate();
		String r = restTemplate.postForObject(pocserver+"/poc/queryTmBase?time_id="+time_id+"&phone="+phone, null, String.class);
		try {
			JSONObject json = JSONObject.fromObject(r.substring(1,r.length()-1));
			String brand = json.getString("terminal_brand");
			String model = json.getString("terminal_model");
			List<JSONObject> list  = pocService.queryTmUser(time_id,brand,model);
			response.setHeader("Access-Control-Allow-Origin", "*");//跨域请求
			response.setContentType("application/json;charset=UTF-8");////防止数据传递乱码
			PrintWriter out = response.getWriter();
			out.print(list);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			log.info("queryTmUser------end");
		}
	}
    
	
	@RequestMapping(value="/queryTmVoiceIndex")
	public void queryTmVoiceIndex(HttpSession session, HttpServletRequest request,
			HttpServletResponse response){
		String time_id = request.getParameter("time_id");
		String brand = request.getParameter("brand");
		String model = request.getParameter("model");
		List<JSONObject> list  = pocService.queryTmVoiceIndex(time_id,brand,model);
		try {
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
	
	
	@RequestMapping(value="/queryTmDataIndex")
	public void queryTmDataIndex(HttpSession session, HttpServletRequest request,
			HttpServletResponse response){
		String time_id = request.getParameter("time_id");
		String brand = request.getParameter("brand");
		String model = request.getParameter("model");
		List<JSONObject> list  = pocService.queryTmDataIndex(time_id,brand,model);
		try {
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
