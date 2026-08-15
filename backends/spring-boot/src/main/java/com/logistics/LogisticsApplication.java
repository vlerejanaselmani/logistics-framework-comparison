package com.logistics;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


// @SpringBootApplication
// =
//   @Configuration + @EnableAutoConfiguration + @ComponentScan

@SpringBootApplication
public class LogisticsApplication {

    public static void main(String[] args) {
        SpringApplication.run(LogisticsApplication.class, args);
    }

}