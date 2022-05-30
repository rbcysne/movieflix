package com.devsup.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsup.movieflix.entities.User;
import com.devsup.movieflix.exceptions.ForbiddenException;
import com.devsup.movieflix.exceptions.UnauthorizedException;
import com.devsup.movieflix.repositories.UserRepository;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	
	@Transactional(readOnly = true)
	public User getUserAuthenticated() {
		try {
			String userAuthenticated = SecurityContextHolder.getContext().getAuthentication().getName();
			return userRepository.findByEmail(userAuthenticated);
		} catch(Exception e) {
			throw new UnauthorizedException("Invalid user!");
		}
	}
	
	public void validateRoleMember() {
		User userAuthenticated = this.getUserAuthenticated();
		
		if(!userAuthenticated.hasRole("ROLE_MEMBER")) {
			throw new ForbiddenException("Access denied!");
		}
	}
}
