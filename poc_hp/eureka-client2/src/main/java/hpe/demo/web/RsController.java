package hpe.demo.web;

import java.io.IOException;
import java.io.PrintWriter;
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
    
	@Autowired
	private DiscoveryClient discoveryClient;
	
	@RequestMapping(value="/queryTmVoiceIndex")
	public void queryTmVoiceIndex(HttpSession session, HttpServletRequest request,
			HttpServletResponse response){
		String time_id = request.getParameter("time_id");
		String phone = request.getParameter("phone");
		RestTemplate restTemplate = new RestTemplate();
		try {
			List<ServiceInstance> list1 = this.discoveryClient.getInstances("eureka-client1");
			String r = "";
			if (list1.size() > 0) {
				String uri = list1.get(0).getUri().toString();
				r = restTemplate.getForObject(uri + "/poc/queryTmBase?time_id="+time_id+"&phone="+phone, String.class);
			}
			
			JSONObject json = JSONObject.fromObject(r.substring(1,r.length()-1));
			String brand = json.getString("terminal_brand");
			String model = json.getString("terminal_model");
			List<JSONObject> list  = pocService.queryTmVoiceIndex(time_id,brand,model);
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
		String phone = request.getParameter("phone");
		RestTemplate restTemplate = new RestTemplate();
		try {
			List<ServiceInstance> list1 = this.discoveryClient.getInstances("eureka-client1");
			String r = "";
			if (list1.size() > 0) {
				String uri = list1.get(0).getUri().toString();
				r = restTemplate.getForObject(uri + "/poc/queryTmBase?time_id="+time_id+"&phone="+phone, String.class);
			}
			JSONObject json = JSONObject.fromObject(r.substring(1,r.length()-1));
			String brand = json.getString("terminal_brand");
			String model = json.getString("terminal_model");
			List<JSONObject> list  = pocService.queryTmDataIndex(time_id,brand,model);
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
