package com.devsup.movieflix.services;

import java.io.Serializable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsup.movieflix.entities.User;
import com.devsup.movieflix.entities.dtos.UserDTO;
import com.devsup.movieflix.exceptions.UnauthorizedException;
import com.devsup.movieflix.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService,Serializable {

	private static final long serialVersionUID = 1L;
	
	private static Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private UserRepository userRepository;


	@Transactional(readOnly = true)
	public User findByEmail(String email) {
		return this.userRepository.findByEmail(email);
	}
	
	@Transactional(readOnly = true)
	public UserDTO getProfileCurrentUser() {
		try {
			String authenticatedUser = SecurityContextHolder.getContext().getAuthentication().getName();
			
			User user =  findByEmail(authenticatedUser);
			return new UserDTO(user);
			
		} catch(Exception e) {
			throw new UnauthorizedException("Invalid user!");
		}
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username);
		
		if(user == null) {
			logger.error("User not found: " + username);
			throw new UsernameNotFoundException("Invalid credentials");
		}
		
		logger.info("User found: " + username);
		return user;
	}
}
