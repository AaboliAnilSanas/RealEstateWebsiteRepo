package com.realestate.realestateapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync; // <-- Import this

@SpringBootApplication
@EnableAsync // <-- Add this annotation to enable parallel thread execution
public class RealEstateAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(RealEstateAppApplication.class, args);
	}

}
