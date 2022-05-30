package com.devsup.movieflix.services;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsup.movieflix.entities.Movie;
import com.devsup.movieflix.entities.Review;
import com.devsup.movieflix.entities.dtos.MovieDTO;
import com.devsup.movieflix.entities.dtos.MovieMinDTO;
import com.devsup.movieflix.entities.dtos.ReviewDTO;
import com.devsup.movieflix.exceptions.RegisterNotFoundException;
import com.devsup.movieflix.repositories.MovieRepository;

@Service
public class MovieService implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Autowired
	MovieRepository movieRepository;
	
	@Autowired
	MessageSource messageSource;
	
	@Transactional(readOnly = true)
	public Page<MovieMinDTO> findMovies(Long genreId, Pageable pageable) {
		
		Page<Movie> page;
		
		Long id = (genreId == 0) ? null : genreId;
		
		try {
			page = this.movieRepository.findMovies(id, pageable);
		} catch(Exception e) {
			throw new RuntimeException(e.getMessage());
		}
		
		return page.map(x -> new MovieMinDTO(x));
	}
	
	@Transactional(readOnly = true)
	public MovieDTO findById(Long id) {
		
		Movie movie = new Movie();
		
		Optional<Movie> obj = this.movieRepository.findById(id);
		
		movie = obj.orElseThrow(() -> new RegisterNotFoundException(this.messageSource.getMessage("movie-not-found-with-id", null, null) + " " + id));
		
		return new MovieDTO(movie);
	}

	@Transactional(readOnly = true)
	public List<ReviewDTO> findMovieReviews(Long movieId) {
		
		List<Review> reviews = this.movieRepository.findByMovieId(movieId);
		
		return reviews.stream().map(x -> new ReviewDTO(x)).collect(Collectors.toList());
	}

}
