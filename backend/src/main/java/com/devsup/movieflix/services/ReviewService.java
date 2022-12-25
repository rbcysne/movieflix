package com.devsup.movieflix.services;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsup.movieflix.entities.Movie;
import com.devsup.movieflix.entities.Review;
import com.devsup.movieflix.entities.User;
import com.devsup.movieflix.entities.dtos.ReviewDTO;
import com.devsup.movieflix.exceptions.DataBaseException;
import com.devsup.movieflix.exceptions.RegisterNotFoundException;
import com.devsup.movieflix.repositories.MovieRepository;
import com.devsup.movieflix.repositories.ReviewRepository;

@Service
public class ReviewService implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Autowired
	ReviewRepository reviewRepository;
	
	@Autowired
	MovieRepository movieRepository;
	
	@Autowired
	AuthService authService;
	
	@Autowired
	MessageSource messageSource;
	
	@Transactional(readOnly = true)
	public List<ReviewDTO> findAll() {
		
		User userAuthenticated = this.authService.getUserAuthenticated();
		
		List<Review> reviews = this.reviewRepository.findByUserId(userAuthenticated.getId());

		return reviews.stream().map(x -> new ReviewDTO(x)).collect(Collectors.toList());
	}

	@Transactional
	public ReviewDTO insert(ReviewDTO reviewDto) {
		
		this.authService.validateRoleMember();
		
		Review review = new Review();
		try {
			this.convertDtoToEntity(reviewDto, review);
			review = this.reviewRepository.save(review);
		} catch(Exception e) {
			throw new DataBaseException(e.getMessage());
		}
		
		return new ReviewDTO(review, this.authService.getUserAuthenticated());
	}
	
	private void convertDtoToEntity(ReviewDTO reviewDto, Review review) {
		
		review.setText(reviewDto.getText());
		
		Optional<Movie> obj = this.movieRepository.findById(reviewDto.getMovieId());
		Movie movie = obj.orElseThrow(() -> new RegisterNotFoundException(this.messageSource
					.getMessage("product-not-found-with-id", null, null) + " " + reviewDto.getMovieId()));
		
		review.setMovie(movie);
		review.setUser(this.authService.getUserAuthenticated());
	}
}
