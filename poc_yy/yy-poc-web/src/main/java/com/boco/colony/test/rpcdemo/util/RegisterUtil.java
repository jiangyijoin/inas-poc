package com.boco.colony.test.rpcdemo.util;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;

public class RegisterUtil {

	public static String register(String checkURL, String notifyURL) throws Exception {
		JSONObject json = new JSONObject();
		json.put("Id", Global.INSTANCE_ID);
		json.put("Name", Global.SERVICE_NAME);
		json.put("Address", Global.SERVICE_IP);
		json.put("Port", Integer.valueOf(Global.SERVICE_PORT));
		if (checkURL != null) {
			JSONObject checkJson = new JSONObject();
			checkJson.put("HTTP", "http://" + Global.SERVICE_IP + ":" + Global.SERVICE_PORT + checkURL);
			json.put("Check", checkJson);
		}
		if (notifyURL != null) {
			String valueTmp = "notifyUrl=" + notifyURL;
			JSONArray jsonArray = new JSONArray();
			jsonArray.put(valueTmp);
			json.put("Tags", jsonArray);
		}
		// 生成注册信息
		String putMsg = json.toString();
		// 发送注册信息
		HttpClient client = HttpClientBuilder.create().build();
		HttpPut put = new HttpPut(Global.REGISTRY_ADDRESS + Global.REGISTER_URL);
		put.setEntity(new StringEntity(putMsg));
		HttpResponse response = client.execute(put);
		int rtCode = response.getStatusLine().getStatusCode();
		if (rtCode != 200) {
			String rtMsg = EntityUtils.toString(response.getEntity(), "utf-8");
			JSONObject jsonObjectTmp = new JSONObject(rtMsg);
			String errorMsg = jsonObjectTmp.getString("message");
			throw new Exception("register errror,returnCode[" + response.getStatusLine().toString() + "],returnInfo["
					+ errorMsg + "],putMsg[" + putMsg + "]");
		}
		return putMsg;
	}
}
