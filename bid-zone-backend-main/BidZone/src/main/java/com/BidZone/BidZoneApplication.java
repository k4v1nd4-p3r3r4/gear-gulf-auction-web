package com.BidZone;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
// Main class for the BidZone application.
public class BidZoneApplication {

	public static void main(String[] args) {
		// Entry point for the Spring Boot application.
		SpringApplication.run(BidZoneApplication.class, args);
	}
	// Bean definition for ModelMapper, used for mapping between objects.
	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}
}
