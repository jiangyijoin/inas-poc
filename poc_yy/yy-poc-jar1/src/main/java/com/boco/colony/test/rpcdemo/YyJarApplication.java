package com.boco.colony.test.rpcdemo;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;

import com.boco.colony.test.rpcdemo.util.GetCfgUtil;
import com.boco.colony.test.rpcdemo.util.Global;
import com.boco.colony.test.rpcdemo.util.RegisterUtil;

@SpringBootApplication
public class YyJarApplication implements EmbeddedServletContainerCustomizer {
	private static Log log = LogFactory.getFactory().getInstance(YyJarApplication.class);

	public static void main(String[] args) throws Exception {

		prepareJDBCConfig();

		SpringApplication.run(YyJarApplication.class, args);

		// 注册
		log.info("ready to register");
		try {
			String putMsg = RegisterUtil.register("/poc/check", null);
			log.info("register success putMsg[" + putMsg + "]");
		} catch (Exception e) {
			log.error("register error", e);
		}
	}

	private static void prepareJDBCConfig() {
		String[] keys = new String[3];
		keys[0] = "spring.datasource.url";
		keys[1] = "spring.datasource.username";
		keys[2] = "spring.datasource.password";
		Map<String, String> cfgResult;
		try {
			cfgResult = GetCfgUtil.getCfg(keys);
		} catch (Exception e) {
			cfgResult = new HashMap<String, String>();
			log.error("get cfg error", e);
		}

		String url = cfgResult.get(keys[0]);
		String userName = cfgResult.get(keys[1]);
		String password = cfgResult.get(keys[2]);

		if (url != null && (!url.equals(""))) {
			System.setProperty("spring.datasource.url", url);
		}
		if (userName != null && (!userName.equals(""))) {
			System.setProperty("spring.datasource.username", userName);
		}
		if (password != null && (!password.equals(""))) {
			System.setProperty("spring.datasource.password", password);
		}
	}

	/**
	 * 启动端口设定
	 */
	public void customize(ConfigurableEmbeddedServletContainer container) {
		container.setPort(Integer.parseInt(Global.SERVICE_PORT));
	}
}
