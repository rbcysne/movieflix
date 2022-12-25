package com.devsup.movieflix.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsup.movieflix.entities.dtos.UserDTO;
import com.devsup.movieflix.services.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping(value = "/profile")
	public ResponseEntity<UserDTO> getProfileCurrentUser() {
		
		UserDTO userDto = userService.getProfileCurrentUser();

		return ResponseEntity.ok().body(userDto);
	}
}
