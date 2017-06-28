package com.boco.colony.test.rpcdemo.util;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FindServiceInstanceUtil {

	private Logger log = LoggerFactory.getLogger(this.getClass());

	public List<String> findService(String serviceName) throws Exception {
		log.info("ready to FindService");
		HttpClient client = HttpClientBuilder.create().build();
		HttpGet get = new HttpGet(Global.REGISTRY_ADDRESS + Global.SERVICE_FIND_URL + "?serviceName=" + serviceName);
		HttpResponse response = client.execute(get);
		HttpEntity entity = response.getEntity();
		String res = EntityUtils.toString(entity, "utf-8");
		log.info("get response info:" + res);
		List<String> addressList = new ArrayList<String>();

		JSONObject json = new JSONObject(res);
		JSONArray dataArray = json.getJSONArray("data");

		for (int i = 0; i < dataArray.length(); i++) {
			JSONObject job = dataArray.getJSONObject(i);
			String ip = job.getString("ip");
			Integer port = job.getInt("port");
			String addressTmp = ip + ":" + port;
			addressList.add(addressTmp);
		}

		return addressList;
	}

	public static void main1(String[] args) throws Exception {
		FindServiceInstanceUtil util = new FindServiceInstanceUtil();
		System.out.println(util.findService("LoginMSDemo"));
	}

	public static void main(String[] args) throws Exception {
		String res = "{ 	\"code\":1, 	\"data\":[ 		{ 			\"ip\":\"10.22.1.192\", 			\"port\":8990, 			\"serviceId\":\"login_docker_demo-8990\", 			\"serviceName\":\"LoginMSDemo\", 			\"status\":\"passing\" 		}, 		{ 			\"ip\":\"10.31.2.44\", 			\"port\":8014, 			\"serviceId\":\"10.31.2.44_8014\", 			\"serviceName\":\"LoginMSDemo\", 			\"status\":\"critical\" 		}, 		{ 			\"ip\":\"10.22.1.192\", 			\"port\":8014, 			\"serviceId\":\"10.22.1.192_8014\", 			\"serviceName\":\"LoginMSDemo\", 			\"status\":\"critical\" 		}, 		{ 			\"ip\":\"10.22.1.193\", 			\"port\":8297, 			\"serviceId\":\"login_docker_demo-8297\", 			\"serviceName\":\"LoginMSDemo\", 			\"status\":\"passing\" 		} 	] } ";

		List<String> addressList = new ArrayList<String>();

		JSONObject json = new JSONObject(res);
		JSONArray dataArray = json.getJSONArray("data");

		for (int i = 0; i < dataArray.length(); i++) {
			JSONObject job = dataArray.getJSONObject(i);
			String ip = job.getString("ip");
			Integer port = job.getInt("port");
			String addressTmp = ip + ":" + port;
			addressList.add(addressTmp);
		}

		System.out.println(addressList);
	}
}
