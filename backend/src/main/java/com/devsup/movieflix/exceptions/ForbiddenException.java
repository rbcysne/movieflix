package com.devsup.movieflix.exceptions;

public class ForbiddenException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ForbiddenException() {
		
	}
	
	public ForbiddenException(String msg) {
		super(msg);
	}
}
