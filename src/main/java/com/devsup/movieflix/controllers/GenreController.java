package com.devsup.movieflix.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsup.movieflix.entities.dtos.GenreDTO;
import com.devsup.movieflix.services.GenreService;

@RestController
@RequestMapping(value = "/genres")
public class GenreController {
	
	@Autowired
	GenreService genreService;
	
	@GetMapping
	public ResponseEntity<List<GenreDTO>> getAllGenres() {
		
		List<GenreDTO> genreDto = genreService.findAll();
		
		return ResponseEntity.ok().body(genreDto);
	}

}
