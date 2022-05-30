package com.devsup.movieflix.services;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsup.movieflix.entities.Genre;
import com.devsup.movieflix.entities.dtos.GenreDTO;
import com.devsup.movieflix.repositories.GenreRepository;

@Service
public class GenreService implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Autowired
	GenreRepository genreRepository;
	
	@Transactional(readOnly = true)
	public List<GenreDTO> findAll() {
		List<Genre> genres = genreRepository.findAll();
		
		return genres.stream().map(x -> new GenreDTO(x)).collect(Collectors.toList());
	}

}
