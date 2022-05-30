package com.devsup.movieflix.entities.dtos;

import java.io.Serializable;
import java.util.Objects;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.devsup.movieflix.entities.Review;
import com.devsup.movieflix.entities.User;

public class ReviewDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	
	@NotBlank
	private String text;
	
	@NotNull
	private Long movieId;
	
	private UserDTO user;
	
	public ReviewDTO() {
		
	}

	public ReviewDTO(Long id, String text, Long movieId) {
		this.id = id;
		this.text = text;
		this.movieId = movieId;
	}
	
	public ReviewDTO(Review review) {
		this.id = review.getId();
		this.text = review.getText();
		this.movieId = review.getMovie().getId();
		this.setUser(new UserDTO(review.getUser().getId(), review.getUser().getName(), review.getUser().getEmail()));
	}
	
	public ReviewDTO(Review review, User user) {
		this.id = review.getId();
		this.text = review.getText();
		this.movieId = review.getMovie().getId();
		this.setUser(new UserDTO(user.getId(), user.getName(), user.getEmail()));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ReviewDTO other = (ReviewDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
