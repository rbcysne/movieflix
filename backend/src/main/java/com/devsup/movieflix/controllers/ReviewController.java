package com.devsup.movieflix.controllers;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsup.movieflix.entities.dtos.ReviewDTO;
import com.devsup.movieflix.services.ReviewService;

@RestController
@RequestMapping(value = "/reviews")
public class ReviewController {

	@Autowired
	ReviewService reviewService;
	
	@GetMapping
	public ResponseEntity<List<ReviewDTO>> findAll() {
		
		List<ReviewDTO> page = this.reviewService.findAll();
		
		return ResponseEntity.ok().body(page);
	}
	
	@PostMapping
	public ResponseEntity<ReviewDTO> insert(@Valid @RequestBody ReviewDTO reviewDto) {
		
		reviewDto = this.reviewService.insert(reviewDto);
		
		URI uri = ServletUriComponentsBuilder
					.fromCurrentRequest()
					.path("/movies/{id}")
					.buildAndExpand(reviewDto.getMovieId())
					.toUri();
		
		return ResponseEntity.created(uri).body(reviewDto);
	}
}
