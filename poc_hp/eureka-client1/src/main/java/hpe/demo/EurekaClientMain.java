package hpe.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class EurekaClientMain {

	public static void main(String[] args) {
		SpringApplication.run(EurekaClientMain.class, args);
	}

}
