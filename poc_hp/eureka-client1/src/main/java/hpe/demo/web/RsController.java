package hpe.demo.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import hpe.demo.server.PocService;
import net.sf.json.JSONObject;

/**
 * Created by jiangyi on 2017/5/26.
 */
@RestController
@RequestMapping("/poc")
public class RsController {
    @Autowired
    private PocService pocService;

	@RequestMapping(value="/queryTm")
	public void hello(HttpSession session, HttpServletRequest request,
			HttpServletResponse response){
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
		}
	}
	
	@RequestMapping(value="/queryTmBase")
	public void queryTmBase(HttpSession session, HttpServletRequest request,
			HttpServletResponse response){
		String time_id = request.getParameter("time_id");
		String phone = request.getParameter("phone");
		try {
			List<JSONObject> list1  = pocService.queryTm(time_id, phone);
			JSONObject json = list1.get(0);
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
		}
	}
	
	@RequestMapping(value="/queryTmUser")
	public void queryTmUser(HttpSession session, HttpServletRequest request,
			HttpServletResponse response){
		String time_id = request.getParameter("time_id");
		String phone = request.getParameter("phone");
		try {
			List<JSONObject> list1  = pocService.queryTm(time_id, phone);
			JSONObject json = list1.get(0);
			String tac = json.getString("tac");
			List<JSONObject> list2  = pocService.queryTmBase(tac);
			JSONObject json1 = list2.get(0);
			String brand = json1.getString("terminal_brand");
			String model = json1.getString("terminal_model");
			List<JSONObject> list  = pocService.queryTmUser(time_id,brand,model);
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
