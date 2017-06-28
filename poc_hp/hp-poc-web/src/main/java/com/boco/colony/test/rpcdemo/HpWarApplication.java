package com.boco.colony.test.rpcdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
public class HpWarApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(HpWarApplication.class, args);
	}

}
