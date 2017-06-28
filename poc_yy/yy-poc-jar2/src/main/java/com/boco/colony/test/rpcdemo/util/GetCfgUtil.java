package com.boco.colony.test.rpcdemo.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

public class GetCfgUtil {

	/**
	 * @param keys
	 *            需要获取的配置的Keys
	 * @return key为返回的key，value为获取到的对应的value
	 */
	public static Map<String, String> getCfg(String[] keys) throws Exception {
		HttpClient httpClient = HttpClientBuilder.create().build();
		String baseURL = Global.CFG_ADDRESS+ Global.CONFIG_URL + "?serviceName="
				+ Global.SERVICE_NAME + "&env=" + Global.RUNTIME_ENV;
		StringBuffer buffer = new StringBuffer(baseURL);
		for (String key : keys) {
			buffer.append("&");
			buffer.append("key[]=");
			buffer.append(key);
		}
		HttpResponse httpResponse = httpClient.execute(new HttpGet(buffer.toString()));

		int statusCode = httpResponse.getStatusLine().getStatusCode();
		if (statusCode == HttpStatus.SC_OK) {
			String res = EntityUtils.toString(httpResponse.getEntity(), "utf-8");
			ResponseVO vo = new ResponseVO(res);
			if (vo.getStatus() != 0) {
				throw new Exception("response error,error info:" + vo.getMsg());
			}
			return vo.getValues();
		} else {
			throw new Exception(
					"response error(error code:" + statusCode + "),error info:" + httpResponse.getEntity().toString());
		}
	}

}

class ResponseVO {
	private int status;
	private String msg;
	private Map<String, String> values;

	public ResponseVO(String jsonStr) throws Exception {
		JSONObject json = new JSONObject(jsonStr);
		int code = json.getInt("code");
		if (code != 0) {
			msg = json.getString("message");
		}

		JSONObject valuesJson = (JSONObject) json.get("values");
		Iterator<String> valueskeys = valuesJson.keys();
		values = new HashMap<String, String>();
		while (valueskeys.hasNext()) {
			String key = valueskeys.next();
			String value = valuesJson.getString(key);
			values.put(key, value);
		}
	}

	public int getStatus() {
		return status;
	}

	public String getMsg() {
		return msg;
	}

	public Map<String, String> getValues() {
		return values;
	}

}
