package com.devsup.movieflix.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsup.movieflix.entities.dtos.MovieDTO;
import com.devsup.movieflix.entities.dtos.MovieMinDTO;
import com.devsup.movieflix.entities.dtos.ReviewDTO;
import com.devsup.movieflix.services.MovieService;

@RestController
@RequestMapping(value = "/movies")
public class MovieController {

	@Autowired
	MovieService movieService;
	
	@GetMapping
	public ResponseEntity<Page<MovieMinDTO>> findMovies(
			@RequestParam(value = "genreId", defaultValue = "0", required = false) Long genreId,
			Pageable pageable) {

		Page<MovieMinDTO> movies = this.movieService.findMovies(genreId, pageable);
		
		return ResponseEntity.ok().body(movies);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<MovieDTO> findById(@PathVariable("id") Long id) {
		
		MovieDTO movieDto = this.movieService.findById(id);
		
		return ResponseEntity.ok().body(movieDto);
	}
	
	@GetMapping(value = "/{id}/reviews")
	public ResponseEntity<List<ReviewDTO>> findMovieReviews(@PathVariable("id") Long id) {
		
		List<ReviewDTO> reviewDto = this.movieService.findMovieReviews(id);
		
		return ResponseEntity.ok().body(reviewDto);
	}
	
}
