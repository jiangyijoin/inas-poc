package com.boco.colony.test.rpcdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;

@SpringBootApplication
public class YyWarApplication implements EmbeddedServletContainerCustomizer {

	public static void main(String[] args) throws Exception {

		SpringApplication.run(YyWarApplication.class, args);

	}

	/**
	 * 启动端口设定
	 */
	public void customize(ConfigurableEmbeddedServletContainer container) {
		container.setPort(8080);
	}
}
