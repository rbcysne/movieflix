 package com.devsup.movieflix.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsup.movieflix.entities.dtos.GenreDTO;
import com.devsup.movieflix.services.GenreService;

@RestController
@RequestMapping(value = "/genres")
public class GenreController {
	
	@Autowired
	GenreService genreService;
	
	@GetMapping
	public ResponseEntity<Page<GenreDTO>> getAllGenres(
			@RequestParam(value = "genreId", defaultValue = "0", required = false) Long genreId, 
			Pageable pageable) {
		
		Page<GenreDTO> genres = genreService.findGenres(genreId, pageable);
		
		return ResponseEntity.ok().body(genres);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<GenreDTO> getGenreById(@PathVariable("id") Long id) {
		
		GenreDTO genreDto = genreService.findById(id);
		
		
		return ResponseEntity.ok().body(genreDto);
	}

}
